'use client';
import React from 'react';

import SectionHeader from "../../components/SectionHeader";
import { portfolioItems } from '../../constants/portfolio';
import Image from 'next/image';

export default function Automations() {
  const automations = portfolioItems.filter(item => item.category === 'automations');

  return (
    <div>
      <SectionHeader title="Automações Inteligentes" description="Descubra como as automações inteligentes podem revolucionar seu negócio. Veja alguns exemplos práticos de soluções que desenvolvi para otimizar processos, reduzir custos e aumentar a eficiência operacional." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {automations.map((automation, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            {automation.image && (
              <div className=" overflow-hidden">
                <Image
                  src={automation.image}
                  alt={automation.name}
                  className="object-cover w-full h-full"
                  width={600}
                  height={400}
                />
              </div>
            )}
            <div className="p-4">{automation.name && <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{automation.name}</h3>}
              <p className="mt-2 text-gray-600 dark:text-gray-300">{automation.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}