'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Collaborators() {
  const collaboratorsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    return () => {}
  }, [])

  const collaborators = [
    {
      name: 'Santhosh P',
      role: 'Collaborator',
      quote: 'We stripped away the noise to build a grading engine that feels invisible yet omnipresent. It\'s complexity wrapped in simplicity.'
    },
    {
      name: 'Hrithik Sankar R',
      role: 'Collaborator',
      quote: 'Complexity shouldn\'t feel complex. We designed the HARaMA interface so that wielding powerful AI feels as simple as checking a box.'
    },
    {
      name: 'Sakthivasan S',
      role: 'Collaborator',
      quote: 'Reliability is our currency. We engineered an architecture capable of handling thousands of concurrent exams without a stutter.'
    },
    {
      name: 'Uganthan M',
      role: 'Collaborator',
      quote: 'It\'s not just about speed; it\'s about fairness. We ensured the system provides the detailed, unbiased feedback every student deserves.'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Collaborators</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            The team behind HARaMA's revolutionary approach to educational assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {collaborators.map((person, index) => (
            <div key={index} className="collaborator-card bg-white p-6 rounded-2xl shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{person.name}</h3>
                <p className="text-orange-500 text-sm font-medium">{person.role}</p>
              </div>
              
              <blockquote className="text-slate-600 text-sm leading-relaxed italic">
                "{person.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}