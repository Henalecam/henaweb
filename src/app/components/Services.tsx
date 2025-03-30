'use client';

import { services } from '../constants';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Services() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20"
        >
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-6">
            {service.icon && (
              <div className="text-indigo-600 dark:text-indigo-400">
                <service.icon />
              </div>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {service.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {service.description}
          </p>
          <ul className="space-y-3">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                <svg
                  className="w-5 h-5 text-indigo-500 dark:text-indigo-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
} 