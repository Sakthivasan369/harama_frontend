'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Collaborators() {
  const collaboratorsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.collaborator-card', {
        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: collaboratorsRef.current,
          start: 'top 70%'
        }
      })
    }, collaboratorsRef)

    return () => ctx.revert()
  }, [])

  const collaborators = [
    {
      name: 'Santhosh P',
      role: 'Collaborator',
      quote: 'We stripped away the noise to build a grading engine that feels invisible yet omnipresent. It\'s complexity wrapped in simplicity.',
      image: '/charizard.jpg'
    },
    {
      name: 'Hrithik Sankar R',
      role: 'Collaborator',
      quote: 'Complexity shouldn\'t feel complex. We designed the HARaMA interface so that wielding powerful AI feels as simple as checking a box.',
      image: '/025.png'
    },
    {
      name: 'Sakthivasan S',
      role: 'Collaborator',
      quote: 'Reliability is our currency. We engineered an architecture capable of handling thousands of concurrent exams without a stutter.',
      image: '/swadloon.jpg'
    },
    {
      name: 'Uganthan M',
      role: 'Collaborator',
      quote: 'It\'s not just about speed; it\'s about fairness. We ensured the system provides the detailed, unbiased feedback every student deserves.',
      image: '/throh.png'
    }
  ]
  return (
    <section ref={collaboratorsRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Collaborators</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            The team behind HARaMA's revolutionary approach to educational assessment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {collaborators.map((person, index) => (
            <div key={index} className="collaborator-card bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src={person.image}
                  alt={person.name}
                  layout="fill"
                  objectFit="cover"
                  className="scale-110"
                />
              </div>
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