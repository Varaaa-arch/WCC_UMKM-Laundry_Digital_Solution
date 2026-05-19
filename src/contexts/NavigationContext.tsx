"use client";

import { createContext, useContext, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

interface NavigationContextType {
  navigate: (href: string) => Promise<void>;
  isTransitioning: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioningRef = useRef(false);

  const navigate = useCallback(
    async (href: string) => {
      // Don't navigate if already transitioning or same page
      if (isTransitioningRef.current || href === pathname) {
        return;
      }

      isTransitioningRef.current = true;

      // Dispatch custom event to trigger exit animation
      window.dispatchEvent(new CustomEvent("page-transition-exit"));

      // Wait for exit animation to complete (matches the 500ms duration in PageTransition)
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Perform route change
      router.push(href);

      // Reset transitioning state after route change
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 100);
    },
    [router, pathname]
  );

  return (
    <NavigationContext.Provider
      value={{
        navigate,
        isTransitioning: isTransitioningRef.current,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
