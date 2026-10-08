import { execFileSync } from 'node:child_process';
for (const file of ['tests/clock.cjs', 'tests/whole-digit.cjs']) {
  execFileSync(process.execPath, [file], { stdio: 'inherit' });
}
