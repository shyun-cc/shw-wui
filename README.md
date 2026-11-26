# shw-wui

Desktop admin components and a starter application for Vue 3 and Element Plus. The library includes a navigation shell, tables, query panels, forms, detail views and upload components.

## Develop

Use Node.js 24 and pnpm 11.0.9. Dependencies install anonymously from the public npm registry.

The lockfile pins the shared design tokens to a [public GitHub release](https://github.com/shyun-cc/shw-ui-tokens/releases/tag/v0.33.1).

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm typecheck
pnpm version:check
pnpm dev
```

The playground uses local mock data. Choose a demo account from its sign-in page. See [the starter documentation](templates/admin/README.md) for the application structure and integration instructions.

## Generate a standalone starter

After building the workspace, run:

```sh
node packages/components/bin/create.mjs ../my-admin
cd ../my-admin
pnpm install
pnpm dev
```

The starter includes the built component library so it can be installed without a separately published npm package.

## 鸣谢与第三方版权（Acknowledgments & Licenses）

- [Vue 3](https://github.com/vuejs/core) and [Element Plus](https://github.com/element-plus/element-plus) provide the UI runtime and base components. Both are MIT-licensed. [Vue Router](https://github.com/vuejs/router) and [Pinia](https://github.com/vuejs/pinia) are MIT-licensed peers for routing and state. [Apache ECharts](https://github.com/apache/echarts) is an optional charting peer under Apache-2.0 with its own third-party notices.
- Thanks to [Pure Admin](https://github.com/pure-admin) for [pure-admin-thin](https://github.com/pure-admin/pure-admin-thin), [pure-admin-table](https://github.com/pure-admin/pure-admin-table), [pure-admin-descriptions](https://github.com/pure-admin/pure-admin-descriptions) and [@pureadmin/utils](https://www.npmjs.com/package/@pureadmin/utils). The library incorporates and adapts portions of these MIT-licensed projects. [Third-party notices](THIRD_PARTY_NOTICES.md) identify the affected files and preserve the original copyright and license terms.
- [Vite](https://github.com/vitejs/vite) (MIT) and [TypeScript](https://github.com/microsoft/TypeScript) (Apache-2.0) power the build.

## License

[MIT](LICENSE).
