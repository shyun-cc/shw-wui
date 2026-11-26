# shw-wui

[English](./README.md) | [简体中文](./README.zh-CN.md) | 繁體中文

基於 Vue 3 和 Element Plus 的桌面管理介面元件及應用腳手架。元件庫包含導航框架、表格、查詢面板、表單、詳情檢視和上傳元件。

## 開發

使用 Node.js 24 和 pnpm 11.0.9。相依套件可從公開的 npm registry 匿名安裝。

鎖定檔將共享設計權杖固定到[公開的 GitHub Release](https://github.com/shyun-cc/shw-ui-tokens/releases/tag/v0.33.1)。

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm typecheck
pnpm version:check
pnpm dev
```

演示環境使用本地模擬資料。在登入頁選擇一個演示賬號。應用結構與整合說明見[腳手架文件](templates/admin/README.md)。

## 產生獨立的應用腳手架

建置工作區後，執行：

```sh
node packages/components/bin/create.mjs ../my-admin
cd ../my-admin
pnpm install
pnpm dev
```

腳手架包含已建置的元件庫，無需另行釋出 npm 包即可安裝。

## 鳴謝與第三方版權

- [Vue 3](https://github.com/vuejs/core) 和 [Element Plus](https://github.com/element-plus/element-plus) 提供 UI 執行階段及基礎元件，均採用 MIT 許可證。[Vue Router](https://github.com/vuejs/router) 和 [Pinia](https://github.com/vuejs/pinia) 是用於路由和狀態管理的 MIT 對等相依套件。[Apache ECharts](https://github.com/apache/echarts) 是可選的圖表對等相依套件，採用 Apache-2.0，並附有自己的第三方宣告。
- 感謝 [Pure Admin](https://github.com/pure-admin) 提供 [pure-admin-thin](https://github.com/pure-admin/pure-admin-thin)、[pure-admin-table](https://github.com/pure-admin/pure-admin-table)、[pure-admin-descriptions](https://github.com/pure-admin/pure-admin-descriptions) 和 [@pureadmin/utils](https://www.npmjs.com/package/@pureadmin/utils)。本庫引入並改編了這些 MIT 專案的部分內容。[第三方宣告](THIRD_PARTY_NOTICES.md)列出涉及的檔案，並保留原始版權和授權條款。
- [Vite](https://github.com/vitejs/vite)（MIT）和 [TypeScript](https://github.com/microsoft/TypeScript)（Apache-2.0）用於建置。

## 許可證

[MIT](LICENSE)。
