'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, Cloud, Brain, Lock, Layout, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
    { name: "Next.js 14", icon: Layout, category: "Frontend", desc: "App Router, Server Actions" },
    { name: "TypeScript", icon: Code2, category: "Language", desc: "Type-safe development" },
    { name: "Azure OpenAI", icon: Brain, category: "AI Model", desc: "GPT-4 Turbo for reasoning" },
    { name: "Azure Doc Intel", icon: FileText, category: "AI Service", desc: "OCR & Layout Analysis" },
    { name: "PostgreSQL", icon: Database, category: "Database", desc: "Structured data storage" },
    { name: "Azure Blob", icon: Cloud, category: "Storage", desc: "Secure file hosting" },
];

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".tech-item", {
        y: 50,
        opacity: 0,
        stagger: {
            amount: 0.8,
            grid: [2, 3],
            from: "center"
        },
        duration: 1,
        ease: "elastic.out(1, 0.75)",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
        }
    });
    
    // Floating animation
    gsap.to(".tech-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
            amount: 1,
            from: "random"
        }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-slate-950 text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powered by <span className="text-azure-400">Microsoft Azure</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Enterprise-grade infrastructure meeting modern AI capabilities.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {techStack.map((tech, index) => {
                const Icon = tech.icon as any; // Quick fix for icon type
                return (
                    <div key={index} className="tech-item group relative p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-azure-500/50 transition-colors">
                        <div className="absolute inset-0 bg-azure-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
                        
                        <div className="tech-icon w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 border border-slate-700 shadow-lg group-hover:shadow-azure-500/20 group-hover:border-azure-500/50 transition-all">
                             {Icon ? <Icon className="w-6 h-6 text-azure-400" /> : <div className="w-6 h-6 bg-azure-400 rounded-full" />}
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-1">{tech.name}</h3>
                        <div className="flex justify-between items-center">
                             <span className="text-xs font-mono text-azure-300 bg-azure-900/30 px-2 py-0.5 rounded">{tech.category}</span>
                        </div>
                        <p className="mt-3 text-sm text-slate-400">{tech.desc}</p>
                    </div>
                );
            })}
        </div>
      </div>
    </section>
  );
}
