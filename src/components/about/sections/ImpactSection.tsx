'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function ImpactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.to(".after-image", {
      clipPath: "inset(0 0 0 0)",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%", // Pin for screen height
        pin: true,
        scrub: true,
      }
    });

    gsap.from(".impact-stat", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".stats-container",
            start: "top 80%",
        }
    })
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-stone-100">
      
      {/* Before Image (Manual Grading) - Chaos */}
      <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
          <div className="text-center opacity-40">
              <h3 className="text-[10vw] font-bold text-red-900 leading-none blur-[2px]">CHAOS</h3>
              <p className="text-2xl text-red-800 font-serif italic">Manual • Slow • Biased</p>
          </div>
          {/* Chaotic pattern */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#e7e5e4_10px,#e7e5e4_20px)] opacity-50" />
      </div>

      {/* After Image (AI Grading) - Clarity / White */}
      <div className="after-image absolute inset-0 flex items-center justify-center bg-white [clip-path:inset(0_100%_0_0)]">
           <div className="text-center z-10">
              <h3 className="text-[10vw] font-bold text-brand-impact-text leading-none tracking-tight">CLARITY</h3>
              <p className="text-2xl text-brand-impact-accent font-medium">AI Powered • Instant • Fair</p>
          </div>
           {/* Clean, subtle Indigo gradient */}
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-white" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent" />
      </div>
      
      {/* Divider */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-0.5 h-full bg-indigo-500/20" />
      </div>

      {/* Floating Content */}
      <div className="stats-container absolute bottom-20 left-0 right-0 flex justify-center gap-20 z-20">
          <div className="impact-stat text-center">
              <h4 className="text-5xl font-bold text-slate-900 mb-2">80%</h4>
              <p className="text-sm uppercase tracking-widest text-brand-impact-accent font-bold">Time Saved</p>
          </div>
          <div className="impact-stat text-center">
              <h4 className="text-5xl font-bold text-slate-900 mb-2">24/7</h4>
              <p className="text-sm uppercase tracking-widest text-brand-impact-accent font-bold">Availability</p>
          </div>
           <div className="impact-stat text-center">
              <h4 className="text-5xl font-bold text-slate-900 mb-2">0%</h4>
              <p className="text-sm uppercase tracking-widest text-brand-impact-accent font-bold">Bias</p>
          </div>
      </div>
    </section>
  );
}
