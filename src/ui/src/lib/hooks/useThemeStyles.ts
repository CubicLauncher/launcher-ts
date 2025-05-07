import { useMemo } from 'react';
import useThemeStore from '../stores/ThemeStore';
import themeConfig from '../themes/theme.json';
import type { ThemeConfig } from '../themes/types';

export function useThemeStyles(): ThemeConfig {
  const { theme } = useThemeStore();

  const styles = useMemo(() => {
    return themeConfig[theme] as ThemeConfig;
  }, [theme]);

  return styles;
} 