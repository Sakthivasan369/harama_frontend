'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '../ui/Card';
import { FileText, Database, Brain, Sparkles, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pipeline = [
  { 
    title: "Input & Scan", 
    desc: "Exams are scanned and uploaded.", 
    icon: FileText, 
    tech: "React Dropzone",
    theme: {
      primary: "text-orange-600",
      border: "border-orange-500",
      pillBg: "bg-orange-100",
      pillText: "text-orange-800",
      pillBorder: "border-orange-200",
      iconColor: "text-orange-600",
      shadow: "shadow-orange-500/20"
    }
  },
  { 
    title: "Secure Storage", 
    desc: "Files securely stored in cloud.", 
    icon: Database, 
    tech: "Azure Blob Storage",
    theme: {
      primary: "text-cyan-600",
      border: "border-cyan-500",
      pillBg: "bg-cyan-100",
      pillText: "text-cyan-800",
      pillBorder: "border-cyan-200",
      iconColor: "text-cyan-600",
      shadow: "shadow-cyan-500/20"
    }
  },
  { 
    title: "Text Extraction", 
    desc: "OCR extracts handwriting & diagrams.", 
    icon: Brain, 
    tech: "Azure Doc Intelligence",
    theme: {
      primary: "text-indigo-600",
      border: "border-indigo-500",
      pillBg: "bg-indigo-100",
      pillText: "text-indigo-800",
      pillBorder: "border-indigo-200",
      iconColor: "text-indigo-600",
      shadow: "shadow-indigo-500/20"
    }
  },
  { 
    title: "AI Grading", 
    desc: "Contextual grading against answer key.", 
    icon: Sparkles, 
    tech: "Azure OpenAI GPT-4",
    theme: {
      primary: "text-emerald-600",
      border: "border-emerald-500",
      pillBg: "bg-emerald-100",
      pillText: "text-emerald-800",
      pillBorder: "border-emerald-200",
      iconColor: "text-emerald-600",
      shadow: "shadow-emerald-500/20"
    }
  },
  { 
    title: "Feedback Loop", 
    desc: "Detailed feedback delivered to students.", 
    icon: CheckCircle, 
    tech: "Next.js Dashboard",
    theme: {
      primary: "text-amber-600",
      border: "border-amber-500",
      pillBg: "bg-amber-100",
      pillText: "text-amber-800",
      pillBorder: "border-amber-200",
      iconColor: "text-amber-600",
      shadow: "shadow-amber-500/20"
    }
  },
];

export default function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.pipeline-card');
    
    cards.forEach((card: any, index) => {
        gsap.from(card, {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 60%",
                scrub: 1,
            }
        });
    });

    // Connecting line animation
    gsap.from('.connection-line', {
        height: 0,
        duration: 2,
        ease: "none",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
        }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-slate-900">
          Our Solution Pipeline
        </h2>

        <div className="relative flex flex-col gap-12 max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 hidden md:block" />
          <div className="connection-line absolute left-1/2 top-0 w-1 -translate-x-1/2 hidden md:block origin-top bg-[linear-gradient(to_bottom,#f97316,#06b6d4,#6366f1,#10b981,#f59e0b)]" />

          {pipeline.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div key={index} className={`pipeline-card flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={`flex-1 text-center md:text-left ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                    <h3 className={`text-2xl font-bold mb-2 ${stage.theme.primary}`}>{stage.title}</h3>
                    <p className="text-slate-600 mb-2 font-medium">{stage.desc}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${stage.theme.pillBg} ${stage.theme.pillText} ${stage.theme.pillBorder}`}>
                        {stage.tech}
                    </span>
                  </div>

                  {/* Icon Node */}
                  <div className={`relative z-10 flex-shrink-0 w-20 h-20 rounded-full bg-white border-4 flex items-center justify-center shadow-lg ${stage.theme.border} ${stage.theme.shadow}`}>
                    <Icon className={`w-8 h-8 ${stage.theme.iconColor}`} strokeWidth={2.5} />
                  </div>

                  {/* Spacer for layout balance */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
          })}
        </div>
      </div>
    </section>
  );
}
