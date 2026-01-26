// types.ts
export type EventItem = {
  id: string;
  date: string; // ISO YYYY-MM-DD
  title: string;
  time?: string;
  summary: string;
  description?: string;
  image?: string;
  link?: string;
  location?: string;
};
