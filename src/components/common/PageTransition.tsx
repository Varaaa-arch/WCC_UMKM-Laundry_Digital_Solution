/**
 * Usage — wrap children in your root layout:
 *
 * import PageTransition from "@/components/common/PageTransition";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <PageTransition>{children}</PageTransition>
 *       </body>
 *     </html>
 *   );
 * }
 */

"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [transitioning, setTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => setDisplayChildren(children), 0);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setTransitioning(true), 0);
    const t2 = setTimeout(() => {
      setDisplayChildren(children);
      setTransitioning(false);
    }, 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const curtain = (
    <AnimatePresence>
      {transitioning && (
        <motion.div
          key="curtain"
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: "#2563eb", zIndex: 9999 }}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="relative text-2xl font-bold tracking-tight select-none overflow-hidden inline-block">
            {/* base — abu */}
            <span className="text-blue-300">ResikLaundry</span>
            {/* sweep putih kiri → kanan */}
            <motion.span
              className="absolute inset-0 text-white"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              ResikLaundry
            </motion.span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {typeof document !== "undefined" && createPortal(curtain, document.body)}
      {displayChildren}
    </>
  );
}
