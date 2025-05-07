import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarState: (isCollapsed: boolean) => void;
}

const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setSidebarState: (isCollapsed) => set({ isCollapsed }),
    }),
    {
      name: 'cubic-sidebar-store',
    }
  )
);

export default useSidebarStore; 