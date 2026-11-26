# ShwUploadField

受控文件/图片上传字段；无固定后端 API、认证、附件业务结构、服务端删除或自动提交表单。

| prop | 类型 / 默认 | 规则 |
| --- | --- | --- |
| modelValue | readonly ShwUploadFile[]，必填 | 仅包含成功文件；v-model 接收新数组 |
| upload | ShwUpload，必填 | `(file:File,{signal,onProgress}) => Promise<ShwUploadFile>` |
| accept | string / 空 | MIME、image/* 或 .pdf 等后缀，以逗号分隔；浏览器选择提示和本地检查 |
| multiple | boolean / false | 是否多选；替换单个文件先移除旧文件，limit 独立控制总数 |
| limit / maxSize | 可选 number | 总数（成功+在途+失败）/单文件字节上限；未传不限制 |
| disabled / label | boolean / 选择文件 | 继承父 ElForm 禁用态；禁用选择、移除、重试及取消；仍允许预览 |

`ShwUploadFile={id:string,name:string,url:string,size?:number,type?:string}`，id 唯一且非空，name 非空。结果 url 只允许可解析的 HTTP(S)、blob 或相对路径（解析后限前述协议），拒绝 javascript/data 等可执行链接。调用方保证地址可信、具备访问权限，不将秘密置于 URL。组件不获取认证下载链接；需鉴权的下载由业务适配器返回可用地址。

选择文件后每个请求立即占一个名额；onProgress(0–100) 可选，未报告时显示“上传中”。失败保留原文件、展示错误并可重试/移除，不写入 modelValue；校验失败就地提示并 emit error。重新选择同名文件可再次触发选择，但不会自动去重。上传返回重复 id 视为失败。

取消、实例卸载、外部替换 modelValue（含重置为空）会 abort 并移除本地请求；即使适配器忽略 signal，旧成功/错误/进度也不得写回。正常 v-model 回写组件刚发出的同一数组引用保留其他并发上传。父层若克隆或替换数组，按外部重置处理并取消在途；不要原地修改数组，必须替换引用。已开始上传后切换 disabled 不会撤销请求。

- 事件：`update:modelValue(files)`；`error(error,file:File)`；`preview(file)`；`remove(file)`。移除只修改本地表单列表，持久化/清理存储由调用方负责。
- 图片按 type（优先）或 URL 后缀识别，显示缩略图，点击预览打开图片弹窗；普通文件用安全新窗口打开。预览失败有可见提示。默认列表保留文件名。
- `tip` 插槽用于格式/大小说明；attrs 透传外层容器。公开 `cancel():void`（取消全部在途/失败项目）及只读 `uploading:boolean`；提交父表单前可据此等待上传完成。
- 组件不创建/回收业务 URL。若适配器创建 object URL，由调用方在移除/卸载时 revoke，避免泄漏；生产适配器返回后端持久地址。文件类型/大小前端检查不替代服务端检查。

```vue
<ShwUploadField v-model="files" :upload="uploadAttachment" accept="image/*,.pdf" multiple :limit="5" :max-size="10485760" />
```

公开类型：ShwUploadFile、ShwUploadContext、ShwUpload。
