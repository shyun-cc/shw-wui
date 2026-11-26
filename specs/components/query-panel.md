# ShwQueryPanel

以展开和收起文字切换筛选区域。

- props：`model?: Record<string, any>`，`labelWidth?: string | number = "90px"`，`activeCount?: number = 0`。
- default 插槽逐项放置查询字段；actions 插槽放查询和重置按钮。非 props attributes 透传给 ElForm。
- 超过四项折叠，隐藏项保持挂载；展开后响应容器宽度分列。activeCount 在折叠时显示。
- submit 事件携带原生 Event；输入框 Enter 与表单提交触发，输入法组合期间不触发。
- 组件不查询、不重置状态；父页面在条件提交/重置时回到第一页查询。

人工对照：四项/五项、折叠后值保留、窄容器、输入法 Enter；尚未声明人工验收。
