'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
}

export default function GenesisSection() {
  const container = useRef<HTMLDivElement>(null);
  const t1 = useRef(null);
  const t2 = useRef(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".g-panel");

    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1.2,
        end: () => "+=" + container.current?.offsetWidth,
      }
    });

    [t1, t2].forEach((ref, i) => {
      const texts = ["THE PAPER CEILING.", "A SECOND BRAIN."];
      gsap.to(ref.current, {
        scrambleText: { text: texts[i], chars: "01X#", revealDelay: 0.5 },
        scrollTrigger: {
          trigger: ref.current,
          containerAnimation: scrollTween,
          start: "left 80%",
        }
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="relative overflow-hidden bg-[#050505]">
      <div className="flex w-[200vw] h-screen flex-nowrap">
        {/* PANEL 1 */}
        <section className="g-panel w-screen h-full flex flex-col justify-center px-[10%] border-r border-white/5">
          <span className="text-orange-500 font-mono text-xs tracking-[0.4em] mb-4 uppercase">Phase 01 // Friction</span>
          <h1 ref={t1} className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase min-h-[1.2em]"></h1>
          <p className="max-w-xl text-lg text-slate-400 font-light leading-relaxed">
            Education is scaling at lightspeed, but assessment is anchored in the past. 
            We decided to break the ceiling.
          </p>
        </section>

        {/* PANEL 2 */}
        <section className="g-panel w-screen h-full flex flex-col justify-center px-[10%] bg-white text-black">
          <span className="text-orange-600 font-mono text-xs tracking-[0.4em] mb-4 uppercase">Phase 02 // Genesis</span>
          <h1 ref={t2} className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase min-h-[1.2em]"></h1>
          <p className="max-w-xl text-lg text-slate-600 font-light leading-relaxed">
            A bridge between human intuition and machine precision. 
            Freeing educators to teach, not just grade.
          </p>
        </section>
      </div>
    </div>
  );
}