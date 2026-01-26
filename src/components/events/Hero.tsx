import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Exact text split from your design
  const copy = [
    ["A", "good", "cocktail", "of"],
    ["strategists,", "designers,"],
    ["and", "engineers."],
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline();
      const words = gsap.utils.toArray(".word-inner"); // Target the inner spans

      // --------------------------------------------------------
      // 1. INTRO ANIMATION (Load)
      // --------------------------------------------------------
      tl.fromTo(
        words,
        {
          yPercent: 100, // Push text down (hidden by overflow)
          rotate: 3, // Subtle rotation for editorial feel
          opacity: 0,
        },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          stagger: 0.05, // Fast, rhythmic stagger
          duration: 1.2,
          ease: "power3.out", // Smooth, non-bouncy deceleration
          delay: 0.1,
        },
      ).fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" },
        "<0.2", // Overlap slightly with text
      );

      // --------------------------------------------------------
      // 2. SCROLL ANIMATION (Parallax & Fade)
      // --------------------------------------------------------

      // Parallax Image Effect
      gsap.to(imageRef.current, {
        yPercent: 20, // Move image down slightly while scrolling
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text Exit Effect (Move up and Fade)
      gsap.to(textRef.current, {
        y: -100, // Move text upward
        opacity: 0, // Fade out
        ease: "power1.in",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "40% top", // Finish fading before section is halfway done
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="bg-white">
      <section
        ref={triggerRef}
        className="relative min-h-[100vh] flex flex-col pt-32 md:pt-48 overflow-hidden"
      >
        {/* TEXT CONTAINER */}
        <div
          ref={textRef}
          className="container mx-auto px-6 md:px-12 z-10 mb-16 relative"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1]">
            {copy.map((line, i) => (
              <div key={i} className="block overflow-hidden">
                {/* 'overflow-hidden' on the line wrapper creates the mask effect */}
                {line.map((word, j) => (
                  <span key={j} className="inline-block relative mr-3 md:mr-5">
                    <span className="word-inner inline-block will-change-transform">
                      {word}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </h1>
        </div>

        {/* IMAGE BANNER */}
        <div className="w-full h-[60vh] md:h-[85vh] relative overflow-hidden mt-auto">
          <img
            ref={imageRef}
            src="https://cdn.prod.website-files.com/679cb8f2875d404c7de22f8a/685938fdf2906528f616f394_Atlantiser_about_us_hero_a2.jpg"
            alt="Team working in office"
            className="absolute top-[-10%] left-0 w-full h-[120%] object-cover object-center"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
