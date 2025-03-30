import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: 'default' | 'dark';
  className?: string;
}

export function Section({ children, variant = 'default', className, ...props }: SectionProps) {
  const baseStyles = 'py-16 sm:py-24';
  
  const variants = {
    default: 'bg-white dark:bg-secondary-900',
    dark: 'bg-secondary-50 dark:bg-secondary-800',
  };

  return (
    <section
      className={twMerge(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-secondary-600 dark:text-secondary-400">
          {description}
        </p>
      )}
    </div>
  );
} 