'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
}

export default function UsageSlides() {
  const container = useRef<HTMLDivElement>(null);
  const u1Title = useRef<HTMLHeadingElement>(null);
  const u2Title = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".slide-panel");

    // 1. HORIZONTAL SCROLL LOGIC
    // We strictly use panels.length to calculate width. 
    // Since there are 2 panels, it moves -100%.
    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1, // High-end "Slow-mo" feel
        // Dynamic end point based on width to ensure smooth scroll speed
        end: () => "+=" + (container.current?.offsetWidth || 1000),
      }
    });

    // 2. SCRAMBLE TEXT: SLIDE 1
    gsap.to(u1Title.current, {
      scrambleText: { text: "90% PRECISION.", chars: "01X#", revealDelay: 0.2 },
      scrollTrigger: { 
        trigger: u1Title.current, 
        start: "top 80%",
        toggleActions: "play none none reverse" 
      }
    });

    // 3. SCRAMBLE TEXT: SLIDE 2
    gsap.to(u2Title.current, {
      scrambleText: { text: "ZERO FRICTION.", chars: "01X#", revealDelay: 0.2 },
      scrollTrigger: { 
        trigger: u2Title.current, 
        containerAnimation: scrollTween, 
        start: "left center" 
      }
    });

    // 4. METRIC CARDS ANIMATION
    gsap.from(".metric-card", {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".metric-container",
        containerAnimation: scrollTween,
        start: "left 70%",
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="relative overflow-hidden bg-black font-sans">
      
      {/* CRITICAL FIX: Width is set to 200vw because we have exactly 2 slides.
        100vw * 2 slides = 200vw. This removes the "extra black slide".
      */}
      <div className="flex w-[200vw] h-screen flex-nowrap">
        

        {/* --- SLIDE 1: RECOGNITION (Dark Mode) --- */}
        <section className="slide-panel w-screen h-full flex flex-col justify-center px-6 md:px-[10%] bg-[#080808] border-r border-white/5 relative">
          {/* Scanning Animation */}
          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
            <div className="w-full h-0.5 bg-orange-500 shadow-[0_0_20px_#f97316] absolute animate-scan" />
          </div>

          <div className="relative z-10">
            <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.3em] mb-4 block uppercase opacity-70">
              Usage 01 // Recognition
            </span>
            
            {/* Responsive Text Size: 5xl on mobile, 8xl on desktop */}
            <h1 ref={u1Title} className="text-5xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter min-h-[1.2em]" />
            
            <p className="max-w-xl text-base md:text-lg text-slate-400 font-light leading-relaxed">
              With <span className="text-white font-medium">90% precision</span>, HARaMA transforms 
              messy handwriting into structured data in seconds. The paper bottleneck is solved.
            </p>
          </div>
        </section>


        {/* --- SLIDE 2: IMPACT (Light Mode - Matching Image) --- */}
        <section className="slide-panel w-screen h-full flex flex-col justify-center px-6 md:px-[10%] bg-white text-black relative">
          <div className="relative z-10 w-full max-w-6xl">
            
            <span className="text-orange-600 font-mono text-xs md:text-sm tracking-[0.3em] mb-4 block uppercase">
              Usage 02 // Impact
            </span>
            
            <h1 ref={u2Title} className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase min-h-[1.2em]" />
            
            {/* Metric Container: Stack on mobile (grid-cols-1), Side-by-side on Desktop (grid-cols-2) */}
            <div className="metric-container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl">
              
              {/* Metric 1 */}
              <div className="metric-card border-l-[6px] border-orange-500 pl-6 py-1">
                <h4 className="text-5xl md:text-7xl font-black text-[#0f172a] tracking-tight">-80%</h4>
                <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mt-3">Manpower Reduction</p>
                <p className="mt-3 text-slate-700 text-sm md:text-base leading-relaxed">
                  One operator handles what used to take twenty. Eliminate manual entry teams.
                </p>
              </div>
              
              {/* Metric 2 */}
              <div className="metric-card border-l-[6px] border-black pl-6 py-1">
                <h4 className="text-5xl md:text-7xl font-black text-[#0f172a] tracking-tight">INSTANT</h4>
                <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mt-3">Processing Time</p>
                <p className="mt-3 text-slate-700 text-sm md:text-base leading-relaxed">
                  Results are ready before students even leave the campus. Zero latency feedback.
                </p>
              </div>

            </div>
          </div>
        </section>

      </div>


    </div>
  );
}