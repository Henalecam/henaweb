'use client';

import { testimonials } from '../constants';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Testimonials() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-500 dark:text-indigo-400 font-semibold tracking-wide uppercase">
            Depoimentos
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            O que nossos clientes dizem
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <div className="relative flex-shrink-0 w-16 h-16">
                    <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-indigo-500">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        style={{
                          objectPosition: 'center',
                          aspectRatio: '1/1'
                        }}
                        sizes="64px"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role} em {testimonial.company}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 