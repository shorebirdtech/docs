#!/usr/bin/env node
// Checks component props/slots that Vale can't see, since Vale only parses
// markdown prose and has no visibility into MDX/JSX attributes or children:
// - <TabItem label="..."> should use sentence case, like other headings.
// - <LinkButton>...</LinkButton> text should be upper case, like other
//   button labels.
import { globSync, readFileSync } from 'node:fs';
import { load } from 'js-yaml';

const docsGlob = 'src/content/docs/**/*.mdx';
const headingsRulePath = '.vale/styles/Shorebird/Headings.yml';

const exceptions = new Set(
  load(readFileSync(headingsRulePath, 'utf8')).exceptions,
);

function lineNumberAt(text, index) {
  return text.slice(0, index).split('\n').length;
}

function sentenceCaseViolations(text) {
  return text
    .split(/\s+/)
    .map((rawWord, i) => ({ rawWord, i }))
    .filter(({ rawWord, i }) => {
      const word = rawWord.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9']+$/g, '');
      if (!word || i === 0) return false;
      if (!/^[A-Z]/.test(word)) return false;
      if (/^[A-Z0-9]+$/.test(word)) return false; // acronym, e.g. "DSL"
      return !exceptions.has(word);
    })
    .map(({ rawWord }) => rawWord);
}

const findings = [];

for (const file of globSync(docsGlob)) {
  const content = readFileSync(file, 'utf8');

  for (const match of content.matchAll(
    /<TabItem\b[^>]*\blabel="([^"]+)"[^>]*>/g,
  )) {
    const label = match[1];
    const violations = sentenceCaseViolations(label);
    if (violations.length > 0) {
      findings.push({
        file,
        line: lineNumberAt(content, match.index),
        message: `TabItem label '${label}' should use sentence case (${violations.join(', ')})`,
      });
    }
  }

  for (const match of content.matchAll(
    /<LinkButton\b[^>]*>([\s\S]*?)<\/LinkButton>/g,
  )) {
    const text = match[1].trim();
    if (text && text !== text.toUpperCase()) {
      findings.push({
        file,
        line: lineNumberAt(content, match.index),
        message: `LinkButton label '${text}' should be upper case`,
      });
    }
  }
}

if (findings.length === 0) {
  console.log('✔ No component label issues found.');
  process.exit(0);
}

for (const { file, line, message } of findings) {
  console.log(`${file}:${line}  ${message}`);
}
console.log(`\n✖ ${findings.length} component label issue(s) found.`);
process.exit(1);
