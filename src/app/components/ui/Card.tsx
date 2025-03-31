import { HTMLAttributes, ReactNode } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover';
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50',
        variant === 'hover' && 'transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 hover:border-primary-500 dark:hover:border-primary-400',
        className
      )}
      {...props}
    />
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