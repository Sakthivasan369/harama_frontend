'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function NewHero() {
  const heroRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
      })
      .from(headlineRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
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
    <section ref={heroRef} className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-4xl">
        <div 
          ref={badgeRef}
          className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-8"
        >
          THE NEW STANDARD
        </div>
        
        <h1 ref={headlineRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-900">
          <span>We Decoded the </span>
          <span className="text-orange-500">Exam Hall</span>
          <span>.</span>
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