'use client';

import { useLayoutEffect } from 'react';
import { registerGSAP } from '@/lib/gsap-init';
import HaramaHero from '@/components/about/sections/HaramaHero';
import ProductFeaturesSection from '@/components/about/sections/ProductFeaturesSection';
import ProblemSection from '@/components/about/sections/ProblemSection';
import SolutionSection from '@/components/about/sections/SolutionSection';
import ImpactSection from '@/components/about/sections/ImpactSection';
import BeneficiariesSection from '@/components/about/sections/BeneficiariesSection';
import TechStackSection from '@/components/about/sections/TechStackSection';
import RoadmapSection from '@/components/about/sections/RoadmapSection';
import CollaboratorCarousel from '@/components/about/sections/CollaboratorCarousel';
import FeedbackSection from '@/components/about/sections/FeedbackSection';
import CustomCursor from '@/components/about/CustomCursor';

export default function AboutPage() {
  useLayoutEffect(() => {
    registerGSAP();
  }, []);

  return (
    <main className="bg-slate-950 min-h-screen w-full overflow-x-hidden selection:bg-azure-500/30 selection:text-azure-100">
      <CustomCursor />
      <HaramaHero theme="blue" />
      <ProductFeaturesSection />
      <SolutionSection />
      <ImpactSection />
      <BeneficiariesSection />
      <CollaboratorCarousel />
      <FeedbackSection />
    </main>
  );
}
