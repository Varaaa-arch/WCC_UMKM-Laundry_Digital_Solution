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

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Curtain overlay */}
        <motion.div
          className="fixed inset-0 z-50 origin-bottom"
          style={{ backgroundColor: "#0a0a0a" }}
          initial={reduced ? { y: "100%" } : { y: "100%" }}
          animate={
            reduced
              ? { y: "100%" }
              : { y: ["100%", "0%", "0%", "-100%"] }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 1.1,
                  times: [0, 0.45, 0.55, 1],
                  ease: EASE,
                }
          }
        />

        {/* Page content */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.4, delay: 0.7, ease: EASE }
          }
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
