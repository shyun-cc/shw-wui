import type { App } from 'vue';
import Descriptions from './descriptions';

export const ShwDescriptions = Object.assign(Descriptions, {
  install(app: App): void {
    app.component('ShwDescriptions', Descriptions);
  }
});
export default ShwDescriptions;
export type {
  DescriptionsAlign,
  DescriptionsColumns,
  Loading,
  PureDescriptionsProps,
  ShwDescriptionColumn,
  ShwDescriptionRenderContext,
  ShwDescriptionsLoading,
  ShwDescriptionsProps
} from './types';
