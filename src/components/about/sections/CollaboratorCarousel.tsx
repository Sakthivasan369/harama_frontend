'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronUp, ChevronDown, Github, Linkedin, Twitter, Quote } from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// Updated Team Data with Specific Roles
const teamMembers: TeamMember[] = [
  { 
    id: 1, 
    name: "Santhosh P", 
    role: "Back End Developer",
    quote: "Complexity wrapped in simplicity.",
    image: "/charizard.jpg",
    socials: { linkedin: "#", twitter: "#" }
  },
  { 
    id: 2, 
    name: "Sakthivasan S", 
    role: "AI & Cloud Developer",
    quote: "Reliability is our currency.",
    image: "/swadloon.jpg",
    socials: { linkedin: "#", github: "#" }
  },
  { 
    id: 3, 
    name: "Hrithik Sankar R", 
    role: "Front End Developer",
    quote: "AI that feels as simple as checking a box.",
    image: "/025.png",
    socials: { github: "#", linkedin: "#" }
  },
  { 
    id: 4, 
    name: "Uganthan M", 
    role: "UI/UX Designer",
    quote: "Fairness engineered into the code.",
    image: "/throh.png",
    socials: { linkedin: "#" }
  },
];

export default function CollaboratorCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Helpers
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  }, [isAnimating]);

  const handleCardClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setActiveIndex(index);
  };

  // GSAP Animation
  useGSAP(() => {
    setIsAnimating(true);
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
      defaults: { ease: "power3.out", duration: 0.6 }
    });

    // 1. Text Transition (Fade Out -> Change -> Fade In)
    if (textRef.current) {
      const nameEl = textRef.current.querySelector('.member-name');
      const roleEl = textRef.current.querySelector('.member-role');
      const quoteEl = textRef.current.querySelector('.member-quote');
      const socialEl = textRef.current.querySelector('.member-socials');

      tl.to([nameEl, roleEl, quoteEl, socialEl], {
        y: -20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        onComplete: () => {
          gsap.set([nameEl, roleEl, quoteEl, socialEl], { y: 20 });
        }
      })
      .to([nameEl, roleEl, quoteEl, socialEl], {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4
      });
    }

    // 2. Carousel Cards Animation
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      
      const total = teamMembers.length;
      let offset = (i - activeIndex + total) % total;
      
      if (offset > total / 2) offset -= total;
      
      const ySpacing = 140; 
      const scaleBase = 1;
      const scaleStep = 0.15;
      const opacityBase = 1;
      const opacityStep = 0.4;
      const zIndexBase = 10;

      const isActive = offset === 0;
      const absOffset = Math.abs(offset);
      
      const targetY = offset * ySpacing;
      const targetScale = Math.max(0.5, scaleBase - (absOffset * scaleStep));
      const targetOpacity = Math.max(0, opacityBase - (absOffset * opacityStep));
      const targetZ = zIndexBase - absOffset;
      const targetBlur = absOffset * 2; 

      gsap.to(card, {
        y: targetY,
        scale: targetScale,
        opacity: targetOpacity,
        zIndex: targetZ,
        filter: `blur(${targetBlur}px)`,
        duration: 0.8,
        ease: "expo.out",
        boxShadow: isActive ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)' : 'none',
        border: isActive ? '1px solid rgba(0,0,0,0.05)' : 'none',
      });
      
      const innerContent = card.querySelector('.card-inner-text');
      if (innerContent) {
          gsap.to(innerContent, {
              opacity: isActive ? 1 : 0,
              duration: 0.4
          });
      }
    });

  }, [activeIndex]); 

  // Keyboard & Scroll Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') handlePrev();
      if (e.key === 'ArrowDown') handleNext();
    };

    const handleWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) > 30 && !isAnimating) {
            if (e.deltaY > 0) handleNext();
            else handlePrev();
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    const container = containerRef.current;
    if (container) {
        container.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (container) container.removeEventListener('wheel', handleWheel);
    };
  }, [handleNext, handlePrev, isAnimating]);

  const activeMember = teamMembers[activeIndex];

  return (
    <section ref={containerRef} className="relative py-32 min-h-[90vh] bg-white text-slate-900 overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-slate-100 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 relative z-10">
        
        {/* LEFT SIDE: Text Info */}
        <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center items-start pl-8 md:pl-20">
          <div ref={textRef} className="space-y-6">
            <div className="overflow-hidden">
                <h3 className="member-name text-4xl md:text-6xl font-bold text-slate-900 tracking-tight whitespace-nowrap">
                {activeMember.name}
                </h3>
            </div>
            <div className="overflow-hidden">
                <p className="member-role text-xl md:text-2xl text-orange-500 font-light tracking-wide uppercase">
                {activeMember.role}
                </p>
            </div>
            
            <div className="overflow-hidden relative pl-4 border-l-2 border-orange-200">
               <Quote className="absolute -top-2 -left-2 w-4 h-4 text-orange-300 fill-orange-300 opacity-50" />
               <p className="member-quote text-lg md:text-xl text-slate-600 font-light italic leading-relaxed">
                 "{activeMember.quote}"
               </p>
            </div>

            <div className="member-socials flex gap-4 pt-4">
               {activeMember.socials?.github && (
                   <a href={activeMember.socials.github} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600 hover:text-orange-500">
                       <Github size={20} />
                   </a>
               )}
               {activeMember.socials?.linkedin && (
                   <a href={activeMember.socials.linkedin} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600 hover:text-orange-500">
                       <Linkedin size={20} />
                   </a>
               )}
               {activeMember.socials?.twitter && (
                   <a href={activeMember.socials.twitter} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600 hover:text-orange-500">
                       <Twitter size={20} />
                   </a>
               )}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="mt-12 flex items-center gap-6">
            <button onClick={handlePrev} className="p-3 rounded-full border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all group">
                <ChevronUp className="w-6 h-6 text-slate-400 group-hover:text-slate-900" />
            </button>
            <div className="flex gap-2">
                {teamMembers.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => !isAnimating && setActiveIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-orange-500' : 'bg-slate-300 hover:bg-slate-400'}`}
                    />
                ))}
            </div>
             <button onClick={handleNext} className="p-3 rounded-full border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all group">
                <ChevronDown className="w-6 h-6 text-slate-400 group-hover:text-slate-900" />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Vertical Carousel */}
        <div className="flex-1 w-full md:w-1/2 h-[600px] flex items-center justify-center relative perspective-1000">
           <div className="relative w-full h-full flex items-center justify-center">
             {teamMembers.map((member, index) => (
               <div
                 key={member.id}
                 ref={el => { cardsRef.current[index] = el; }}
                 onClick={() => handleCardClick(index)}
                 className="absolute w-[280px] h-[380px] md:w-[320px] md:h-[420px] rounded-2xl overflow-hidden cursor-pointer bg-white"
                 style={{ 
                     transformStyle: 'preserve-3d',
                     willChange: 'transform, opacity'
                 }}
               >
                 {/* Image */}
                 <div className="relative w-full h-full">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                 </div>

                 {/* Card overlay content */}
                 <div className="card-inner-text absolute bottom-6 left-6 right-6 opacity-0">
                     <span className="text-xs font-mono text-white/90 uppercase tracking-widest block mb-1 drop-shadow-md">
                         {member.role.split(' ')[0]} // {member.name.split(' ')[0]}
                     </span>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
}