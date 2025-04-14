import { portfolioItems } from "../../constants/portfolio";
import Image from "next/image";
import { Section, SectionHeader } from "../../components/ui/Section";
export default function Sistemas() {
  const systems = portfolioItems.filter(
    (item) => item.category === "systems"
  );
  return (
    <div>
      <SectionHeader
        title="Sistemas"
        description="Exemplos de sistemas web desenvolvidos."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="hover:opacity-80 transition-opacity duration-300"
                />
              </div>
            </a>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-b-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {item.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                {item.description}
              </p>            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}