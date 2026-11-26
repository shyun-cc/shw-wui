#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';

const input = process.argv[2];
if (!input || ['--help', '-h'].includes(input)) {
  console.log('Usage: shw-wui-create <new-project-directory>');
  process.exit(input ? 0 : 1);
}

const target = resolve(input);
if (existsSync(target)) throw new Error('目标目录已存在，拒绝覆盖：' + target);
const name = basename(target).toLowerCase().replace(/[^a-z0-9-]/g, '-');
if (!/^[a-z0-9]/.test(name)) throw new Error('项目目录名需以字母或数字开头');

const library = resolve(import.meta.dirname, '..');
const source = resolve(library, 'starter');
if (!existsSync(source)) throw new Error('请先构建组件包');

const dependency = 'vendor/shw-wui';
const bundled = resolve(target, dependency);
cpSync(source, target, { recursive: true, errorOnExist: true, force: false });
mkdirSync(bundled, { recursive: true });
for (const entry of ['dist', 'README.md', 'LICENSE']) {
  cpSync(resolve(library, entry), resolve(bundled, entry), { recursive: true });
}

const componentManifest = JSON.parse(readFileSync(resolve(library, 'package.json'), 'utf8'));
delete componentManifest.bin;
writeFileSync(resolve(bundled, 'package.json'), JSON.stringify(componentManifest, null, 2) + '\n');

const manifestPath = resolve(target, 'package.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
manifest.name = name;
manifest.dependencies['@shwkj/shw-wui'] = 'file:./' + dependency;
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
writeFileSync(resolve(target, '.gitignore'), 'node_modules/\ndist/\n.cache/\n.env.local\n.env.*.local\n*.tsbuildinfo\n');
console.log('已创建 ' + target + '\n进入目录后运行 pnpm install && pnpm dev。');
