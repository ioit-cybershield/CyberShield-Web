import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register GSAP plugins (Safe to register multiple times)
gsap.registerPlugin(ScrollTrigger);

// --- Asset Constants ---
const GREEN_DOT_URL =
  "https://cdn.prod.website-files.com/693293123c1384ae5e258a60/693293123c1384ae5e258aa3_green-dot.svg";
const BEIGE_DOT_URL =
  "https://cdn.prod.website-files.com/693293123c1384ae5e258a60/693293123c1384ae5e258a92_beige%20dot.svg";
const BG_IMAGE_URL =
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/69271f09c85e1d1bee5d34ce_bg%20new%20croptab.avif";
const LOGO_ICON_URL =
  "https://cdn.prod.website-files.com/693293123c1384ae5e258a60/6943d66db5b29167fd22f34a_logo%20icon.svg";

const CallToAction: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Wait for a tick to allow the previous component (Gallery) to set up its PIN spacer.
    // This is crucial when mixing pinned and non-pinned ScrollTriggers.
    const ctx = gsap.context(() => {
      // 1. Initial State: Hide content safely
      gsap.set(".transition-line", { height: "0%" });
      gsap.set(footerRef.current, { opacity: 0, visibility: "hidden", y: 20 });
      gsap.set(".cta-content-reveal", { y: 50, opacity: 0 });

      // 2. Main Reveal Timeline
      const tlReveal = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          // Start as soon as the footer enters the viewport
          start: "top bottom",
          // End when the footer is fully visible
          end: "center center",
          toggleActions: "play none none reverse",
          // Prevents glitches if user scrolls super fast past the pinned section
          fastScrollEnd: true,
        },
      });

      tlReveal
        // Step A: Lines wipe down (Curtain effect)
        .to(".transition-line", {
          height: "100%",
          duration: 1,
          stagger: 0.1,
          ease: "power3.inOut",
        })
        // Step B: Content reveals (slight overlap with lines)
        .to(
          ".cta-content-reveal",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6",
        )
        // Step C: Footer fades in
        .to(
          footerRef.current,
          {
            opacity: 1,
            visibility: "visible",
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6",
        );

      // 3. Parallax Background Effect
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 4. Button Hover Animations
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

      // 5. Link Underline Animations
      const links = gsap.utils.toArray<HTMLElement>(".footer-link-animated");
      links.forEach((link) => {
        const underline = link.querySelector(".underline");
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl.to(underline, {
          width: "100%",
          duration: 0.3,
          ease: "power2.out",
        });

        link.addEventListener("mouseenter", () => hoverTl.play());
        link.addEventListener("mouseleave", () => hoverTl.reverse());
      });
    }, containerRef);

    // FORCE REFRESH: Crucial step.
    // We tell ScrollTrigger to recalculate all positions because the previous component
    // likely just added 300vh of pin-spacing, pushing this footer down.
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      // Added z-[20] to ensure it sits on top of the pinned gallery if overlaps occur
      // Added bg-[#404f1d] to ensure no transparency reveals the gallery behind it
      className="footer-animated relative w-full bg-[#404f1d] text-[#333] font-sans overflow-hidden z-[20]"
      style={{ fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}
    >
      {/* --- Plant Transition Lines --- */}
      <div className="plant-transition absolute inset-0 flex pointer-events-none z-[10]">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <div
            key={i}
            className={`transition-line flex-1 bg-[#404f1d] border-r border-[#ffffff10] ${i === 1 || i === 2 ? "hidden md:block" : ""}`}
            style={{ transformOrigin: "top" }}
          />
        ))}
      </div>

      {/* --- Main CTA Container --- */}
      <div className="w-layout-blockcontainer container w-container mx-auto px-[1em] md:px-[1.88em] relative z-[5] pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="footer-aniamted-wrap relative">
          <div
            id="s-cta"
            className="cta-product-new relative z-[2] text-[#f4ede6]"
          >
            <div className="cta-product-wrap grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Primary Heading */}
              <div className="cta-product-heading lg:col-span-5 cta-content-reveal">
                <h2 className="h2-style text-[8vw] md:text-[3.5vw] leading-[1.1] font-normal text-[#636f3d] md:text-[#636f3d]">
                  <span className="block dark-green text-[#404f1d] md:text-[#333]">
                    You don’t get many
                  </span>
                  <span className="block dark-green text-[#404f1d] md:text-[#333]">
                    chances to be early
                  </span>
                </h2>
              </div>

              {/* Secondary Heading & Content */}
              <div className="cta-product-heading-secondary lg:col-span-7 flex flex-col justify-between cta-content-reveal delay-100">
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
        <img
          ref={bgImageRef}
          src={BG_IMAGE_URL}
          loading="lazy"
          alt="Pastoral farming background"
          className="cta-product-background w-full h-[120%] object-cover object-center -mt-[10%]"
        />
      </div>

      {/* --- Footer Section (Initially Hidden) --- */}
      <div
        ref={footerRef}
        id="s-footer"
        className="footer-new relative z-[5] bg-[#404f1d] text-[#f4ede6] px-[1em] md:px-[1.88em] pb-10"
      >
        <div className="footer-wrap border-t border-[#7c914c]/30 pt-16">
          <div className="footer-top flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
            {/* Links Columns */}
            <div className="footer-links-new flex flex-wrap gap-12 lg:gap-24 w-full lg:w-auto">
              {/* Products */}
              <div className="footer-links-group-wrap-new">
                <div className="text-14-caps text-[#7c914c] uppercase tracking-widest text-xs mb-6 font-bold opacity-60">
                  products
                </div>
                <div className="footer-links-group flex flex-col gap-3">
                  {[
                    "Macronutrient Fertilizers",
                    "Micronutrient Fertilizers",
                    "Feed Additives",
                  ].map((text) => (
                    <FooterLink key={text} text={text} />
                  ))}
                </div>
              </div>

              {/* Science */}
              <div className="footer-links-group-wrap-new">
                <div className="text-14-caps text-[#7c914c] uppercase tracking-widest text-xs mb-6 font-bold opacity-60">
                  science
                </div>
                <div className="footer-links-group flex flex-col gap-3">
                  {[
                    "CropTab™ NPK",
                    "Nutripeak™ Micros",
                    "ElevateFeed™",
                    "Food Safety",
                  ].map((text) => (
                    <FooterLink key={text} text={text} />
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="footer-links-group-wrap-new">
                <div className="text-14-caps text-[#7c914c] uppercase tracking-widest text-xs mb-6 font-bold opacity-60">
                  about
                </div>
                <div className="footer-links-group flex flex-col gap-3">
                  {["Approach", "Sustainability", "contact"].map((text) => (
                    <FooterLink key={text} text={text} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Contact Area */}
            <div className="footer-right flex flex-col items-start lg:items-end gap-8 w-full lg:w-auto">
              <div className="gap-20 text-left lg:text-right">
                <div className="text-14-caps text-[#7c914c] uppercase tracking-widest text-xs mb-2 font-bold opacity-80">
                  if you have any questions <br />
                  feel free to contact us:
                </div>
                <a
                  href="mailto:HELLO@FARMMINERALS.COM"
                  className="footer-link-animated inline-block group"
                >
                  <div className="text-20-medium text-xl md:text-2xl font-medium tracking-wide">
                    HELLO@FARMMINERALS.COM
                  </div>
                  <div className="underline h-[1px] bg-[#7c914c] w-0"></div>
                </a>
              </div>
              <div className="socials-group">
                <FooterLink
                  text="linkedin"
                  href="https://www.linkedin.com/company/farm-minerals/"
                />
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom mt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#7c914c]/30 pt-8 text-[#7c914c]">
            <div className="text-14-caps uppercase text-xs tracking-widest font-bold">
              © 2025. FARM MINERALS INC.
            </div>

            <div
              className="icon-mask w-10 h-10 bg-[#7c914c]"
              style={{
                maskImage: `url(${LOGO_ICON_URL})`,
                WebkitMaskImage: `url(${LOGO_ICON_URL})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            ></div>

            <div className="footer-bottom-links flex items-center gap-8">
              <FooterLink text="terms of use" />
              <a
                href="https://adelt.io/"
                target="_blank"
                rel="noreferrer"
                className="footer-link-animated flex items-center gap-2 group cursor-pointer"
              >
                <div className="text-14-caps uppercase text-xs tracking-widest font-bold opacity-50">
                  website by
                </div>
                <div className="w-16 h-4 text-[#7c914c] opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 48 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.8708 7.06143L20.0144 7.20445C19.9678 7.15568 19.9201 7.10746 19.8708 7.06143Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M8.58955 5.96308V7.0849C7.67914 6.2136 6.4491 5.68111 5.09002 5.68111C2.26677 5.68111 0 7.97827 0 10.8394C0 13.7005 2.26677 15.9976 5.09002 15.9976C6.4491 15.9976 7.67914 15.4651 8.58955 14.5938V15.7559H10.18V5.96308H8.58955ZM5.09002 14.3858C3.14179 14.3858 1.59104 12.8143 1.59104 10.8394C1.59104 8.86446 3.14179 7.29293 5.09002 7.29293C7.03826 7.29293 8.58955 8.9053 8.58955 10.8394C8.58955 12.7734 7.0388 14.3858 5.09002 14.3858Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M35.0862 15.8373H33.555V0H35.0862V15.8373Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M48 10.7999C48 13.661 45.7338 15.9581 42.91 15.9581C41.5514 15.9581 40.3209 15.4257 39.411 14.5544C38.4298 13.6163 37.82 12.2837 37.82 10.7999V6.4881H36.2333V4.87573H37.82V0H39.411V4.87573H42.899V6.4881H39.411V10.7999C39.411 12.7742 40.9617 14.3463 42.91 14.3463C44.8582 14.3463 46.4095 12.7748 46.4095 10.7999H48Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M20.0723 7.26123L20.0707 7.26287C20.0528 7.24329 20.034 7.22348 20.0144 7.20445L20.0723 7.26123Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M32.377 11.4929C32.4075 11.2666 32.4227 11.036 32.4227 10.8015C32.4227 7.9525 30.1434 5.64321 27.3327 5.64321C24.522 5.64321 22.2427 7.9525 22.2427 10.8015C22.2427 13.6504 24.5214 15.9597 27.3327 15.9597C29.5652 15.9597 31.4622 14.5024 32.1483 12.4756H30.4179C29.8282 13.5897 28.6678 14.3473 27.3327 14.3473C25.6333 14.3473 24.2171 13.1201 23.9002 11.4929H32.377ZM23.9002 10.1101C24.2171 8.48223 25.6333 7.25502 27.3327 7.25502C29.0321 7.25502 30.4484 8.48223 30.7653 10.1101H23.9002Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M21.0735 15.8373H19.5424V0H21.0735V15.8373Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.9988 14.4514C17.9552 14.4514 19.5412 12.8442 19.5412 10.8615C19.5412 8.87889 17.9552 7.27165 15.9988 7.27165C14.0424 7.27165 12.4564 8.87889 12.4564 10.8615C12.4564 12.8442 14.0424 14.4514 15.9988 14.4514ZM15.9988 16C18.7992 16 21.0693 13.6994 21.0693 10.8615C21.0693 8.02364 18.7992 5.72307 15.9988 5.72307C13.1984 5.72307 10.9283 8.02364 10.9283 10.8615C10.9283 13.6994 13.1984 16 15.9988 16Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Helper Components ---

const FooterLink: React.FC<{ text: string; href?: string }> = ({
  text,
  href = "#",
}) => (
  <a
    href={href}
    className="footer-link-animated inline-block w-max group cursor-pointer"
  >
    <div className="text-14-caps text-[#7c914c] uppercase tracking-widest text-sm font-bold">
      {text}
    </div>
    <div className="underline h-[1px] bg-[#7c914c] w-0"></div>
  </a>
);

export default CallToAction;
