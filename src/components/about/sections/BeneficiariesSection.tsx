'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, BookOpen, Building2, ClipboardCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const beneficiaries = [
  {
    title: "Teachers",
    subtitle: "Productivity & Efficiency",
    icon: User,
    benefits: [
      "Reduce grading time by up to 80%",
      "Focus more on mentoring and pedagogy",
      "Gain data-driven insights into student performance",
      "Ensure consistent evaluation across large classes"
    ],
    outcome: "Outcome: More time teaching, less time grading",
    theme: {
      bg: "bg-pink-50/80",
      border: "border-pink-200",
      shadow: "shadow-pink-200/50",
      iconBg: "bg-white",
      iconColor: "text-pink-600",
      accent: "bg-pink-500",
      bgText: "text-pink-600/5",
      outcomeText: "text-pink-700"
    }
  },
  {
    title: "Students",
    subtitle: "Growth & Learning",
    icon: BookOpen,
    benefits: [
      "Instant, unbiased feedback",
      "Personalized learning and improvement paths",
      "Transparent assessment history",
      "Greater confidence through fair scoring"
    ],
    outcome: "Outcome: Faster learning through continuous feedback",
    theme: {
      bg: "bg-orange-50/80",
      border: "border-orange-200",
      shadow: "shadow-orange-200/50",
      iconBg: "bg-white",
      iconColor: "text-orange-600",
      accent: "bg-orange-500",
      bgText: "text-orange-600/5",
      outcomeText: "text-orange-700"
    }
  },
  {
    title: "Institutions",
    subtitle: "Stability & Scale",
    icon: Building2,
    benefits: [
      "Lower operational and evaluation costs",
      "Standardized exam quality across departments",
      "Scalable assessment workflows",
      "Policy-aligned and auditable processes"
    ],
    outcome: "Outcome: Scalable assessment without operational strain",
    theme: {
      bg: "bg-yellow-50/80",
      border: "border-yellow-200",
      shadow: "shadow-yellow-200/50",
      iconBg: "bg-white",
      iconColor: "text-yellow-600",
      accent: "bg-yellow-500",
      bgText: "text-yellow-600/5",
      outcomeText: "text-yellow-700"
    }
  },
  {
    title: "Exam Boards",
    subtitle: "Trust & Security",
    icon: ClipboardCheck,
    benefits: [
      "Secure digital exam processing",
      "Immutable audit trails",
      "Real-time analytics and reporting",
      "Regulatory and compliance readiness"
    ],
    outcome: "Outcome: Auditable, tamper-proof assessment systems",
    theme: {
      bg: "bg-red-50/80",
      border: "border-red-200",
      shadow: "shadow-red-200/50",
      iconBg: "bg-white",
      iconColor: "text-red-600",
      accent: "bg-red-500",
      bgText: "text-red-600/5",
      outcomeText: "text-red-700"
    }
  }
];

export default function BeneficiariesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".benefit-card", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 bg-[#fafaf9] text-slate-900 overflow-hidden relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900">
              Who Benefits from <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">HARAMA?</span>
            </h2>
            
            {/* Gradient Divider */}
            <div className="h-1.5 w-24 mx-auto rounded-full bg-gradient-to-r from-pink-400 to-orange-400 mb-8" />

            <p className="text-xl text-slate-600 font-light leading-relaxed">
                HARAMA is built to unify assessment, insight, and trust — empowering every stakeholder across the education lifecycle, from classrooms to governing bodies.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {beneficiaries.map((b, index) => {
              const Icon = b.icon;
              return (
                <div key={index} className="benefit-card group h-full">
                    <div className={`relative h-full p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col ${b.theme.bg} ${b.theme.border} ${b.theme.shadow}`}>
                        
                        {/* Large Background Text */}
                        <div className={`absolute -bottom-4 -right-4 text-7xl font-black select-none pointer-events-none opacity-100 overflow-hidden ${b.theme.bgText}`}>
                            {b.title.toUpperCase()}
                        </div>

                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm ${b.theme.iconBg} ${b.theme.iconColor}`}>
                            <Icon className="w-8 h-8" strokeWidth={2.5} />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex-1 flex flex-col">
                            <h3 className="text-2xl font-bold mb-1 text-slate-900">{b.title}</h3>
                            <p className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-wider">{b.subtitle}</p>
                            
                            <ul className="space-y-4 mb-8 flex-1">
                                {b.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start text-slate-700 font-medium leading-snug">
                                        <span className={`mr-3 mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${b.theme.accent}`} />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>

                            {/* Outcome Line */}
                            <div className={`pt-6 border-t ${b.theme.border} ${b.theme.outcomeText}`}>
                                <p className="font-bold text-sm leading-relaxed">
                                    {b.outcome}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
              );
          })}
        </div>
      </div>
    </section>
  );
}
