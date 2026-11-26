/** Adapted from @pureadmin/descriptions 1.2.1. See LICENSES/pureadmin-descriptions.MIT.txt. */
import { ElButton, ElDescriptions, ElDescriptionsItem, descriptionProps as elementDescriptionProps, vLoading } from 'element-plus';
import { defineComponent, h, onBeforeUnmount, ref, unref, withDirectives, type PropType, type VNodeChild } from 'vue';
import { isArray, isFunction, useCopyToClipboard } from '../owned-utils';
import type { DescriptionsAlign, ShwDescriptionColumn, ShwDescriptionRenderContext, ShwDescriptionsLoading } from './types';

function text(value: unknown): string {
  return value == null ? '' : String(value);
}

export default defineComponent({
  name: 'ShwDescriptions',
  inheritAttrs: false,
  props: {
    ...elementDescriptionProps,
    data: { type: Array as PropType<Record<string, unknown>[]>, default: () => [] },
    columns: { type: Array as PropType<ShwDescriptionColumn[]>, default: () => [] },
    loading: { type: Object as PropType<ShwDescriptionsLoading>, default: () => ({ load: false }) },
    align: { type: String as PropType<DescriptionsAlign>, default: 'left' },
    labelAlign: { type: String as PropType<DescriptionsAlign>, default: undefined }
  },
  emits: {
    copy: (_value: string, _index: number) => true,
    'copy-error': (_error: unknown, _index: number) => true
  },
  setup(props, { slots, attrs, emit }) {
    const active = ref(-1);
    const pending = ref(false);
    const failure = ref(-1);
    const { copied, update } = useCopyToClipboard();
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    onBeforeUnmount(() => clearTimeout(resetTimer));

    function copy(value: unknown, index: number) {
      if (pending.value) return;
      pending.value = true;
      failure.value = -1;
      try {
        const content = text(unref(isArray(value) ? value[0] : value));
        copied.value = false;
        update(content);
        if (!copied.value) throw new Error('复制失败，请重试');
        active.value = index;
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => { copied.value = false; active.value = -1; }, 600);
        emit('copy', content, index);
      } catch (error) {
        failure.value = index;
        emit('copy-error', error, index);
      } finally {
        pending.value = false;
      }
    }

    return () => {
      const { data, columns, loading, align, labelAlign, ...descriptionProps } = props;
      const descriptionSlots: Record<string, () => VNodeChild> = {
        default: () => columns.map((column, index) => {
          if (isFunction(column.hide) && column.hide?.(attrs)) return null;
          const { prop, value, hide: _hide, slot, copy: copyable, labelRenderer, cellRenderer, ...itemProps } = column;
          const values = data.map(row => prop == null ? undefined : row[prop]);
          const context: ShwDescriptionRenderContext = { props, attrs, index, value: values[0], values };
          const itemSlots: Record<string, () => VNodeChild> = {
            default: () => {
              if (cellRenderer) return cellRenderer(context);
              if (slot) return slots[slot]?.(context);
              const explicitValue = Object.prototype.hasOwnProperty.call(column, 'value');
              const displayed = explicitValue ? unref(value) : values;
              return [
                ...(isArray(displayed) ? displayed.map(item => text(item)) : [text(displayed)]),
                unref(copyable) ? h(ElButton, {
                  link: true,
                  type: 'primary',
                  disabled: pending.value,
                  style: { marginLeft: '4px' },
                  'aria-label': `复制${column.label ?? prop ?? '内容'}`,
                  onClick: () => copy(displayed, index)
                }, { default: () => active.value === index && copied.value ? '已复制' : '复制' }) : null,
                failure.value === index ? h('span', { role: 'alert', style: { color: 'var(--el-color-danger)', marginLeft: '4px' } }, '复制失败，请重试') : null
              ];
            }
          };
          if (labelRenderer) itemSlots.label = () => labelRenderer(context);
          return h(ElDescriptionsItem, {
            ...itemProps,
            key: index,
            align: column.align ?? align,
            labelAlign: column.labelAlign ?? labelAlign
          }, itemSlots);
        })
      };
      if (slots.title) descriptionSlots.title = () => slots.title?.({ props, attrs });
      if (slots.extra) descriptionSlots.extra = () => slots.extra?.({ props, attrs });
      return withDirectives(h(ElDescriptions, {
        ...descriptionProps,
        ...attrs,
        'element-loading-text': loading.text ?? 'Loading...',
        'element-loading-svg': loading.svg,
        'element-loading-spinner': loading.spinner,
        'element-loading-svg-view-box': loading.svgViewBox,
        'element-loading-background': loading.background
      }, descriptionSlots), [[vLoading, loading.load ?? false]]);
    };
  }
});
