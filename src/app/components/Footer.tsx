import Link from 'next/link';
import { navigation, services } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">HenaWeb</h3>
            <p className="text-secondary-400">
              Transformando negócios com soluções digitais inovadoras.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-secondary-400 hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id} className="text-secondary-400">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-secondary-400">
              <li>henriquealexandredec@gmail.com</li>
              <li>+55 (41) 99915-5948</li>
              <li>Horário: Seg-Sex, 9h-18h</li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-secondary-800">
          <div className="flex justify-center space-x-6">
            <a href="https://www.instagram.com/henaweb/#" className="text-secondary-400 hover:text-white">
              <span className="sr-only">Instagram</span>
                <img src="/social-icons/instagram.svg" alt="Instagram" className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/henalecam/" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <img src="/social-icons/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
            </a>
            <a href="https://api.whatsapp.com/send?phone=5541999155948&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20HenaWeb." target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-white">
              <span className="sr-only">WhatsApp</span>
              <img src="/social-icons/whatsapp.svg" alt="WhatsApp" className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-secondary-400">
          <p>&copy; {new Date().getFullYear()} HenaWeb. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 