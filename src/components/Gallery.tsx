import RevealGallery from "@/components/ui/reveal-gallery";
import { eventsData } from "@/content/events";

export default function Gallery() {
  return <RevealGallery items={eventsData} />;
}
