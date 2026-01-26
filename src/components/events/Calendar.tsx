import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  parseISO,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { type EventItem } from "@/types/events";

interface CalendarProps {
  events: EventItem[];
  selectedDate: string; // ISO String yyyy-MM-dd
  onSelectDate: (date: string) => void;
}

export const CalendarShim: React.FC<CalendarProps> = ({
  events,
  selectedDate,
  onSelectDate,
}) => {
  const selectedDateObj = useMemo(() => parseISO(selectedDate), [selectedDate]);

  // Initialize current view
  const [currentDate, setCurrentDate] = useState(
    !isNaN(selectedDateObj.getTime()) ? selectedDateObj : new Date(),
  );

  // --- FIX 1: Navigation Logic ---
  // Only sync if the PROPS change. Removed 'currentDate' from dependencies
  // to prevent overriding manual navigation.
  useEffect(() => {
    if (
      !isNaN(selectedDateObj.getTime()) &&
      !isSameMonth(currentDate, selectedDateObj)
    ) {
      setCurrentDate(selectedDateObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDateObj]);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(1);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  // Ensure 6 weeks for consistent height
  if (calendarDays.length < 42) {
    const remaining = 42 - calendarDays.length;
    const lastDay = calendarDays[calendarDays.length - 1];
    for (let i = 1; i <= remaining; i++) {
      calendarDays.push(
        new Date(
          lastDay.getFullYear(),
          lastDay.getMonth(),
          lastDay.getDate() + i,
        ),
      );
    }
  }

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // --- Animations ---
  useGSAP(() => {
    if (!gridRef.current) return;

    const days = gridRef.current.children;
    const dir = directionRef.current;

    gsap.killTweensOf(days);

    gsap.fromTo(
      days,
      {
        y: dir * 10,
        opacity: 0,
        scale: 0.9,
        filter: "blur(2px)",
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: {
          each: 0.02,
          from: dir > 0 ? 0 : "end",
          grid: [6, 7],
        },
        ease: "power2.out",
      },
    );
  }, [currentDate]);

  const handleMonthChange = (dir: "prev" | "next") => {
    directionRef.current = dir === "next" ? 1 : -1;
    setCurrentDate(
      dir === "next" ? addMonths(currentDate, 1) : subMonths(currentDate, 1),
    );
  };

  const handleDayClick = (day: Date, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    const isoDay = format(day, "yyyy-MM-dd");
    onSelectDate(isoDay);

    gsap.fromTo(
      `.day-${isoDay}`,
      { scale: 0.9 },
      { scale: 1, duration: 0.4, ease: "back.out(2)" },
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
      `}</style>

      {/* --- FIX 2: Container Layout --- */}
      {/* Removed 'min-h-screen', 'fixed max-w', and centering. */}
      {/* Added 'w-full h-full' to fill the parent. */}
      <div
        ref={containerRef}
        className="w-full h-full bg-white rounded-[24px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] p-6 flex flex-col border border-zinc-100 antialiased font-['Manrope']"
      >
        {/* --- Header --- */}
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-100 flex-shrink-0">
          <div>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1 block">
              {format(currentDate, "yyyy")}
            </span>
            <h2 className="text-4xl font-['Syne'] font-bold text-black tracking-tight leading-none">
              {format(currentDate, "MMMM")}
            </h2>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => handleMonthChange("prev")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 border border-zinc-100 hover:bg-black hover:border-black hover:text-white transition-all duration-300 active:scale-90"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => handleMonthChange("next")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 border border-zinc-100 hover:bg-black hover:border-black hover:text-white transition-all duration-300 active:scale-90"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* --- Weekdays --- */}
        <div className="grid grid-cols-7 mb-3 flex-shrink-0">
          {weekDays.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] font-bold text-zinc-300 uppercase tracking-widest"
            >
              {d}
            </div>
          ))}
        </div>

        {/* --- Calendar Grid --- */}
        {/* Changed h-[380px] to flex-1 to fill remaining vertical space */}
        <div
          ref={gridRef}
          className="grid grid-cols-7 grid-rows-6 gap-2 flex-1 min-h-[380px]"
        >
          {calendarDays.map((day) => {
            const formattedDate = format(day, "yyyy-MM-dd");
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isSelected = formattedDate === selectedDate && isCurrentMonth;
            const isTodayDate = isToday(day);
            const dayEvents = events.filter((e) => e.date === formattedDate);
            const hasEvents = dayEvents.length > 0;

            return (
              <div
                key={day.toString()}
                onClick={() => handleDayClick(day, isCurrentMonth)}
                className={cn(
                  `day-${formattedDate}`,
                  "relative w-full h-full rounded-xl flex flex-col items-center justify-center transition-all duration-300 border border-transparent",
                  isCurrentMonth
                    ? "cursor-pointer hover:bg-zinc-50"
                    : "opacity-30 cursor-default text-zinc-200 pointer-events-none",
                  isSelected &&
                    "bg-black hover:bg-black shadow-lg scale-105 z-10",
                )}
              >
                {isSelected && (
                  <ArrowUpRight
                    size={12}
                    className="absolute top-2 right-2 text-zinc-500"
                  />
                )}

                <span
                  className={cn(
                    "text-sm font-semibold relative z-10",
                    isSelected ? "text-white" : "",
                    !isSelected && isCurrentMonth ? "text-zinc-700" : "",
                    !isCurrentMonth && "text-zinc-300",
                    isTodayDate &&
                      !isSelected &&
                      isCurrentMonth &&
                      "text-indigo-600 font-bold",
                  )}
                >
                  {format(day, "d")}
                </span>

                {isCurrentMonth && (
                  <div className="flex gap-1 mt-1.5 h-1.5">
                    {dayEvents.map((ev, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "w-1 h-1 rounded-full",
                          isSelected ? "bg-zinc-500" : "bg-black",
                        )}
                        style={{ opacity: isSelected ? 1 : 0.3 }}
                      />
                    ))}
                  </div>
                )}

                {hasEvents && !isSelected && isCurrentMonth && (
                  <div className="absolute inset-0 rounded-xl flex items-center justify-center bg-white border border-zinc-100 opacity-0 hover:opacity-100 transition-opacity duration-200 z-20">
                    {/* Safe check for icon property */}
                    {(dayEvents[0] as any).icon ? (
                      <img
                        src={(dayEvents[0] as any).icon}
                        className="w-5 h-5 opacity-80"
                        alt="event"
                      />
                    ) : (
                      // Fallback if no icon is present in data
                      <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                    )}

                    {dayEvents.length > 1 && (
                      <span className="ml-1 text-[9px] font-bold text-zinc-400">
                        +{dayEvents.length - 1}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 font-medium flex-shrink-0">
          <span>
            {
              events.filter((e) => isSameMonth(parseISO(e.date), currentDate))
                .length
            }{" "}
            Events this month
          </span>
          <button
            onClick={() => {
              const today = new Date();
              setCurrentDate(today);
              onSelectDate(format(today, "yyyy-MM-dd"));
            }}
            className="hover:text-black transition-colors"
          >
            Back to Today
          </button>
        </div>
      </div>
    </>
  );
};
