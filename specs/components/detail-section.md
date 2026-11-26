# ShwDetailSection

首版自主实现的详情内容卡片；仅布局，不加载业务详情。

必填 `title: string`；default 为内容，actions 为标题右侧操作。标题使用 h2（14px/600）；卡片 padding 16px、头部/内容间距 12px，颜色使用 Element Plus 变量，窄容器操作自然换行。父页面负责按 ID 获取详情和加载/错误反馈。

人工对照：长标题、操作换行、空内容、深色主题；尚未声明人工验收。
