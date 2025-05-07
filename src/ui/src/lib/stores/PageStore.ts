import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definir el tipo Page
export type Page = "Home" | "Downloads" | "Play"; // Exportamos solo el tipo, no el valor

interface PageStore {
  page: Page;
  togglePage: () => void;
  setPage: (page: Page) => void;
}

export const usePageStore = create<PageStore>()(
  persist(
    (set) => ({
      page: 'Home',
      togglePage: () =>
        set((state) => {
          const next: Page =
            state.page === 'Home' ? 'Downloads' : state.page === 'Downloads' ? 'Play' : 'Home';
          return { page: next };
        }),
      setPage: (page) => set({ page }),
    }),
    {
      name: 'page-store',
    }
  )
);

