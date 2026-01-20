import type { RevealItem } from "@/components/ui/reveal-gallery";

export const eventsData: RevealItem[] = [
  {
    id: "intro-ethical-hacking",
    title: "Intro to Ethical Hacking",
    subtitle: "Foundation Workshop",
    imageSrc: "/images/events/intro-ethical-hacking.jpg", // update paths as you add real photos
    // tags: ["Beginner", "Offensive Security", "Hands-on"],
    description:
      "A guided introduction to ethical hacking where members explore recon, basic exploitation, and responsible disclosure in a safe lab environment.",
    content: (
      <div>
        <p className="mb-4">
          This workshop breaks down core concepts like attack surface, common
          vulnerabilities, and the mindset of an ethical hacker using real tools
          and demos.
        </p>
        <h4 className="text-zinc-900 font-semibold mt-8 mb-4">
          What you’ll practice
        </h4>
        <ul className="list-disc pl-5 space-y-2 text-zinc-600">
          <li>Using Kali-based tools for reconnaissance and enumeration.</li>
          <li>Understanding OWASP-style web vulnerabilities in a lab setup.</li>
          <li>Learning how to report issues ethically and responsibly.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "web-security-bootcamp",
    title: "Web Application Security Bootcamp",
    subtitle: "Hands-on Series",
    imageSrc: "/images/events/web-security-bootcamp.jpg",
    // tags: ["Web Security", "OWASP", "Intermediate"],
    description:
      "A multi-session deep dive into securing web apps, from authentication flaws to injection attacks and secure coding practices.",
    content: (
      <div>
        <p className="mb-4">
          Members work through vulnerable-by-design applications to understand
          how attacks work and how to defend against them.
        </p>
        <h4 className="text-zinc-900 font-semibold mt-8 mb-4">Key takeaways</h4>
        <ul className="list-disc pl-5 space-y-2 text-zinc-600">
          <li>Hands-on experience with common web vulnerabilities.</li>
          <li>Defensive patterns and secure coding guidelines.</li>
          <li>How to think like both attacker and defender.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "on-campus-ctf",
    title: "On-Campus Capture the Flag",
    subtitle: "Competition",
    imageSrc: "/images/events/on-campus-ctf.jpg",
    // tags: ["CTF", "Competition", "Teamwork"],
    description:
      "A team-based CTF where members tackle real-world style challenges in web, crypto, forensics, and more.",
    content: (
      <div>
        <p className="mb-4">
          Designed for all levels, this event encourages collaboration,
          creativity, and learning under pressure.
        </p>
        <h4 className="text-zinc-900 font-semibold mt-8 mb-4">Highlights</h4>
        <ul className="list-disc pl-5 space-y-2 text-zinc-600">
          <li>Challenge tracks for beginners and advanced teams.</li>
          <li>Live scoreboard and mentoring from senior members.</li>
          <li>Debrief sessions to explain solutions and techniques.</li>
        </ul>
      </div>
    ),
  },
];
