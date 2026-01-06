'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const inner = cursorInnerRef.current
    if (!cursor || !inner) return

    gsap.set(cursor, { xPercent: -50, yPercent: -50, force3D: true })

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3.out' })

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener('mousemove', moveCursor)

    // 🔗 Grow only on interactive elements
    const hoverIn = () => {
      gsap.to(inner, { scale: 1.4, duration: 0.25, ease: 'back.out(1.6)' })
    }

    const hoverOut = () => {
      gsap.to(inner, { scale: 1, duration: 0.25, ease: 'power2.out' })
    }

    // 🧲 Magnetic effect
    const magneticMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()

      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(target, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const magneticLeave = (e: Event) => {
      gsap.to(e.currentTarget as HTMLElement, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.4)'
      })
    }

    // ✨ Ripple on click
    const clickRipple = () => {
      gsap.fromTo(
        inner,
        { scale: 1 },
        { scale: 2, opacity: 0, duration: 0.4, ease: 'power2.out', onComplete: () => {
          gsap.set(inner, { scale: 1, opacity: 1 })
        }}
      )
    }

    window.addEventListener('mousedown', clickRipple)

    // 📝 Text cursor hint
    const textEnter = () => {
      gsap.to(inner, { scale: 0.6, duration: 0.2 })
    }

    const textLeave = () => {
      gsap.to(inner, { scale: 1, duration: 0.2 })
    }

    const interactive = document.querySelectorAll('a, button, [role="button"]')
    const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6')

    interactive.forEach(el => {
      el.addEventListener('mouseenter', hoverIn)
      el.addEventListener('mouseleave', hoverOut)
      // el.addEventListener('mousemove', magneticMove)
      el.addEventListener('mouseleave', magneticLeave)
    })

    textElements.forEach(el => {
      el.addEventListener('mouseenter', textEnter)
      el.addEventListener('mouseleave', textLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', clickRipple)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-50 hidden md:block"
    >
      <div
        ref={cursorInnerRef}
        className="w-full h-full rounded-full bg-purple-800 flex items-center justify-center"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
      </div>
    </div>
  )
}
