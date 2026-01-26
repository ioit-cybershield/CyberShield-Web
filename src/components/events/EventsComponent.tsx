// EventsHero.tsx
import React, { useState, useRef, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { type EventItem } from "@/types/events";
import { CalendarShim } from "@/components/events/ui/Calendar";
import { DetailedEventCard } from "@/components/events/ui/Card";

interface EventsHeroProps {
  events: EventItem[];
}

const EventsComponent: React.FC<EventsHeroProps> = ({ events = [] }) => {
  // Default to today
  const todayISO = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState<string>(todayISO);

  // Refs for animation context
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);

  // Filter events for the selected date
  const selectedEvents = useMemo(() => {
    return events.filter((e) => e.date === selectedDate);
  }, [events, selectedDate]);

  // --- GSAP Swipe Animation Logic ---
  useGSAP(
    () => {
      if (!detailsPanelRef.current) return;

      // 1. Reset immediate state for entry
      gsap.set(detailsPanelRef.current, { clearProps: "all" });

      // 2. Animate In
      gsap.fromTo(
        detailsPanelRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      );
    },
    { dependencies: [selectedDate], scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F8F8F8] font-['Manrope'] overflow-hidden flex flex-col lg:flex-row"
    >
      {/* ----------------------------------------------------
        LEFT COLUMN: Navigation & Calendar
        ----------------------------------------------------
      */}
      <div className="w-full lg:w-[420px] xl:w-[480px] flex-shrink-0 bg-white border-r border-zinc-200 z-20 flex flex-col h-auto lg:h-screen sticky top-0">
        <div className="p-8 lg:p-10 flex flex-col h-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-['Syne'] font-bold text-black tracking-tight mb-2">
              Events
            </h1>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed">
              Select a date to view the detailed agenda.
            </p>
          </div>

          {/* Calendar Integration */}
          <div className="flex-1 flex flex-col justify-start">
            <CalendarShim
              events={events}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>

          {/* Footer / Meta (Desktop Only) */}
          <div className="hidden lg:block mt-auto pt-6 border-t border-zinc-100 text-xs text-zinc-400">
            <p>© 2026 Company Name. All times local.</p>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
        RIGHT COLUMN: Dynamic Details Pane
        ----------------------------------------------------
      */}
      <div className="flex-1 bg-[#F8F8F8] relative flex flex-col h-full lg:h-screen overflow-hidden">
        {/* Background Graphic / Texture */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />

        {/* Content Container with Animation Ref */}
        <div
          ref={detailsPanelRef}
          className="flex-1 overflow-y-auto p-6 lg:p-12 relative z-10"
        >
          {/* Date Heading for Context */}
          <header className="mb-8 border-b border-zinc-200 pb-4 flex items-end justify-between">
            <div>
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">
                Schedule For
              </h2>
              <p className="text-3xl lg:text-4xl font-['Syne'] font-bold text-zinc-900">
                {format(parseISO(selectedDate), "EEEE, MMMM do")}
              </p>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-xs font-semibold bg-black text-white px-3 py-1 rounded-full">
                {selectedEvents.length} Event
                {selectedEvents.length !== 1 && "s"}
              </span>
            </div>
          </header>

          {/* Dynamic Content Switcher */}
          {selectedEvents.length === 0 ? (
            // EMPTY STATE (with vertical padding)
            <div className="h-[60vh] flex flex-col items-center justify-center text-zinc-400 py-12">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <CalendarIcon className="w-6 h-6 opacity-30" />
              </div>
              <p className="text-lg font-medium text-zinc-500">
                No events scheduled
              </p>
              <p className="text-sm">
                Check back later or select another date.
              </p>
            </div>
          ) : (
            // EVENTS LIST (with vertical padding and spacing)
            <div className="grid gap-6 max-w-3xl mx-auto py-12 space-y-12">
              {selectedEvents.map((event) => (
                <DetailedEventCard key={event.id} event={event} />
              ))}

              {/* Extra spacing at bottom for scroll */}
              <div className="h-20" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsComponent;
