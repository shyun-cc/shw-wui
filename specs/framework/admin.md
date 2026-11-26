# 自有后台框架首版

支持垂直菜单、固定 48px 顶栏、可配置页签、面包屑、暗色/亮色/系统主题及可收起侧栏。

createAdmin(options) 返回 Vue Plugin，提供 router、pinia、state（profile/ready/busy/error）、menus、tabs、can、login、logout、restore、closeTab、closeOtherTabs。宿主只 app.use(admin) 并渲染 ShwAdminLayout。页面手动注册，菜单只映射已注册的准确 path。cache 页面通过独立页签wrapper被 KeepAlive 缓存；缓存以完整页签路径分别命名，关闭 tab 后移出该实例缓存。默认首页 /welcome、登录 /login、异常 /403 与 /404 由模板提供；非法/外部 redirect 被拒绝，不能绕过路由 permission。

SessionAdapter.restore/login 按 AbortSignal 实现；login 返回最新 profile/permissions，loadMenus 可选。同一上下文的旧恢复/登录/菜单响应不覆盖新登录态，退出先完成离开确认；取消导航则保留会话。确认离开后清除本地权限与页签，在远端退出结束前禁用新登录，避免旧退出撤销新会话。任意叶子 permission 缺失默认拒绝，不隐含管理员或通配授权；前端控制不能替代服务端授权。restore/profile/menu 异常通过 state.error 展示，不静默失败。

ShwAdminLayout 使用菜单、面包屑、路由内容、页签和主题；具名操作为文字按钮，无独立图标源。ShwPermission permission 属性以当前已加载 profile 权限判断，未登录默认拒绝，fallback插槽可用。

首版示例使用隔离内存/本地存储 adapter，登录页明确说明模拟身份与演示账号，无真实后端授权。新项目替换 SessionAdapter 与API适配，不修改库内部源码。

createAdminApi({baseURL,headers,onUnauthorized,onForbidden}) 提供同域 fetch 的四字段接口适配。返回 request<T>(path,{method,body,signal,headers})；code=0才返回data，业务错误保留message/traceId/httpStatus，401统一回调且并发去重，403通知，网络/取消异常向调用方传播。大整数ID必须按string传输，不安全整数响应拒绝处理。不会自动刷新token，也不假定业务token存储位置；onUnauthorized由接入方清理失效会话并跳登录，必须覆盖未保存表单强制过期场景。模拟模板不调用真实API。
