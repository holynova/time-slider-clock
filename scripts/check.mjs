import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
for (const file of ['dist/index.html', 'dist/whole-digit/index.html', 'dist/hardware/index.html', 'dist/matrix/index.html']) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) new Script(match[1], { filename: file });
}
for (const file of ['tests/clock.cjs', 'tests/whole-digit.cjs', 'tests/startup.cjs', 'tests/new-modes.cjs', 'tests/letter-transition.cjs']) {
  execFileSync(process.execPath, [file], { stdio: 'inherit' });
}
