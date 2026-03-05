import { versions } from '../consts';
import type { Root, RootContent } from 'mdast';

const replacements: Record<string, string> = {
  '%flutter_version%': versions.flutter,
  '%dart_version%': versions.dart,
  '%flutter_release_date%': versions.flutter_release_date,
};

const pattern = /%(?:flutter_version|dart_version|flutter_release_date)%/g;

function replaceInString(value: string): string {
  return value.replace(pattern, (match) => replacements[match] ?? match);
}

function walk(node: Root | RootContent) {
  if ('value' in node && typeof node.value === 'string') {
    node.value = replaceInString(node.value);
  }
  if ('url' in node && typeof node.url === 'string') {
    node.url = replaceInString(node.url);
  }
  if ('children' in node && Array.isArray(node.children)) {
    for (const child of node.children) {
      walk(child as RootContent);
    }
  }
}

export function remarkReplaceVersions() {
  return (tree: Root) => {
    walk(tree);
  };
}
