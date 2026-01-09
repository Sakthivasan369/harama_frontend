"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { AlertTriangle, Lightbulb, Layers, Info } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface FeatureCard {
  number: string
  title: string
  description: string
  icon: React.ReactNode
  cta: string
  theme: {
    bg: string;
    border: string;
    text: string;
    description: string;
    iconCircle: string;
    iconColor: string;
    pillBg: string;
    pillText: string;
    pillBorder: string;
    decoration: string;
    shadow: string;
  }
}

const features: FeatureCard[] = [
  {
    number: "01",
    title: "The Vision",
    description:
      "To become the Stripe of educational assessment—providing composable, API-first services that institutions can integrate individually or as a complete platform. We believe in a future where assessment is modular, transparent, and powered by Microsoft AI.",
    icon: <Lightbulb className="w-12 h-12" strokeWidth={1.5} />,
    cta: "Our North Star",
    theme: {
      bg: "bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-950",
      border: "border-violet-700/30",
      text: "text-white",
      description: "text-violet-100",
      iconCircle: "bg-violet-500/20",
      iconColor: "text-violet-200",
      pillBg: "bg-violet-500/20",
      pillText: "text-violet-100",
      pillBorder: "border-violet-500/30",
      decoration: "bg-violet-500/10",
      shadow: "shadow-violet-900/50",
    }
  },
  {
    number: "02",
    title: "The Problem",
    description:
      "Traditional assessment systems are stuck in the past. Institutions face vendor lock-in with monolithic tools, opaque 'black-box' AI scoring that erodes trust, and manual grading processes that consume valuable teaching time.",
    icon: <AlertTriangle className="w-12 h-12" strokeWidth={1.5} />,
    cta: "The Challenge",
    theme: {
      bg: "bg-gradient-to-br from-rose-900 via-red-900 to-slate-950",
      border: "border-rose-700/30",
      text: "text-white",
      description: "text-rose-100",
      iconCircle: "bg-rose-500/20",
      iconColor: "text-rose-200",
      pillBg: "bg-rose-500/20",
      pillText: "text-rose-100",
      pillBorder: "border-rose-500/30",
      decoration: "bg-rose-500/10",
      shadow: "shadow-rose-900/50",
    }
  },
  {
    number: "03",
    title: "The Solution",
    description:
      "HARAMA is a modular Educational Assessment Operating System. By separating examination management, AI evaluation, and analytics into independent services, we deliver enterprise-grade scalability and zero downtime.",
    icon: <Layers className="w-12 h-12" strokeWidth={1.5} />,
    cta: "The Architecture",
    theme: {
      bg: "bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950",
      border: "border-teal-700/30",
      text: "text-white",
      description: "text-teal-100",
      iconCircle: "bg-teal-500/20",
      iconColor: "text-teal-200",
      pillBg: "bg-teal-500/20",
      pillText: "text-teal-100",
      pillBorder: "border-teal-500/30 ",
      decoration: "bg-teal-500/10",
      shadow: "shadow-teal-900/50",
    }
  },
  {
    number: "04",
    title: "About Harama",
    description:
      "HARAMA combines the speed of AI with the trust of human verification. Our layer-by-layer architecture ensures 95% accuracy correlation with human graders while reducing grading time by 80%.",
    icon: <Info className="w-12 h-12" strokeWidth={1.5} />,
    cta: "Learn More",
    theme: {
      bg: "bg-gradient-to-br from-blue-900 via-sky-900 to-slate-950",
      border: "border-blue-700/30",
      text: "text-white",
      description: "text-blue-100",
      iconCircle: "bg-blue-500/20",
      iconColor: "text-blue-200",
      pillBg: "bg-blue-500/20",
      pillText: "text-blue-100",
      pillBorder: "border-blue-500/30",
      decoration: "bg-blue-500/10",
      shadow: "shadow-blue-900/50",
    }
  },
]

export default function ProductFeaturesSection() {
  const containerRef = useRef(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      cardsRef.current.forEach((card, idx) => {
        if (idx < cardsRef.current.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          })
          const cardInner = card.querySelector('.card-inner') as HTMLElement
          gsap.to(cardInner, {
            y: 0, // No Y movement to keep full overlap until scroll
            scale: 0.95, // Slight scale down to show depth
            opacity: 0,
            scrollTrigger: {
              trigger: cardsRef.current[idx + 1],
              start: "top bottom",
              end: "top top",
              scrub: 0
            },
          })
        }
      })
    });

    return () => mm.revert();
  }, [])

  return (
    <section id="features" ref={containerRef} className="relative w-full  mr-10 bg-black">
      {features.map((feature, idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) cardsRef.current[idx] = el
          }}
          className="w-full h-screen flex items-center justify-center sticky top-0"
          style={{ perspective: '1000px' }}
        >
          <div 
            className={`card-inner relative w-full h-full flex items-center justify-center p-8 md:p-24 overflow-hidden border-t border-white/10 ${feature.theme.bg} ${feature.theme.shadow}`}
            style={{ 
              transformStyle: 'preserve-3d', 
              transformOrigin: 'center bottom', 
              willChange: 'transform, opacity', 
            }}
          >
             {/* Background decoration */}
            <div className={`absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-30 ${feature.theme.decoration}`} />
            <div className={`absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-20 ${feature.theme.decoration}`} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center h-full relative z-10 w-full max-w-7xl mx-auto">
              {/* Left Column - Content */}
              <div className="space-y-10">
                <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-md ${feature.theme.pillBg} ${feature.theme.pillBorder}`}>
                  <span className={`text-sm font-bold uppercase tracking-widest ${feature.theme.pillText}`}>
                    {feature.title}
                  </span>
                </div>
                
                <h3 className={`text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter ${feature.theme.text}`}>
                  {feature.title}
                </h3>
                
                <p className={`text-xl md:text-2xl leading-relaxed font-light ${feature.theme.description}`}>
                  {feature.description}
                </p>
                
                <div className="pt-6">
                    <button className={`group inline-flex items-center gap-3 text-lg font-medium transition-all ${feature.theme.iconColor} hover:opacity-80 hover:translate-x-2`}>
                        <span>{feature.cta}</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
              </div>

              {/* Right Column - Visual */}
              <div className="flex justify-center md:justify-end items-center">
                <div className={`w-full aspect-square max-w-lg rounded-[3rem] border flex items-center justify-center relative overflow-hidden group backdrop-blur-xl ${feature.theme.border} bg-white/5`}>
                   {/* Icon with glow */}
                   <div className={`relative z-10 p-12 rounded-full border shadow-2xl group-hover:scale-110 transition-transform duration-700 ${feature.theme.border} ${feature.theme.iconCircle}`}>
                      <div className={feature.theme.iconColor}>
                        {feature.icon}
                      </div>
                   </div>
                   
                   {/* Decorative rings */}
                   <div className={`absolute inset-0 border rounded-[3rem] scale-90 opacity-30 ${feature.theme.border}`} />
                   <div className={`absolute inset-0 border rounded-[3rem] scale-75 opacity-20 ${feature.theme.border}`} />
                </div>
              </div>
            </div>

            {/* Large number in corner */}
            <div className={`absolute bottom-0 right-4 md:right-16 text-[20vw] font-black select-none pointer-events-none opacity-[0.03] leading-none ${feature.theme.text}`}>
              {feature.number}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

