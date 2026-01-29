// src/components/events/EventsComponent.tsx
import React, { useState, useRef, useMemo } from "react";
import { format, parseISO } from "date-fns";
import {
  X,
  MapPin,
  Clock,
  Share2,
  Calendar as CalendarIcon,
  ArrowLeft,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { type EventItem } from "@/types/events";
import { CalendarShim } from "@/components/events/ui/Calendar";

// --- 1. Article Component (unchanged logic, better spacing) ---
const EventArticle = ({ event }: { event: EventItem }) => {
  return (
    <article className="max-w-3xl mx-auto bg-white mb-16 last:mb-0 border-b border-zinc-100 pb-16 last:border-0">
      <div className="relative h-64 lg:h-[400px] w-full overflow-hidden rounded-2xl mb-8 group shadow-sm bg-zinc-100">
        <img
          src={event.image || "/api/placeholder/800/600"}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
            {event.time || "Event"}
          </span>
        </div>
      </div>

      <div className="px-1 md:px-0">
        <h1 className="text-3xl md:text-5xl font-['Syne'] font-bold text-zinc-900 mb-6 leading-[1.1]">
          {event.title}
        </h1>

        <div className="flex flex-wrap gap-4 md:gap-8 border-y border-zinc-100 py-5 mb-8 text-sm text-zinc-500 font-medium font-['Manrope']">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>{event.time || "All Day"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span>{event.location || "Main Hall"}</span>
          </div>
          <button className="ml-auto flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-pointer">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        <div className="prose prose-lg prose-zinc max-w-none text-zinc-600 font-['Manrope'] leading-relaxed">
          <p className="text-xl font-medium text-zinc-900 mb-6">
            {event.summary}
          </p>
          {event.description ? (
            <p>{event.description}</p>
          ) : (
            <p>No additional details provided for this event.</p>
          )}
        </div>
      </div>
    </article>
  );
};

// --- 2. Main Component ---

interface EventsHeroProps {
  events: EventItem[];
}

const EventsComponent: React.FC<EventsHeroProps> = ({ events = [] }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const calendarWrapperRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);

  const selectedEvents = useMemo(() => {
    if (!selectedDate) return [];
    return events.filter((e) => e.date === selectedDate);
  }, [events, selectedDate]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    if (!isExpanded) setIsExpanded(true);
  };

  const handleReset = () => {
    setIsExpanded(false);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();
      const mm = gsap.matchMedia();

      // DESKTOP: Scale Down Animation
      mm.add("(min-width: 1024px)", () => {
        if (isExpanded) {
          // 1. Hide Title
          tl.to(
            titleGroupRef.current,
            {
              y: -50,
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
              display: "none", // Remove from flow to prevent overlap
            },
            0,
          );

          // 2. Animate Calendar (Big Centered -> Small Bottom Left)
          tl.to(
            calendarWrapperRef.current,
            {
              top: "auto",
              left: "2rem",
              bottom: "2rem",
              x: 0,
              y: 0,
              width: "360px", // Fixed width for sidebar mode
              height: "auto",
              borderRadius: "24px",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
              duration: 0.8,
              ease: "power3.inOut",
            },
            0.1,
          );

          // 3. Show Right Panel
          tl.to(
            rightPanelRef.current,
            {
              x: "0%",
              opacity: 1,
              pointerEvents: "all",
              duration: 0.8,
              ease: "power3.inOut",
            },
            0.1,
          );

          // 4. Show Overlay
          tl.to(bgOverlayRef.current, { opacity: 1, duration: 0.8 }, 0);
        } else {
          // RESET STATE
          tl.to(
            rightPanelRef.current,
            {
              x: "100%",
              opacity: 0,
              pointerEvents: "none",
              duration: 0.6,
              ease: "power3.inOut",
            },
            0,
          );

          tl.to(
            calendarWrapperRef.current,
            {
              top: "50%",
              left: "50%",
              bottom: "auto",
              x: "-50%",
              y: "-45%", // Slightly offset up to account for title
              width: "90%", // Responsive width for Hero mode
              maxWidth: "1100px", // Max width constraint
              height: "auto",
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.1)",
              duration: 0.8,
              ease: "power3.inOut",
            },
            0,
          );

          tl.to(
            titleGroupRef.current,
            {
              y: 0,
              opacity: 1,
              display: "block",
              duration: 0.6,
              delay: 0.2,
            },
            0.2,
          );

          tl.to(bgOverlayRef.current, { opacity: 0, duration: 0.6 }, 0);
        }
      });

      // MOBILE: Simple Stack
      mm.add("(max-width: 1023px)", () => {
        if (isExpanded) {
          tl.to(calendarWrapperRef.current, { autoAlpha: 0, duration: 0.3 });
          tl.to(rightPanelRef.current, {
            x: "0%",
            opacity: 1,
            pointerEvents: "all",
            duration: 0.4,
          });
        } else {
          tl.to(rightPanelRef.current, {
            x: "100%",
            opacity: 0,
            pointerEvents: "none",
            duration: 0.3,
          });
          tl.to(calendarWrapperRef.current, { autoAlpha: 1, duration: 0.4 });
        }
      });
    },
    { dependencies: [isExpanded], scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      // Added z-20 and bg-white to cover the Hero section during scroll
      className="relative w-full h-screen min-h-[800px] bg-white overflow-hidden z-20 flex flex-col"
    >
      {/* Background Overlay for Focus Mode */}
      <div
        ref={bgOverlayRef}
        className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity z-0"
      />

      {/* --- HERO STATE: Title & Instructions --- */}
      <div
        ref={titleGroupRef}
        className="absolute top-[12%] md:top-[15%] left-0 w-full text-center px-6 z-10"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Syne'] font-bold text-zinc-900 tracking-tighter mb-3">
          Events & Agenda
        </h1>
        <p className="text-zinc-500 font-medium tracking-wide uppercase text-xs md:text-sm font-['Manrope']">
          Select a date below to view details
        </p>
      </div>

      {/* --- CALENDAR WRAPPER --- 
          FIX: Added w-[90%] and max-w-[1100px] to ensure it starts LARGE.
          This prevents the "tiny widget" issue.
      */}
      <div
        ref={calendarWrapperRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] z-30 w-[90%] max-w-[1100px]"
      >
        {/* The Calendar Shim is just the internal grid. We control sizing here. */}
        <div className="bg-white rounded-[24px] shadow-2xl shadow-zinc-200/50 border border-zinc-100 p-4 md:p-8 h-full w-full">
          <CalendarShim
            events={events}
            selectedDate={selectedDate || format(new Date(), "yyyy-MM-dd")}
            onSelectDate={handleDateSelect}
          />
        </div>

        {/* Reset Button (Only visible when docked) */}
        {isExpanded && (
          <button
            onClick={handleReset}
            className="hidden lg:flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors ml-4"
          >
            <ArrowLeft className="w-4 h-4" /> Pick another date
          </button>
        )}
      </div>

      {/* --- RIGHT PANEL (Details) --- */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-full lg:w-[calc(100%-400px)] h-full bg-white/95 backdrop-blur-xl lg:bg-white shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.05)] border-l border-zinc-100 translate-x-full opacity-0 pointer-events-none z-20 flex flex-col"
      >
        {/* Panel Header */}
        <div className="shrink-0 px-6 md:px-12 py-6 border-b border-zinc-100 flex items-center justify-between bg-white/80 backdrop-blur-md z-30 sticky top-0">
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">
              {selectedDate
                ? format(parseISO(selectedDate), "EEEE, MMMM do")
                : ""}
            </p>
            <h2 className="text-xl md:text-2xl font-['Syne'] font-bold text-zinc-900">
              {selectedEvents.length} Sessions
            </h2>
          </div>
          {/* Close Button (Mobile Only) */}
          <button
            onClick={handleReset}
            className="lg:hidden p-2 rounded-full hover:bg-zinc-100"
          >
            <X className="w-6 h-6 text-zinc-600" />
          </button>
        </div>

        {/* Scroll Content with Lenis Bypass */}
        <div
          className="flex-1 overflow-y-auto custom-scrollbar bg-zinc-50/50"
          data-lenis-prevent="true"
        >
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => (
                <EventArticle key={event.id} event={event} />
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400 min-h-[50vh]">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-zinc-100">
                  <CalendarIcon className="w-6 h-6 opacity-30" />
                </div>
                <p className="text-lg font-medium text-zinc-500">
                  No events scheduled
                </p>
              </div>
            )}
            <div className="h-24" />
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.1); border-radius: 20px; }
      `}</style>
    </section>
  );
};

export default EventsComponent;
