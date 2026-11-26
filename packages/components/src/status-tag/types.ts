import type { TagProps } from 'element-plus';
export type ShwStatusValue = string | number | boolean;
export interface ShwStatusOption {
  value: ShwStatusValue;
  label: string;
  type?: TagProps['type'];
}
