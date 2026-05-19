/**
 * Usage — wrap children in your root layout with NavigationProvider:
 *
 * import { NavigationProvider } from "@/contexts/NavigationContext";
 * import PageTransition from "@/components/common/PageTransition";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <NavigationProvider>
 *           <PageTransition>{children}</PageTransition>
 *         </NavigationProvider>
 *       </body>
 *     </html>
 *   );
 * }
 */

"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, type PropsWithChildren, useRef } from "react";
import { createPortal } from "react-dom";
import { isShellRoute } from "@/lib/shell/routes";

const EASE = [0.76, 0, 0.24, 1] as const;
const TRANSITION_DURATION = 0.5; // 500ms

export default function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const shellRoute = isShellRoute(pathname);
  const reduced = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isVisible, setIsVisible] = useState(true);
  const exitPromiseRef = useRef<{ resolve: () => void } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Listen for exit event from navigation context
    const handleExit = () => {
      setIsExiting(true);
      setIsVisible(false);

      // Resolve the exit promise after animation completes
      setTimeout(() => {
        if (exitPromiseRef.current) {
          exitPromiseRef.current.resolve();
          exitPromiseRef.current = null;
        }
      }, TRANSITION_DURATION * 1000);
    };

    window.addEventListener("page-transition-exit", handleExit);

    return () => {
      window.removeEventListener("page-transition-exit", handleExit);
    };
  }, []);

  useEffect(() => {
    if (reduced) {
      setDisplayChildren(children);
      setIsVisible(true);
      return;
    }

    // When pathname changes, this is the new page entering
    setDisplayChildren(children);
    setIsVisible(true);
    setIsExiting(false);
  }, [pathname, children, reduced]);

  const exitCurtain = (
    <AnimatePresence>
      {isExiting && (
        <motion.div
          key="exit-curtain"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "#2563eb" }}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{
            duration: TRANSITION_DURATION,
            ease: EASE,
          }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, delay: 0.1, ease: EASE }}
          >
            <span className="relative text-3xl font-bold tracking-tight select-none overflow-hidden inline-block">
              <span className="text-blue-300">LummyBlue</span>
              <motion.span
                className="absolute inset-0 text-white"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
              >
                LummyBlue
              </motion.span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const enterCurtain = (
    <AnimatePresence>
      {!isExiting && isVisible && (
        <motion.div
          key={`enter-${pathname}`}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          style={{ backgroundColor: "#2563eb" }}
          initial={{ opacity: 1, y: "-100%" }}
          animate={{ opacity: 0, y: "-100%" }}
          exit={{ opacity: 0 }}
          transition={{
            duration: TRANSITION_DURATION,
            ease: EASE,
          }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            animate={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span className="relative text-3xl font-bold tracking-tight select-none overflow-hidden inline-block text-white">
              LummyBlue
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (shellRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {mounted && createPortal(exitCurtain, document.body)}
      {mounted && createPortal(enterCurtain, document.body)}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.5,
          ease: EASE,
          delay: reduced ? 0 : 0.2,
        }}
      >
        {displayChildren}
      </motion.div>
    </>
  );
}
