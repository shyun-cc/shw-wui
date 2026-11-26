import { readFileSync, writeFileSync } from 'node:fs';
const path = 'packages/components/package.json';
const [command, raw] = process.argv.slice(2);
const manifest = JSON.parse(readFileSync(path, 'utf8'));
const version = raw?.replace(/^v/, '');
if (!['check', 'set'].includes(command)) throw new Error('usage: version.mjs check [vX.Y.Z] | set X.Y.Z');
if (version && !/^\d+\.\d+\.\d+$/.test(version)) throw new Error('Invalid stable version');
if (command === 'set') {
  if (!version) throw new Error('Version required');
  manifest.version = version;
  writeFileSync(path, JSON.stringify(manifest, null, 2) + '\n');
  const starterPath = 'templates/admin/package.json';
  const starter = JSON.parse(readFileSync(starterPath, 'utf8'));
  starter.version = version;
  writeFileSync(starterPath, JSON.stringify(starter, null, 2) + '\n');
} else {
  if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) throw new Error('Invalid package version');
  if (version && manifest.version !== version) throw new Error('Tag/package version mismatch');
  const starter = JSON.parse(readFileSync('templates/admin/package.json', 'utf8'));
  if (starter.version !== manifest.version || starter.dependencies['@shwkj/shw-wui'] !== 'workspace:*') throw new Error('Starter/library version mismatch');
  const changelog = readFileSync('CHANGELOG.md', 'utf8');
  if (!changelog.includes('## ' + manifest.version + '\n')) throw new Error('Missing changelog');
}
console.log(manifest.name + '@' + manifest.version);
