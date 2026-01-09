'use client';

import { useLayoutEffect } from 'react';
import { registerGSAP } from '@/lib/gsap-init';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import HaramaHero from '@/components/about/sections/HaramaHero';
import ProductFeaturesSection from '@/components/about/sections/ProductFeaturesSection';
// import ProblemSection from '@/components/about/sections/ProblemSection';
import SolutionSection from '@/components/about/sections/SolutionSection';
import ImpactSection from '@/components/about/sections/ImpactSection';
import BeneficiariesSection from '@/components/about/sections/BeneficiariesSection';
// import TechStackSection from '@/components/about/sections/TechStackSection';
// import RoadmapSection from '@/components/about/sections/RoadmapSection';-666666


import CollaboratorCarousel from '@/components/about/sections/CollaboratorCarousel';
import FeedbackSection from '@/components/about/sections/FeedbackSection';

export default function AboutPage() {
  useLayoutEffect(() => {
    registerGSAP();
    
    gsap.registerPlugin(ScrollSmoother);
    
    ScrollSmoother.create({
      smooth: true,
      effects: true,
      smoothTouch: 0.1
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main className="bg-slate-950 min-h-screen w-full overflow-x-hidden selection:bg-azure-500/30 selection:text-azure-100">
          <HaramaHero theme="blue" />
          <ProductFeaturesSection />
          <ImpactSection />
          <BeneficiariesSection />
        </main>
      </div>
    </div>
  );
}
