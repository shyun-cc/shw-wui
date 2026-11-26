# ShwTable 高级表格

## 来源与维护边界

Issue #12 接管 `@pureadmin/table@3.3.0`，官方仓库 `pure-admin/pure-admin-table`，固定提交 `8f93cb25a3482a2132c32631fb21fb8ad2ec7b04`。`vendor/pureadmin-table/upstream` 保存原始 packages 源码；来源、归档 SHA256 和逐文件 SHA256 见 manifest。MIT 原版权许可保留在 vendor 和 LICENSES。运行代码位于 `packages/components/src/owned-table`，由本仓库独立维护；不在运行时引用 vendor 或原包。

## 能力

- Element Plus 表格属性、事件和实例能力，选择、排序、筛选、合并、树形与展开、固定列等原生能力。
- `columns` 配置列；嵌套 `children` 多级表头；`prop(index)` 动态字段；`hide` 布尔或接收表格 attrs 的函数。
- 单元格 `cellRenderer` / `slot`，表头 `headerRenderer` / `headerSlot`，`filterIconSlot`、`expandSlot`；renderer 和 slot 参数保留 `row`、`column`、`$index`、`index`、`props`、`attrs`。
- 普通 default slot 中的 `ElTableColumn` 与配置列并存（配置列先、default slot 后）。原生 `append`、`empty` slot 保留；未提供 empty slot 时使用 Element Plus 默认空态。
- 可选分页 `pagination`，事件 `page-size-change` / `page-current-change`；只向分页器透传分页对象，不再将表格事件误传给分页器。
- 加载配置、行悬停色、自适应高度、sticky 表头及本地 locale；不引入图标库。

## 公开接口与迁移

入口 named/default 均为 `ShwTable`；类型使用 `ShwTableProps`、`ShwTableColumn<Row>`、`ShwTableColumnScope<Row>`、`ShwTableColumnRenderer<Row>`、`ShwTablePagination`、`ShwTableAdaptiveConfig`、`ShwTableLoadingConfig`、`ShwTableExpose`。

原 `PureTable` 及旧类型名不再导出。移除 install 全局 `locale` 字符串注入、vue-i18n 桥接、`useDark` 和 `ssr` 安装参数；统一由宿主 `ElConfigProvider` 管理语言/暗色/SSR，单表可用 `locale` 指定 Element Plus 语言对象或 `en` / `zhCn` / `zhTw`。组件无客户端前置门禁，SSR 可直接渲染，DOM 操作仅在 mounted 后执行。

原分页会修改调用方对象；新组件只发事件，不修改父 prop。父组件在事件中更新分页对象；`currentPage` 与 `pageSize` 都有效时展示，`pagination=false` 或未传时隐藏，运行中修改配置会立即生效。默认分页布局与 pageSizes 保持上游值。

`getTableRef()` 返回原生 Element Plus 实例（挂载前为空），原生选择/展开等方法通过该实例调用；`getTableDoms()` 返回原生 `$refs`，`setAdaptive()` 与 `setHeaderSticky(zIndex?)` 保留。每个组件独立 ref，不再靠 `tableKey` 拼接全局 ref；`tableKey` 保留为内部 ElTable key。

自适应 DOM 引用有守卫，并在卸载时取消 resize 计时器；切换 adaptive 配置或显式 height 时重新计算。列 `showOverflowTooltip=false` 可覆盖整体 true；普通列不创建空 default slot，保留 Element Plus formatter、selection、index 等原生渲染。

## 使用

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { createShwTable, type ShwTableColumn } from '@shwkj/shw-wui';
interface Row { id: number; name: string }
const RowTable = createShwTable<Row>();
const columns: ShwTableColumn<Row>[] = [
  { type: 'selection', width: 48 },
  { label: '基本信息', children: [{ prop: 'name', label: '名称' }] },
  { label: '操作', slot: 'operation', fixed: 'right', width: 120 }
];
const pagination = ref({ currentPage: 1, pageSize: 10, total: 30 });
const rows: Row[] = [{ id: 1, name: '示例' }];
</script>
<template>
  <RowTable :data="rows" :columns="columns" row-key="id" :pagination="pagination"
    @page-current-change="pagination.currentPage = $event"
    @page-size-change="pagination.pageSize = $event">
    <template #operation="{ row }"><el-button text>查看 {{ row.name }}</el-button></template>
  </RowTable>
</template>
```

该组件只管理展示与交互，不请求业务接口。详情/编辑操作由宿主按 ID 取详情；业务加载、筛选重置页码及分页后的查询由宿主负责。

## 检查边界

本切片以工程 build/typecheck 和真实 demo 交付为准，人工体验与业务验收单独记录；不得以源码复制或编译成功代替全部能力验收。

## 上游到当前实现逐项映射

| 上游入口 | 当前入口与行为 |
| --- | --- |
| `PureTable` default/named、`install(app, options)` | `ShwTable` default/named、`install(app)`；移除插件全局选项，见上述迁移 |
| Element Plus `defaultProps` 展开出的全部原生表格 props | 原生 props 通过 attrs 转交 `ElTable`；`data`、`showOverflowTooltip` 为显式 props；不再引用 Element Plus 私有 defaults 模块 |
| `tableKey` | 原生表格 vnode key；每实例独立 ref |
| `columns` | 配置列保留，可与普通 default slot 并存；默认空数组且每实例独立 |
| `loading`、`loadingConfig` | Element Plus loading 指令；text/spinner/svg/viewBox/background 保留，默认背景改为宿主主题 CSS 变量 |
| `alignWhole`、`headerAlign`、`showOverflowTooltip` | 列级配置优先，显式 false 被保留；表头为空时回退列对齐 |
| `rowHoverBgColor` | 包裹元素 CSS 变量，响应 prop 更新 |
| `pagination` | total/pageSize/currentPage/size/background/defaultPageSize/pageCount/pagerCount/defaultCurrentPage/layout/pageSizes/popperClass/prevText/nextText/disabled/hideOnSinglePage/align/style/class 均保留；响应配置变化；对象不再原地修改 |
| `adaptive`、`adaptiveConfig` | offsetBottom/fixHeader/timeout/zIndex 保留；监听 resize，卸载取消计时器；关闭 adaptive 恢复原样式 |
| `locale` | en/zhCn/zhTw 或 Element Plus locale 对象保留；也支持 zh-cn/zh-tw |
| 插件 options.locale / options.i18n / options.ssr | 删除全局字符串 inject 与 vue-i18n 桥接；用宿主 ElConfigProvider；SSR 直接渲染，DOM 逻辑只在挂载后运行 |
| `page-size-change`、`page-current-change` | 同名 number 事件保留，父组件更新分页对象 |
| Element Plus 全部表格事件 | attrs 原样传给内部 ElTable，例如 selection-change/sort-change/expand-change/current-change；不再传给分页器 |
| `getTableRef` / `getTableDoms` | 同名保留；挂载前/卸载后可为空，调用方判空 |
| `setAdaptive` / `setHeaderSticky` | 同名保留；Promise<void>，DOM 判空防护 |
| `cellRenderer` / `headerRenderer` / `slot` / `headerSlot` | 同名保留，scope 增补字段保留；不会修改 Element Plus 原 scope 对象 |
| `filterIconSlot` / `expandSlot` | 同名保留；expandSlot 额外正确转给 type=expand 的 default slot |
| `hide` / `children` / `prop(index)` | 同名保留；嵌套列的 index 按同层序号计算 |
| 原生 `append` / `empty` slots | 保留；新增普通 default slot；未传 empty 时不覆盖原生空态 |
| `pure-table` / `pure-pagination` CSS hooks | `shw-table` / `shw-table-pagination`；宿主旧选择器需同步修改 |

显式行类型使用 createShwTable<Row>()，返回相同运行组件的具体行类型接口，避免ElementPlus内部不变泛型泄漏。列类型仅保留公开配置属性，不导出内部store/renderCell/columns状态。
