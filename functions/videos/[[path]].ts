/// <reference types="@cloudflare/workers-types" />

// Byte-range support for the demo videos. Cloudflare Pages answers a Range
// request for a static asset with the whole file and a 200, and Safari (and
// anything else built on AVFoundation) won't play an MP4 from a server that
// doesn't return 206 partial content. This serves the asset and slices it.

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

// Passes through only bytes start..end (inclusive) of a stream.
function sliceStream(
  start: number,
  end: number,
): TransformStream<Uint8Array, Uint8Array> {
  let offset = 0;
  return new TransformStream({
    transform(chunk, controller) {
      const from = Math.max(start - offset, 0);
      const to = Math.min(end + 1 - offset, chunk.byteLength);
      if (from < to) controller.enqueue(chunk.subarray(from, to));
      offset += chunk.byteLength;
      if (offset > end) controller.terminate();
    },
  });
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;
  if (
    (request.method !== 'GET' && request.method !== 'HEAD') ||
    !/\.mp4$/i.test(new URL(request.url).pathname)
  ) {
    return context.next();
  }

  // Slices are cut from the raw bytes, so ask for an unencoded asset.
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
  // file. Pages assets have a strong ETag and no Last-Modified, so only an
  // exact match on a strong entity tag counts (RFC 9110 section 13.1.5).
  const range = request.headers.get('Range');
  const ifRange = request.headers.get('If-Range')?.trim();
  const ifRangeMatches =
    ifRange === undefined ||
    (!ifRange.startsWith('W/') && ifRange === asset.headers.get('ETag'));
  if (
    request.method !== 'GET' ||
    range === null ||
    !ifRangeMatches ||
    !asset.body
  ) {
    return new Response(asset.body, { status: 200, headers });
  }

  // Stream the slice when the asset's size is known up front; otherwise read
  // it once to learn the size. Pages caps a file at 25 MiB, which bounds the
  // buffer.
  const declaredSize = Number(asset.headers.get('Content-Length'));
  const buffered = declaredSize > 0 ? null : await asset.arrayBuffer();
  const size = buffered ? buffered.byteLength : declaredSize;
  const whole = buffered ?? asset.body;

  const parsed = parseRange(range, size);
  if (parsed === null) return new Response(whole, { status: 200, headers });
  if (parsed === 'unsatisfiable') {
    if (!buffered) await asset.body.cancel();
    return new Response(null, {
      status: 416,
      headers: {
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes */${size}`,
        'Cache-Control': 'no-store',
      },
    });
  }

  const { start, end } = parsed;
  const length = end - start + 1;
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(length));
  const body = buffered
    ? new Uint8Array(buffered, start, length)
    : asset.body
        .pipeThrough(sliceStream(start, end))
        .pipeThrough(new FixedLengthStream(length));
  return new Response(body, { status: 206, headers });
};
