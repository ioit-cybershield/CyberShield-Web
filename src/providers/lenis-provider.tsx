import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Critical: Set up scroller proxy
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value as number, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // Proper GSAP ticker integration
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // RAF loop
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Refresh ScrollTrigger on resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return <>{children}</>;
}
