# ShwDescriptions

接管 `@pureadmin/descriptions@1.2.1`，固定 commit `be4215bba8bcba193ea590b18e16681e1e948eba`。来源及逐文件 SHA-256 见 `vendor/pureadmin-descriptions/manifest.json`；原始 packages、src、MIT 和包元数据保留在 vendor，运行源码独立维护于 owned-descriptions。

## API

`ShwDescriptions` 同时具名和默认导出，支持 app.use；类型包括 `ShwDescriptionColumn`、`ShwDescriptionsProps`、`ShwDescriptionsLoading`、`ShwDescriptionRenderContext`。

- `data: Record<string, unknown>[]`：数据行，默认空数组。按 column.prop 读取各行；renderer/插槽 value 是第一行值，values 是全部行值。
- `columns: ShwDescriptionColumn[]`：有序 schema；prop、label、value、hide(attrs)、slot、copy、labelRenderer、cellRenderer；同时支持 Element Plus item 的 span、width、minWidth、align、labelAlign、className、labelClassName。
- `align/labelAlign`：所有 item 默认对齐，可逐项覆盖。
- `loading`：load/text/svg/spinner/svgViewBox/background，使用 Element Plus loading 指令。
- Element Plus Descriptions 的 column/border/direction/size/title/extra 等属性保持透传，column/span 控制网格。
- 插槽 title/extra 参数为 `{ props, attrs }`；列 slot 为具名插槽名称，参数与 renderer 相同：`{ props, attrs, index, value, values }`。
- 事件 copy(value,index) 在复制成功后触发；copy-error(error,index) 在失败后触发。

```ts
import { ShwDescriptions, type ShwDescriptionColumn } from '@shwkj/shw-wui';
const data = [{ name: '示例', count: 0, enabled: false }];
const columns: ShwDescriptionColumn[] = [
  { prop: 'name', label: '名称', copy: true },
  { prop: 'count', label: '数量', span: 2 },
  { prop: 'enabled', label: '状态', slot: 'status' }
];
```

`<ShwDescriptions :data="data" :columns="columns" border :column="2"><template #status="{ value }">{{ value ? '启用' : '停用' }}</template></ShwDescriptions>`。

Tooltip 使用 cellRenderer/labelRenderer 或列插槽组合 ElTooltip；固定版本上游没有专门 tooltip 属性。数据由宿主获取，正式详情/编辑必须由宿主按 ID 调详情接口。

## 迁移差异

- PureDescriptions 改为 ShwDescriptions；旧类型兼容别名在 owned 入口保留，不注册旧组件名。
- 修正上游 slot 声明为对象而运行时当名称的类型；renderer 参数及返回 VNodeChild 显式定义，不依赖 Element Plus 私有路径。
- value 显式存在时优先，保留 0、false、空字符串，支持 Ref 值；hide 只调用一次。
- 原 SVG 图标复制入口改为有名称的 Element Plus 文字按钮，成功显示“已复制”，失败可见提示并允许重试。复制首个数据值，保持上游约定；卸载清理成功提示计时器。
- 使用本库 owned-utils，无 @pureadmin/* 和图标包运行依赖，无业务接口或权限。
- 运行版改为 Vue h 渲染，保留 schema/renderer/slots/loading 和网格能力；不需要 JSX 插件。
