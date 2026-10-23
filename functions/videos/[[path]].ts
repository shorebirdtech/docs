/// <reference types="@cloudflare/workers-types" />

// Byte-range support for the demo videos. Cloudflare Pages answers a Range
// request for a static asset with the whole file and a 200, and Safari (and
// anything else built on AVFoundation) won't play an MP4 from a server that
// doesn't return 206 partial content. This serves the asset and slices it.
// The videos are a few MB each, so buffering one is fine.

interface Env {
  ASSETS: Fetcher;
}

// `bytes=start-end`, `bytes=start-` or `bytes=-suffixLength`. Multi-range
// requests aren't used by media players, so they get the whole file.
function parseRange(
  header: string,
  size: number,
): { start: number; end: number } | 'unsatisfiable' | null {
  const match = /^bytes\s*=\s*(\d*)-(\d*)$/i.exec(header.trim());
  if (!match) return null;
  const [, first, last] = match;
  if (first === '' && last === '') return null;
  let start: number;
  let end: number;
  if (first === '') {
    const suffix = Number(last);
    if (suffix === 0) return 'unsatisfiable';
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(first);
    // A last-pos before first-pos makes the range invalid, so it's ignored
    // rather than unsatisfiable (RFC 9110 section 14.1.1).
    if (last !== '' && Number(last) < start) return null;
    end = last === '' ? size - 1 : Math.min(Number(last), size - 1);
  }
  if (start >= size) return 'unsatisfiable';
  return { start, end };
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const range = request.headers.get('Range');
  if (
    (request.method !== 'GET' && request.method !== 'HEAD') ||
    !/\.mp4$/i.test(new URL(request.url).pathname)
  ) {
    return context.next();
  }

  // Slices are cut from the decoded bytes, so ask for an unencoded asset.
  const assetHeaders = new Headers(request.headers);
  assetHeaders.delete('Range');
  assetHeaders.delete('Accept-Encoding');
  const asset = await context.env.ASSETS.fetch(
    new Request(request.url, { method: request.method, headers: assetHeaders }),
  );
  if (asset.status !== 200) return asset;
  const headers = new Headers(asset.headers);
  headers.set('Accept-Ranges', 'bytes');

  // Range only applies to GET (RFC 9110 section 14.2). A stale If-Range
  // means the client's partial copy is out of date, so it gets the whole new
  // file instead of a slice of it. If-Range holds either an entity tag
  // (strong comparison, so a weak one never matches) or a date.
  const ifRange = request.headers.get('If-Range')?.trim();
  const validator = ifRange?.startsWith('"')
    ? asset.headers.get('ETag')
    : asset.headers.get('Last-Modified');
  const useRange =
    request.method === 'GET' &&
    range !== null &&
    (!ifRange || ifRange === validator);

  if (!useRange) {
    return new Response(request.method === 'HEAD' ? null : asset.body, {
      status: asset.status,
      headers,
    });
  }

  const body = await asset.arrayBuffer();
  const parsed = parseRange(range, body.byteLength);
  if (parsed === null) return new Response(body, { status: 200, headers });
  if (parsed === 'unsatisfiable') {
    headers.set('Content-Range', `bytes */${body.byteLength}`);
    headers.delete('Content-Length');
    return new Response(null, { status: 416, headers });
  }

  const { start, end } = parsed;
  headers.set('Content-Range', `bytes ${start}-${end}/${body.byteLength}`);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(body.slice(start, end + 1), { status: 206, headers });
};
