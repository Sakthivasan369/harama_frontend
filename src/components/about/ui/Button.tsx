import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-400 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-azure-500 text-white hover:bg-azure-600 shadow-lg shadow-azure-500/25',
      secondary: 'bg-harama-secondary text-azure-900 hover:bg-harama-secondary/90',
      outline: 'border border-azure-200 bg-transparent hover:bg-azure-500/10 text-azure-100',
      ghost: 'hover:bg-azure-500/10 text-azure-100',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-8 text-base',
      lg: 'h-14 px-10 text-lg',
    };

    return (
      <button
        ref={ref}
        className={twMerge(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
