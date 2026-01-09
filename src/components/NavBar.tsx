'use client';

import Logo from "@/components/Logo";
import Link from "next/link"; // Use Next.js Link for client-side navigation

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm hero__navbar flex justify-between items-center px-8 py-4 w-full text-slate-700">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="hover:text-brand-hero-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-brand-hero-primary transition-colors">About</Link>
          <Link href="/try-it-now" className="ml-4 px-5 py-2 border border-transparent rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors text-sm font-bold shadow-lg">
            Try It Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
