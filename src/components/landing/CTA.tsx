import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Asset Constants ---
const GREEN_DOT_URL =
  "https://cdn.prod.website-files.com/693293123c1384ae5e258a60/693293123c1384ae5e258aa3_green-dot.svg";
const BEIGE_DOT_URL =
  "https://cdn.prod.website-files.com/693293123c1384ae5e258a60/693293123c1384ae5e258a92_beige%20dot.svg";
const BG_IMAGE_URL =
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/69271f09c85e1d1bee5d34ce_bg%20new%20croptab.avif";

const CallToAction: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set(".transition-line", { height: "0%" });

      // Ensure text starts in a clean state for GPU rendering
      gsap.set([leftContentRef.current, rightContentRef.current], {
        force3D: true,
        z: 0.1, // Tiny Z-axis push helps prevent text rasterization flicker
      });

      // 2. Main Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%", // Adjusted for a balanced scroll length
          scrub: 0.5, // Reduced scrub delay slightly for less "floaty" lag (less glitchy feel)
          pin: true,
          pinSpacing: true,
          refreshPriority: 1,
        },
      });

      // --- Phase 1: The Parallax Float ---

      // Left side moves slowly
      tl.to(
        leftContentRef.current,
        {
          yPercent: -20, // Use Percent for responsiveness
          ease: "none",
          duration: 10,
        },
        0,
      );

      // Right side moves faster (perceived depth: near)
      tl.to(
        rightContentRef.current,
        {
          yPercent: -50, // Use Percent for responsiveness
          ease: "none",
          duration: 10,
        },
        0,
      );

      // Background Parallax
      // The image is CSS positioned at top: -15%.
      // We move it yPercent: 10 (downwards).
      // Since it starts at -15% and has extra height, the top edge never enters the viewport.
      if (bgImageRef.current) {
        tl.to(
          bgImageRef.current,
          {
            yPercent: 10,
            scale: 1.1,
            ease: "none",
            duration: 10,
          },
          0,
        );
      }

      // --- Phase 2: The Exit / Curtain Wipe ---

      tl.to(
        ".transition-line",
        {
          height: "100%",
          duration: 5,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        6,
      );

      // Content Fade out
      // Switched from relative "-=50" to a hard offset calculation to prevent jitter
      tl.to(
        [leftContentRef.current, rightContentRef.current],
        {
          autoAlpha: 0,
          yPercent: -60, // Continue moving UP (from -50 to -60)
          duration: 3,
          ease: "power1.in",
        },
        7,
      );

      // 3. Button Hover Animations
      const buttons = gsap.utils.toArray<HTMLElement>(".btn-animated");
      buttons.forEach((btn) => {
        const dots = btn.querySelectorAll(".dot-icon");
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(dots, {
          scale: 1.2,
          rotation: 90,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
        btn.addEventListener("mouseenter", () => hoverTl.play());
        btn.addEventListener("mouseleave", () => hoverTl.reverse());
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="footer-animated relative w-full bg-[#404f1d] text-[#333] font-sans overflow-hidden z-[20] min-h-screen flex items-center"
      style={{ fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}
    >
      {/* --- Plant Transition Lines (Curtains) --- */}
      <div className="plant-transition absolute inset-0 flex pointer-events-none z-[10]">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <div
            key={i}
            className={`transition-line flex-1 bg-[#404f1d] border-r border-[#ffffff10] ${
              i === 1 || i === 2 ? "hidden md:block" : ""
            }`}
            style={{ transformOrigin: "top" }}
          />
        ))}
      </div>

      {/* --- Main CTA Container --- */}
      <div className="w-layout-blockcontainer container w-container mx-auto px-[1em] md:px-[1.88em] relative z-[5] py-20 md:py-32">
        <div className="footer-aniamted-wrap relative">
          <div
            id="s-cta"
            className="cta-product-new relative z-[2] text-[#f4ede6]"
          >
            <div className="cta-product-wrap grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Primary Heading (Left Column) */}
              <div
                ref={leftContentRef}
                className="cta-product-heading lg:col-span-5 will-change-transform"
              >
                <h2 className="h2-style text-[8vw] md:text-[3.5vw] leading-[1.1] font-normal text-[#636f3d] md:text-[#636f3d]">
                  <span className="block dark-green text-[#404f1d] md:text-[#333]">
                    You don’t get many
                  </span>
                  <span className="block dark-green text-[#404f1d] md:text-[#333]">
                    chances to be early
                  </span>
                </h2>
              </div>

              {/* Secondary Heading & Content (Right Column) */}
              <div
                ref={rightContentRef}
                className="cta-product-heading-secondary lg:col-span-7 flex flex-col justify-between delay-100 will-change-transform"
              >
                <div className="cta-product-heading-secondary__text mb-12">
                  <h2 className="h2-style text-[8vw] md:text-[3.5vw] leading-[1.1] font-medium text-white mb-6">
                    To lead, not follow
                  </h2>
                  <div className="text-18-caps text-white text-base md:text-lg opacity-90 max-w-xl leading-relaxed uppercase tracking-wide">
                    To shape what farming becomes — not just adapt to it.
                    <br className="hidden md:block" />{" "}
                    <br className="hidden md:block" />
                    CropTab™ is already in the hands of progressive growers
                    rewriting the rules. If you’re ready, we’ll make room for
                    you.
                  </div>
                </div>

                {/* Buttons */}
                <div className="cta-product-heading-secondary__buttons_new flex flex-col sm:flex-row gap-4">
                  {/* White Button */}
                  <a
                    href="#"
                    className="btn-animated btn-new-white w-inline-block bg-[#f4ede6] text-[#404f1d] rounded-full px-8 py-4 flex items-center justify-center gap-4 transition-transform active:scale-95"
                  >
                    <div className="btn-content flex items-center gap-3">
                      <img
                        loading="lazy"
                        alt=""
                        src={GREEN_DOT_URL}
                        className="dot-icon left w-2 h-2"
                      />
                      <div className="text-14-caps font-bold uppercase tracking-widest text-sm">
                        request a sample
                      </div>
                      <img
                        loading="lazy"
                        alt=""
                        src={GREEN_DOT_URL}
                        className="dot-icon right w-2 h-2"
                      />
                    </div>
                  </a>

                  {/* Transparent Button */}
                  <a
                    href="/contact-us"
                    className="btn-animated btn-new-transparent w-inline-block border border-[#f4ede6] text-[#f4ede6] rounded-full px-8 py-4 flex items-center justify-center gap-4 transition-colors hover:bg-[#f4ede6] hover:text-[#404f1d] active:scale-95"
                  >
                    <div className="btn-content flex items-center gap-3">
                      <img
                        loading="lazy"
                        src={BEIGE_DOT_URL}
                        alt=""
                        className="dot-icon left w-2 h-2"
                      />
                      <div className="text-14-caps font-bold uppercase tracking-widest text-sm">
                        talk to our team
                      </div>
                      <img
                        loading="lazy"
                        src={BEIGE_DOT_URL}
                        alt=""
                        className="dot-icon right w-2 h-2"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Background Parallax Image --- */}
      <div className="black-overlay absolute inset-0 bg-black/20 z-[1] pointer-events-none"></div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* FIX APPLIED HERE:
           1. h-[130%] (taller to allow movement)
           2. -top-[15%] (starts higher up, so moving down doesn't expose the background)
           3. Removed -mt-[5%] (margin-top is messy for parallax)
        */}
        <img
          ref={bgImageRef}
          src={BG_IMAGE_URL}
          loading="lazy"
          alt="Pastoral farming background"
          className="cta-product-background absolute left-0 w-full h-[130%] -top-[15%] object-cover object-center will-change-transform"
        />
      </div>
    </section>
  );
};

export default CallToAction;
