import type { CSSProperties, DefineComponent, VNodeChild } from 'vue';
import type { TableColumnCtx, TableInstance, TableProps, PaginationProps, ConfigProviderProps } from 'element-plus';
type Language = NonNullable<ConfigProviderProps['locale']>;

/** Record-like table rows match the Element Plus DefaultRow constraint. */
export type ShwTableRow = Record<string, any>;
export type ShwTableAlign = 'left' | 'center' | 'right';
export type ShwTableLocale = Language | 'en' | 'zhCn' | 'zhTw' | 'zh-cn' | 'zh-tw';

export interface ShwTableColumnScope<Row extends ShwTableRow = ShwTableRow> {
  row: Row;
  column: TableColumnCtx<Row>;
  $index: number;
}
export interface ShwTableColumnRenderer<Row extends ShwTableRow = ShwTableRow> extends ShwTableColumnScope<Row> {
  index: number;
  props: ShwTableProps<Row>;
  attrs: Record<string, unknown>;
}

/** Public column configuration only; no Element Plus store/render internals. */
export interface ShwTableColumn<Row extends ShwTableRow = ShwTableRow> {
  label?: string;
  prop?: string | ((index: number) => string);
  property?: string;
  type?: 'default' | 'selection' | 'index' | 'expand';
  index?: number | ((index: number) => number);
  columnKey?: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: boolean | 'left' | 'right';
  renderHeader?: (scope: { column: TableColumnCtx<Row>; $index: number }) => VNodeChild;
  sortable?: boolean | 'custom';
  sortMethod?: (a: Row, b: Row) => number;
  sortBy?: string | string[] | ((row: Row, index: number) => string);
  sortOrders?: ('ascending' | 'descending' | null)[];
  resizable?: boolean;
  formatter?: (row: Row, column: TableColumnCtx<Row>, cellValue: unknown, index: number) => VNodeChild;
  showOverflowTooltip?: TableProps<Row>['showOverflowTooltip'];
  align?: ShwTableAlign;
  headerAlign?: ShwTableAlign;
  className?: string;
  labelClassName?: string;
  selectable?: (row: Row, index: number) => boolean;
  reserveSelection?: boolean;
  filters?: { text: string; value: unknown }[];
  filterPlacement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' |
    'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
  filterClassName?: string;
  filterMultiple?: boolean;
  filterMethod?: (value: unknown, row: Row, column: TableColumnCtx<Row>) => boolean;
  filteredValue?: unknown[];
  tooltipFormatter?: (scope: { row: Row; column: TableColumnCtx<Row>; cellValue: unknown }) => VNodeChild;
  hide?: boolean | ((attrs: Record<string, unknown>) => boolean);
  slot?: string;
  headerSlot?: string;
  filterIconSlot?: string;
  expandSlot?: string;
  children?: ShwTableColumn<Row>[];
  cellRenderer?: (scope: ShwTableColumnRenderer<Row>) => VNodeChild;
  headerRenderer?: (scope: ShwTableColumnRenderer<Row>) => VNodeChild;
}

export type ShwTablePagination = Partial<PaginationProps> & {
  total: number;
  pageSize: number;
  currentPage: number;
  align?: ShwTableAlign;
  style?: CSSProperties;
  class?: string;
};
export interface ShwTableAdaptiveConfig {
  offsetBottom?: number;
  fixHeader?: boolean;
  timeout?: number;
  zIndex?: number;
}
export interface ShwTableLoadingConfig {
  text?: string;
  spinner?: string;
  svg?: string;
  viewBox?: string;
  background?: string;
}
export interface ShwTableExtensions<Row extends ShwTableRow = ShwTableRow> {
  tableKey?: string | number;
  columns?: ShwTableColumn<Row>[];
  loading?: boolean;
  loadingConfig?: ShwTableLoadingConfig;
  alignWhole?: ShwTableAlign;
  headerAlign?: ShwTableAlign | '';
  showOverflowTooltip?: TableProps<Row>['showOverflowTooltip'];
  rowHoverBgColor?: string;
  pagination?: ShwTablePagination | false;
  adaptive?: boolean;
  adaptiveConfig?: ShwTableAdaptiveConfig;
  locale?: ShwTableLocale;
}
export type ShwTableProps<Row extends ShwTableRow = ShwTableRow> = Omit<Partial<TableProps<Row>>, keyof ShwTableExtensions<Row>> & ShwTableExtensions<Row>;
export interface ShwTableExpose {
  getTableRef: () => TableInstance | undefined;
  getTableDoms: () => Record<string, unknown> | undefined;
  setAdaptive: () => Promise<void>;
  setHeaderSticky: (zIndex?: number) => Promise<void>;
}

/** A concrete row type preserves callback variance without consumer-side casts. */
export type ShwTableComponent<Row extends ShwTableRow = ShwTableRow> = DefineComponent<
  ShwTableProps<Row> & Omit<TableInstance['$props'], keyof ShwTableProps<Row>> & {
    onPageSizeChange?: (value: number) => void;
    onPageCurrentChange?: (value: number) => void;
    'onPage-size-change'?: (value: number) => void;
    'onPage-current-change'?: (value: number) => void;
  }
>;
