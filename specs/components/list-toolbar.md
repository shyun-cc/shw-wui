# ShwListToolbar

提供列表标题、操作区与筛选入口。

props `title?: string`、`listTitle?: string`；default 为主要操作，actions 为右侧操作。有 title 时标题和 actions 同行、主体独占下一行；无 title 时主体/右侧操作保持两区同行，各自内部换行。listTitle 使用 h2。组件不包含业务权限、请求或图标来源。

人工对照：有/无标题、长标题、操作换行、窄容器；尚未声明人工验收。
