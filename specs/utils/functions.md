# 工具导出清单

本表覆盖实际发布运行符号：普通入口 167 个，可选图表入口 1 个。返回值和参数以 owned-utils 配套声明为准；名称及用途源于官方 2.6.4。SSR/浏览器约束见本目录 README。

| 导出 | 用途 | 入口 |
| --- | --- | --- |
| `addClass` | 向当前元素添加指定类名 | 普通工具入口 |
| `addZero` | 在数值后加 `.00` | 普通工具入口 |
| `addition` | 两个数值的加法运算 | 普通工具入口 |
| `allowMouseEvent` | 允许指定的鼠标事件 | 普通工具入口 |
| `appendFieldByUniqueId` | 向当前唯一 `uniqueId` 节点中追加字段 | 普通工具入口 |
| `arrayAllExist` | 检测一个数组是否包含另一个数组中所有的值（内部使用`new Set`性能更好。该方法只针对基本数据类型，需要更复杂的场景可以用`arrayAllExistDeep`） | 普通工具入口 |
| `arrayAllExistDeep` | 检测一个数组是否包含另一个数组中所有的值（深度对比） | 普通工具入口 |
| `arrayAnyExist` | 检测一个数组是否包含另一个数组中任意一个值（内部使用`new Set`性能更好。该方法只针对基本数据类型，需要更复杂的场景可以用`arrayAnyExistDeep`） | 普通工具入口 |
| `arrayAnyExistDeep` | 检测一个数组是否包含另一个数组中任意一个值（深度对比） | 普通工具入口 |
| `average` | 求数字类型组成数组中的平均值 | 普通工具入口 |
| `banMouseEvent` | 禁止指定的鼠标事件 | 普通工具入口 |
| `bd09togcj02` | 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02) 的转换 （即 百度 转 谷歌、高德） | 普通工具入口 |
| `buildGUID` | 生成 `36` 位带横杠的 `GUID` 字符串 | 普通工具入口 |
| `buildHierarchyTree` | 创建层级关系 | 普通工具入口 |
| `buildPrefixUUID` | 生成自定义前缀的 `uuid` | 普通工具入口 |
| `buildUUID` | 生成 `32` 位 `uuid` | 普通工具入口 |
| `centsToDollars` | 分转元 | 普通工具入口 |
| `cleanObject` | 从对象中移除无效值（如 `null`、`undefined`、空字符串、空数组、空对象）和不需要的字段 | 普通工具入口 |
| `clone` | 浅拷贝/深拷贝 | 普通工具入口 |
| `cloneDeep` | 深拷贝 | 普通工具入口 |
| `convertImageToGray` | 彩色图片转灰色图片 | 普通工具入口 |
| `convertPath` | 将 `Windows` 反斜杠路径转换为斜杠路径 | 普通工具入口 |
| `copyTextToClipboard` | 用途与完整签名见配套类型声明 | 普通工具入口 |
| `createFormData` | 处理 `FormData` 传参，比 `formDataHander` 更灵活强大 | 普通工具入口 |
| `createYear` | 获取从当前年份到开始年份的数组 | 普通工具入口 |
| `darken` | 颜色值加深 | 普通工具入口 |
| `dataURLtoBlob` | `base64` 转 `blob` | 普通工具入口 |
| `dateFormat` | 获取格式化后的当前日期 | 普通工具入口 |
| `debounce` | 防抖函数 | 普通工具入口 |
| `deepEqual` | 用途与完整签名见配套类型声明 | 普通工具入口 |
| `delObjectProperty` | 从对象中删除指定的属性 | 普通工具入口 |
| `delay` | 延迟函数 | 普通工具入口 |
| `deleteChildren` | 如果父级下 `children` 的 `length` 为 `1`，删除 `children` 并自动组建唯一 `uniqueId` | 普通工具入口 |
| `deviceDetection` | 检测设备类型（`mobile` 返回 `true` ，反之） | 普通工具入口 |
| `divisionOperation` | 两个数值的除法运算 | 普通工具入口 |
| `dollarsToCents` | 元转分 | 普通工具入口 |
| `downloadByBase64` | 基于 `base64` 下载图片 | 普通工具入口 |
| `downloadByData` | 根据后台接口文件流下载 | 普通工具入口 |
| `downloadByOnlineUrl` | 下载在线图片 | 普通工具入口 |
| `downloadByUrl` | 根据文件地址下载文件 | 普通工具入口 |
| `easeInOutQuad` | 用途与完整签名见配套类型声明 | 普通工具入口 |
| `entries` | 用途与完整签名见配套类型声明 | 普通工具入口 |
| `exceedMathMax` | 判断数值是否超过 `js` 最大值 | 普通工具入口 |
| `extractFields` | 提取对象数组中的任意字段，返回一个新的数组 | 普通工具入口 |
| `extractPathList` | 提取菜单树中的每一项 `uniqueId` | 普通工具入口 |
| `formDataHander` | 处理 `FormData` 传参，常用于发送表单数据或进行文件上传 | 普通工具入口 |
| `formatBytes` | 将字节单位智能转化成 `Bytes` 、 `KB` 、 `MB` 、 `GB` 、 `TB` 、 `PB` 、 `EB` 、 `ZB` 、 `YB` 其中的一种 | 普通工具入口 |
| `gcj02tobd09` | 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换 （即 谷歌、高德 转 百度） | 普通工具入口 |
| `gcj02towgs84` | GCJ-02 转换为 WGS-84 | 普通工具入口 |
| `getBrowserInfo` | 获取浏览器 `型号` 以及 `版本` | 普通工具入口 |
| `getClass` | 获取当前元素的所有类名 | 普通工具入口 |
| `getCurrentDate` | 获取当前的日期 | 普通工具入口 |
| `getCurrentWeek` | 获取当前是星期几 | 普通工具入口 |
| `getDecimalPlaces` | 获取数值的小数位数 | 普通工具入口 |
| `getKeyList` | 从数组中获取指定 `key` 组成的新数组，会去重也会去除不存在的值 | 普通工具入口 |
| `getLocation` | 获取浏览器当前的 `location` 信息 | 普通工具入口 |
| `getNodeByUniqueId` | 广度优先遍历，根据唯一 `uniqueId` 找当前节点信息 | 普通工具入口 |
| `getPerformance` | 获取当前页面在加载和使用期间发生各种事件的性能计时信息 | 普通工具入口 |
| `getQueryMap` | 提取浏览器 `url` 中所有参数 | 普通工具入口 |
| `getSvgInfo` | 用途与完整签名见配套类型声明 | 普通工具入口 |
| `getTime` | 将秒转换为时、分、秒 | 普通工具入口 |
| `handleTree` | 构造树型结构数据 | 普通工具入口 |
| `hasCNChars` | 1. 校验是否包含中文或指定的 `unicode` 字符；2. 校验是否全是中文或指定的 `unicode` 字符（包括常用中文标点符号，更多使用方法请看下方链接) | 普通工具入口 |
| `hasClass` | 判断元素是否存在指定类名 | 普通工具入口 |
| `hasOwnProp` | 判断对象自身属性中是否具有指定的属性 | 普通工具入口 |
| `hexToRgb` | `hex` 转 `rgb` | 普通工具入口 |
| `hideTextAtIndex` | 使用指定符号对指定的文字进行隐藏，默认使用 `*` 符号 | 普通工具入口 |
| `intersection` | 获取由基本数据类型组成的数组交集 | 普通工具入口 |
| `is` | 判断某值是某种类型 | 普通工具入口 |
| `isAllEmpty` | 是否为空，针对 `数组`、`对象`、`字符串`、`new Map()`、`new Set()`、`null`、`undefined` 进行判断，`null`、`undefined` 直接返回 `true`，也就是直接等于空 | 普通工具入口 |
| `isAlphabets` | 是否是大小写字母 | 普通工具入口 |
| `isArray` | 是否是 `Array` | 普通工具入口 |
| `isBase64` | 是否是 `Base64` | 普通工具入口 |
| `isBoolean` | 是否是 `Boolean` | 普通工具入口 |
| `isBrowser` | 是否处于浏览器环境（根据是否存在`document`来判断） | 普通工具入口 |
| `isClient` | 是否处于浏览器环境（根据是否存在`window`来判断） | 普通工具入口 |
| `isDate` | 是否是 `Date` 日期类型 | 普通工具入口 |
| `isDef` | 是否非 `undefined` | 普通工具入口 |
| `isElement` | 是否是 `Element` | 普通工具入口 |
| `isEmail` | 邮箱正则 | 普通工具入口 |
| `isEmpty` | 是否为空，针对 `数组`、`对象`、`字符串`、`new Map()`、`new Set()` 进行判断 | 普通工具入口 |
| `isEqual` | 判断两者是否相等 | 普通工具入口 |
| `isEqualArray` | 判断两个数组是否相等 | 普通工具入口 |
| `isEqualObject` | 判断两个对象是否相等（深度对比） | 普通工具入口 |
| `isExistSpace` | 检测字符串是否有空格。true：有空格，false：无空格 | 普通工具入口 |
| `isFunction` | 是否是 `Function` | 普通工具入口 |
| `isHex` | 是否是 `hex` | 普通工具入口 |
| `isHtml` | 是否是 `HTML`，通过判断传入字符是否包含类似`HTML`标签的结构，适用于基本场景 | 普通工具入口 |
| `isIncludeAllChildren` | 判断一个数组（这里简称为母体）中是否包含了另一个由基本数据类型组成的数组（这里简称为子体）中的全部元素 | 普通工具入口 |
| `isInvalidValue` | 用途与完整签名见配套类型声明 | 普通工具入口 |
| `isJSON` | 是否是标准的 `JSON` 格式 | 普通工具入口 |
| `isLeapYear` | 是否是闰年 | 普通工具入口 |
| `isLowerCase` | 是否是小写字母 | 普通工具入口 |
| `isNull` | 是否是 `null` | 普通工具入口 |
| `isNullAndUnDef` | 是否是 `null` 并且是 `undefined` | 普通工具入口 |
| `isNullOrUnDef` | 是否是 `null` 或者 `undefined` | 普通工具入口 |
| `isNumber` | 是否是 `number` | 普通工具入口 |
| `isObject` | 是否是对象 `object` | 普通工具入口 |
| `isPhone` | 手机号码正则 | 普通工具入口 |
| `isPlainObject` | 是否是普通对象。该对象由 `Object` 构造函数创建，或者 `[[Prototype]]` 为 `null` | 普通工具入口 |
| `isPostCode` | 是否是中国大陆邮政编码（共6位，且不能以0开头） | 普通工具入口 |
| `isPromise` | 是否是 `Promise` | 普通工具入口 |
| `isQQ` | `QQ` 正则 | 普通工具入口 |
| `isRegExp` | 是否是 `RegExp` | 普通工具入口 |
| `isRgb` | 是否是 `rgb` | 普通工具入口 |
| `isRgba` | 是否是 `rgba` | 普通工具入口 |
| `isServer` | 是否处于服务端，非浏览器环境（根据是否存在`window`来判断） | 普通工具入口 |
| `isString` | 是否是 `string` | 普通工具入口 |
| `isUnDef` | 是否是 `undefined` | 普通工具入口 |
| `isUpperCase` | 是否是大写字母 | 普通工具入口 |
| `isUrl` | `url` 链接正则 | 普通工具入口 |
| `isWindow` | 是否是 `Window` | 普通工具入口 |
| `lighten` | 颜色值变浅 | 普通工具入口 |
| `mapsEqual` | 用途与完整签名见配套类型声明 | 普通工具入口 |
| `max` | 求数字类型组成数组中的最大值 | 普通工具入口 |
| `min` | 求数字类型组成数组中的最小值 | 普通工具入口 |
| `monthDays` | 获取指定日期月份的总天数 | 普通工具入口 |
| `multiplication` | 两个数值的乘法运算 | 普通工具入口 |
| `nameCamelize` | 横线转驼峰命名 | 普通工具入口 |
| `nameHyphenate` | 驼峰命名转横线命名：拆分字符串，使用 `-` 相连，并且全部转换为小写 | 普通工具入口 |
| `numberToChinese` | 将阿拉伯数字翻译成中文数字 | 普通工具入口 |
| `openLink` | 创建超链接 | 普通工具入口 |
| `out_of_china` | 判断是否是国外（非中国）坐标 | 普通工具入口 |
| `priceToThousands` | 格式化金额，三位加一个逗号 | 普通工具入口 |
| `priceUppercase` | 金额转大写汉字（支持小数位） | 普通工具入口 |
| `randomColor` | 随机生成颜色 | 普通工具入口 |
| `randomDivide` | 将一个总数随机分配到指定份数的数组中，并按指定顺序返回数组（内部使用`Fisher-Yates`（也称为`Knuth`）洗牌算法） | 普通工具入口 |
| `randomGradient` | 随机生成渐变色 | 普通工具入口 |
| `removeAllSpace` | 去掉字符串全部空格 | 普通工具入口 |
| `removeBothSidesSpace` | 去掉字符串左右两边空格 | 普通工具入口 |
| `removeClass` | 删除当前元素的指定类名 | 普通工具入口 |
| `removeLeftSpace` | 去掉字符串左边空格 | 普通工具入口 |
| `removeRightSpace` | 去掉字符串右边空格 | 普通工具入口 |
| `rgbToHex` | `rgb` 转 `hex` | 普通工具入口 |
| `setsEqual` | 用途与完整签名见配套类型声明 | 普通工具入口 |
| `shouldCleanKey` | 用途与完整签名见配套类型声明 | 普通工具入口 |
| `shuffleArray` | `Fisher-Yates`（也称为`Knuth`）洗牌算法。以均匀的分布方式，随机打乱数组的顺序。它的效果在数学上是无偏的，确保了每个元素有相同的概率出现在数组的任何位置 | 普通工具入口 |
| `splitNum` | 将数字拆分为单个数字组成的数组 | 普通工具入口 |
| `storageLocal` | 操作本地 `localStorage` | 普通工具入口 |
| `storageSession` | 操作本地 `sessionStorage` | 普通工具入口 |
| `subAfter` | 截取指定字符后面的值 | 普通工具入口 |
| `subBefore` | 截取指定字符前面的值 | 普通工具入口 |
| `subBetween` | 截取指定两个字符之间的值 | 普通工具入口 |
| `subBothSides` | 截取指定字符两边的值 | 普通工具入口 |
| `subTextAddEllipsis` | 截取字符并追加省略号（常用场景：`echarts`） | 普通工具入口 |
| `subtraction` | 两个数值的减法运算 | 普通工具入口 |
| `sum` | 求数字类型组成数组中的和 | 普通工具入口 |
| `swapOrder` | 数组中两个元素互换顺序（内部使用 `splice` 会改变原数组） | 普通工具入口 |
| `throttle` | 节流函数 | 普通工具入口 |
| `toSet` | 用途与完整签名见配套类型声明 | 普通工具入口 |
| `toggleClass` | 是否向当前元素添加指定类名 | 普通工具入口 |
| `urlToBase64` | 图片 `url` 转 `base64` | 普通工具入口 |
| `useAttrs` | 用途与完整签名见配套类型声明 | 普通工具入口 |
| `useCopyToClipboard` | 拷贝文本 | 普通工具入口 |
| `useDark` | 检测网页整体是否处于暗色（`dark`）主题，它是响应式的 | 普通工具入口 |
| `useDraggable` | 使元素可拖动 | 普通工具入口 |
| `useDynamicComponent` | `tsx` 中加载动态组件 | 普通工具入口 |
| `useGlobal` | 获取已经注册的全局属性对象 [globalProperties](https://cn.vuejs.org/api/application.html#app-config-globalproperties) | 普通工具入口 |
| `useLoader` | 动态地将静态资源（`CSS`样式表或`JavaScript`脚本）加载到网页中 | 普通工具入口 |
| `useResizeObserver` | 监听元素尺寸的变化，内置自定义防抖时长 | 普通工具入口 |
| `useScrollTo` | 使元素可自定义缓动 | 普通工具入口 |
| `useWatermark` | 创建水印 | 普通工具入口 |
| `uuid` | 生成指定长度和基数的 `uuid` | 普通工具入口 |
| `wgs84togcj02` | WGS-84 转 GCJ-02 | 普通工具入口 |
| `withInstall` | 向组件中添加`install`方法，使其既可以使用`app.component`注册又可以使用`app.use`安装，且无需考虑`TypeScript`类型 | 普通工具入口 |
| `withInstallFunction` | 向`Vue3`实例的全局属性中添加函数 | 普通工具入口 |
| `withNoopInstall` | 向组件中添加空的`install`方法。使用场景：不希望组件自动注册，或者想要在控制注册时机和方式时提供灵活性。例如，想要在某些条件满足时才注册组件，或者已经有了注册逻辑的其他实现方式 | 普通工具入口 |
| `useECharts` | 渲染 `echarts` | 可选图表入口 |
