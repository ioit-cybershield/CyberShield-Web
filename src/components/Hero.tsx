"use client"; // Add this if using Next.js App Router

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

// Register Plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const CUSTOM_EASE = "cubic-bezier(0.43, 0.195, 0.02, 1)";

export default function LandingPage() {
  const containerRef = useRef<HTMLElement>(null);
  const bgMediaRef = useRef<HTMLDivElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);

  // 1. Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis to GSAP Ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing for better sync
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // 2. GSAP Animations (Scoped to container)
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: CUSTOM_EASE } });

      // Title Lines Reveal
      tl.to(".title-mask-inner", {
        y: "0%",
        duration: 1.5,
        stagger: 0.15,
        delay: 0.2,
      });

      // Bottom Text Reveal
      tl.to(
        ".bottom-text-line",
        {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
        },
        "-=1.0"
      );

      // CTA Fade In
      tl.fromTo(
        ctaButtonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      );

      // Parallax Effect on Scroll
      gsap.to(bgMediaRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: "20%",
        scale: 1.1,
        ease: "none",
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="w-full min-h-screen font-sans text-[#F1EFE5] bg-[#F1EFE5]">
      {/* --- HERO SECTION --- */}
      <section
        ref={containerRef}
        className="relative w-full h-svh min-h-150 overflow-hidden bg-[#1B1B1C] text-white flex flex-col justify-between"
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            ref={bgMediaRef}
            className="relative w-full h-full scale-110 origin-center"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="https://www.gencellenergy.com/wp-content/uploads/2023/08/GENCELL-VIDEO-HEADER-4-HOME.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-transparent h-[40%]" />
          </div>
        </div>

        {/* Main Title Area */}
        <div className="relative z-10 w-full px-6 md:px-12 pt-24 md:pt-32 grow flex flex-col justify-center items-start font-hero">
          <h1 className="font-bold leading-[0.8] uppercase tracking-[-0.04em] text-[clamp(3.5rem,10vw,11rem)] flex flex-col items-start select-none">
            <div className="overflow-hidden relative block">
              <span className="title-mask-inner block translate-y-full">
                Cyber-Security
              </span>
            </div>
            <div className="overflow-hidden relative block ml-[12vw] md:ml-[8vw]">
              <span className="title-mask-inner block translate-y-full">
                FOR
              </span>
            </div>
            <div className="overflow-hidden relative block -ml-[2vw]">
              <span className="title-mask-inner block translate-y-full">
                Everyone
              </span>
            </div>
          </h1>
        </div>

        {/* Bottom Area */}
        <div className="relative z-10 w-full px-6 md:px-12 pb-8 md:pb-12 flex flex-col md:flex-row justify-between items-end gap-6 md:gap-10">
          <div className="font-bold text-lg md:text-xl lg:text-2xl leading-[0.9] uppercase tracking-tighter max-w-sm hidden md:block">
            <div className="overflow-hidden">
              <div className="bottom-text-line translate-y-full opacity-0">
                FEARLESSLY FUELING
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="bottom-text-line translate-y-full opacity-0">
                THE FUTURE
              </div>
            </div>
          </div>

          <div
            ref={ctaButtonsRef}
            className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
          >
            <CTAButton text="U.S. Power Gap" href="#gap" />
            <CTAButton text="Power your project now" href="#contact" />
          </div>
        </div>
      </section>

      {/* --- DUMMY CONTENT (To Enable Scroll) --- */}
      <div className="h-screen flex items-center justify-center text-black">
        <h2 className="text-4xl font-bold uppercase tracking-tight">
          Scroll Content
        </h2>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

const CTAButton = ({ text, href }: { text: string; href: string }) => {
  return (
    <a
      href={href}
      className="group relative overflow-hidden inline-flex items-center justify-between px-6 py-4 md:px-8 md:py-3 border border-[#F1EFE5] rounded text-sm md:text-base uppercase tracking-tight transition-colors duration-300 hover:text-black hover:border-transparent min-w-55 w-full md:w-auto"
    >
      <span className="absolute inset-0 bg-[#F1EFE5] transform origin-top-left scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
      <span className="relative z-10 font-medium">{text}</span>
      <span className="relative z-10 transform rotate-180 group-hover:-translate-x-1 transition-transform duration-300 text-lg">
        ↳
      </span>
    </a>
  );
};
