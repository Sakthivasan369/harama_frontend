'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function NewHero() {
  const heroRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background grid animation
      const gridItems = backgroundRef.current?.querySelectorAll('.grid-item')
      if (gridItems) {
        gsap.set(gridItems, { opacity: 0.1 })
        gsap.to(gridItems, {
          opacity: 0.3,
          duration: 2,
          stagger: {
            amount: 3,
            from: 'random'
          },
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut'
        })
      }

      // Main content animation
      const tl = gsap.timeline()
      
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
      })
      .from(headlineRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3")
      .from(subheadlineRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center bg-white px-6 relative overflow-hidden">
      {/* Background Grid */}
      <div ref={backgroundRef} className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="grid-item">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center max-w-4xl relative z-10">
        <div 
          ref={badgeRef}
          className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-8"
        >
          THE NEW STANDARD
        </div>
        
        <h1 ref={headlineRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-900">
          We Decoded the Exam Hall.
        </h1>
        
        <p 
          ref={subheadlineRef}
          className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto"
        >
          HARaMA bridges the gap between traditional pen-and-paper exams and the speed of AI. 
          No more grading fatigue. No more black boxes. Just pure, scalable intelligence.
        </p>
      </div>
    </section>
  )
}