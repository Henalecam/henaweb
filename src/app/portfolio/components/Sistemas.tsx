import { portfolioItems } from "../../constants/portfolio";
import Image from "next/image";

export default function Sistemas() {
  const systems = portfolioItems.filter(
    (item) => item.category === "systems"
  );
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          Sistemas Empresariais
        </h2>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-3xl">
          Transformamos desafios empresariais em soluções digitais poderosas. Nossos sistemas são desenvolvidos com tecnologias 
          de ponta, garantindo escalabilidade, segurança e uma experiência fluida para seus usuários. De ERPs a plataformas 
          customizadas, criamos ferramentas que impulsionam a eficiência e o crescimento do seu negócio.
        </p>
      </div>
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {systems.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md overflow-hidden transition-shadow hover:shadow-lg"
          >
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <div className="relative w-full h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
              </a>
            )}
            <div className="flex flex-col justify-between flex-grow p-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}