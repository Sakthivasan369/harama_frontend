'use client';

import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Upload, FileText, CheckCircle, Loader2, RefreshCw } from 'lucide-react';

// --- 1. MODULAR SUB-COMPONENTS ---

// A. The File Upload Card
const FileDropZone = ({ label, onUpload, file }: { label: string, onUpload: (f: File) => void, file: File | null }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) onUpload(e.dataTransfer.files[0]);
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <div 
      onClick={handleClick}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`group relative h-64 w-full rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-6
        ${file 
          ? 'border-emerald-500 bg-emerald-500/5' 
          : 'border-slate-700 hover:border-orange-500 hover:bg-slate-800'
        }`}
    >
      <input 
        type="file" 
        ref={inputRef} 
        className="hidden" 
        onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} 
      />
      
      {file ? (
        <div className="text-center animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <p className="text-emerald-400 font-mono text-sm">{file.name}</p>
          <p className="text-slate-500 text-xs mt-2">Ready for analysis</p>
        </div>
      ) : (
        <div className="text-center group-hover:scale-105 transition-transform duration-300">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors">
            <Upload className="w-8 h-8 text-slate-400 group-hover:text-white" />
          </div>
          <h3 className="text-white font-bold mb-2">{label}</h3>
          <p className="text-slate-500 text-sm">Drag & drop or click to upload</p>
        </div>
      )}
    </div>
  );
};

// B. The Processing Simulation (Random Duration)
const ProcessingView = ({ onComplete }: { onComplete: () => void }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State to store the random duration, calculated once
  const [randomDuration, setRandomDuration] = useState(0);

  // Calculate random duration once on mount
  useEffect(() => {
    const min = 10;
    const max = 15;
    const duration = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomDuration(duration);
  }, []);

  useGSAP(() => {
    if (randomDuration === 0) return; // Wait until randomDuration is set

    const tl = gsap.timeline({
      onComplete: onComplete
    });

    // Stages from original code
    const stages = [
      "Initializing Neural Engine...",
      "Deskewing & Cleaning Image...",
      "Extracting Handwriting Layers...",
      "Mapping Semantic Logic...",
      "Validating Rubric Constraints...",
      "Generating Feedback...",
      "Finalizing Score..."
    ];

    // Animate Progress Bar (0 -> 100% over randomDuration)
    tl.to(barRef.current, {
      width: "100%",
      duration: randomDuration, // Use random duration
      ease: "power1.inOut"
    }, 0);

    // Cycle through text stages
    stages.forEach((stage, i) => {
      const startTime = (randomDuration / stages.length) * i; // Based on randomDuration
      tl.to(textRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          if (textRef.current) textRef.current.innerText = stage;
        }
      }, startTime - 0.2);
      
      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.2
      }, startTime);
    });

    // Pulse effect on container
    gsap.to(containerRef.current, {
      boxShadow: "0 0 30px rgba(249, 115, 22, 0.15)",
      repeat: -1,
      yoyo: true,
      duration: 1.5
    });

  }, [randomDuration]); // Re-run GSAP when randomDuration changes from 0

  return (
    <div ref={containerRef} className="w-full max-w-2xl bg-[#0a0f14] border border-orange-500/20 rounded-3xl p-12 text-center relative overflow-hidden">
      {/* Background Scanning Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative z-10">
        <div className="w-20 h-20 mx-auto mb-8 relative">
           <div className="absolute inset-0 border-4 border-slate-800 rounded-full" />
           <div className="absolute inset-0 border-t-4 border-orange-500 rounded-full animate-spin" />
           <Loader2 className="w-8 h-8 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <h3 className="text-3xl font-bold text-white mb-4">Analyzing Submission</h3>
        <p ref={textRef} className="text-orange-400 font-mono text-sm tracking-widest uppercase min-h-[1.5em]">
          Initializing...
        </p>

        {/* Progress Bar Container */}
        <div className="w-full h-2 bg-slate-800 rounded-full mt-12 overflow-hidden">
          <div ref={barRef} className="h-full bg-gradient-to-r from-orange-600 to-amber-400 w-0" />
        </div>

      </div>
    </div>
  );
};

// C. The Result View
const ResultView = ({ score, onReset }: { score: string, onReset: () => void }) => {
  const scoreRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(containerRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    });

    tl.from(scoreRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.3");

    // Stagger in details
    tl.from(".result-detail", {
      x: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4
    }, "-=0.5");

  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      {/* Left: Score Panel */}
      <div className="bg-[#0f172a] p-10 md:w-5/12 flex flex-col items-center justify-center text-center relative border-r border-slate-800">
        <span className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">AI Evaluated Score</span>
        
        <div ref={scoreRef} className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
          <h2 className="text-7xl font-black text-white relative z-10">{score}</h2>
        </div>
        
        <span className="text-emerald-400 font-mono text-sm mt-4 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          High Confidence
        </span>
      </div>

      {/* Right: Details Panel */}
      <div className="p-10 md:w-7/12 flex flex-col justify-center bg-white text-slate-900">
        <h3 className="text-2xl font-bold mb-6">Evaluation Summary</h3>
        
        <div className="space-y-4 mb-8">
          <div className="result-detail flex justify-between items-center border-b border-slate-100 pb-2">
            <span className="text-slate-500 text-sm">Handwriting Legibility</span>
            <span className="font-bold text-slate-900">98.5%</span>
          </div>
          <div className="result-detail flex justify-between items-center border-b border-slate-100 pb-2">
            <span className="text-slate-500 text-sm">Rubric Alignment</span>
            <span className="font-bold text-slate-900">Strong</span>
          </div>

        </div>

        <button 
          onClick={onReset}
          className="group flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-xl hover:bg-orange-600 transition-all duration-300 font-bold"
        >
          <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          Analyze Another
        </button>
      </div>
    </div>
  );
};

// --- 2. MAIN COMPONENT ---

export default function TryItNow() {
  const [stage, setStage] = useState<'upload' | 'processing' | 'result'>('upload');
  const [qPaper, setQPaper] = useState<File | null>(null);
  const [aSheet, setASheet] = useState<File | null>(null);
  const [finalScore, setFinalScore] = useState("0.00");

  const startAnalysis = () => {
    if (!qPaper || !aSheet) return;
    setStage('processing');
  };

  const handleComplete = () => {
    // Generate Random Score between 70.00 and 86.00
    const randomScore = (Math.random() * (86 - 70) + 70).toFixed(2);
    setFinalScore(randomScore);
    setStage('result');
  };

  const reset = () => {
    setQPaper(null);
    setASheet(null);
    setStage('upload');
  };

  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Optional Background Noise/Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <span className="text-orange-500 font-mono text-xs tracking-[0.4em] uppercase">Interactive Demo</span>
        <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-2">Experience the Engine</h2>
        <p className="text-slate-500">Upload sample files to see HARaMA's grading in action.</p>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-5xl flex justify-center items-center relative z-10 min-h-[400px]">
        
        {stage === 'upload' && (
          <div className="w-full animate-in fade-in zoom-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <FileDropZone 
                label="Upload Question Paper" 
                file={qPaper} 
                onUpload={setQPaper} 
              />
              <FileDropZone 
                label="Upload Answer Sheet" 
                file={aSheet} 
                onUpload={setASheet} 
              />
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={startAnalysis}
                disabled={!qPaper || !aSheet}
                className={`
                  px-12 py-5 rounded-full font-bold text-lg tracking-wide transition-all duration-300
                  ${(qPaper && aSheet) 
                    ? 'bg-white text-black hover:bg-orange-500 hover:text-white hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
                `}
              >
                START ANALYSIS
              </button>
            </div>
          </div>
        )}

        {stage === 'processing' && (
          <ProcessingView onComplete={handleComplete} />
        )}

        {stage === 'result' && (
          <ResultView score={finalScore} onReset={reset} />
        )}

      </div>
    </section>
  );
}
