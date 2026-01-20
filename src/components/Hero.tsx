import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CUSTOM_EASE = "cubic-bezier(0.43, 0.195, 0.02, 1)";

export default function LandingPage() {
  const containerRef = useRef<HTMLElement>(null);
  const bgMediaRef = useRef<HTMLDivElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: CUSTOM_EASE } });

        // Title Reveal
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
          "-=1.0",
        );

        // CTA Fade In
        tl.fromTo(
          ctaButtonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.8",
        );

        // Parallax Effect
        if (bgMediaRef.current) {
          gsap.to(bgMediaRef.current, {
            scrollTrigger: {
              trigger: containerRef.current,
              scroller: document.documentElement,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            y: "20%",
            scale: 1.1,
            ease: "none",
          });
        }
      }, containerRef);

      return () => {
        ctx.revert();
      };
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <main className="w-full bg-[#F1EFE5] font-sans text-[#F1EFE5]">
      <section
        ref={containerRef}
        className="relative flex h-svh min-h-[600px] w-full flex-col justify-between overflow-hidden bg-[#1B1B1C] text-white"
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            ref={bgMediaRef}
            className="relative h-full w-full origin-center scale-110"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/assets/background.mp4"
              autoPlay
              muted
              loop
              playsInline
              // poster=""
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 h-[40%] bg-gradient-to-b from-black/30 via-transparent to-transparent" />
          </div>
        </div>

        {/* Main Title Area */}
        <div className="font-hero relative z-10 flex grow flex-col items-start justify-center px-6 pt-24 md:px-12 md:pt-32">
          <h1 className="flex select-none flex-col items-start text-[clamp(3.5rem,10vw,11rem)] font-bold leading-[0.8] tracking-[-0.04em] uppercase">
            <div className="relative block">
              <span className="title-mask-inner block translate-y-full">
                Cyber-Security
              </span>
            </div>
            <div className="relative ml-[12vw] block overflow-hidden md:ml-[8vw]">
              <span className="title-mask-inner block translate-y-full">
                FOR
              </span>
            </div>
            <div className="relative -ml-[2vw] block overflow-hidden">
              <span className="title-mask-inner block translate-y-full">
                Everyone
              </span>
            </div>
          </h1>
        </div>

        {/* Bottom Area */}
        <div className="relative z-10 flex w-full flex-col items-end justify-between gap-6 px-6 pb-8 md:flex-row md:gap-10 md:px-12 md:pb-12">
          <div className="hidden max-w-2xl text-lg font-bold leading-[0.9] tracking-tighter uppercase md:block md:text-xl lg:text-2xl">
            <div className="overflow-hidden">
              <div className="bottom-text-line translate-y-full opacity-0">
                EMPOWERING A COMMUNITY
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="bottom-text-line translate-y-full opacity-0">
                WHERE STUDENTS CONNECT, LEARN & LEAD
              </div>
            </div>
          </div>

          <div
            ref={ctaButtonsRef}
            className="flex w-full flex-col gap-4 md:w-auto md:flex-row"
          >
            <CTAButton text="Join CyberShield" href="#contact" />
            <CTAButton text="View upcoming events" href="#events" />
          </div>
        </div>
      </section>
    </main>
  );
}

// --- Helper Component ---

function CTAButton({ text, href }: { text: string; href: string }) {
  return (
    <a
      href={href}
      className="group relative inline-flex min-w-[220px] w-full items-center justify-between overflow-hidden rounded border border-[#F1EFE5] px-6 py-4 text-sm uppercase tracking-tight transition-colors duration-300 hover:border-transparent hover:text-black md:w-auto md:px-8 md:py-3 md:text-base"
    >
      <span className="absolute inset-0 origin-top-left scale-0 transform bg-[#F1EFE5] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-100" />
      <span className="relative z-10 font-medium">{text}</span>
      <span className="relative z-10 text-lg transform transition-transform duration-300 rotate-180 group-hover:-translate-x-1">
        ↳
      </span>
    </a>
  );
}
