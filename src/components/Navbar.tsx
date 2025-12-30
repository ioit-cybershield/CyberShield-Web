import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedButton from "./ui/animated-button";

// --- TYPES ---
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
  href?: string;
  type: NavItemType;
  columns?: NavColumn[];
}

// --- DATA (UPDATED ONLY) ---
const NAV_DATA: NavItem[] = [
  {
    id: "events",
    label: "Events",
    type: "mega",
    columns: [
      {
        heading: "Events",
        links: [
          { label: "Upcoming Events", href: "/events/upcoming" },
          { label: "Past Events", href: "/events/past" },
        ],
      },
    ],
  },
  {
    id: "gallery",
    label: "Gallery",
    href: "/gallery",
    type: "simple",
  },
  {
    id: "team",
    label: "Team",
    href: "/team",
    type: "simple",
  },
  {
    id: "about",
    label: "About",
    type: "dropdown",
    columns: [
      {
        heading: "About",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Mission", href: "/about/mission" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isInteraction = isHovered || activeId !== null || isMobileOpen;
  const isDarkText = isScrolled && !isInteraction;

  const navBackgroundClass = isInteraction
    ? "bg-[#0052CD] shadow-lg"
    : isScrolled
    ? "bg-white/0 backdrop-blur-md"
    : "bg-transparent";

  useGSAP(
    () => {
      const shouldShow = activeId !== null;
      gsap.to(overlayRef.current, {
        opacity: shouldShow ? 1 : 0,
        pointerEvents: shouldShow ? "auto" : "none",
        duration: 0.1,
        ease: "power2.out",
      });
    },
    { dependencies: [activeId] }
  );

  const handleContactClick = () => {
    window.location.href = "/contact";
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm opacity-0 pointer-events-none"
        onClick={() => setActiveId(null)}
      />

      <header
        className={`fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300 ${navBackgroundClass} ${
          isDarkText ? "text-zinc-900" : "text-white"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveId(null);
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO IMAGE */}
          <a
            href="/"
            className="z-50 h-10 hover:opacity-80 transition-opacity flex items-center"
          >
            <img
              src="/images/cybershield-logo.png" // <-- update to your actual logo path
              alt="Cybershield Logo"
              className="h-full w-auto"
            />
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_DATA.map((item) => {
              const isActive = activeId === item.id;
              const isDimmed = activeId && !isActive;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveId(item.id)}
                  className="relative h-full flex items-center py-2"
                >
                  {item.type === "simple" ? (
                    <a
                      href={item.href}
                      className={`flex items-center gap-1 text-base font-nav font-semibold tracking-wide transition-opacity ${
                        isDimmed ? "opacity-40" : "opacity-100"
                      }`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      className={`flex items-center gap-1 text-base font-nav font-semibold tracking-wide cursor-default ${
                        isDimmed ? "opacity-40" : "opacity-100"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA & MOBILE */}
          <div className="flex items-center gap-4 z-50">
            <div
              className="hidden md:block cursor-pointer"
              onClick={handleContactClick}
            >
              <AnimatedButton />
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden"
            >
              {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* DESKTOP DROPDOWNS */}
        {NAV_DATA.map(
          (item) =>
            item.type !== "simple" && (
              <div
                key={item.id}
                className={`absolute top-full left-0 w-full bg-[#0052CD] transition-all ${
                  activeId === item.id ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onMouseEnter={() => setActiveId(item.id)}
              >
                <div className="max-w-7xl mx-auto px-6 py-12 flex gap-20">
                  <div className="flex gap-16">
                    {item.columns?.map((col, idx) => (
                      <div key={idx}>
                        {col.heading && (
                          <h4 className="text-xs font-bold uppercase mb-4">
                            {col.heading}
                          </h4>
                        )}
                        <ul className="space-y-3">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <a
                                href={link.href}
                                className="text-lg hover:translate-x-1 transition-all"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
        )}
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-950 text-white flex flex-col items-center justify-center gap-8 transition-transform ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {NAV_DATA.map((item) => (
          <a
            key={item.id}
            href={item.href || "#"}
            onClick={() => setIsMobileOpen(false)}
            className="text-3xl font-bold"
          >
            {item.label}
          </a>
        ))}
        <a href="/contact">
          <AnimatedButton />
        </a>
      </div>
    </>
  );
}
