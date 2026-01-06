'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const roadmap = [
  { phase: "Phase 1", title: "Concept & Prototype", status: "completed", date: "Q1 2025" },
  { phase: "Phase 2", title: "Azure AI Integration", status: "completed", date: "Q2 2025" },
  { phase: "Phase 3", title: "MVP Beta Launch", status: "current", date: "Q3 2025" },
  { phase: "Phase 4", title: "Institutional Pilot", status: "upcoming", date: "Q4 2025" },
  { phase: "Phase 5", title: "Global Expansion", status: "upcoming", date: "2026+" },
];

export default function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Rocket movement
    gsap.to(rocketRef.current, {
        y: () => (containerRef.current?.offsetHeight || 0) - 200,
        ease: "none",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
        }
    });

    // Milestone animations
    const items = gsap.utils.toArray('.roadmap-item');
    items.forEach((item: any) => {
        gsap.from(item, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
            }
        });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-slate-950 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative">
        <h2 className="text-4xl font-bold text-center mb-20">Roadmap to <span className="text-azure-400">Success</span></h2>

        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-32 bottom-32 w-0.5 bg-slate-800 -translate-x-1/2" />
        
        {/* Rocket */}
        <div ref={rocketRef} className="absolute left-8 md:left-1/2 top-32 -translate-x-1/2 z-10 p-2 bg-slate-950 rounded-full border border-azure-500 shadow-neon text-azure-400">
            <Rocket className="w-6 h-6 rotate-45" />
        </div>

        <div className="space-y-24">
            {roadmap.map((item, index) => (
                <div key={index} className={`roadmap-item flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Date/Phase */}
                    <div className={`flex-1 text-left md:text-right ${index % 2 !== 0 ? 'md:text-left' : ''}`}>
                        <span className="text-azure-400 font-mono text-sm">{item.date}</span>
                        <h3 className="text-2xl font-bold">{item.phase}</h3>
                    </div>

                    {/* Dot */}
                    <div className="relative z-10 w-4 h-4 rounded-full bg-slate-950 border-2 border-azure-500 shadow-[0_0_10px_rgba(0,120,212,0.5)] flex-shrink-0 mx-auto md:mx-0" />

                    {/* Content */}
                    <div className="flex-1 p-6 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm hover:border-azure-500/30 transition-colors w-full md:w-auto">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xl font-bold">{item.title}</h4>
                            {item.status === 'completed' && <Check className="w-5 h-5 text-green-500" />}
                        </div>
                        <div className="flex items-center gap-2">
                             <span className={`w-2 h-2 rounded-full ${
                                 item.status === 'completed' ? 'bg-green-500' : 
                                 item.status === 'current' ? 'bg-yellow-500 animate-pulse' : 'bg-slate-600'
                             }`} />
                             <span className="text-sm text-slate-400 capitalize">{item.status}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
