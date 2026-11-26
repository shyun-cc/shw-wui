# PageContainer

导出 ShwPageContainer。通用页面容器，不发请求、不操作路由或权限。

| 参数 | 类型 | 默认值 |
| --- | --- | --- |
| title | string | 空字符串 |
| description | string | 空字符串 |

默认插槽为内容；actions 插槽为右侧操作区。无标题/说明/操作时不渲染头部。窄容器自然换行。默认 padding 16px，可通过 --shw-page-padding 覆盖；颜色使用 Element Plus 变量。标题 16px/600，正文及说明 14px。

人工对照：无头部、标题+说明、操作插槽、窄容器换行与 padding 覆盖。当前仅静态检查/构建，不宣称人工验收。
