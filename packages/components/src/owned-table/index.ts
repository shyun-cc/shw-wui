import type { App } from 'vue';
import Table from './table';
import type { ShwTableComponent, ShwTableRow } from './types';

/** Independently maintained table; global locale comes from the host ElConfigProvider. */
export const ShwTable = Object.assign(Table, {
  install(app: App) { app.component('ShwTable', Table); }
});
/**
 * Bind columns, data, and renderer callbacks to a concrete row interface.
 * The returned component is the same runtime implementation, with no wrapper.
 *
 * @example const UserTable = createShwTable<UserRow>();
 */
export function createShwTable<Row extends ShwTableRow>(): ShwTableComponent<Row> {
  return ShwTable as unknown as ShwTableComponent<Row>;
}
export default ShwTable;
export type {
  ShwTableRow, ShwTableAlign, ShwTableLocale, ShwTableColumn,
  ShwTableColumnScope, ShwTableColumnRenderer, ShwTablePagination,
  ShwTableAdaptiveConfig, ShwTableLoadingConfig, ShwTableExtensions,
  ShwTableProps, ShwTableExpose, ShwTableComponent
} from './types';
