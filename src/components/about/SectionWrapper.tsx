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
          rotateX: 15,
          y: 100,
          opacity: 0,
          scale: 0.9,
          transformOrigin: 'top center'
        },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1
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