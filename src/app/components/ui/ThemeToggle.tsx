'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-secondary-200 bg-white text-secondary-500 transition-colors hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-secondary-800 dark:bg-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:focus:ring-primary-500 dark:focus:ring-offset-secondary-900"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="sr-only">
        {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      
      <Sun
        className={`h-5 w-5 transform transition-all duration-200 ${
          theme === 'dark' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      />

      <Moon
        className={`absolute h-5 w-5 transform transition-all duration-200 ${
          theme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      />
    </button>
  );
} 