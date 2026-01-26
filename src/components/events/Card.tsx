// DetailedEventCard.tsx
import React from "react";
import { Clock, MapPin, Ticket, ArrowUpRight } from "lucide-react";
import { type EventItem } from "@/types/events";

interface DetailedEventCardProps {
  event: EventItem;
}

export const DetailedEventCard: React.FC<DetailedEventCardProps> = ({
  event,
}) => {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] border border-zinc-100 group hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Optional Image Section */}
        {event.image ? (
          <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>
        ) : (
          // Fallback abstract pattern if no image
          <div className="w-full md:w-32 bg-zinc-100 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-zinc-100">
            <Ticket className="w-8 h-8 text-zinc-300 mb-2" />
            <span className="text-xs font-bold text-zinc-400 uppercase">
              Event
            </span>
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                {event.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                {event.time && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-indigo-500" />
                    {event.time}
                  </span>
                )}
                {event.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-indigo-500" />
                    {event.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="prose prose-sm text-zinc-600 mb-6">
            <p className="font-medium text-zinc-800">{event.summary}</p>
            {event.description && (
              <p className="text-zinc-500 mt-2">{event.description}</p>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
            {event.link ? (
              <a
                href={event.link}
                className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-indigo-600 transition-colors"
              >
                View Event Page <ArrowUpRight size={16} />
              </a>
            ) : (
              <span className="text-xs text-zinc-400 italic">
                No external link available
              </span>
            )}

            <button className="p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-black transition-colors">
              <ArrowUpRight size={20} className="rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
