# ShwFormDialog

提供局部状态管理的编辑弹窗。

- props：`modelValue: boolean`、`title: string`、`width?: string | number = 640`、`loading?: boolean = false`、`dirty?: boolean = false`。
- expose：`requestClose(): Promise<boolean>`，供页面路由离开等入口复用关闭确认；提交中、确认中、取消或关闭确认框返回 false，允许关闭并发出关闭事件后返回 true，其他异常继续抛出。
- emits：`update:modelValue(boolean)`、`submit()`、`closed()`。
- default 为表单内容；footer 可覆盖，接收 submit/close/loading。默认提供取消和保存。
- x/遮罩/ESC/取消通过统一关闭入口；dirty 时 ElMessageBox.confirm 确认未保存修改；取消与关闭确认框均保留表单，其他异常交由 Vue 错误处理链，不能静默吞掉。
- loading 禁止关闭及重复保存；同一事件循环内保存防重，异步提交必须由父层同步设置 loading，成功后父层关闭、反馈并刷新，失败保持已填内容。校验和提交由父层负责。
- destroy-on-close 销毁内容，closed 通知父层重置外部表单数据和校验；编辑场景由父层按 ID 请求详情，禁止把列表行当详情。
- 父层直接变更 modelValue 为 false 属程序关闭，应仅用于保存成功或明确舍弃，不经过用户关闭确认。

人工对照：五类关闭入口、确认取消/关闭、提交期间关闭/连点、二次打开重置；尚未声明人工验收。
