import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        // 1. Editorial Fade Up
        // Slower, smoother, more "calm" than the previous pop-up animation
        const fadeElements =
          gsap.utils.toArray<HTMLElement>(".animate-fade-up");
        fadeElements.forEach((el) => {
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out", // Softer easing
              scrollTrigger: {
                trigger: el,
                start: "top 85%", // Triggers slightly later for editorial pacing
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // 2. Heavy Numbers Scroll (The Year)
        // Keeps the timeline but ensures it's subtle
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          gsap.fromTo(
            ".heavy-number-left",
            { yPercent: 10 },
            {
              yPercent: -20,
              ease: "none",
              scrollTrigger: {
                trigger: ".heavy-numbers-container",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );

          gsap.fromTo(
            ".heavy-number-right",
            { yPercent: -10 },
            {
              yPercent: 20,
              ease: "none",
              scrollTrigger: {
                trigger: ".heavy-numbers-container",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        });

        // 3. Flat Editorial Parallax
        // Removed the SCALE effect. Pure vertical movement for a "print" feel.
        const parallaxImages = gsap.utils.toArray<HTMLElement>(
          ".parallax-img-wrapper"
        );
        parallaxImages.forEach((wrapper) => {
          const img = wrapper.querySelector<HTMLImageElement>("img");
          if (!img) return;

          gsap.fromTo(
            img,
            { yPercent: -10 }, // Subtle starting position
            {
              yPercent: 10, // Subtle ending position
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white text-[#0a0a0a] antialiased overflow-hidden"
      // Assuming you have the font loaded globally, otherwise falls back to sans
      style={{ fontFamily: "Neuemontreal, sans-serif" }}
    >
      {/* --- Main Container with generous whitespace --- */}
      <div className="pt-16 md:pt-32 px-6 md:px-12 lg:px-16 max-w-[1920px] mx-auto pb-16 md:pb-24">
        {/* --- Header Section --- */}
        <div className="mb-20 md:mb-40">
          <h1 className="animate-fade-up text-[12vw] md:text-[7.5rem] lg:text-[9rem] leading-[0.85] tracking-tight ">
            <span className="font-bold block">About </span>
            <span className="text-[#f9a90d] font-light block ml-8 md:ml-24">
              Us
            </span>
          </h1>
        </div>

        {/* --- Intro Grid (Swiss Layout) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 mb-20 md:mb-32 relative z-10 border-t border-black/10 pt-8">
          {/* Label */}
          {/* <div className="lg:col-span-3 xl:col-span-4">
            <div className="animate-fade-up text-[#f9a90d] text-xs md:text-xs uppercase tracking-widest font-bold">
              [ 01 — Mission ]
            </div>
          </div> */}

          {/* Editorial Content */}
          <div className="lg:col-span-9 xl:col-span-8">
            <h3 className="animate-fade-up text-[1.5rem] md:text-[2.5rem] leading-[1.1] font-medium max-w-4xl indent-12 md:indent-24">
              We are a student collective dedicated to the art of defensive and
              offensive security. Bridging the gap between theoretical
              coursework and real-world infrastructure protection.
            </h3>
          </div>
        </div>

        {/* --- NEW SECTION: Asymmetric "Manifesto" (Requested Change #4) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-12 mb-24 md:mb-48 relative z-10">
          {/* Offset Empty Space to break rhythm */}
          <div className="hidden lg:block lg:col-span-5"></div>

          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 md:gap-12 border-t border-black/10 pt-8">
            {/* <div className="animate-fade-up text-black/50 text-xs uppercase tracking-widest font-bold shrink-0 w-32">
              [ 02 — Ethos ]
            </div> */}
            <div className="animate-fade-up">
              <p className="text-lg md:text-xl leading-tight font-medium">
                Security is not a product, it’s a mindset. We believe in{" "}
                <span className="text-[#f9a90d]">learning by breaking</span>.
                Through weekly CTFs, reverse engineering workshops, and
                open-source contributions, we build the immune system of the
                digital future.
              </p>
            </div>
          </div>
        </div>

        {/* --- Heavy Numbers (Timeline) --- */}
        {/* FIX APPLIED: Changed to flex-row for mobile alignment, added gap for desktop spacing, removed justify-between */}
        <div className="heavy-numbers-container relative w-full h-[20vh] md:h-[60vh] flex flex-row items-center justify-center gap-2 md:gap-8 pointer-events-none select-none overflow-hidden my-12 md:my-24">
          {/* NEW TAG: Est. Since */}
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="bg-[#f9a90d] text-white text-[10px] md:text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full shadow-lg">
              Est. Since
            </div>
          </div> */}

          <div className="heavy-number-left">
            <span
              className="text-[22vw] md:text-[25rem] lg:text-[30rem] leading-none font-bold text-transparent"
              style={{ WebkitTextStroke: "1px #e49700" }}
            >
              20
            </span>
          </div>

          <div className="heavy-number-right">
            <span
              className="text-[22vw] md:text-[25rem] lg:text-[30rem] leading-none font-bold text-transparent"
              style={{ WebkitTextStroke: "1px #e49700" }}
            >
              23
            </span>
          </div>
        </div>

        {/* --- Stats & Image Grid --- */}
        {/* Removed "Founded By" list completely. Replaced with Impact Metrics. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-end mb-24 md:mb-40 relative z-10">
          {/* Left: Community Image (Replaces HQ image) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            {/* <div className="animate-fade-up text-[#f9a90d] text-xs uppercase tracking-widest font-bold mb-2">
              [ 03 — Culture ]
            </div> */}
            <div className="animate-fade-up w-full overflow-hidden">
              {/* Editorial Image: Flat, no 3D transforms */}
              <div className="parallax-img-wrapper relative h-[300px] md:h-[400px] w-full bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                  alt="Coding Session"
                  className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-xs text-gray-500">
                LATE NIGHT SESSION, HALL 4
              </p>
            </div>
          </div>

          {/* Right: Big Impact Metric */}
          <div className="lg:col-span-7 xl:col-span-8 w-full border-t border-black/10 pt-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-8">
              <div className="animate-fade-up flex items-baseline leading-none text-[#f9a90d] shrink-0">
                <span className="text-[6rem] md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter">
                  48
                </span>
                <div className="flex flex-col text-sm md:text-lg font-sans font-bold ml-4 mb-4 md:mb-10 text-black tracking-tight">
                  <span>EVENTS</span>
                  <span>HOSTED</span>
                </div>
              </div>

              <div className="animate-fade-up max-w-sm mb-6 md:mb-14">
                <p className="text-black/60 text-sm md:text-base leading-tight">
                  From internal hackathons to guest lectures by industry
                  veterans, we provide consistent opportunities for hands-on
                  growth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Parallax Gallery Section (No Scale/3D) --- */}
        <div className="relative w-full mb-24 md:mb-48 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Image */}
          <div className="animate-fade-up w-full md:mt-24">
            <div className="parallax-img-wrapper relative overflow-hidden h-[300px] md:h-[500px] w-full bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
                alt="Cybersecurity Lock Visualization"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex justify-between text-xs font-mono uppercase text-gray-400">
              <span>Fig. A</span>
              <span>Encryption Standards</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="animate-fade-up w-full">
            <div className="parallax-img-wrapper relative overflow-hidden h-[300px] md:h-[500px] w-full bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                alt="Server Room"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex justify-between text-xs font-mono uppercase text-gray-400">
              <span>Fig. B</span>
              <span>Infrastructure</span>
            </div>
          </div>
        </div>

        {/* --- Bottom Stats Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 mt-16 md:mt-32 border-t border-black/10 pt-12">
          {/* Left Label */}
          <div className="lg:col-span-3 xl:col-span-4">
            {/* <div className="animate-fade-up text-[#f9a90d] text-xs uppercase tracking-widest font-bold">
              [ 04 — Impact ]
            </div> */}
          </div>

          {/* Right Content */}
          <div className="lg:col-span-9 xl:col-span-8">
            <div className="max-w-3xl mb-12 md:mb-24">
              <h3 className="animate-fade-up text-[1.5rem] md:text-[2rem] leading-[1.2] font-medium">
                We don't just study security; we actively secure. Our members
                have identified vulnerabilities in major platforms and
                contributed to open-source defense tools.
              </h3>
            </div>

            {/* Bottom Stats (Members) */}
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-12">
              <div className="animate-fade-up flex items-baseline leading-none text-[#f9a90d] shrink-0">
                <span className="text-[6rem] md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter">
                  250
                </span>
                <span className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-light self-start mt-2 md:mt-8">
                  +
                </span>
                <div className="flex flex-col text-sm md:text-lg font-bold ml-4 mb-4 md:mb-10 text-black tracking-widest">
                  <span>ACTIVE</span>
                  <span>MEMBERS</span>
                </div>
              </div>

              <div className="animate-fade-up max-w-md mb-4 md:mb-12">
                <p className="text-black/60 text-sm md:text-base leading-relaxed">
                  Students from various disciplines coming together to build a
                  safer web.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
