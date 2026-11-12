import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

// Interface coverage (ADR-0015 §1.2, free tool) and the ADR-0007 design floor.

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? tsxFiles(path) : path.endsWith('.tsx') ? [path] : [];
  });
}

test('the home footer links privacy, status and contact', () => {
  const page = readFileSync('app/page.tsx', 'utf8');
  assert.ok(page.includes('href="https://bookchaowalit.com/privacy"'));
  assert.ok(page.includes('href="https://monitor.bookchaowalit.com/"'));
  assert.ok(page.includes('href="mailto:bookchaowalit.work@gmail.com"'));
});

test('no text below the 12px floor', () => {
  const offenders = tsxFiles('app').filter((f) => /text-\[([0-9]|1[01])px\]/.test(readFileSync(f, 'utf8')));
  assert.deepEqual(offenders, []);
});
