// src/content/timeline.ts
export type TimelineState = {
  label: string;
  titleLines: string[];
  desc: string;
};

export const TIMELINE_STATES: TimelineState[] = [
  {
    label: "Past",
    titleLines: ["Early days", "of CyberShield"],
    desc: "How the club started, first meetups, and initial workshops.",
  },
  {
    label: "Today",
    titleLines: ["Active community", "learning by doing"],
    desc: "Regular workshops, CTFs, awareness sessions and internal projects.",
  },
  {
    label: "Future",
    titleLines: ["Scaling impact", "across the campus"],
    desc: "Collaborations, inter‑college events, research and advanced tracks.",
  },
];
