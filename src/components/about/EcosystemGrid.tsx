'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionWrapper from './SectionWrapper' // Assuming you created this from the previous step

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// 1. Define Interface for Feature Data
interface Feature {
  id: number
  title: string
  description: string
  iconPath: string
  colorTheme: {
    bg: string
    text: string
  }
  span?: string // Optional property for grid layout control
}

// 2. Configuration Data (Easy to edit)
const features: Feature[] = [
  {
    id: 1,
    title: "Transparent AI Scoring",
    description: "The AI engine acts as a copilot. It doesn't just score; it explains why. By analyzing logical flow against your rubric, it slashes grading time by 80%.",
    iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    colorTheme: { bg: "bg-orange-100", text: "text-orange-600" },
    span: "md:col-span-2 lg:col-span-2" // Wide card
  },
  {
    id: 2,
    title: "Deep Analytics",
    description: "Go beyond 'Pass/Fail.' See topic-level difficulty and curriculum gaps instantly.",
    iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    colorTheme: { bg: "bg-blue-100", text: "text-blue-600" }
  },
  {
    id: 3,
    title: "Smart Ingestion",
    description: "Upload batches of PDFs or images. We deskew, clean, and read handwriting with 95% accuracy.",
    iconPath: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10",
    colorTheme: { bg: "bg-green-100", text: "text-green-600" }
  },
  {
    id: 4,
    title: "Azure Secure",
    description: "Tenant isolation and Role-Based Access ensure your institutional data is a fortress.",
    iconPath: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    colorTheme: { bg: "bg-purple-100", text: "text-purple-600" }
  },
  {
    id: 5,
    title: "Instant Feedback Loop",
    description: "Don't make students wait weeks. Results and detailed AI annotations are delivered the moment grading is confirmed by the educator.",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    colorTheme: { bg: "bg-pink-100", text: "text-pink-600" }
  }
]

// 3. Reusable Child Component
const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <div className={`grid-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${feature.span || ''}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.colorTheme.bg}`}>
        <svg className={`w-6 h-6 ${feature.colorTheme.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.iconPath} />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
    </div>
  )
}

// 4. Main Component
export default function EcosystemGrid() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Batch animation for grid cards
      ScrollTrigger.batch(".grid-card", {
        interval: 0.1, // Stagger time between items
        batchMax: 3,   // Max items to animate at once
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1, 
            scale: 1, 
            stagger: 0.1, 
            duration: 0.4, 
            ease: "power2.out"
          })
        },
        // Set initial state via GSAP (avoids flash of unstyled content)
        once: true
      })
      
      // Set initial styles for all cards immediately
      gsap.set(".grid-card", { opacity: 0, scale: 0.95 })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper>
      <section className="py-20 bg-white" ref={containerRef}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto overflow-hidden">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </SectionWrapper>
  )
}