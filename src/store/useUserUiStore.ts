import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserUiState {
  sidebarCollapsed: boolean
  mobileOpen: boolean
  setSidebarCollapsed: (v: boolean) => void
  toggleSidebar: () => void
  setMobileOpen: (v: boolean) => void
}

export const useUserUiStore = create<UserUiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileOpen: false,
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setMobileOpen: (mobileOpen) => set({ mobileOpen }),
    }),
    { name: "user-ui", partialize: (s) => ({ sidebarCollapsed: s.sidebarCollapsed }) }
  )
)
