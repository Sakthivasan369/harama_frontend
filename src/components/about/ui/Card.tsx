import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'neon';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'rounded-xl p-6 transition-all duration-300';
    
    const variants = {
      default: 'bg-white border border-slate-100 shadow-sm',
      glass: 'bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl',
      neon: 'bg-white border-2 border-brand-hero-primary/20 shadow-lg hover:border-brand-hero-primary/50 hover:shadow-xl',
    };

    return (
      <div
        ref={ref}
        className={twMerge(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
