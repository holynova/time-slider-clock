import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
for (const file of ['dist/index.html', 'dist/whole-digit/index.html']) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) new Script(match[1], { filename: file });
}
for (const file of ['tests/clock.cjs', 'tests/whole-digit.cjs', 'tests/startup.cjs']) {
  execFileSync(process.execPath, [file], { stdio: 'inherit' });
}
