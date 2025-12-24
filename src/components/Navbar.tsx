import React, { useState, useRef, useEffect, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// ============================================================================
// TYPES & CONFIGURATION
// ============================================================================

type NavItemType = "mega" | "dropdown" | "simple";

interface NavLink {
  label: string;
  href: string;
}

interface NavColumn {
  heading?: string;
  links: NavLink[];
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  type: NavItemType;
  description?: string;
  columns?: NavColumn[];
}

const NAV_DATA: NavItem[] = [
  {
    id: "markets",
    label: "Markets",
    href: "/markets",
    type: "mega",
    description: "Industries we serve",
    columns: [
      {
        heading: "Core Industries",
        links: [
          { label: "Telecom", href: "/telecom" },
          { label: "Utilities", href: "/utilities" },
          { label: "EV Charging", href: "/ev" },
        ],
      },
      {
        heading: "Global Reach",
        links: [
          { label: "North America", href: "/na" },
          { label: "Europe & MEA", href: "/emea" },
          { label: "Asia Pacific", href: "/apac" },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    href: "/company",
    type: "dropdown",
    columns: [
      {
        heading: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Sustainability", href: "/sustainability" },
          { label: "Careers", href: "/careers" },
          { label: "Newsroom", href: "/news" },
        ],
      },
    ],
  },
  { id: "products", label: "Products", href: "/products", type: "simple" },
  { id: "technology", label: "Technology", href: "/tech", type: "simple" },
];

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

const ANIMATION_DURATIONS = {
  OVERLAY_FADE: 0.4,
  DROPDOWN_EXPAND: 0.5,
  DROPDOWN_COLLAPSE: 0.3,
  CONTENT_FADE: 0.4,
  NAVBAR_COMPACT: 0.4,
  SURFACE_TRANSITION: 0.3,
  MOBILE_MENU: 1,
} as const;

const SCROLL_THRESHOLD = 50; // px to trigger compact mode

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Global overlay that blurs page content when dropdown is active
 */
const GlobalOverlay = ({ isActive }: { isActive: boolean }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(overlayRef.current, {
      autoAlpha: isActive ? 1 : 0,
      duration: ANIMATION_DURATIONS.OVERLAY_FADE,
      ease: "power2.inOut",
    });
  }, [isActive]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm pointer-events-none opacity-0"
      aria-hidden="true"
    />
  );
};

/**
 * Desktop dropdown/mega menu panel
 */
const DesktopDropdown = ({
  config,
  isOpen,
}: {
  config: NavItem;
  isOpen: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isOpen) {
        gsap.set(containerRef.current, { autoAlpha: 1 });

        // Panel expansion effect
        gsap.fromTo(
          containerRef.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: ANIMATION_DURATIONS.DROPDOWN_EXPAND,
            ease: "power3.inOut",
          }
        );

        // Content fade in with delay
        gsap.fromTo(
          innerRef.current,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: ANIMATION_DURATIONS.CONTENT_FADE,
            delay: 0.15,
            ease: "power2.out",
          }
        );
      } else {
        // Collapse animation
        gsap.to(containerRef.current, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: ANIMATION_DURATIONS.DROPDOWN_COLLAPSE,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(containerRef.current, { autoAlpha: 0 });
          },
        });
      }
    },
    { dependencies: [isOpen], scope: containerRef }
  );

  // Don't render dropdown for simple nav items
  if (config.type === "simple") return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 w-full bg-[#0052CD] text-white shadow-xl overflow-hidden"
      style={{ opacity: 0, visibility: "hidden" }}
    >
      <div className="w-full h-px bg-white/10" />

      <div className="max-w-480 mx-auto px-6 md:px-10 py-12">
        <div ref={innerRef} className="flex gap-20 pl-[5%]">
          {/* Description section */}
          <div className="w-1/4 hidden lg:block">
            <h3 className="text-2xl font-bold mb-2">{config.label}</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {config.description || "Explore our industry-leading solutions."}
            </p>
          </div>

          {/* Links grid */}
          <div className="flex gap-16">
            {config.columns?.map((col, idx) => (
              <div key={idx} className="min-w-37.5">
                {col.heading && (
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">
                    {col.heading}
                  </h4>
                )}
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-2 text-lg font-medium hover:text-white transition-colors text-white/90"
                      >
                        {link.label}
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-xs text-[#60A5FA]">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Logo component
 */
const Logo = () => {
  return (
    <>
      {/* Logo */}
      <div className="shrink-0 z-50">
        <a href="/" aria-label="Home">
          <div className="flex items-center gap-2 text-white">
            {/* Geometric Logo Icon */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg
                width="169.25"
                height="255.25"
                viewBox="0 0 677 1021"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M405.948 195.845C413.708 201.968 427.818 216.791 434.285 225.706C441.81 236.339 451.687 254.599 456.038 266.522C469.912 304.331 469.912 340.744 456.038 377.693C443.574 410.454 425.584 433.225 378.316 475.76C348.803 502.183 326.109 527.747 313.528 548.478C309.178 555.674 309.413 552.667 314.116 541.496C322.464 521.41 333.4 506.48 356.681 482.957C389.721 449.552 400.186 434.299 406.888 409.809C410.651 395.953 410.651 376.512 406.771 365.341C399.363 343.429 385.136 327.747 363.971 317.972C355.27 313.891 347.627 312.172 327.168 309.594C317.996 308.413 307.767 306.479 304.239 305.298C284.25 298.316 271.081 282.419 270.14 264.052C269.788 257.607 268.612 256.855 266.966 262.011C261.91 276.619 262.615 292.623 268.612 303.794C272.257 310.776 282.016 320.121 288.601 323.235C297.537 327.425 311.412 329.143 329.99 328.499C339.279 328.176 346.686 328.069 346.451 328.284C346.216 328.499 336.104 330.647 323.875 333.225C298.595 338.488 292.481 341.066 285.308 349.766C281.193 354.707 280.135 356.963 277.901 365.556L277.078 368.456L281.311 364.804C290.482 356.963 307.649 352.344 319.995 354.492C328.814 355.996 335.281 359.111 342.571 365.448C357.621 378.445 361.502 395.953 354.8 420.873C351.037 435.051 342.571 452.129 327.991 475.223C312.47 499.82 303.534 519.906 299.066 539.885C294.245 561.367 292.716 588.542 294.95 611.314C296.714 628.07 297.772 633.87 302.828 652.667L307.296 668.779L308.707 658.575C316.115 603.795 341.395 561.689 386.312 528.929C392.308 524.632 409.005 513.784 423.35 504.761C455.215 485.105 460.859 481.131 473.558 470.067C503.188 444.181 521.766 412.387 528.468 375.975C529.997 367.597 530.232 361.044 529.762 346.759C529.291 330.647 528.821 326.78 525.646 315.932C515.182 280.271 498.603 254.385 470.265 229.787C452.745 214.535 431.581 202.29 409.122 194.449L400.186 191.334L405.948 195.845Z"
                  fill="white"
                />
                <path
                  d="M266.025 195.523C231.103 208.09 199.121 232.043 177.133 262.226C165.845 277.8 159.731 289.401 153.734 306.801C145.268 331.721 144.68 365.126 152.088 391.442C161.73 425.813 185.599 454.922 214.406 467.489C246.859 481.775 278.606 477.801 302.123 456.641C309.766 449.766 319.643 438.166 319.643 436.125C319.643 435.803 316.115 436.232 311.765 437.092C302.358 438.81 288.366 437.521 277.431 433.869C253.797 425.813 231.691 402.72 220.403 373.934C207.234 340.636 207.822 305.083 222.049 265.448C230.75 240.958 243.097 222.591 262.733 204.438C269.905 197.886 275.549 192.408 275.079 192.408C274.726 192.515 270.611 193.804 266.025 195.523Z"
                  fill="white"
                />
                <path
                  d="M557.276 388.758C557.158 391.98 556.1 399.284 554.807 404.977C543.166 457.286 505.305 500.895 449.924 525.708C442.633 529.037 429.817 534.623 421.469 538.167C395.13 549.553 380.55 558.79 364.559 574.258C353.036 585.428 345.511 595.203 337.515 609.703C327.638 627.856 322.464 645.042 316.703 679.951C309.53 723.238 296.596 748.05 268.612 772.217C254.267 784.57 239.922 792.303 217.934 799.5L208.527 802.507L227.928 802.078C244.155 801.756 249.211 801.219 259.088 798.855C272.845 795.633 289.424 788.544 300.594 781.347C310.001 775.225 323.523 763.087 328.931 755.998C333.4 749.983 343.747 731.294 344.923 726.997C346.451 721.841 347.509 722.915 348.803 730.864C351.037 743.538 351.037 745.579 350.096 754.817C348.45 769.854 341.395 786.933 331.401 800.359C327.05 806.159 311.412 820.553 303.181 826.46L299.066 829.468L308.943 826.138C350.919 812.174 381.138 784.892 390.309 752.561C392.073 746.439 392.779 740.531 392.896 732.153C392.896 718.512 390.897 709.382 382.667 687.684C376.2 670.391 374.436 660.617 375.141 646.438C376.552 622.163 388.546 603.366 411.239 590.047C419.352 585.214 432.757 579.843 451.922 573.721C473.793 566.739 489.078 559.542 503.659 549.446C537.405 526.03 556.1 496.277 563.626 453.957C567.035 435.052 565.154 405.621 559.628 389.51L557.394 383.065L557.276 388.758Z"
                  fill="white"
                />
                <path
                  d="M116.931 392.193C112.933 408.735 112.228 414.642 112.345 432.473C112.345 446.973 112.816 452.988 114.932 461.689C121.634 490.905 135.979 515.824 158.202 537.306C171.254 549.766 180.896 556.641 201.472 567.919C236.159 587.038 252.973 602.72 265.437 627.747C267.906 632.581 270.493 637.736 271.199 639.24C273.315 643.322 272.022 634.944 266.613 609.272C261.087 582.956 259.558 567.811 260.969 552.774C262.85 532.688 267.436 517.543 276.843 500.464C280.958 492.838 281.781 490.905 280.017 491.442C278.842 491.871 273.433 493.482 267.906 494.986C258.853 497.564 256.031 497.886 239.099 497.779C217.346 497.779 208.292 496.06 191.596 488.864C178.309 483.064 169.373 476.941 157.849 466.2C137.625 447.081 126.808 426.887 121.634 398.638L118.93 384.137L116.931 392.193Z"
                  fill="white"
                />
                <path
                  d="M422.997 606.373C411.239 613.569 401.127 626.673 397.835 639.348C393.955 654.6 395.718 666.093 405.595 689.402C415.237 712.173 416.413 716.899 416.53 732.152C416.53 745.9 414.179 758.575 409.946 766.523L407.712 770.82L413.591 764.912C429.817 748.693 440.752 722.485 440.752 700.25C440.752 688.435 438.518 679.735 430.758 659.971C421.586 636.77 420.528 623.666 426.525 609.273C427.701 606.265 428.406 603.795 428.053 603.902C427.583 603.902 425.349 605.084 422.997 606.373Z"
                  fill="white"
                />
                <path
                  d="M643.333 192.333C643.333 192.333 612.235 192.333 605.212 192.333C501.055 192.333 410.279 135.881 338.33 33.3335C266.384 135.877 175.615 192.333 71.4618 192.333C64.4392 192.333 33.3368 192.333 33.3368 192.333C33.3368 192.333 33.3334 298.333 33.3334 360.137C33.3334 661.892 162.936 915.444 338.333 987.333C513.731 915.444 643.333 661.892 643.333 360.137C643.333 298.333 643.333 192.333 643.333 192.333Z"
                  stroke="white"
                  strokeWidth="66.6667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* SVG Text Logo */}
            <svg
              width="124.25"
              height="34.25"
              viewBox="0 0 497 141"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M72.8125 7L63.9375 60.375L59.0625 41.1875L31.1875 91.9375L75.0625 92.5L0 111.062L72.8125 7ZM83 100.188L81 44.4375L91.125 74.5625L122.25 37.0625L86.25 115.75L47.4375 140.812L83 100.188ZM138.938 8.25L136.125 52.3125L157.625 68.6875L107.688 108.688L138.938 8.25ZM128.5 66.25L125.312 78.8125L145.062 69.1875L128.5 66.25ZM207.75 43.25L173.875 73.8125L172.75 78.6875L197.062 76.3125L152.312 101.438L171.125 47.75L207.75 43.25ZM177.562 62.125L190 51.375L180.438 53.1875L177.562 62.125ZM244.188 42.5L221 59.375L193.25 102.125L211.5 47.8125L244.188 42.5ZM247 48.375L314.062 10L265.438 47.1875L283.75 78.5L218.062 125.25L263.125 76.6875L247 48.375ZM319.188 0L315.875 52L341.625 42.3125L321.375 101.875L322.125 60.3125L309.25 67.25L285.125 106.25L319.188 0ZM349 46.1875L364.688 42.75L335.812 107L349 46.1875ZM346.062 37L370.688 25L367.062 34.3125L346.062 37ZM410.625 43.25L376.75 73.8125L375.625 78.6875L399.938 76.3125L355.188 101.438L374 47.75L410.625 43.25ZM380.438 62.125L392.875 51.375L383.312 53.1875L380.438 62.125ZM430.188 0L415.062 79.625L431.25 77L394.562 106.25L430.188 0ZM496.375 3.875L467.938 102.25L461.5 85.875L428.312 99.9375L442.938 55.5L470.625 50.0625L496.375 3.875ZM451.312 66.375L444.812 83.8125L470.062 62.125L451.312 66.375Z"
                fill="white"
              />
            </svg>
          </div>
        </a>
      </div>
    </>
  );
};

/**
 * Desktop navigation items
 */
const DesktopNavItems = ({
  activeId,
  onItemHover,
}: {
  activeId: string | null;
  onItemHover: (id: string) => void;
}) => (
  <nav className="hidden md:flex items-center h-full absolute left-1/2 -translate-x-1/2 top-0">
    {NAV_DATA.map((item) => (
      <div
        key={item.id}
        className="h-full px-6 py-4 flex items-center cursor-pointer group"
        onMouseEnter={() => onItemHover(item.id)}
      >
        <a
          href={item.href}
          className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
            activeId && activeId !== item.id ? "text-white/40" : "text-white"
          }`}
        >
          {item.label}
        </a>
      </div>
    ))}
  </nav>
);

/**
 * Desktop action buttons (login, contact)
 */
const DesktopActions = () => (
  <div className="hidden md:flex items-center gap-6 z-50">
    <button className="text-sm font-bold uppercase tracking-wider hover:text-white/70 transition-colors">
      Log In
    </button>
    <a
      href="/contact"
      className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform"
    >
      Contact
    </a>
  </div>
);

/**
 * Mobile hamburger menu button
 */
const MobileMenuButton = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="md:hidden z-50 flex flex-col gap-1.5 w-8 group"
    aria-label="Toggle menu"
    aria-expanded={isOpen}
  >
    <span
      className={`block w-full h-0.5 bg-white transition-all duration-300 ${
        isOpen ? "rotate-45 translate-y-2" : ""
      }`}
    />
    <span
      className={`block w-full h-0.5 bg-white transition-opacity duration-300 ${
        isOpen ? "opacity-0" : ""
      }`}
    />
    <span
      className={`block w-full h-0.5 bg-white transition-all duration-300 ${
        isOpen ? "-rotate-45 -translate-y-2" : ""
      }`}
    />
  </button>
);

/**
 * Mobile menu overlay
 */
const MobileMenu = ({
  isOpen,
  menuRef,
  onClose,
}: {
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}) => {
  useGSAP(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at 100% 0%)",
        duration: ANIMATION_DURATIONS.MOBILE_MENU,
        ease: "expo.inOut",
      });
      gsap.fromTo(
        ".mobile-link",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.8,
        ease: "expo.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 bg-[#0a0a0a] z-40 flex items-center justify-center"
      style={{ clipPath: "circle(0% at 100% 0%)" }}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        {NAV_DATA.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="mobile-link text-4xl font-bold text-white uppercase tracking-tight hover:text-[#0052CD] transition-colors"
            onClick={onClose}
          >
            {item.label}
          </a>
        ))}
        <div className="mobile-link mt-8 pt-8 border-t border-white/10 w-40 flex justify-center gap-4">
          <div className="w-8 h-8 rounded-full bg-white/10" />
          <div className="w-8 h-8 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN NAVBAR COMPONENT
// ============================================================================

export default function Navbar() {
  // ========== STATE ==========
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  // ========== REFS ==========
  const headerRef = useRef<HTMLElement>(null);
  const navBackgroundRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // ========== SCROLL HANDLER ==========
  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ========== NAVBAR SURFACE ANIMATION ==========
  // Controls visual state transitions: transparent → glass → solid blue
  useGSAP(() => {
    const isDropdownOpen = activeId !== null;

    // Adjust padding based on scroll state
    gsap.to(headerRef.current, {
      paddingBlock: isCompact ? "1rem" : "1.5rem",
      duration: ANIMATION_DURATIONS.NAVBAR_COMPACT,
      ease: "power2.out",
    });

    // Background transition based on state priority:
    // 1. Dropdown open (blue) → 2. Scrolled (glass) → 3. Top (transparent)
    if (isDropdownOpen) {
      // Hovering state: solid blue to match dropdown
      gsap.to(navBackgroundRef.current, {
        backgroundColor: "#0052CD",
        backdropFilter: "blur(0px)",
        opacity: 1,
        duration: ANIMATION_DURATIONS.SURFACE_TRANSITION,
        overwrite: true,
      });
    } else if (isCompact) {
      // Scrolled state: dark glass effect
      gsap.to(navBackgroundRef.current, {
        backgroundColor: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(12px)",
        opacity: 1,
        duration: ANIMATION_DURATIONS.NAVBAR_COMPACT,
        overwrite: true,
      });
    } else {
      // Top state: fully transparent
      gsap.to(navBackgroundRef.current, {
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
        opacity: 0,
        duration: ANIMATION_DURATIONS.NAVBAR_COMPACT,
        overwrite: true,
      });
    }
  }, [isCompact, activeId]);

  // ========== RENDER ==========
  return (
    <>
      {/* Page content overlay when dropdown is open */}
      <GlobalOverlay isActive={!!activeId} />

      {/* Main navbar header */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        onMouseLeave={() => setActiveId(null)}
      >
        {/* Animated background layer */}
        <div
          ref={navBackgroundRef}
          className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
        />

        {/* Navbar content container */}
        <div className="w-full max-w-480 mx-auto px-6 md:px-10 flex items-center justify-between relative z-20 text-white">
          <Logo />
          <DesktopNavItems activeId={activeId} onItemHover={setActiveId} />
          <DesktopActions />
          <MobileMenuButton
            isOpen={isMobileOpen}
            onClick={() => setIsMobileOpen((prev) => !prev)}
          />
        </div>

        {/* Dropdown menus */}
        {NAV_DATA.map((item) => (
          <DesktopDropdown
            key={item.id}
            config={item}
            isOpen={activeId === item.id}
          />
        ))}
      </header>

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={isMobileOpen}
        menuRef={mobileMenuRef as RefObject<HTMLDivElement>}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
