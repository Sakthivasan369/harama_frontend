'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 60, suffix: "+", label: "Hours Grading/Sem", color: "text-red-500" },
  { value: 85, suffix: "%", label: "Teacher Burnout", color: "text-orange-500" },
  { value: 40, suffix: "K", label: "Annual Cost Impact", color: "text-yellow-500" },
];

export default function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    stats.forEach((stat, index) => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `#stat-${index}`,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          const el = document.getElementById(`stat-val-${index}`);
          if (el) el.innerText = Math.floor(obj.val).toString();
        }
      });
    });

    gsap.from(".stat-card", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
        }
    })
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-slate-950 text-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          The <span className="text-red-500">Problem</span> We Solve
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <div key={index} id={`stat-${index}`} className="stat-card flex flex-col items-center p-8 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-red-500/50 transition-colors">
              <div className={`text-6xl font-bold mb-4 ${stat.color} flex items-baseline`}>
                <span id={`stat-val-${index}`}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <p className="text-xl text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
