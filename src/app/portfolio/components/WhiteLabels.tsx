import React from 'react';
import Image from 'next/image';
import { portfolioItems, PortfolioItem } from '../../constants/portfolio';

export default function WhiteLabels() {
  const whiteLabels: PortfolioItem[] = portfolioItems.filter(item => item.category === 'white-labels');

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                White Labels
            </h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-3xl">
                Soluções personalizáveis desenvolvidas para serem reutilizadas e adaptadas para diferentes marcas e necessidades. 
                Nossos white labels oferecem funcionalidades robustas com a flexibilidade de personalização total, 
                permitindo que empresas implementem rapidamente soluções profissionais com sua própria identidade visual.
            </p>
        </div>
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whiteLabels.map((whiteLabel, index) => (
                <div
                    key={index}
                    className="relative flex flex-col rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md overflow-hidden transition-shadow hover:shadow-lg"
                >
                    <a href={whiteLabel.link} target="_blank" rel="noopener noreferrer">
                        <div className="relative w-full aspect-[16/9] bg-gray-50 dark:bg-gray-900">
                            <Image
                                src={whiteLabel.image}
                                alt={whiteLabel.name}
                                fill
                                className="object-contain hover:opacity-80 transition-opacity duration-300"
                            />
                        </div>
                    </a>
                    <div className="flex flex-col justify-between flex-grow p-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                <a href={whiteLabel.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {whiteLabel.name}
                                </a>
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">{whiteLabel.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}