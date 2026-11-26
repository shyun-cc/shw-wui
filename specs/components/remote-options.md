# 远程选项组件

ShwRemoteSelect（别名ShwRefreshableSelect）、ShwRemoteTreeSelect、ShwRemoteCascader 共用独立的默认项、搜索结果和已选回显状态。均支持字符串ID、单/多选、disabled、ready、contextKey、placeholder、refresh()及显式刷新按钮；Select支持option slot。

loadOptions({keyword,selectedValues,signal}): Promise<ShwRemoteOption[]>；Option为{value:string,label:string,disabled?:boolean,children?:Option[]}，每次结果中value全局唯一。接口负责授权和结果限制，并额外补齐selectedValues对应选项（树需补齐祖先路径）；组件不写业务API，不根据截断列表自动清空当前值。搜索是关键词片段查询，实际匹配由loader/backend完成。

ready=true时挂载/依赖就绪即取默认项，展开不重复请求。Select/Tree搜索默认200ms防抖；发起新搜索时立即取消旧请求，成功/错误/finally均受序号保护。清空关键词恢复默认项；刷新使用当前关键词并保留已选标签。contextKey或ready变化清空旧上下文缓存并中止请求，父层负责同步重置真正失效的表单值，组件不越权删除。失败提示保留当前选择/可用数据，按钮可重试；卸载中止在途和计时器。

Cascader使用ElementPlus before-filter等待远程结果，不叠加本地关键字过滤；emitPath默认false返回叶子ID，可设true返回路径，多选为数组。Tree保留原生checkStrictly（默认false）；普通Select多选返回字符串数组。库不承诺默认展示上游100项以外未请求数据。

原生属性/事件通过attrs透传；受控的model/data/loading/远程方法由封装管理。所有回显、空值、失败/重试、清空和父依赖切换应按上述边界人工体验；不以构建替代接口/人工验收。

Cascader适配ElementPlus的Promise过滤语义：取消/失败以拒绝Promise阻止建议计算，原生input捕获在防抖前取消旧请求，并在Backspace清空时恢复默认。emitPath回显只保留路径终点及必要祖先，不复制整棵祖先子树。

级联组件额外记录面板可见性、最近原生输入和输入代次，在before-filter调用loader之前拒绝ElementPlus内部已排队的旧任务；关闭、clear、ready/contextKey变化均失效该代次。

父依赖contextKey/ready变化还会重建原生控件实例，清除ElementPlus内部建议列表/标签缓存，避免旧上下文的弹出节点继续可选；独立helper状态与请求同时失效。
