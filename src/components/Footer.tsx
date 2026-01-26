// src/components/Footer.tsx

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoIconWhite } from "./ui/logo-text-copyright";

gsap.registerPlugin(ScrollTrigger);

// --- Icons ---

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M9.52373 6.77569L15.4811 0H14.0699L8.89493 5.88203L4.7648 0H0L6.24693 8.89552L0 16H1.4112L6.87253 9.78704L11.2352 16H16M1.92053 1.04127H4.08853L14.0688 15.0099H11.9003" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 14 14" fill="currentColor">
    <path d="M3.13073 4.375H0V14.0003H3.13073V4.375Z" />
    <path d="M11.6585 4.48788C11.6252 4.47738 11.5937 4.466 11.5587 4.45638C11.5167 4.44675 11.4747 4.43888 11.4318 4.43188C11.2656 4.39863 11.0836 4.375 10.8701 4.375C9.04485 4.375 7.88723 5.70241 7.50573 6.21518V4.375H4.375V14.0003H7.50573V8.75013C7.50573 8.75013 9.87172 5.45478 10.8701 7.87511C10.8701 10.0355 10.8701 14.0003 10.8701 14.0003H13.9999V7.50497C13.9999 6.05068 13.0033 4.83876 11.6585 4.48788Z" />
    <path d="M1.53124 3.06259C2.37692 3.06259 3.06248 2.37701 3.06248 1.5313C3.06248 0.685585 2.37692 0 1.53124 0C0.68556 0 0 0.685585 0 1.5313C0 2.37701 0.68556 3.06259 1.53124 3.06259Z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// --- Subcomponent: The Swipe Grid Item ---

interface GridLinkProps {
  href: string;
  label: string;
}

const GridLink = ({ href, label }: GridLinkProps) => {
  return (
    <a
      href={href}
      // CHANGE 1: Reduced height from h-48 to h-32 for mobile, kept compact on desktop
      className="grid-link-item group relative block h-32 md:h-64 w-full overflow-hidden border-b border-neutral-800 md:border-b-0 md:border-r last:border-r-0 last:border-b-0"
    >
      <div className="absolute inset-0 z-0 origin-left -translate-x-full bg-[#E2F949] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0" />

      {/* CHANGE 2: Reduced padding from p-6 to p-4 for mobile */}
      <div className="relative z-10 flex h-full flex-col justify-end p-4 md:p-8 transition-colors duration-300 group-hover:text-black">
        <div className="flex w-full items-end justify-between">
          {/* CHANGE 3: Reduced text size from text-4xl to text-3xl for mobile */}
          <span className="font-nav space-x-1 text-3xl md:text-5xl font-bold tracking-tighter leading-[0.9]">
            {label}
          </span>
          {/* CHANGE 4: Smaller arrow icon for mobile */}
          <ArrowIcon className="mb-1 h-6 w-6 md:h-10 md:w-10 transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2" />
        </div>
      </div>
    </a>
  );
};

// --- Main Component ---

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".grid-link-item", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
        y: 30, // Reduced animation distance slightly
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(bottomRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="font-nav relative z-10 w-full bg-[#111111] text-white"
    >
      <div>
        {/* Navigation Grid */}
        <div className="grid w-full grid-cols-1 md:grid-cols-4 border-2 border-neutral-800">
          <GridLink href="/events" label="Events" />
          <GridLink href="/about" label="About Us" />
          <GridLink href="/resources" label="Resources" />
          <GridLink href="/contact" label="Join Us" />
        </div>

        {/* Bottom Section */}
        {/* CHANGE 5: Reduced padding from pt-8/px-12 to pt-6/px-6 for mobile */}
        <div className="pt-6 px-6 md:pt-10 md:px-12">
          {/* CHANGE 6: Reduced gap from gap-6 to gap-4, margin bottom from mb-12 to mb-8 */}
          <div className="flex flex-col justify-between gap-4 md:gap-6 md:flex-row md:items-center mb-8 md:mb-12">
            <a
              href="/"
              className="text-lg text-[#E2F949] hover:underline hover:text-white transition-colors"
            >
              Home
            </a>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-neutral-400 text-sm">
              <a
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms
              </a>
              <a
                href="/scam-prevention"
                className="hover:text-white transition-colors"
              >
                Scam Prevention
              </a>
            </div>
          </div>

          {/* CHANGE 7: Reduced gap in bottom row from gap-8 to gap-6 */}
          <div
            ref={bottomRef}
            className="flex flex-col-reverse items-center justify-between gap-6 md:gap-8 md:flex-row text-xs text-neutral-500 font-mono pb-6 md:pb-10"
          >
            <div className="w-full md:w-1/3 text-center md:text-left">
              © 2026 CyberShield. All Rights Reserved.
            </div>

            <div className="w-full md:w-1/3 flex justify-center">
              {/* CHANGE 8: Reduced logo size slightly on mobile */}
              <div className="w-16 h-16 md:w-32 md:h-32 mb-8">
                <LogoIconWhite className="w-full h-full" />
              </div>
            </div>

            <div className="w-full md:w-1/3 flex justify-center md:justify-end gap-6 text-white">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E2F949] transition-colors"
              >
                <XIcon className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E2F949] transition-colors"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E2F949] transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
