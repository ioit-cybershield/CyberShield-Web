import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { X, ArrowUpRight } from "lucide-react";

export interface RevealItem {
  id: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  description: string;
  tags?: string[];
  content?: React.ReactNode;
}

interface Props {
  items: RevealItem[];
}

export default function RevealGallery({ items }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const itemsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeItem = items.find((i) => i.id === activeId);
  const isOpen = Boolean(activeItem && originRect);

  // Scroll lock
  useLayoutEffect(() => {
    if (!isOpen) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  // Open modal
  const handleCardClick = (id: string) => {
    const el = itemsRef.current.get(id);
    if (el) {
      setOriginRect(el.getBoundingClientRect());
      setActiveId(id);
      setIsAnimating(true);
    }
  };

  // Close modal
  const handleClose = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.6 });
      gsap.to(modalRef.current, {
        left: originRect!.left,
        top: originRect!.top,
        width: originRect!.width,
        height: originRect!.height,
        duration: 0.7,
        ease: "power4.inOut",
        onComplete: () => {
          setActiveId(null);
          setOriginRect(null);
          setIsAnimating(false);
        },
      });
    });
    return () => ctx.revert();
  };

  // Animation effect
  useEffect(() => {
    if (!isOpen || !originRect) return;
    const ctx = gsap.context(() => {
      const modal = modalRef.current!;
      const backdrop = backdropRef.current!;
      gsap.set(modal, {
        position: "fixed",
        left: originRect.left,
        top: originRect.top,
        width: originRect.width,
        height: originRect.height,
        borderRadius: "12px",
        zIndex: 60,
        backgroundColor: "#ffffff",
      });
      const padding = window.innerWidth < 768 ? 16 : 40;
      const targetWidth = Math.min(window.innerWidth - padding * 2, 1000);
      const targetHeight = Math.min(window.innerHeight - padding * 2, 800);
      const targetLeft = (window.innerWidth - targetWidth) / 2;
      const targetTop = (window.innerHeight - targetHeight) / 2;
      gsap.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
      );
      const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });
      tl.to(modal, {
        left: targetLeft,
        top: targetTop,
        width: targetWidth,
        height: targetHeight,
        duration: 0.8,
        ease: "power4.inOut",
      });
      if (textRef.current) {
        tl.fromTo(
          textRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
          "-=0.4",
        );
      }
    });
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      ctx.revert();
    };
  }, [isOpen, originRect]);

  return (
    <section
      className="w-full bg-white text-zinc-900 py-12 px-6 md:px-12 relative -mt-0.5"
      style={{ fontFamily: "Haffer VF, Arial, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 ">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
              Workshops & Events
            </h2>
            <p className="text-zinc-500 max-w-md text-lg">
              Practical cybersecurity experiences built by and for students,
              including Workshops, Awareness Sessions, CTFs and Competitions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {items.map((item) => (
            <div
              key={item.id}
              ref={(el) => {
                el && itemsRef.current.set(item.id, el);
              }}
              onClick={() => handleCardClick(item.id)}
              className="group cursor-pointer flex flex-col gap-3 w-full max-w-md"
            >
              <div className="relative aspect-4/3 bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200/50">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <ArrowUpRight size={20} className="text-zinc-900" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-100 flex items-center justify-center">
            <div
              ref={backdropRef}
              onClick={handleClose}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            />
            <div
              ref={modalRef}
              className="bg-white overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
            >
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors text-zinc-900"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className="w-full h-full flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-64 md:h-full bg-zinc-50 relative overflow-hidden shrink-0">
                  <img
                    ref={imgRef}
                    src={activeItem!.imageSrc}
                    alt={activeItem!.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  ref={contentRef}
                  className="w-full md:w-1/2 h-full overflow-y-auto no-scrollbar relative"
                  data-lenis-prevent
                >
                  <div
                    ref={textRef}
                    className="px-8 py-12 md:p-12 flex flex-col items-start text-left"
                  >
                    {activeItem!.tags && (
                      <div className="flex gap-2 mb-6">
                        {activeItem!.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 border border-zinc-200 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-2 tracking-tight">
                      {activeItem!.title}
                    </h2>
                    {activeItem!.subtitle && (
                      <p className="text-xl text-zinc-400 font-medium mb-8">
                        {activeItem!.subtitle}
                      </p>
                    )}
                    <div className="prose prose-zinc prose-lg text-zinc-600 leading-relaxed w-full max-w-none">
                      <p>{activeItem!.description}</p>
                      {activeItem!.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <style>{`
              .no-scrollbar::-webkit-scrollbar { display: none; }
              .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
          </div>,
          document.body,
        )}
    </section>
  );
}
