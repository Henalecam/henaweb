'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', href, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      default: 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600',
      outline: 'border border-secondary-200 bg-white text-secondary-900 hover:bg-secondary-50 dark:border-secondary-800 dark:bg-secondary-900 dark:text-white dark:hover:bg-secondary-800',
      ghost: 'hover:bg-secondary-100 text-secondary-900 hover:text-secondary-900 dark:hover:bg-secondary-800 dark:text-secondary-100 dark:hover:text-white',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg',
    };

    const button = (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );

    if (href) {
      return (
        <Link href={href} className="inline-block">
          {button}
        </Link>
      );
    }

    return button;
  }
);

Button.displayName = 'Button';

export { Button }; 