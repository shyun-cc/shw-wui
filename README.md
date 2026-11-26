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

## License

[MIT](LICENSE). See [third-party notices](THIRD_PARTY_NOTICES.md).
