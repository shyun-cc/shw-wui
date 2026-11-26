# 自有工具函数

公开普通入口为 `@shwkj/shw-wui/utils`，源码入口为 `packages/components/src/owned-utils/index.ts`。`echarts.ts` 是独立可选图表入口，不能从普通工具入口转出。`alias.ts` 保留上游 `alias` 子入口的空对象默认导出。

## 来源和接管范围

接管对象是官方 npm `@pureadmin/utils@2.6.4` 发布的完整 ESM 运行实现，不在运行时引用旧包。已下载官方 npm tarball 并逐字节校验 SHA-512 integrity：`sha512-X3IIolddqLsBAiFHz3uTybMt31eJF7cT9MIo8lbxXoaK08XpC0Ubt+uJMgsKttlLAucYpEXUGfbp23qkcD+04Q==`。npm 元数据 `gitHead` 为 `56e7946b96f955ece198c1ee78da8547d8f0ee06`。

2026-10-28 访问官方 GitHub 仓库、该提交 API、raw 源码与 codeload 归档均返回 HTTP 404，因此不能声称取得或独立校验该提交的原始 TypeScript 源码。npm 包不含 source map。当前可验证来源是官方 npm 发布的 JavaScript 运行源码及类型声明；版本和 gitHead 的关联依据 npm 元数据。

原始 npm 所有发布文件完整保存于 `vendor/pureadmin-utils/npm-2.6.4/`，包括原始 ESM、CJS、IIFE、类型、README、package.json 和 LICENSE。`vendor/pureadmin-utils/source-manifest.json` 记录 tarball SHA-256、已验证 integrity 和每个原始文件的 SHA-256。下载/转换所需临时材料只位于本工作区 `.cache/pureadmin-utils`，不发布。MIT 许可保存于 `LICENSES/pureadmin-utils.MIT.txt`。

## 实现和兼容边界

- `runtime.js` 是本仓库持有的运行实现，使用语义绑定分析将上游构建短名恢复为公开函数名，并格式化为可维护源码；不会重命名局部同名变量或引入旧包依赖。原始产物保留在 vendor，后续维护修改 owned-utils。
- 普通入口包含全部 167 个非图表运行导出；图表入口提供 `useECharts`。完整机器可读运行/类型符号清单在 `exports.json`，函数用途索引在 `functions.md`，完整签名位于配套 `.d.ts`。
- 原始类型声明中的 `getPackageSize` 在官方 ESM/CJS 中没有运行导出，不能作为可用函数转出；本仓库删除这一虚假声明。相关 `packageOpt` 类型仍可用。此限制记录于 `exports.json`。
- 其余函数参数、返回值、默认值、同步/异步、原位修改和异常语义保留上游 2.6.4 行为。包含原 API 拼写 `formDataHander`、`out_of_china`、`isNullAndUnDef`，未擅自修正名称或逻辑。
- 不借本次接管承诺金融精度、密码学安全或任意不可信 HTML/SVG 清洗。随机数、金额运算、URL 处理等仍按原实现约束使用。
- 安全修正：图表 `addTooltip` 将轴标签作为 `textContent` 渲染，替换原始 `innerHTML`，避免标签值触发 HTML 注入；因此标签中的 HTML 将显示为文字。

## 依赖和按需入口

普通运行模块仅依赖 Vue（本包已有 peer），未引入额外第三方基础库。运行实现为 JavaScript，官方 `.d.ts` 提供原有完整类型契约；不使用 `@ts-nocheck`，不放宽全仓 TypeScript 检查。声明构建须复制两份配套 `.d.ts` 到发布目录（`runtime.d.ts`、`echarts-runtime.d.ts`），保持普通/图表入口相对路径有效。

图表运行实现也只导入 Vue 和自有工具。调用 `useECharts` 前须在 Vue 组件 setup 上下文中通过 `app.config.globalProperties.$echarts` 注入宿主 ECharts 模块（兼容上游对其他全局属性的检测）。图表声明引用 `echarts`，因此使用者需安装 ECharts；当前 optional peer 为 `echarts: ^5.4.3 || ^6.0.0`，本次使用6.0.0完成类型构建，不代表图表浏览器验收；普通工具入口不引用 ECharts 运行模块或类型。`EchartGlobalProperties.value` 等保持官方类型契约，不应当作本次已校准的 ECharts 新版类型适配。

## SSR 和浏览器能力

普通模块加载阶段只通过 `typeof window/document` 判断环境，可用于 SSR 模块导入；这不代表每个工具可在服务端调用。

- 纯计算、字符串、集合、树、日期、金额、坐标转换等工具可以在无 DOM 的环境使用；仍保留原数据范围和变更行为。
- DOM class 操作、下载、剪贴板、图像/Canvas、SVG 解析、浏览器/性能信息、Storage 和鼠标事件等需要其实际平台 API。不得在 SSR 渲染期间调用依赖 DOM 的函数。部分函数在无浏览器环境直接返回 `undefined`，不能将这种降级视为操作成功。
- `copyTextToClipboard` 使用同步 `document.execCommand('copy')`，需要浏览器、可挂载的 DOM 和相应浏览器权限；返回 boolean，也可能抛 DOM 异常。`useCopyToClipboard` 返回 `clipboardValue`、`copied` 和同步 `update`，调用方必须读取 `copied` 并处理异常，不能把调用完成当作复制成功。
- `useAttrs`、`useGlobal` 等需要 Vue 实例上下文；`useDark`、`useDraggable`、`useResizeObserver`、`useLoader`、`useScrollTo`、`useWatermark` 使用浏览器生命周期/元素/观察器等能力，按 Vue setup 与客户端生命周期使用。
- `useECharts` 为 Vue 客户端图表 hook。虽然保留上游 `ssr` 初始化参数，也不能据此宣称该 hook 支持完整服务端渲染流程；图表实例、DOM 和窗口监听仍由调用环境负责。

## 验证证据

本次子任务仅下载并校验来源、转换源码、核对导出/类型与静态依赖。未安装依赖、未执行构建、类型检查或测试，主交付负责工程检查。浏览器剪贴板、下载、观察器和图表真实体验未验收。

## 接管时修正的上游缺陷

以下问题由固定 npm ESM 静态源码确认；只修改 owned 运行代码，vendor 原样快照和原始哈希不变。函数名和签名不变，正常调用目标行为保留。

| API | 原始根因 | 自有修正 |
| --- | --- | --- |
| withNoopInstall | 引用未定义的 NOOP，调用即 ReferenceError | 使用本地空 install 函数，仍返回输入对象 |
| banMouseEvent / allowMouseEvent | visibilitychange 使用匿名回调却错误移除 oe；allow 仅移除当前事件，页面恢复可见后又被旧回调禁用 | 单一具名可见性监听和当前禁用事件集合；allow 同时撤销集合中的事件，集合清空时移除可见性监听 |
| copyTextToClipboard | execCommand 抛异常会跳过 textarea、选区和焦点清理 | try/finally 始终移除临时节点、恢复原全部选区及焦点；保留浏览器原始异常供调用方处理 |
| useDraggable | 活跃 mousemove/up 闭包只在 mouseup 清理，close/reset/卸载无法触达 | 保存活跃拖动清理函数及实际绑定元素，在关闭、重置、重新初始化、卸载时移除 document 监听/动画帧；阻止关闭或卸载后的排队初始化/resize 回调重新挂载 |
| useWatermark | setWatermark 在 Vue 实例上下文末尾立即 clear；forever observer 不保存引用、不能断开；所有实例 Symbol.toString 的节点 ID 相同 | set 不再立即清空；每实例唯一 ID；保存 observer，在 clear/卸载/重新配置前断开；clear 同时移除 resize；外部删节点时 forever 重新创建，但主动 clear 不复活 |

这些修正已做源码静态交叉审查；未执行自动化测试或浏览器验证。异常复制、页面隐藏再恢复、拖动中关闭/卸载、水印清理与防删除需后续浏览器体验取证。

补充生命周期修正：`useECharts` 保存容器 `useResizeObserver` 的 stop，在图表卸载时断开观察器与 watch；disposed 守卫阻止卸载后的 nextTick/延迟渲染重新创建图表或监听。`useResizeObserver.stop()` 同时使排队的初始 nextTick 和防抖回调失效，显式 restart 才恢复，避免 stop 后观察器被异步重建。

图表轴标签 tooltip 的鼠标跟随改为本实例 `addEventListener`，不再覆盖宿主 `html.onmousemove`；mouseout、主题重建和卸载均移除本实例监听，避免悬停状态直接卸载后保留 DOM 闭包。

声明修正：`debounce<T>` 和 `throttle<T>` 的返回函数现在声明为 `(...args: Parameters<T>) => void`。上游声明遗漏了真实运行实现的参数转发能力；此次仅修正类型描述，不改变参数转发、节流、防抖或返回值的运行行为。
