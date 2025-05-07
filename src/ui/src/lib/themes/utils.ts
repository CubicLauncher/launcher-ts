import type { Theme } from './types';

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getSavedTheme(): Theme | null {
  const savedTheme = localStorage.getItem('cubic-theme-store');
  if (savedTheme) {
    try {
      const { state } = JSON.parse(savedTheme);
      return state.theme;
    } catch {
      return null;
    }
  }
  return null;
}

export function initializeTheme(): Theme {
  const savedTheme = getSavedTheme();
  if (savedTheme) {
    applyTheme(savedTheme);
    return savedTheme;
  }

  const systemTheme = getSystemTheme();
  applyTheme(systemTheme);
  return systemTheme;
} 