'use client';
import React from 'react';
import Image from 'next/image';
import { portfolioItems } from '../../constants/portfolio';

export default function Automations() {
  const automations = portfolioItems.filter(item => item.category === 'automations');

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50 dark:bg-purple-900/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          Automações Inteligentes
        </h2>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-3xl">
          Revolucione sua operação com nossas soluções de automação potencializadas por Inteligência Artificial. 
          Eliminamos tarefas repetitivas, otimizamos processos e criamos fluxos de trabalho inteligentes que 
          se adaptam ao seu negócio. Transforme dados em resultados e libere o verdadeiro potencial da sua equipe.
        </p>
      </div>
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {automations.map((automation, index) => (
          <div
            key={index}
            className="relative flex flex-col rounded-lg border border-purple-200 bg-white dark:bg-gray-800 dark:border-purple-700 shadow-md overflow-hidden transition-shadow hover:shadow-purple-200 dark:hover:shadow-purple-900"
          >
            {automation.image && (
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={automation.image}
                  alt={automation.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                  priority={index < 3}
                />
              </div>
            )}
            <div className="flex flex-col justify-between flex-grow p-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {automation.link ? (
                    <a href={automation.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {automation.name}
                    </a>
                  ) : (
                    automation.name
                  )}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">{automation.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}