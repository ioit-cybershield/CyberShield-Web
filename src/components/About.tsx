import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  // --- PRESERVED ANIMATION LOGIC ---
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        // 1. Editorial Fade Up (Preserved & Applied to new elements)
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
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                scroller: document.documentElement,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // 2. Heavy Numbers Scroll (Preserved)
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
                scroller: document.documentElement,
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
                scroller: document.documentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        });

        // 3. Flat Editorial Parallax (Preserved)
        const parallaxImages = gsap.utils.toArray<HTMLElement>(
          ".parallax-img-wrapper"
        );
        parallaxImages.forEach((wrapper) => {
          const img = wrapper.querySelector<HTMLImageElement>("img");
          if (!img) return;

          gsap.fromTo(
            img,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                scroller: document.documentElement,
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
      className="relative w-full bg-white text-[#151313] antialiased overflow-hidden selection:bg-black selection:text-white"
      style={{ fontFamily: "Haffer VF, Arial, sans-serif" }}
    >
      {/* --- OSMO REPLICA SECTION --- */}
      <div className="pt-24 md:pt-32 pb-12 px-6 md:px-12 lg:px-16 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12">
          {/* Left Column: Micro Graphic (Decorative) */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-3">
            <div className="w-24 h-24 md:w-32 md:h-32 sticky top-32 animate-fade-up">
              <img
                src="https://cdn.prod.website-files.com/68a5787bba0829184628bd51/6908b738a1be84c388fd6401_osmo-micrographic-2.avif"
                alt="Decorative Graphic"
                className="w-full h-full object-contain opacity-80"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Editorial Content */}
          <div className="lg:col-span-9 xl:col-span-9 relative">
            {/* Scribble Element */}
            <div className="animate-fade-up absolute -top-16 left-0 md:-left-8 lg:-left-24 hidden md:block z-10 pointer-events-none">
              <div className="relative">
                <p className="text-[#f84131] font-serif italic text-lg transform -rotate-6 translate-x-4">
                  Why CyberShield?
                </p>
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="text-[#f84131] w-20 h-20 md:w-24 md:h-24"
                >
                  <path
                    d="M30.3491 31.5811L30.558 30.3311L31.1618 29.9525C29.2036 30.1222 28.2898 27.0739 26.4295 26.369C25.8681 26.1568 25.7735 26.8128 25.9497 27.0119C25.9921 27.0609 26.6775 27.2502 27.0985 27.6516C27.4575 27.9975 29.1938 29.5543 28.8805 29.9492C23.8153 29.4434 19.1711 28.2358 14.7619 25.6477C5.77699 20.3802 0.852119 10.8502 0.0231477 0.612125C-0.616531 15.7327 12.0922 28.8428 26.9223 30.2821C26.5796 31.1372 23.8022 30.2234 23.9882 31.5811H30.3459H30.3491Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            {/* Main Headline */}
            <div className="mb-20 md:mb-32">
              <h3 className="animate-fade-up text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] leading-[0.95] tracking-tight font-medium max-w-5xl">
                Level up your game and join a community of creatives who love
                building great websites as much as you do.
              </h3>
            </div>

            {/* Editorial List */}
            <div className="w-full flex flex-col">
              {[
                {
                  title: "Build faster and better",
                  text: "Our resources save you hours of rebuilding from scratch. Each one is made for real-world projects, so you can focus on shipping work that stands out.",
                },
                {
                  title: "Speed up your process",
                  text: "These aren't stripped-down templates. Every resource is built to be fast, flexible, and production-ready, so you can ship beautiful work without trading quality for time.",
                },
                {
                  title: "A living and growing system",
                  text: "We keep adding new resources, ideas, and techniques every week. The Vault evolves with you and your needs, so your toolkit never stops expanding.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="animate-fade-up grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-12 py-10 md:py-14 border-t border-[#151313]/10 last:border-b"
                >
                  <div className="md:col-span-4 lg:col-span-4">
                    <h4 className="text-xl md:text-2xl font-medium tracking-tight">
                      {item.title}
                    </h4>
                  </div>
                  <div className="md:col-span-8 lg:col-span-7 lg:col-start-6">
                    <p className="text-lg md:text-xl text-[#151313]/80 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- PRESERVED HEAVY NUMBERS (Fixed Spacing) --- */}
      {/* CHANGES MADE:
          1. Removed gap-4 md:gap-12 (replaced with gap-0).
          2. Increased mobile text size to 30vw (was 20vw).
          3. Added negative margin (-ml-2 md:-ml-8) to the second number to pull them together.
          4. Added tracking-tighter to reduce space between glyphs.
      */}
      <div className="heavy-numbers-container relative w-full h-[30vh] md:h-[50vh] flex flex-row items-center justify-center gap-2 md:gap-11 pointer-events-none select-none overflow-hidden my-6 md:my-12 opacity-80">
        <div className="heavy-number-left z-10">
          <span
            className="text-[30vw] md:text-[25rem] leading-none font-bold text-transparent tracking-tighter"
            style={{ WebkitTextStroke: "1px #e49700" }}
          >
            20
          </span>
        </div>
        <div className="heavy-number-right z-0 -ml-2 md:-ml-12">
          <span
            className="text-[30vw] md:text-[25rem] leading-none font-bold text-transparent tracking-tighter"
            style={{ WebkitTextStroke: "1px #e49700" }}
          >
            25
          </span>
        </div>
      </div>

      {/* --- PRESERVED PARALLAX IMAGES (Re-integrated) --- */}
      {/* <div className="px-6 md:px-12 lg:px-16 max-w-[1920px] mx-auto pb-24 md:pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
             ... (Parallax content) ...
          </div>
        </div> */}
    </section>
  );
};

export default AboutSection;
