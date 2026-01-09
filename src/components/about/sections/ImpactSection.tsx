'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Shared Typography Styles to ensure perfect alignment
const TITLE_STYLE = "text-[18vw] font-black text-[#111827] leading-none tracking-tighter";
const TITLE_STYLE_CLARITY = "text-[18vw] font-black text-[#0e7490] leading-none tracking-tighter";
const SUBTITLE_STYLE = "font-bold tracking-[0.3em] uppercase text-sm md:text-xl mt-6 text-[#0e7490]";

// --- 1. THE CHAOS GROUP ---
const ChaosGroup = ({ numberRef }: { numberRef: React.RefObject<HTMLSpanElement | null> }) => (
  <div className="chaos-group absolute inset-0 flex flex-col items-center justify-center z-10 pb-20">
    
    {/* TEXT CONTAINER - Perfectly Centered */}
    <div className="relative text-center flex flex-col items-center">
      <h3 className={TITLE_STYLE}>
        CHAOS
      </h3>
      <p className={SUBTITLE_STYLE}>
        MANUAL • SLOW • BIASED
      </p>
    </div>

    {/* EXTRAS - Absolute positioning so they don't push the text */}
    <div className="absolute bottom-20 flex flex-col items-center">
        <span ref={numberRef} className="text-8xl font-black tracking-tighter text-[#6B7280]">
          0%
        </span>
        <p className="text-[#9CA3AF] font-bold tracking-widest mt-2 text-xs uppercase">Processing...</p>
    </div>
  </div>
);

// --- 2. THE CLARITY GROUP ---
const ClarityGroup = () => {
  const stats = [
    { value: "80%", label: "Time Saved" },
    { value: "99%", label: "Accuracy" },
    { value: "24/7", label: "Availability" },
  ];

  return (
    <div className="clarity-group absolute inset-0 flex flex-col items-center justify-center z-10 opacity-0 pointer-events-none pb-20">
      
      {/* TEXT CONTAINER - Matches Chaos Structure Exactly */}
      <div className="relative text-center flex flex-col items-center">
        <h3 className={TITLE_STYLE_CLARITY}>
            CLARITY
        </h3>
        <p className={SUBTITLE_STYLE}>
            VISION • FOCUS • SPEED
        </p>
      </div>

      {/* EXTRAS - Absolute positioning matches Chaos Counter location */}
      <div className="absolute bottom-20 flex justify-center gap-12 md:gap-24">
        {stats.map((stat, index) => (
          <div key={index} className="impact-stat text-center opacity-0 translate-y-8">
            <h4 className="text-4xl md:text-6xl font-bold text-[#111827] mb-2">{stat.value}</h4>
            <p className="text-[10px] md:text-sm uppercase tracking-widest text-[#0e7490] font-bold">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 3. MAIN COMPONENT ---
export default function ImpactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const percentageProxy = { value: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Increased pin distance for more scroll 
        pin: true,
        scrub: 1,
      }
    });

    // --- PHASE 1: Count up ---
    tl.to(percentageProxy, {
      value: 98,
      duration: 2, // Reduced duration to make this part scroll faster
      ease: "linear",
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = Math.floor(percentageProxy.value).toString() + "%";
        }
      },
    }, 0);

    // --- PHASE 2: The Swap ---
    // Make the swap nearly instant at the 80% mark (t=4)
    tl.to(".chaos-group", {
        opacity: 0,
        duration: 0.2, 
        ease: "power1.inOut"
    }, "4"); 

    // Fade in CLARITY at the same time
    tl.to(".clarity-group", {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.2, 
        ease: "power1.inOut"
    }, "4"); 

    // --- PHASE 3: Stats Reveal ---
    // Starts immediately after the swap
    tl.to(".impact-stat", {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.4, 
      ease: 'back.out(1.7)',
    }, "4.2");

    // --- PHASE 4: Hold ---
    // Add an empty tween to extend the timeline, creating a pause at the end.
    tl.to({}, { duration: 1.5 });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#FFF0DC]">
      <ChaosGroup numberRef={numberRef} />
      <ClarityGroup />
    </section>
  );
}