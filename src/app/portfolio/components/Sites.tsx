import React from 'react';
import Image from 'next/image';
import { portfolioItems, PortfolioItem } from '../../constants/portfolio';

export default function Sites() {
  const sites: PortfolioItem[] = portfolioItems.filter(item => item.category === 'sites');

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                Sites Profissionais
            </h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-3xl">
                Explore nossa coleção de sites desenvolvidos com excelência. Cada projeto é uma combinação única de design inovador, 
                performance excepcional e experiência do usuário cuidadosamente planejada. Do e-commerce ao institucional, 
                entregamos soluções que não apenas impressionam, mas também convertem.
            </p>
        </div>
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sites.map((site, index) => (
                <div
                    key={index}
                    className="relative flex flex-col rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md overflow-hidden transition-shadow hover:shadow-lg"
                >
                    <a href={site.link} target="_blank" rel="noopener noreferrer">
                        <div className="relative w-full h-64">
                            <Image
                                src={site.image}
                                alt={site.name}
                                fill
                                className="object-cover hover:opacity-80 transition-opacity duration-300"
                            />
                        </div>
                    </a>
                    <div className="flex flex-col justify-between flex-grow p-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                <a href={site.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {site.name}
                                </a>
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">{site.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}