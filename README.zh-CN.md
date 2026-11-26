# shw-wui

[English](./README.md) | 简体中文 | [繁體中文](./README.zh-TW.md)

基于 Vue 3 和 Element Plus 的桌面管理界面组件及应用脚手架。组件库包含导航框架、表格、查询面板、表单、详情视图和上传组件。

## 开发

使用 Node.js 24 和 pnpm 11.0.9。依赖可从公开的 npm registry 匿名安装。

锁文件将共享设计令牌固定到[公开的 GitHub Release](https://github.com/shyun-cc/shw-ui-tokens/releases/tag/v0.33.1)。

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm typecheck
pnpm version:check
pnpm dev
```

演示环境使用本地模拟数据。在登录页选择一个演示账号。应用结构与集成说明见[脚手架文档](templates/admin/README.md)。

## 生成独立的应用脚手架

构建工作区后，运行：

```sh
node packages/components/bin/create.mjs ../my-admin
cd ../my-admin
pnpm install
pnpm dev
```

脚手架包含已构建的组件库，无需另行发布 npm 包即可安装。

## 鸣谢与第三方版权

- [Vue 3](https://github.com/vuejs/core) 和 [Element Plus](https://github.com/element-plus/element-plus) 提供 UI 运行时及基础组件，均采用 MIT 许可证。[Vue Router](https://github.com/vuejs/router) 和 [Pinia](https://github.com/vuejs/pinia) 是用于路由和状态管理的 MIT 同级依赖。[Apache ECharts](https://github.com/apache/echarts) 是可选的图表同级依赖，采用 Apache-2.0，并附有自己的第三方声明。
- 感谢 [Pure Admin](https://github.com/pure-admin) 提供 [pure-admin-thin](https://github.com/pure-admin/pure-admin-thin)、[pure-admin-table](https://github.com/pure-admin/pure-admin-table)、[pure-admin-descriptions](https://github.com/pure-admin/pure-admin-descriptions) 和 [@pureadmin/utils](https://www.npmjs.com/package/@pureadmin/utils)。本库引入并改编了这些 MIT 项目的部分内容。[第三方声明](THIRD_PARTY_NOTICES.md)列出涉及的文件，并保留原始版权和许可条款。
- [Vite](https://github.com/vitejs/vite)（MIT）和 [TypeScript](https://github.com/microsoft/TypeScript)（Apache-2.0）用于构建。

## 许可证

[MIT](LICENSE)。
