import { resolveTheme } from '@shwkj/shw-ui-tokens';

/** CSS variables to set on the host root for the selected appearance. */
export function resolvePcBrand(primary: string, mode: 'light' | 'dark' = 'light'): Record<string, string> {
  const vars = resolveTheme({ primary }, mode);
  return {
    '--shw-primary': vars.primary,
    '--shw-primary-light': vars['primary-light'],
    '--shw-primary-active': vars['primary-active'],
    '--shw-primary-disabled': vars['primary-disabled'],
  };
}
