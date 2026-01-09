'use client'

import React from 'react'

interface LogoProps {
  className?: string
  markOnly?: boolean // If true, shows only the symbol without text
}

export default function Logo({ className = "", markOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 1. THE SYMBOL */}
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Left Pillar: The Foundation */}
        <rect x="4" y="6" width="8" height="28" rx="2" fill="#0f172a" />
        
        {/* Right Pillar: The Result */}
        <rect x="28" y="6" width="8" height="28" rx="2" fill="#0f172a" />
        
        {/* The Connection (The AI Spark) */}
        {/* An orange element bridging the gap, slightly offset to imply motion/scanning */}
        <path 
          d="M12 18H28" 
          stroke="#f97316" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        
        {/* Optional: A subtle "scan" dot floating above representing the 'eye' of AI */}
        <circle cx="20" cy="10" r="3" fill="#f97316" className="animate-pulse" />
      </svg>

      {/* 2. THE WORDMARK (Optional) */}
      {!markOnly && (
        <span className="font-sans text-xl font-bold tracking-tight text-slate-900">
          HAR<span className="text-orange-500">a</span>MA
        </span>
      )}
    </div>
  )
}