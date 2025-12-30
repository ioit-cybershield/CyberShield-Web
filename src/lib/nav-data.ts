// navData.ts
export type NavItemConfig = {
  id: string;
  label: string;
  href: string;
  type: "simple" | "mega" | "dropdown";
  columns?: {
    heading?: string;
    links: { label: string; href: string; description?: string }[];
  }[];
};

export const navData: NavItemConfig[] = [
  {
    id: "events",
    label: "Events",
    href: "/events",
    type: "dropdown",
    columns: [
      {
        links: [
          {
            label: "Upcoming Events",
            href: "/events/upcoming",
            description: "What's happening next",
          },
          {
            label: "Past Events",
            href: "/events/past",
            description: "Our previous events",
          },
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
    href: "/about",
    type: "dropdown",
    columns: [
      {
        links: [
          {
            label: "About Us",
            href: "/about",
            description: "Who we are",
          },
          {
            label: "Our Mission",
            href: "/about/mission",
            description: "What drives us",
          },
          {
            label: "Contact",
            href: "/contact",
            description: "Get in touch",
          },
        ],
      },
    ],
  },
];
