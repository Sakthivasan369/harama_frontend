'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function EcosystemGrid() {
  const gridRef = useRef<HTMLElement>(null)

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto overflow-hidden">
          {/* Card 1 - Transparent AI Scoring (Wide) */}
          <div className="grid-card md:col-span-2 lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Transparent AI Scoring</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              The AI engine acts as a copilot. It doesn't just score; it explains why. By analyzing logical flow against your rubric, it slashes grading time by 80%.
            </p>
          </div>

          {/* Deep Analytics */}
          <div className="grid-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Deep Analytics</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Go beyond "Pass/Fail." See topic-level difficulty and curriculum gaps instantly.
            </p>
          </div>

          {/* Smart Ingestion */}
          <div className="grid-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Smart Ingestion</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Upload batches of PDFs or images. We deskew, clean, and read handwriting with 95% accuracy.
            </p>
          </div>

          {/* Azure Secure */}
          <div className="grid-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Azure Secure</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tenant isolation and Role-Based Access ensure your institutional data is a fortress.
            </p>
          </div>

          {/* Instant Feedback Loop */}
          <div className="grid-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Instant Feedback Loop</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Don't make students wait weeks. Results and detailed AI annotations are delivered the moment grading is confirmed by the educator.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}