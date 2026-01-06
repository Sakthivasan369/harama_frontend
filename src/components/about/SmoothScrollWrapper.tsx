'use client'

import { useRef } from 'react'

interface SmoothScrollWrapperProps {
  children: React.ReactNode
}

export default function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
}