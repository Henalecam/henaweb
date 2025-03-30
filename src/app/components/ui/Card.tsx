import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover';
  children: ReactNode;
}

export function Card({ variant = 'default', children, className, ...props }: CardProps) {
  const baseStyles = 'bg-white dark:bg-secondary-800 rounded-xl shadow-soft overflow-hidden';
  
  const variants = {
    default: '',
    hover: 'transition-transform duration-200 hover:scale-[1.02]',
  };

  return (
    <div
      className={twMerge(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={twMerge('px-6 py-4 border-b border-secondary-200 dark:border-secondary-700', className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardBody({ children, className, ...props }: CardBodyProps) {
  return (
    <div
      className={twMerge('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div
      className={twMerge('px-6 py-4 border-t border-secondary-200 dark:border-secondary-700', className)}
      {...props}
    >
      {children}
    </div>
  );
} 