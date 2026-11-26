# ShwConfirmAction

危险操作确认与单实例异步防重。无业务接口、对象模型、权限码；调用方决定权限、成功提示、刷新/分页及业务请求。

- 必填 `message: string`、`onConfirm: () => Promise<unknown>`。message 必须由调用方包含对象名称/编号或批量数量；作为文本显示，无 HTML 注入。
- `title='操作确认'`、`label='删除'`、`confirmText='确定'`、`cancelText='取消'`、`disabled`（继承 ElForm 禁用态）。attrs 透传默认触发按钮。
- `trigger` 插槽接收 `{open,loading,disabled}`，自定义按钮应绑定这些值；实例公开 `open():void`。即使插槽遗漏 disabled，open/confirm 仍检查禁用和本地锁。
- 默认内容插槽接收 `{message,loading}`；footer 由组件管理，避免绕过防重。
- open 同步上锁，重复触发不会叠加弹窗；确认同步设置 loading，在 onConfirm 完成前禁止重复提交及取消、遮罩、ESC、右上角关闭。
- 成功关闭并 emit `success`；reject 显示文本错误、保留弹窗、解锁后可重试，并 emit `error(error)`。调用方应使用 reject 表示失败，resolve（包括 false）均视为成功。
- 取消/关闭 emit `cancel` 并清空错误；下次打开重置错误。卸载后不再发事件或更新状态，已发出的业务请求由调用方负责生命周期，不保证服务端撤销；防重仅覆盖当前实例。

```vue
<ShwConfirmAction :message="`确定删除用户「${name}」？`" :on-confirm="removeUser" @success="refresh" />
```
