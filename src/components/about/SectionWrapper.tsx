'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export default function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, 
        {
          opacity: 0,
          rotateX: 10,
          y: 50,
          scale: 0.95,
          transformOrigin: 'top center'
        },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className={`perspective-[1000px] ${className}`} id={id}>
      <div ref={sectionRef}>
        {children}
      </div>
    </div>
  )
}