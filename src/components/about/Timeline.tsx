'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Timeline() {
  const timelineRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the timeline line
      gsap.fromTo(lineRef.current, 
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top center',
            end: 'bottom center',
            scrub: 1
          }
        }
      )

      // Animate timeline nodes
      gsap.utils.toArray('.timeline-node').forEach((node: any, index) => {
        gsap.from(node, {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 80%',
            end: 'bottom 20%'
          }
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const nodes = [
    {
      number: '01',
      title: 'The Paper Ceiling',
      text: 'Educational institutions are scaling, but assessment methods aren\'t. We saw brilliant professors buried under mountains of answer sheets. The feedback loop was broken.'
    },
    {
      number: '02', 
      title: 'The Modular Vision',
      text: 'We realized success wasn\'t just "digitizing" exams—it was re-engineering the workflow. We envisioned an OS where grading is composable, allowing teachers and AI to work in perfect sync.'
    },
    {
      number: '03',
      title: 'The Azure Backbone', 
      text: 'We didn\'t just build a grader; we built an ecosystem. Powered by Microsoft Azure\'s deep learning, HARaMA transforms handwriting into data in real-time with enterprise-grade security.'
    },
    {
      number: '04',
      title: 'The Insight Engine',
      text: 'Grading is just the beginning. We closed the loop by turning raw scores into deep institutional intelligence, helping educators understand *how* students learn, not just what they scored.'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="relative timeline-container">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 w-0.5 bg-gray-200 h-full">
            <div ref={lineRef} className="w-full bg-orange-500"></div>
          </div>

          {/* Timeline nodes */}
          <div className="space-y-16">
            {nodes.map((node, index) => (
              <div 
                key={index}
                className={`timeline-node relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node circle */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center z-10">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="text-orange-500 font-bold text-sm mb-2">{node.number} {node.title}</div>
                    <p className="text-slate-600 leading-relaxed">{node.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}