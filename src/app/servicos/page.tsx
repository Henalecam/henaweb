import Image from 'next/image';
import { Section, SectionHeader } from '../components/ui/Section';
import { services } from '../constants';

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main>
        {/* Hero Section */}
        <div className="relative bg-blue-600">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-blue-600 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90" />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Nossos Serviços
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl">
              Soluções personalizadas para impulsionar seu negócio no mundo digital
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`flex flex-col lg:flex-row gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="lg:w-1/2">
                  <div className="text-blue-600 h-16 w-16 mb-6">
                    {service.icon()}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    {service.description}
                  </p>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      O que oferecemos:
                    </h3>
                    <ul className="space-y-4">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start"
                        >
                          <span className="flex-shrink-0 h-6 w-6 text-blue-600">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          <span className="ml-3 text-gray-500 dark:text-gray-400">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className="p-8 flex items-center justify-center">
                      <div className="text-blue-600 h-80 w-80">
                        <img src={service.image} alt={service.title} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Vamos começar seu projeto?
              </h2>
              <p className="mt-4 text-xl text-blue-100">
                Entre em contato para discutirmos as melhores soluções para seu negócio
              </p>
              <div className="mt-8">
                <a
                  href="/contato"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
                >
                  Fale conosco
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 