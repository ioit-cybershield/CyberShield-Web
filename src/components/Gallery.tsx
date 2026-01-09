import RevealGallery, { type RevealItem } from "@/components/ui/reveal-gallery";
import { ArrowUpRight } from "lucide-react";

const items: RevealItem[] = [
  {
    id: "1",
    title: "Web Development",
    subtitle: "Workshop • 2025",
    imageSrc: "/path-to-your-image.jpg",
    // tags: ["AI/ML", "React", "Law"],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque culpa ullam reiciendis, accusamus blanditiis, quaerat odio esse perferendis, ab magni fugit voluptatum repudiandae sit sint?",
    content: (
      <>
        <div>
          <p className="mb-4">
            Here is some extra content that will be rendered inside the modal.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600">
            <li>Feature one is aligned correctly.</li>
            <li>Feature two looks great.</li>
          </ul>
          <h4 className="text-zinc-900 font-semibold mt-8 mb-4">
            Key Features
          </h4>
          <ul className="list-disc pl-5 space-y-2 marker:text-zinc-400">
            <li>Real-time synchronization across all devices.</li>
            <li>Advanced encryption for data security.</li>
            <li>Intuitive interface designed for creators.</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 w-full">
          <button className="flex items-center gap-2 text-zinc-900 font-semibold hover:gap-3 transition-all">
            View Project Details <ArrowUpRight size={18} />
          </button>
        </div>
      </>
    ),
  },

  {
    id: "2",
    title: "Web Development",
    subtitle: "Workshop • 2025",
    imageSrc: "/path-to-your-image.jpg",
    // tags: ["AI/ML", "React", "Law"],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque culpa ullam reiciendis, accusamus blanditiis, quaerat odio esse perferendis, ab magni fugit voluptatum repudiandae sit sint?",
    content: (
      <>
        <div>
          <p className="mb-4">
            Here is some extra content that will be rendered inside the modal.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600">
            <li>Feature one is aligned correctly.</li>
            <li>Feature two looks great.</li>
          </ul>
          <h4 className="text-zinc-900 font-semibold mt-8 mb-4">
            Key Features
          </h4>
          <ul className="list-disc pl-5 space-y-2 marker:text-zinc-400">
            <li>Real-time synchronization across all devices.</li>
            <li>Advanced encryption for data security.</li>
            <li>Intuitive interface designed for creators.</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 w-full">
          <button className="flex items-center gap-2 text-zinc-900 font-semibold hover:gap-3 transition-all">
            View Project Details <ArrowUpRight size={18} />
          </button>
        </div>
      </>
    ),
  },
  {
    id: "3",
    title: "Web Development",
    subtitle: "Workshop • 2025",
    imageSrc: "/path-to-your-image.jpg",
    // tags: ["AI/ML", "React", "Law"],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque culpa ullam reiciendis, accusamus blanditiis, quaerat odio esse perferendis, ab magni fugit voluptatum repudiandae sit sint?",
    content: (
      <>
        <div>
          <p className="mb-4">
            Here is some extra content that will be rendered inside the modal.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600">
            <li>Feature one is aligned correctly.</li>
            <li>Feature two looks great.</li>
          </ul>
          <h4 className="text-zinc-900 font-semibold mt-8 mb-4">
            Key Features
          </h4>
          <ul className="list-disc pl-5 space-y-2 marker:text-zinc-400">
            <li>Real-time synchronization across all devices.</li>
            <li>Advanced encryption for data security.</li>
            <li>Intuitive interface designed for creators.</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 w-full">
          <button className="flex items-center gap-2 text-zinc-900 font-semibold hover:gap-3 transition-all">
            View Project Details <ArrowUpRight size={18} />
          </button>
        </div>
      </>
    ),
  },
  {
    id: "4",
    title: "Web Development",
    subtitle: "Workshop • 2025",
    imageSrc: "/path-to-your-image.jpg",
    // tags: ["AI/ML", "React", "Law"],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque culpa ullam reiciendis, accusamus blanditiis, quaerat odio esse perferendis, ab magni fugit voluptatum repudiandae sit sint?",
    content: (
      <>
        <div>
          <p className="mb-4">
            Here is some extra content that will be rendered inside the modal.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600">
            <li>Feature one is aligned correctly.</li>
            <li>Feature two looks great.</li>
          </ul>
          <h4 className="text-zinc-900 font-semibold mt-8 mb-4">
            Key Features
          </h4>
          <ul className="list-disc pl-5 space-y-2 marker:text-zinc-400">
            <li>Real-time synchronization across all devices.</li>
            <li>Advanced encryption for data security.</li>
            <li>Intuitive interface designed for creators.</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 w-full">
          <button className="flex items-center gap-2 text-zinc-900 font-semibold hover:gap-3 transition-all">
            View Project Details <ArrowUpRight size={18} />
          </button>
        </div>
      </>
    ),
  },
  // ... more items
];
export default function Gallery() {
  return <RevealGallery items={items} />;
}
