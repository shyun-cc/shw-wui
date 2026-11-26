import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const pkg = resolve(root, 'packages/components');
mkdirSync(resolve(pkg, 'dist/licenses'), { recursive: true });
cpSync(resolve(root, 'LICENSES'), resolve(pkg, 'dist/licenses'), { recursive: true });
cpSync(resolve(root, 'LICENSE'), resolve(pkg, 'LICENSE'));
cpSync(resolve(root, 'THIRD_PARTY_NOTICES.md'), resolve(pkg, 'dist/THIRD_PARTY_NOTICES.md'));
rmSync(resolve(pkg, 'starter'), { recursive: true, force: true });
cpSync(resolve(root, 'templates/admin'), resolve(pkg, 'starter'), { recursive: true, filter: path => !path.split(/[\\/]/).some(part => ['node_modules', 'dist', '.cache'].includes(part)) });

for (const name of ['runtime.d.ts', 'echarts-runtime.d.ts']) {
  mkdirSync(resolve(pkg, 'dist/owned-utils'), { recursive: true });
  cpSync(resolve(pkg, 'src/owned-utils', name), resolve(pkg, 'dist/owned-utils', name));
}
