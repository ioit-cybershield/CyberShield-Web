// src/content/nav.ts
export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavColumn = {
  heading?: string;
  links: NavLink[];
};

export type NavItem = {
  id: string;
  label: string;
  href?: string;
  type: "simple" | "mega" | "dropdown";
  columns?: NavColumn[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: "events",
    label: "Events",
    type: "mega",
    columns: [
      {
        heading: "Past Events",
        links: [
          { label: "Event Details", href: "/events/past" },
          { label: "Gallery", href: "/events/gallery" },
        ],
      },
      {
        heading: "Future events",
        links: [
          { label: "Event Details", href: "/events/future" },
          { label: "Register", href: "/events/register" },
        ],
      },
    ],
  },
  {
    id: "gallery",
    label: "Gallery",
    type: "dropdown",
    columns: [
      {
        heading: "Gallery",
        links: [
          { label: "Workshop", href: "/workshop" },
          { label: "Web Dev", href: "/webdev" },
          { label: "CTF", href: "/CTF" },
        ],
      },
    ],
  },
  { id: "Team", label: "Team", href: "/team", type: "simple" },
  { id: "About us", label: "About us", href: "/about", type: "simple" },
];
