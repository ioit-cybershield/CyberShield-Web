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
    type: "mega",
    columns: [
      {
        heading: "Past Events",
        links: [
          {
            label: "event details",
            href: "/events/past",
            description: "past events",
          },
          {
            label: "Gallery",
            href: "/events/gallery",
            description: "photos and videos",
          },
          
        ],
      },
      {
        heading: "Future events",
        links: [
          { label: "event details", href: "/events/future" },
          { label: "Register", href: "/events/register" },
          
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    href: "/company",
    type: "dropdown",
    columns: [
      {
        links: [
          { label: "About Us", href: "/about" },
          { label: "Sustainability", href: "/sustainability" },
          { label: "Careers", href: "/careers" },
          { label: "Investors", href: "/investors" },
        ],
      },
    ],
  },
  { id: "products", label: "Products", href: "/products", type: "simple" },
  { id: "resources", label: "Resources", href: "/resources", type: "simple" },
];
