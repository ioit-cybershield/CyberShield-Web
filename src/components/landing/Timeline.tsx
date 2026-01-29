import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE_STATES } from "@/content/timeline";

gsap.registerPlugin(ScrollTrigger);

// --- CONSTANTS ---
// (Your existing SVG paths remain exactly the same)
const SPINNER_PATH_1 =
  "m528.041 76.831 15.918 35.326m323.785-96.119-1.348 38.588M811.788 1618.38l-1.347 38.59M896.358 17.572l-2.694 38.517M784.516 1616.99l-2.693 38.52M924.902 20.11l-4.035 38.4M757.308 1614.65l-4.036 38.4M953.34 23.654l-5.374 38.236M730.201 1611.37l-5.374 38.24M981.637 28.164l-6.704 38.025M703.222 1607.13l-6.705 38.03M1009.76 33.67l-8.03 37.768M676.41 1601.97l-8.028 37.76M1037.67 40.16l-9.34 37.464M649.793 1595.87l-9.341 37.46M1065.34 47.615 1054.7 84.73m-431.296 1504.1-10.643 37.11M1092.74 56.029 1080.8 92.75M597.28 1580.88l-11.932 36.72M1119.82 65.4l-13.21 36.283M571.447 1572.04l-13.206 36.28M1146.56 75.693l-14.47 35.8M545.939 1562.28l-14.464 35.8M1172.92 86.936l-15.71 35.273M520.785 1551.65l-15.704 35.27M1198.87 99.085l-16.92 34.703M496.02 1540.15l-16.926 34.7M1224.39 112.122l-18.13 34.092M471.674 1527.78l-18.127 34.09M1249.43 126.041l-19.3 33.438M447.769 1514.57l-19.305 33.44M1273.98 140.826l-20.46 32.744M424.341 1500.53l-20.46 32.75M1297.99 156.486l-21.59 32.01M401.42 1485.71l-21.591 32.01M1321.44 172.949l-22.7 31.237M379.028 1470.07l-22.695 31.24M1344.3 190.226l-23.77 30.426M357.196 1453.67l-23.771 30.42M1366.17 211.914l-21.83 26.316M335.947 1436.5l-24.819 29.58M1388.15 227.108l-25.84 28.694M315.313 1418.62l-25.836 28.69M1409.08 246.699l-26.82 27.775M295.316 1400.03l-26.822 27.78m7.485-47.07-27.775 26.82M1448.83 287.964l-28.69 25.836M257.327 1360.81l-28.693 25.83M1467.6 309.616l-29.58 24.819M239.383 1340.22l-29.578 24.82M1485.61 331.904l-30.43 23.771M222.167 1319.01l-30.426 23.77M1502.82 354.827l-31.24 22.695M205.702 1297.24l-31.237 22.69M1519.23 378.316l-32.01 21.591M190.005 1274.88l-32.01 21.59M1534.8 402.365l-32.74 20.46M175.1 1251.99l-32.744 20.47M1549.53 426.957l-33.44 19.305M161.003 1228.62l-33.439 19.31M1563.38 452.031l-34.09 18.127M147.73 1204.75l-34.092 18.13M1576.36 477.588l-34.7 16.926M135.298 1180.44l-34.704 16.93M1588.44 503.573l-35.28 15.705M123.723 1155.71l-35.273 15.7M1599.6 529.971l-35.8 14.464M113.016 1130.59l-35.8 14.46M1609.83 556.744l-36.28 13.206M103.192 1105.12l-36.282 13.2m1552.21-534.482-36.72 11.931M94.266 1079.3l-36.721 11.93M1627.46 611.26l-37.11 10.643M86.246 1053.2l-37.115 10.65M1634.84 638.957l-37.46 9.341M79.142 1026.84l-37.464 9.34M1641.25 666.899l-37.77 8.027M72.955 1000.24l-37.767 8.03M1646.68 695.016l-38.02 6.705M67.71 973.434l-38.025 6.704M1651.13 723.323l-38.24 5.373M63.4 946.465l-38.235 5.374M1654.58 751.79l-38.4 4.036M60.033 919.389l-38.4 4.036m1635.407-143.1-38.52 2.693M57.617 892.165 19.1 894.858m1639.4-85.916-38.59 1.348M56.145 864.901l-38.588 1.347m1640.863-.004-38.59-1.348M56.068 810.293l-38.588-1.348m1639.4 85.92-38.52-2.693M57.457 783.026l-38.517-2.694m1635.41 143.061-38.4-4.036M59.8 755.802l-38.4-4.036m1629.41 200.085-38.23-5.374M63.089 728.716l-38.236-5.374M1646.29 980.138l-38.02-6.704M67.32 701.728l-38.024-6.704M1640.78 1008.26l-37.76-8.03M72.492 674.909l-37.767-8.028M1634.3 1036.17l-37.46-9.34M78.598 648.294l-37.464-9.341M1626.85 1063.83l-37.12-10.64M85.629 621.893 48.513 611.25m1569.917 479.99-36.72-11.93M93.575 595.791l-36.721-11.932M1609.06 1118.31l-36.28-13.2M102.428 569.947l-36.283-13.206M1598.76 1145.05l-35.8-14.46M112.177 544.432l-35.8-14.464M1587.53 1171.42l-35.28-15.71M122.813 519.284 87.54 503.58m1487.84 693.79-34.7-16.93M134.319 494.512l-34.704-16.926M1562.34 1222.89l-34.09-18.13M146.682 470.175l-34.092-18.127m1435.82 795.882-33.44-19.3M159.888 446.266l-33.439-19.305M1533.62 1272.47l-32.75-20.46M173.918 422.841l-32.744-20.461m1376.806 894.1-32.01-21.59M188.758 399.912l-32.01-21.591M1501.51 1319.94l-31.24-22.69M204.389 377.527l-31.237-22.695M1484.23 1342.8l-30.42-23.77M220.792 355.693l-30.426-23.772M1466.17 1365.04l-29.58-24.82M237.95 334.442l-29.578-24.819M1447.34 1386.65l-28.69-25.83M255.834 313.819l-28.694-25.836M1427.77 1407.58l-27.78-26.82M274.431 293.815l-27.775-26.821M1386.49 1447.33l-25.83-28.69M313.656 255.832l-25.836-28.694M1364.84 1466.11l-24.82-29.58m2.52 47.58-23.77-30.42M355.437 220.675l-23.771-30.426m.458 47.651-23.772-30.426M1319.64 1501.32l-22.7-31.23M377.222 204.204l-22.695-31.237M1296.14 1517.72l-21.59-32.01M399.57 188.499l-21.592-32.01M1272.09 1533.29l-20.46-32.74M422.451 173.592l-20.46-32.744M1247.5 1548.03l-19.3-33.44M445.837 159.498l-19.306-33.439M1222.42 1561.89l-18.13-34.09M469.703 146.23l-18.127-34.091M1196.87 1574.86l-16.92-34.71M494.019 133.792l-16.926-34.703M1170.88 1586.93l-15.7-35.27M518.749 122.219l-15.705-35.273M1144.49 1598.1l-14.46-35.8m-12.31 46.02-13.2-36.28M569.353 101.696l-13.206-36.283M1090.61 1617.63l-11.93-36.72M595.159 92.784l-11.932-36.722M1063.2 1625.96l-10.64-37.12M621.262 84.746l-10.643-37.115M1035.51 1633.34l-9.34-37.46M647.629 77.636l-9.341-37.464M1007.58 1639.75l-8.03-37.77M674.227 71.454l-8.028-37.767M979.438 1645.18l-6.705-38.02M701.023 66.216l-6.704-38.025M951.132 1649.63l-5.374-38.23M727.992 61.913l-5.374-38.235M922.685 1653.07l-4.036-38.4M755.09 58.523l-4.036-38.4m143.08 1635.407-2.693-38.51M782.291 56.114l-2.693-38.517M865.515 1657l-1.347-38.59M809.56 54.643l-1.348-38.588";
const SPINNER_PATH_2 =
  "M838.86 0v54.992m.232 1563.438v61.77M253.298 235.486l38.885 38.884M1382.3 1400.55l43.68 43.68m14.34-1189.551-38.89 38.885M290.82 1391.86l-43.683 43.68M0 839.137h54.992m1564.998-.232h61.78";

const STATES = TIMELINE_STATES;

export default function TimelineSpinnerSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const spinnerRef = useRef<SVGSVGElement | null>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Create a timeline that spans the pinned distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%", // Reduced slightly as we removed the CTA, to keep it snappy
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scroller: document.documentElement,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      // --- ANIMATION: Lockstep Sync ---
      // IMPORTANT: We treat the timeline as a range from 0 to 1.

      // 1. Continuous Spinner Rotation
      // Fix: Added `duration: 1` to ensure it rotates for the FULL length of the scroll.
      tl.to(
        spinnerRef.current,
        {
          rotation: 180,
          transformOrigin: "50% 50%",
          ease: "none",
          duration: 1,
        },
        0,
      );

      // --- STAGE 1: PAST (Visible initially, fades out) ---
      // Fade Out (0.0 to 0.25)
      tl.to(
        textRefs.current[0],
        { opacity: 0, y: -40, duration: 0.25, ease: "power1.in" },
        0,
      );

      // --- STAGE 2: TODAY (Enters, Stays, Exits) ---
      // Fade In (0.25 to 0.35)
      tl.fromTo(
        textRefs.current[1],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power1.out" },
        0.25,
      );
      // Fade Out (0.6 to 0.7)
      tl.to(
        textRefs.current[1],
        { opacity: 0, y: -40, duration: 0.1, ease: "power1.in" },
        0.6,
      );

      // --- STAGE 3: FUTURE (Enters and STAYS) ---
      // Fade In (0.7 to 0.8)
      // Fix: We do NOT fade this out. It stays visible as the user scrolls away.
      tl.fromTo(
        textRefs.current[2],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power1.out" },
        0.7,
      );

      // (Optional) Subtle spinner fade at the very end to indicate completion
      tl.to(spinnerRef.current, { opacity: 0.3, duration: 0.2 }, 0.8);
    }, section);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      // CHANGE: Changed min-h-screen to h-screen to fix white gap/height glitch
      className="relative z-10 h-screen w-full bg-[#E2F949  ] text-[#241e1e] overflow-hidden transform-gpu will-change-transform"
      style={{
        // Hardware acceleration to prevent sub-pixel rendering gaps
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Background Layer */}
      <div
        className="absolute inset-0 -z-10 h-full w-full"
        style={{
          background:
            "radial-gradient(150% 180% at 50% 75%,#F2FF7A 0%,#CDEB46 30%,#8EA92F 55%,#4F5F24 75%,#252A1C 100%)",
        }}
      />

      {/* Foreground Content Wrapper */}
      <div className="relative flex h-full flex-col items-center justify-start pt-[12vh] md:pt-[16vh]">
        {/* Text Stack */}
        <div className="relative z-10 w-full max-w-5xl px-6 text-center">
          {STATES.map((state, idx) => (
            <div
              key={state.label}
              ref={(el) => {
                if (el) textRefs.current[idx] = el;
              }}
              className={`absolute inset-0 flex flex-col items-center justify-start ${
                idx === 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="mb-4 text-sm font-sans tracking-[0.18em] uppercase text-[#2e2522]">
                {state.label}
              </span>

              <div className="mb-5 text-balance font-(--font-family-alternate) text-3xl leading-[1.05] md:text-5xl lg:text-[3.4rem]">
                {state.titleLines.map((line) => (
                  <p key={line} className="block">
                    {line}
                  </p>
                ))}
              </div>

              <p className="mx-auto max-w-xl text-sm md:text-base text-[#2e2522]">
                {state.desc}
              </p>
            </div>
          ))}

          {/* Invisible spacer to maintain layout height */}
          <div className="invisible pointer-events-none select-none">
            <span className="mb-4 block text-sm">SPACER</span>
            <div className="mb-5 text-3xl md:text-5xl lg:text-[3.4rem]">
              <p>Spacer Line 1</p>
              <p>Spacer Line 2</p>
            </div>
            <p className="text-sm">Description Spacer</p>
          </div>
        </div>

        {/* Spinner SVG */}
        <div className="pointer-events-none absolute top-150 md:top-50 flex w-full justify-center overflow-hidden">
          <div className="relative w-[140vw] max-w-6xl translate-y-[10%] md:w-[115vw] lg:w-screen">
            <svg
              ref={spinnerRef}
              viewBox="0 0 1682 1681"
              className="h-full w-full text-[#241e1e]"
              style={{ transformOrigin: "50% 50%" }}
            >
              <path
                stroke="#041e1e"
                strokeOpacity=".24"
                strokeWidth="2.163"
                d={SPINNER_PATH_1}
              />
              <path stroke="#2E2522" strokeWidth="2.163" d={SPINNER_PATH_2} />
            </svg>
          </div>
        </div>
      </div>

      {/* CTA PANE REMOVED HERE */}
    </section>
  );
}
