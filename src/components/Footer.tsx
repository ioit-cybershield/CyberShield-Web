import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger if you haven't globally
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: document.documentElement,
          start: "top 90%", // Start animating when footer hits bottom of viewport
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Animate the separator line (optional, purely aesthetic addition)
      tl.fromTo(
        ".footer-divider",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1, ease: "expo.out" }
      );

      // 2. Stagger in all navigation links
      tl.fromTo(
        ".footer-link",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // 3. Massive Text Reveal (Parallax-ish slide up)
      tl.fromTo(
        bigTextRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover animation for links using GSAP (cleaner than pure CSS transition)
  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      color: "#9ca3af",
      duration: 0.3,
      ease: "power2.out",
    }); // gray-400
  };

  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <footer
      ref={containerRef}
      className="w-full bg-black text-white pt-20 pb-10 px-6 md:px-12 overflow-hidden relative"
    >
      {/* Optional: Top Divider if you want to separate from content above */}
      <div className="footer-divider w-full h-[1px] bg-white/20 mb-16" />

      <div
        ref={linksRef}
        className="max-w-[1920px] mx-auto flex flex-col justify-between h-full min-h-[50vh]"
      >
        {/* Top Row: Navigation */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 mb-12 md:mb-0">
          {/* Left: Main Nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {["Services", "Events", "Team", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="footer-link text-base md:text-lg font-medium tracking-wide cursor-pointer"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right: Legal */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {["Imprint", "Data", "Accessibility"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="footer-link text-base md:text-lg font-medium tracking-wide cursor-pointer"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Middle Row: Socials & Credit */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 mt-8 mb-20 md:mb-32">
          {/* Left: Socials */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {["LinkedIn", "TikTok", "Instagram"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="footer-link text-base md:text-lg font-medium tracking-wide cursor-pointer"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom: Massive Brand Typography */}
        <div className="relative w-full flex justify-center items-end mt-auto">
          <h1
            ref={bigTextRef}
            className="text-[14vw] md:text-[15.5vw] leading-[0.8] font-bold tracking-tighter text-white whitespace-nowrap select-none mix-blend-difference"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }} // Fallback to standard grotesque
          >
            CyberShield
            <span className="text-[4vw] align-top relative top-[2vw]">®</span>
          </h1>
        </div>
      </div>
    </footer>
  );
}
