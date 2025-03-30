'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from './ui/Container';
import { ThemeToggle } from './ui/ThemeToggle';
import { navigation } from '../constants';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary-200/80 bg-white/80 backdrop-blur-sm transition-colors dark:border-secondary-800/80 dark:bg-secondary-950/80">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400"
          >
            <span className="text-xl font-bold">HenaWeb</span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary-600 transition-colors hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/contato"
              className="hidden rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-offset-secondary-900 md:block"
            >
              Agende uma reunião
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:hidden transition-all duration-300 ease-in-out`}
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-secondary-600 transition-colors hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </header>
  );
} 