import type { DescriptionProps } from 'element-plus';
import type { Ref, VNodeChild } from 'vue';

export type DescriptionsAlign = 'left' | 'center' | 'right';
export interface ShwDescriptionsLoading {
  load?: boolean;
  text?: string;
  svg?: string;
  spinner?: string;
  svgViewBox?: string;
  background?: string;
}
export interface ShwDescriptionRenderContext {
  props: Readonly<ShwDescriptionsProps>;
  attrs: Record<string, unknown>;
  index: number;
  value: unknown;
  values: unknown[];
}
export interface ShwDescriptionColumn {
  prop?: string;
  label?: string;
  value?: unknown | Ref<unknown>;
  hide?: (attrs: Record<string, unknown>) => boolean;
  slot?: string;
  copy?: boolean | Ref<boolean>;
  labelRenderer?: (context: ShwDescriptionRenderContext) => VNodeChild;
  cellRenderer?: (context: ShwDescriptionRenderContext) => VNodeChild;
  span?: number;
  rowspan?: number;
  width?: string | number;
  minWidth?: string | number;
  align?: DescriptionsAlign;
  labelAlign?: DescriptionsAlign;
  className?: string;
  labelClassName?: string;
  labelWidth?: string | number;
}
export interface ShwDescriptionsProps extends Partial<DescriptionProps> {
  data?: Record<string, unknown>[];
  columns?: ShwDescriptionColumn[];
  loading?: ShwDescriptionsLoading;
  align?: DescriptionsAlign;
  labelAlign?: DescriptionsAlign;
}
export type DescriptionsColumns = ShwDescriptionColumn;
export type Loading = ShwDescriptionsLoading;
export type PureDescriptionsProps = ShwDescriptionsProps;
