# ShwStatusTag

状态/枚举的集中映射色标，不内置业务状态、权限码或请求。

| prop | 类型 / 默认 | 规则 |
| --- | --- | --- |
| value | string / number / boolean / null | 与 options.value 严格相等，保留 0、false、空字符串；不转换字符串数字 |
| options | readonly ShwStatusOption[]，必填 | `{value,label,type?}`；重复值取第一项；type 使用 Element Plus Tag 语义色 |
| fallbackLabel / fallbackType | 未知状态 / info | 未命中（含 null/undefined）时使用；不显示原始未知值 |
| size / effect | Element Plus Tag 类型 / light | 视觉配置，其余 attrs 透传 ElTag |

默认插槽接收 `{option,value,label}`。映射项未设 type 时使用 fallbackType。组件只显示标签，不请求字典或推断状态。导出 ShwStatusOption、ShwStatusValue。

```vue
<ShwStatusTag :value="row.status" :options="[{value:0,label:'待处理',type:'warning'},{value:1,label:'已完成',type:'success'}]" />
```
