# ShwDataTable

提供分页、行操作和常用渲染插槽的表格组件。

- props：`data: object[]`、`total: number`、`page: number`、`pageSize: number`；`loading?: boolean = false`、`error?: string`、`rowKey?: string = "id"`。
- default 插槽放 ElTableColumn；非 props attributes 和监听器透传 ElTable；不暴露 Element Plus 完整表格实例。
- 分页由父层受控：`update:page(number)`；每页大小变化先发 `update:page(1)` 再发 `update:pageSize(number)`。组件不查询。父层统一处理状态并查询，避免两个事件重复请求。
- 默认分页右对齐；pagination 插槽接收 page/pageSize/total 及 onPageChange/onPageSizeChange，可覆盖分页。`pagination` expose 仅提供两个回调，不暴露 Element Plus 内部实例类型。
- loading 仅遮罩表格；error 显示错误和重试按钮，按钮发 retry，不清空已有行；无错误的空表显示“暂无数据”。

人工对照：加载/空/错误/重试、列和监听器透传、分页大小变化事件顺序；尚未声明人工验收。
