/** Adapted from @pureadmin/table 3.3.0 (MIT). See vendor/pureadmin-table. */
import {
  computed, defineComponent, Fragment, h, nextTick, onBeforeUnmount, onMounted, ref,
  watch, withDirectives, type CSSProperties, type DefineComponent, type PropType, type Slot, type VNode
} from 'vue';
import { ElConfigProvider, ElLoadingDirective, ElPagination, ElTable, ElTableColumn, type TableInstance } from 'element-plus';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import zhTw from 'element-plus/es/locale/lang/zh-tw';
import type {
  ShwTableAdaptiveConfig, ShwTableAlign, ShwTableColumn, ShwTableColumnRenderer,
  ShwTableColumnScope, ShwTableExpose, ShwTableLoadingConfig, ShwTableLocale,
  ShwTablePagination, ShwTableProps, ShwTableRow
} from './types';

type MutableSlots = Record<string, Slot | undefined>;
type NativeColumnProps = Omit<ShwTableColumn,
  'prop' | 'hide' | 'children' | 'slot' | 'headerSlot' | 'filterIconSlot' |
  'expandSlot' | 'cellRenderer' | 'headerRenderer'> & { prop?: string };
// Resolve Element Plus's generic constructor at this concrete row boundary.
// Runtime identity and native prop validation remain the original component.
const TableColumn = ElTableColumn as unknown as DefineComponent<NativeColumnProps>;

export default defineComponent({
  name: 'ShwTable',
  inheritAttrs: false,
  props: {
    tableKey: { type: [String, Number], default: '0' },
    data: { type: Array as PropType<ShwTableRow[]>, default: () => [] },
    columns: { type: Array as PropType<ShwTableColumn[]>, default: () => [] },
    loading: { type: Boolean, default: false },
    loadingConfig: { type: Object as PropType<ShwTableLoadingConfig>, default: () => ({}) },
    alignWhole: { type: String as PropType<ShwTableAlign>, default: 'left' },
    headerAlign: { type: String as PropType<ShwTableAlign | ''>, default: '' },
    showOverflowTooltip: { type: [Boolean, Object] as PropType<ShwTableProps['showOverflowTooltip']>, default: false },
    rowHoverBgColor: { type: String, default: '' },
    pagination: { type: [Object, Boolean] as PropType<ShwTablePagination | false>, default: false },
    adaptive: { type: Boolean, default: false },
    adaptiveConfig: { type: Object as PropType<ShwTableAdaptiveConfig>, default: () => ({}) },
    locale: { type: [String, Object] as PropType<ShwTableLocale>, default: undefined }
  },
  emits: {
    'page-size-change': (value: number) => Number.isFinite(value),
    'page-current-change': (value: number) => Number.isFinite(value)
  },
  setup(props, { attrs, slots, emit, expose }) {
    const table = ref<TableInstance>();
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let mounted = false;
    const originalHeights = new Map<HTMLElement, string>();
    const originalHeaders = new Map<HTMLElement, { position: string; top: string; zIndex: string }>();
    const locale = computed(() => {
      if (typeof props.locale !== 'string') return props.locale;
      return { en, zhCn, zhTw, 'zh-cn': zhCn, 'zh-tw': zhTw }[props.locale];
    });
    const pagination = computed(() => {
      const value = props.pagination;
      return value && value.currentPage > 0 && value.pageSize > 0 ? value : undefined;
    });
    const getTableRef: ShwTableExpose['getTableRef'] = () => table.value;
    const getTableDoms: ShwTableExpose['getTableDoms'] = () => table.value?.$refs;
    const getWrapper = () => {
      const wrapper = getTableDoms()?.tableWrapper;
      return wrapper instanceof HTMLElement ? wrapper : undefined;
    };
    const restoreAdaptive = () => {
      originalHeights.forEach((height, element) => { element.style.height = height; });
      originalHeaders.forEach((style, element) => { Object.assign(element.style, style); });
      originalHeights.clear();
      originalHeaders.clear();
    };
    const setHeaderSticky: ShwTableExpose['setHeaderSticky'] = async (zIndex = 3) => {
      await nextTick();
      if (!mounted) return;
      const wrapper = getWrapper();
      const header = wrapper?.querySelector<HTMLElement>('.el-table__header-wrapper');
      if (!header) return;
      if (!originalHeaders.has(header)) {
        originalHeaders.set(header, { position: header.style.position, top: header.style.top, zIndex: header.style.zIndex });
      }
      Object.assign(header.style, { position: 'sticky', top: '0px', zIndex: String(zIndex) });
    };
    const setAdaptive: ShwTableExpose['setAdaptive'] = async () => {
      await nextTick();
      if (!mounted || typeof window === 'undefined') return;
      const wrapper = getWrapper();
      if (!wrapper) return;
      if (!originalHeights.has(wrapper)) originalHeights.set(wrapper, wrapper.style.height);
      wrapper.style.height = `${Math.max(0, window.innerHeight - wrapper.getBoundingClientRect().top - (props.adaptiveConfig.offsetBottom ?? 96))}px`;
      table.value?.doLayout();
    };
    const syncAdaptive = async () => {
      restoreAdaptive();
      if (!props.adaptive) return;
      await setAdaptive();
      if (props.adaptiveConfig.fixHeader !== false) await setHeaderSticky(props.adaptiveConfig.zIndex ?? 3);
    };
    const onResize = () => {
      if (resizeTimer !== undefined) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { if (mounted && props.adaptive) void setAdaptive(); }, props.adaptiveConfig.timeout ?? 60);
    };
    onMounted(() => {
      mounted = true;
      window.addEventListener('resize', onResize);
      void syncAdaptive();
    });
    watch(() => [props.adaptive, props.adaptiveConfig, attrs.height], () => { if (mounted) void syncAdaptive(); }, { deep: true, flush: 'post' });
    onBeforeUnmount(() => {
      mounted = false;
      window.removeEventListener('resize', onResize);
      if (resizeTimer !== undefined) clearTimeout(resizeTimer);
      restoreAdaptive();
    });
    expose({ getTableRef, getTableDoms, setAdaptive, setHeaderSticky } satisfies ShwTableExpose);

    const scopeParams = (scope: ShwTableColumnScope): ShwTableColumnRenderer => ({
      ...scope, index: scope.$index, props: { ...attrs, ...props } as ShwTableProps, attrs
    });
    const renderColumns = (column: ShwTableColumn, index: number): VNode | null => {
      const {
        cellRenderer, slot, headerRenderer, headerSlot, filterIconSlot, expandSlot,
        hide, children, prop, ...nativeColumn
      } = column;
      if (typeof hide === 'function' ? hide(attrs) : hide) return null;
      const columnSlots: MutableSlots = {};
      if (children?.length) {
        columnSlots.default = () => [h(Fragment, null, children.map(renderColumns))];
      } else if (cellRenderer || slot) {
        columnSlots.default = (scope: ShwTableColumnScope) => cellRenderer
          ? [h(Fragment, null, [cellRenderer(scopeParams(scope))])]
          : slots[slot!]?.(scopeParams(scope)) ?? [];
      }
      if (headerRenderer || (headerSlot && slots[headerSlot])) {
        columnSlots.header = (scope: ShwTableColumnScope) => headerRenderer
          ? [h(Fragment, null, [headerRenderer(scopeParams(scope))])]
          : slots[headerSlot!]?.(scopeParams(scope)) ?? [];
      }
      if (filterIconSlot && slots[filterIconSlot]) {
        columnSlots['filter-icon'] = (scope: ShwTableColumnScope) => slots[filterIconSlot]?.(scopeParams(scope)) ?? [];
      }
      if (expandSlot && slots[expandSlot]) {
        columnSlots.expand = (scope: ShwTableColumnScope) => slots[expandSlot]?.(scopeParams(scope)) ?? [];
        // Element Plus uses the default slot for a type=expand column's content.
        if (column.type === 'expand') columnSlots.default = columnSlots.expand;
      }
      return h(TableColumn, {
        ...nativeColumn,
        key: column.columnKey ?? index,
        prop: typeof prop === 'function' ? prop(index) : prop,
        align: column.align ?? props.alignWhole,
        headerAlign: column.headerAlign ?? (props.headerAlign || undefined),
        showOverflowTooltip: column.showOverflowTooltip ?? props.showOverflowTooltip
      }, columnSlots);
    };
    const renderTable = () => {
      const tableSlots: MutableSlots = { default: () => [h(Fragment, null, [...props.columns.map(renderColumns), ...(slots.default?.() ?? [])])] };
      if (slots.append) tableSlots.append = slots.append;
      if (slots.empty) tableSlots.empty = slots.empty;
      const content = [h(ElTable, {
        ...attrs, ref: table, key: props.tableKey, data: props.data,
        showOverflowTooltip: props.showOverflowTooltip
      }, tableSlots)];
      if (pagination.value) {
        const { align = 'right', style, class: className, ...nativePagination } = pagination.value;
        const paginationStyle: CSSProperties = {
          width: '100%', margin: '16px 0', display: 'flex', flexWrap: 'wrap',
          justifyContent: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end', ...style
        };
        content.push(h(ElPagination, {
          layout: 'total, sizes, prev, pager, next, jumper', pageSizes: [5, 10, 15, 20],
          ...nativePagination, class: ['shw-table-pagination', className], style: paginationStyle,
          onSizeChange: (value: number) => emit('page-size-change', value),
          onCurrentChange: (value: number) => emit('page-current-change', value)
        }));
      }
      return content;
    };
    return () => {
      const config = props.loadingConfig;
      const style: CSSProperties = { width: '100%' };
      if (props.rowHoverBgColor) style['--el-table-row-hover-bg-color'] = props.rowHoverBgColor;
      const loadingAttrs = {
        'element-loading-text': config.text,
        'element-loading-spinner': config.spinner,
        'element-loading-svg': config.svg,
        'element-loading-svg-view-box': config.viewBox,
        'element-loading-background': config.background ?? 'var(--el-mask-color, rgba(255, 255, 255, 0.45))'
      };
      return withDirectives(h('div', { class: 'shw-table', style, ...loadingAttrs },
        locale.value ? [h(ElConfigProvider, { locale: locale.value }, { default: renderTable })] : renderTable()
      ), [[ElLoadingDirective, props.loading]]);
    };
  }
});
