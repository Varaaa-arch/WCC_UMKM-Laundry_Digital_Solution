import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AdminUiState {
  sidebarCollapsed: boolean
  mobileOpen: boolean
  setSidebarCollapsed: (v: boolean) => void
  toggleSidebar: () => void
  setMobileOpen: (v: boolean) => void
}

export const useAdminUiStore = create<AdminUiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileOpen: false,
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setMobileOpen: (mobileOpen) => set({ mobileOpen }),
    }),
    { name: "admin-ui", partialize: (s) => ({ sidebarCollapsed: s.sidebarCollapsed }) }
  )
)
