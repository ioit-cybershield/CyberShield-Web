// src/providers/lenis-provider.tsx
import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // 1. Create Lenis instance (keep your options if you already have them)
    const lenisInstance = new Lenis({
      // ...your existing options
      // e.g. smoothWheel: true, lerp: 0.1, etc.
      smoothWheel: true,
      lerp: 0.1,
    });

    setLenis(lenisInstance);

    // 2. Decide which element is the "scroll root"
    // You are currently using the document root in your ScrollTrigger configs.[file:1]
    const scrollElement = document.documentElement;

    // 3. Let ScrollTrigger know Lenis is controlling scroll on this element
    ScrollTrigger.scrollerProxy(scrollElement, {
      scrollTop(value) {
        if (arguments.length) {
          // ScrollTrigger is trying to set scroll position
          lenisInstance.scrollTo(value as number, { immediate: true });
        }
        // Return current scroll value
        return window.scrollY || window.pageYOffset;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // Critical when using smooth scroll libraries with pinned sections.[web:3][web:8]
      pinType: scrollElement.style.transform ? "transform" : "fixed",
    });

    // 4. Keep ScrollTrigger in sync with Lenis scroll events
    lenisInstance.on("scroll", ScrollTrigger.update);

    // 5. Drive Lenis with GSAP's ticker (recommended by Lenis docs).[web:6]
    const update = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // 6. Make this the default scroller for ALL ScrollTriggers
    ScrollTrigger.defaults({
      scroller: scrollElement,
    });

    // 7. Refresh once everything is set up to fix trigger positions
    // (important when you have pinned sections like TimelineSpinner).[web:13][file:1]
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(update);
      lenisInstance.destroy();

      // Clear the proxy and kill triggers only when leaving the page
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ScrollTrigger.scrollerProxy(scrollElement, null as any);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
