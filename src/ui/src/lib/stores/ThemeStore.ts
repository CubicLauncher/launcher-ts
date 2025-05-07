import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme } from '../themes/types';
import { applyTheme, initializeTheme } from '../themes/utils';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: initializeTheme(),
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          applyTheme(newTheme);
          return { theme: newTheme };
        }),
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
    }),
    {
      name: 'cubic-theme-store',
    }
  )
);

// Initialize theme on store creation
const savedTheme = localStorage.getItem('cubic-theme-store');
if (savedTheme) {
  const { state } = JSON.parse(savedTheme);
  document.documentElement.classList.toggle('dark', state.theme === 'dark');
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
  useThemeStore.getState().setTheme('dark');
}

export default useThemeStore;
