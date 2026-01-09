"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

type ThemeColor = "blue" | "white" | "orange" | "purple" | "green";

interface HaramaHeroProps {
  theme?: ThemeColor;
}

export default function HaramaHero({ theme = "blue" }: HaramaHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Elements
      const loaderText = container.querySelectorAll(".loader__text-part");
      const loadingLetter = container.querySelectorAll(".loader__letter");
      const box = container.querySelectorAll(".loader__box");
      const growingImage = container.querySelectorAll(".loader__image-container");
      
      const heroContent = container.querySelector(".hero__content");
      const heroTitleChars = container.querySelectorAll(".hero__title-char");
      const heroSubtitle = container.querySelector(".hero__subtitle");

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onStart: () => container.classList.remove("is--hidden"),
      });

      // --- PHASE 1: LOADER ANIMATION (Willem Style) ---
      
      // 1. Letters slide up "HAR" "A" "MA"
      if (loadingLetter.length) {
        tl.from(loadingLetter, {
          yPercent: 100,
          stagger: 0.05,
          duration: 1.2,
          ease: "power3.out"
        });
      }

      // 2. Box expands horizontally in the middle
      if (box.length) {
        tl.fromTo(
          box,
          { width: "0em" },
          { width: "1.2em", duration: 1.2 },
          "< 0.8"
        );
      }

      // 3. Image starts growing inside the box
      if (growingImage.length) {
        tl.fromTo(
          growingImage,
          { width: "0%" },
          { width: "100%", duration: 1.2 },
          "<"
        );
      }

      // 4. "HAR" and "MA" move aside to make space
      const textStart = container.querySelector(".loader__text-start");
      const textEnd = container.querySelector(".loader__text-end");

      if (textStart) {
        tl.to(textStart, { x: "-0.6em", duration: 1.2 }, "<");
      }
      if (textEnd) {
        tl.to(textEnd, { x: "0.6em", duration: 1.2 }, "<");
      }

      // --- PHASE 2: TRANSITION TO FULL SCREEN ---

      // 5. Image expands to fill the screen
      if (growingImage.length) {
        tl.to(growingImage, {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          position: "fixed",
          duration: 1.5,
          ease: "expo.inOut"
        }, "+=0.1");
      }

      // 6. Loader text fades out/scales up
      if (loaderText.length) {
        tl.to(loaderText, {
          opacity: 0,
          scale: 1.1,
          duration: 0.8,
          ease: "power2.in"
        }, "<");
      }
      
      if (box.length) {
          tl.to(box, { opacity: 0, duration: 0.5 }, "<");
      }

      // --- PHASE 3: HERO REVEAL (Coming back to Harama) ---

      // 7. Reveal Hero Content
      if (heroContent) {
          tl.set(heroContent, { visibility: "visible" }, "< 0.5");
      }

      // Hero Title "HARAMA" characters slide up
      if (heroTitleChars.length) {
        tl.fromTo(heroTitleChars,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.03, duration: 1, ease: "expo.out" },
          "< 0.2"
        );
      }

      // Subtitle fade in
      if (heroSubtitle) {
        tl.fromTo(heroSubtitle,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "< 0.4"
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, [theme]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-white text-slate-900 is--hidden"
    >
      {/* --- LOADER LAYER --- */}
      <div className="loader__layer absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
        <h1 className="flex items-center text-[12vw] font-bold leading-none tracking-tighter loader__text-part text-slate-900">
          <span className="loader__text-start inline-block">
             {"HAR".split("").map((char, i) => (
                <span key={`start-${i}`} className="loader__letter inline-block overflow-hidden">
                    <span className="inline-block">{char}</span>
                </span>
             ))}
          </span>
          
          <div className="relative flex items-center justify-center mx-[0.05em] h-[0.8em]">
             {/* The 'A' */}
             <div className="overflow-hidden">
                <span className="loader__letter inline-block">A</span>
             </div>
             
             {/* The Box Mask */}
             <div className="loader__box absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full bg-brand-hero-primary z-10" />
             
             {/* The Growing Image (Will become background for a moment, then fade) */}
             <div className="loader__image-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-full overflow-hidden z-20 rounded-sm">
                 <div className="relative w-screen h-screen -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-white">
                    {/* Placeholder for transition background if needed, currently white to match theme */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-hero-primary/10 via-brand-hero-secondary/10 to-brand-hero-tertiary/10" />
                 </div>
             </div>
          </div>

          <span className="loader__text-end inline-block">
             {"MA".split("").map((char, i) => (
                <span key={`end-${i}`} className="loader__letter inline-block overflow-hidden">
                    <span className="inline-block">{char}</span>
                </span>
             ))}
          </span>
        </h1>
      </div>

      {/* --- HERO LAYER (Revealed after loader) --- */}
      <div className="hero__content absolute inset-0 z-40 flex flex-col justify-between invisible bg-white bg-grid-pattern">
        
        {/* Main Hero Text */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative">
             {/* Background Blob for vibrancy */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gradient-to-r from-brand-hero-primary/10 via-brand-hero-secondary/10 to-brand-hero-tertiary/10 rounded-full blur-3xl -z-10 opacity-60 animate-pulse-slow" />

            <h2 className="text-[15vw] md:text-[12vw] font-bold leading-none tracking-tighter">
                {"HARAMA".split("").map((char, i) => (
                    <span key={i} className="inline-block overflow-hidden">
                        <span className="hero__title-char inline-block bg-hero-gradient bg-clip-text text-transparent pb-4">{char}</span>
                    </span>
                ))}
            </h2>
            <p className="hero__subtitle text-slate-600 text-xl md:text-3xl mt-6 font-light tracking-wide max-w-2xl mx-auto">
                The Future of AI Assessment
            </p>
        </div>

        {/* Bottom Indicator/Footer */}
        <div className="pb-8 text-center text-slate-400 text-sm animate-bounce">
            Scroll to Explore
        </div>
      </div>
    </section>
  );
}