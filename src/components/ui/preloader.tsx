import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => setIsComplete(true),
      });

      // 1. Animate Counter or Text
      tl.fromTo(
        ".loader-text span",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
      );

      // 2. Wait for window load (simulated here, but you can check document.readyState)
      tl.to(".loader-text", {
        opacity: 0,
        y: -50,
        duration: 0.5,
        delay: 0.5, // Give the user a moment to see the brand
        ease: "power2.in",
      });

      // 3. Reveal the site (Slide up curtain)
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });
    },
    { scope: containerRef },
  );

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1B1B1C] text-[#F1EFE5]"
    >
      <div
        ref={textRef}
        className="loader-text overflow-hidden flex gap-2 text-4xl md:text-6xl font-bold font-hero tracking-tighter uppercase"
      >
        <span className="inline-block">Cyber</span>
        <span className="inline-block">Shield</span>
        <span className="inline-block text-[#E2F949]">2026</span>
      </div>
    </div>
  );
}
