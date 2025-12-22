import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

/* -------------------------------------------------------------------------- */
/* Icons                                   */
/* -------------------------------------------------------------------------- */

const Logo = () => (
  <div className="flex items-center gap-2 text-white">
    {/* Geometric Logo Icon */}
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="w-8 h-8 bg-white transform rotate-45 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
        {/* Cutout effect simulated */}
        <div className="absolute top-0 right-0 w-4 h-4 bg-transparent"></div>
      </div>
    </div>
    <span className="text-[32px] font-bold tracking-tight leading-none">
      GenCell
    </span>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Sub-Components                                */
/* -------------------------------------------------------------------------- */

const Dropdown = ({ isOpen }: { isOpen: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        // Entrance animation
        gsap.fromTo(
          containerRef.current,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          listRef.current?.children || [],
          { y: -10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            delay: 0.1,
            ease: "power2.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="absolute left-0 top-full w-full bg-[#0052CD] overflow-hidden shadow-xl z-[-1] border-t border-white/10"
    >
      <div className="container mx-auto max-w-[1440px] px-[2.5%] py-12 flex justify-center">
        <div className="w-full flex justify-center pl-[12%]">
          <ul ref={listRef} className="flex flex-col space-y-4 text-white">
            {["About", "Sustainability", "Careers", "GenCell Ltd."].map(
              (item) => (
                <li
                  key={item}
                  className="text-[17px] font-medium opacity-80 hover:opacity-100 cursor-pointer transition-opacity duration-200"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Main Navbar                                 */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs
  const headerRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);

  // Initial Entrance Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  // Mobile Menu Animation
  useLayoutEffect(() => {
    // Scoped to menuOverlayRef since we removed the main wrapper
    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        gsap.to(menuOverlayRef.current, {
          x: "0%",
          duration: 0.6,
          ease: "power3.inOut",
        });
      } else {
        gsap.to(menuOverlayRef.current, {
          x: "100%",
          duration: 0.6,
          ease: "power3.inOut",
        });
      }
    }, menuOverlayRef);
    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  // Handlers
  const handleMouseEnter = (item: string) => {
    if (item === "Company") setIsCompanyOpen(true);
  };

  const handleMouseLeave = () => {
    setIsCompanyOpen(false);
  };

  const navItems = [
    "Markets",
    "Solutions",
    "Products",
    "Technology",
    "Company",
    "Resources",
  ];

  return (
    <>
      <header
        ref={headerRef}
        // Fixed positioning ensures it sits on top of your existing Hero
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isCompanyOpen ? "bg-[#0052CD]" : "bg-transparent"
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-[2.5%] py-5 flex items-center justify-between">
          {/* 1. Left: Logo */}
          <div className="flex-shrink-0 z-50">
            <a href="/" aria-label="Home">
              <Logo />
            </a>
          </div>

          {/* 2. Center: Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 h-full">
            {navItems.map((item) => (
              <div
                key={item}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(item)}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`text-[17px] font-bold tracking-wide text-white transition-opacity duration-300 ${
                    item === "Company" && isCompanyOpen
                      ? "opacity-100"
                      : "opacity-90 hover:opacity-100"
                  }`}
                >
                  {item === "Company" && (
                    <span className="mr-1 inline-block text-[10px] align-middle transform translate-y-[-1px]">
                      ▼
                    </span>
                  )}
                  {item}
                </a>
              </div>
            ))}
          </nav>

          {/* 3. Right: Contact Us */}
          <div className="hidden md:flex items-center z-50">
            <a
              href="/contact"
              className="group flex items-center text-white font-bold text-[17px] uppercase tracking-wide"
            >
              <span className="inline-block transform -scale-x-100 mr-2 text-[22px] leading-none transition-transform duration-300 group-hover:-translate-x-1">
                ↲
              </span>
              Contact us
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden z-50 text-white flex flex-col justify-center gap-1.5 w-8 h-8"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className={`block w-full h-[2px] bg-white transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-full h-[2px] bg-white transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-full h-[2px] bg-white transition-transform duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* 4. Dropdown Panel */}
        <Dropdown isOpen={isCompanyOpen} />
      </header>

      {/* 5. Mobile Full Screen Menu */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 bg-[#1B1B1C] z-40 transform translate-x-full flex flex-col justify-center items-center md:hidden"
      >
        <div className="flex flex-col items-center space-y-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-white text-4xl font-bold uppercase tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="/contact"
            className="text-white text-3xl font-bold uppercase tracking-wider mt-8 flex items-center"
          >
            <span className="inline-block transform -scale-x-100 mr-3">↲</span>
            Contact us
          </a>
        </div>
      </div>
    </>
  );
}
