/**
 * Copyright (c) 2022-present, pure-admin. MIT; see LICENSES/pureadmin-utils.MIT.txt.
 * Owned fork of verified npm 2.6.4 ESM, gitHead metadata 56e7946b96f955ece198c1ee78da8547d8f0ee06.
 * Formatted and top-level symbols restored from public export names; no upstream package import.
 * The original TypeScript source is unavailable (official GitHub repository/commit returned HTTP 404).
 */
import type { ECharts, EChartsOption } from 'echarts';
import type * as echarts_types_dist_echarts from 'echarts';
import type { Fn, ElementRef, RefValue, ComputedRefValue } from './runtime.js';
interface GlobalUtilsPropertiesApi {
  $echarts: ECharts;
}

/**
 * useEcharts.ts
 */
type ToolTipType = 'x' | 'y' | true;

type Theme = 'default' | 'light' | 'dark' | string;

declare type ElementEventType = 'echarts' | 'zrender';

declare type ElementEventName =
  | 'click'
  | 'dblclick'
  | 'mousewheel'
  | 'mouseout'
  | 'mouseover'
  | 'mouseup'
  | 'mousedown'
  | 'mousemove'
  | 'contextmenu'
  | 'drag'
  | 'dragstart'
  | 'dragend'
  | 'dragenter'
  | 'dragleave'
  | 'dragover'
  | 'drop'
  | 'globalout'
  | 'selectchanged'
  | 'highlight'
  | 'downplay'
  | 'legendselectchanged'
  | 'legendselected'
  | 'legendunselected'
  | 'legendselectall'
  | 'legendinverseselect'
  | 'legendscroll'
  | 'datazoom'
  | 'datarangeselected'
  | 'graphroam'
  | 'georoam'
  | 'treeroam'
  | 'timelinechanged'
  | 'timelineplaychanged'
  | 'restore'
  | 'dataviewchanged'
  | 'magictypechanged'
  | 'geoselectchanged'
  | 'geoselected'
  | 'geounselected'
  | 'axisareaselected'
  | 'brush'
  | 'brushEnd'
  | 'brushselected'
  | 'globalcursortaken'
  | 'rendered'
  | 'finished';

interface EchartOptions {
  /** 主题色（可选`default`、`light`、`dark`，也可以 [自定义主题](https://echarts.apache.org/zh/theme-builder.html) ，默认`default`） */
  theme?: Theme | RefValue<Theme> | ComputedRefValue<Theme>;
  /** 给`x`、`y`轴添加`Tooltip`文字提示的元素id，默认`tooltipElement` */
  tooltipId?: string;
  /** 设备像素比，默认取浏览器的值`window.devicePixelRatio` */
  devicePixelRatio?: number;
  /** 渲染模式，支持`canvas`或者`svg`，默认`canvas` */
  renderer?: 'canvas' | 'svg';
  /** 是否使用服务端渲染，只有在`SVG`渲染模式有效。开启后不再会每帧自动渲染，必须要调用 [renderToSVGString](https://echarts.apache.org/zh/api.html#echartsInstance.renderToSVGString) 方法才能得到渲染后`SVG`字符串 */
  ssr?: boolean;
  /** 是否开启脏矩形渲染，只有在`Canvas`渲染模式有效，默认为`false` */
  useDirtyRect?: boolean;
  /** 是否扩大可点击元素的响应范围。`null`表示对移动设备开启；`true`表示总是开启；`false`表示总是不开启 */
  useCoarsePointer?: boolean;
  /** 扩大元素响应范围的像素大小，配合`opts.useCoarsePointer`使用 */
  pointerSize?: number;
  /** 可显式指定实例宽度，单位为像素。如果传入值为`null/undefined/'auto'`，则表示自动取`dom`（实例容器）的宽度 */
  width?: number | string;
  /** 可显式指定实例高度，单位为像素。如果传入值为`null/undefined/'auto'`，则表示自动取`dom`（实例容器）的高度 */
  height?: number | string;
  /** 使用的语言，内置`ZH`和`EN`两个语言，也可以使用 [echarts.registerLocale](https://echarts.apache.org/zh/api.html#echarts.registerLocale) 方法注册新的语言包。目前支持的语言见 [src/i18n](https://github.com/apache/echarts/tree/release/src/i18n) */
  locale?: string;
}

interface OptionsParams {
  /** 事件类型名称 `必传` */
  name: ElementEventName;
  /** 回调函数，返回 [params](https://echarts.apache.org/zh/api.html#events.%E9%BC%A0%E6%A0%87%E4%BA%8B%E4%BB%B6) 参数 `必传` */
  callback: Fn;
  /** `echarts`事件（默认）或 [zrender](https://echarts.apache.org/handbook/zh/concepts/event/#%E7%9B%91%E5%90%AC%E2%80%9C%E7%A9%BA%E7%99%BD%E5%A4%84%E2%80%9D%E7%9A%84%E4%BA%8B%E4%BB%B6) 事件 */
  type?: ElementEventType;
  /** `query`属性，点击 [此处](https://echarts.apache.org/handbook/zh/concepts/event/#%E9%BC%A0%E6%A0%87%E4%BA%8B%E4%BB%B6%E7%9A%84%E5%A4%84%E7%90%86) 搜索`query`进行了解 可选 */
  query?: string | object;
}

interface LoadOpts {
  type?: string;
  opts?: {
    text?: string;
    color?: string;
    textColor?: string;
    maskColor?: string;
    zlevel?: number;
    /** 字体大小。从 `v4.8.0` 开始支持 */
    fontSize?: number;
    /** 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持 */
    showSpinner?: boolean;
    /** 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持 */
    spinnerRadius?: number;
    /** 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持 */
    lineWidth?: number;
    /** 字体粗细。从 `v5.0.1` 开始支持 */
    fontWeight?: string;
    /** 字体风格。从 `v5.0.1` 开始支持 */
    fontStyle?: string;
    /** 字体系列。从 `v5.0.1` 开始支持 */
    fontFamily?: string;
  };
}

interface AppendDataOpts {
  /** 要增加数据的系列序号 */
  seriesIndex?: string | number;
  /** 增加的数据 */
  data?: Array<any>;
}

interface DataURL {
  /** 导出的格式，可选 png, jpg, svg（注意：png, jpg 只有在 canvas 渲染器的时候可使用，svg 只有在使用 svg 渲染器的时候可用） */
  type?: string;
  /** 导出的图片分辨率比例，默认为 1 */
  pixelRatio?: number;
  /** 导出的图片背景色，默认使用 option 里的 backgroundColor */
  backgroundColor?: string;
  /** 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox'] */
  excludeComponents?: Array<string>;
}

interface UtilsEChartsOption extends EChartsOption {
  /** 是否清空当前实例，会移除实例中的图表，一般用于动态渲染，默认：`true` */
  clear?: boolean;
  /** 给`x`、`y`轴添加`Tooltip`文字提示，一般用于文字太长，`x`代表`x轴`   `y`代表`y轴`   `true`代表`x、y轴`（该属性生效的前提是将 `xAxis` 或者 `yAxis` 添加`triggerEvent: true`属性，用到哪个添加哪个） */
  addTooltip?: ToolTipType;
  /**
   * 第一种含义（默认）：`window.onresize` 时改变图表尺寸的延时时间，单位毫秒，默认 `300` 毫秒。当 `echarts` 在拖拉窗口时不会自适应（一般不会出现这种情况），可以调整 `delay` 数值到自适应为止
   * 第二种含义：如果设置了`container`，那么`delay`就代表指定容器元素尺寸变化的防抖时长，单位毫秒，默认`40`毫秒
   * */
  delay?: number;
  /** 是否监听页面`resize`事件并在页面`resize`时改变图表尺寸以适应当前容器，监听及改变，`true`(默认)代表监听 `false`代表不监听 */
  resize?: boolean;
  /**
   * 监听指定容器元素尺寸的变化，从而实现图表尺寸自适应当前容器
   * `container`可以是类名（`'.class'`）也可以是`ID`（`'.id'`），内部用的是`document.querySelectorAll`。当然它也可以是 [ref](https://cn.vuejs.org/guide/essentials/template-refs.html#template-refs)
   * 使用场景：常用于在容器宽高尺寸非固定值时，设置`container`实现图表尺寸自适应
   * 注意：设置`container`后，`resize`属性就无效了。如果既想监听指定容器元素，又想监听`body`或更多元素，可以传字符串数组，如`['.class','#id','body',...]`
   * */
  container?: ElementRef<HTMLDivElement> | string | (ElementRef<HTMLDivElement> | string)[];
}

interface EchartGlobalProperties {
  /** `globalProperties`属性名 */
  name?: string;
  /** `globalProperties`属性值 */
  value?: ECharts;
}

/**
 * @description 渲染 `echarts`
 * @param elRef `ref`
 * @param options `EchartOptions`
 * @see 详细文档 https://pure-admin-utils.netlify.app/hooks/useECharts/useECharts
 */
declare const useECharts: (
  elRef: ElementRef<HTMLDivElement>,
  options?: EchartOptions,
) => {
  /** 返回的`echarts`，功能同 [echarts](https://echarts.apache.org/zh/api.html#echarts) */
  echarts: echarts_types_dist_echarts.ECharts;
  /** 根据配置项渲染`ECharts`，功能同 [setOption](https://echarts.apache.org/zh/option.html) */
  setOptions: (options: UtilsEChartsOption, ...params: OptionsParams[]) => void;
  /** 获取通过 [echarts.init](https://echarts.apache.org/zh/api.html#echarts.init) 创建的实例，功能同 [echartsInstance](https://echarts.apache.org/zh/api.html#echartsInstance) */
  getInstance: () => echarts_types_dist_echarts.ECharts | null;
  /** 显示加载动画 */
  showLoading: (params: LoadOpts) => void;
  /** 隐藏加载动画 */
  hideLoading: () => void;
  /** 清空当前`ECharts`实例，会移除实例中所有的组件和图表 */
  clear: () => void;
  /** 改变`ECharts`图表尺寸，使其适应容器 */
  resize: () => void;
  /** 获取绑定到`echarts`的 [globalProperties](https://cn.vuejs.org/api/application.html#app-config-globalproperties) */
  getGlobalProperties: () => EchartGlobalProperties;
  /** 获取`ECharts`实例容器的`Dom`节点 */
  getDom: () => HTMLCanvasElement | HTMLDivElement;
  /** 获取`ECharts`实例容器的宽度 */
  getWidth: () => number;
  /** 获取`ECharts`实例容器的高度 */
  getHeight: () => number;
  /** 获取当前`ECharts`实例中维护的`option`对象 */
  getOption: () => echarts_types_dist_echarts.EChartsCoreOption;
  /** 此接口用于，在大数据量（百万以上）的渲染场景，分片加载数据和增量渲染 */
  appendData: (opts: AppendDataOpts) => void;
  /** 导出图表图片，返回一个`base64`的`URL`，可以设置为`Image`的`src` */
  getDataURL: (opts: DataURL) => string;
  /** 导出联动的图表图片，返回一个`base64`的`url`，可以设置为`Image`的`src`。导出图片中每个图表的相对位置跟容器的相对位置有关 */
  getConnectedDataURL: (opts: DataURL) => string;
  /**
   * @description 给`x`、`y`轴添加`Tooltip`文字提示
   * @param type `x`代表`x轴`   `y`代表`y轴`   `true`(默认)代表`x、y轴` （该属性生效的前提是将 `xAxis` 或者 `yAxis` 添加`triggerEvent: true`属性，用到哪个添加哪个）
   */
  addTooltip: (type: ToolTipType) => void;
};
export {
  AppendDataOpts,
  DataURL,
  EchartGlobalProperties,
  EchartOptions,
  GlobalUtilsPropertiesApi,
  LoadOpts,
  OptionsParams,
  Theme,
  ToolTipType,
  UtilsEChartsOption,
  useECharts,
};
