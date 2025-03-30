import { services } from '../constants';

export default function Services() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-gray-900 p-8 rounded-xl border border-gray-700 hover:border-indigo-500 transition-colors duration-300"
        >
          <div className="text-indigo-500 mb-6">
            {service.icon()}
          </div>
          <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
          <p className="text-gray-400 mb-6">{service.description}</p>
          <ul className="space-y-3 mb-8">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <a
            href={`/services#${service.id}`}
            className="inline-block text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
          >
            Learn More →
          </a>
        </div>
      ))}
    </div>
  );
} 