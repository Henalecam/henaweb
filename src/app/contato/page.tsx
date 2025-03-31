'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    whatsapp: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateWhatsApp = (whatsapp: string) => {
    return /^\(\d{2}\) \d{5}-\d{4}$/.test(whatsapp);
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = {
      email: !validateEmail(formData.email) ? 'Email inválido' : '',
      whatsapp: !validateWhatsApp(formData.whatsapp) ? 'WhatsApp inválido' : ''
    };

    setValidationErrors(errors);

    if (Object.values(errors).some(error => error)) {
      return;
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }

      // Limpar o formulário
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        message: ''
      });

      // Mostrar mensagem de sucesso
      setSubmitStatus({
        success: true,
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
      });

      // Limpar mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setSubmitStatus({
          success: false,
          message: ''
        });
      }, 5000);

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setSubmitStatus({
        success: false,
        message: 'Erro ao enviar mensagem. Por favor, tente novamente.'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'whatsapp') {
      const formattedValue = formatWhatsApp(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      if (validateWhatsApp(formattedValue)) {
        setValidationErrors(prev => ({ ...prev, whatsapp: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'email' && validateEmail(value)) {
        setValidationErrors(prev => ({ ...prev, email: '' }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        <div className="relative bg-blue-600">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-blue-600 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90" />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Entre em Contato
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl">
              Estamos prontos para transformar suas ideias em realidade digital.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                Informações de Contato
              </h2>
              <div className="mt-3">
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  Estamos disponíveis para discutir seu projeto e encontrar a melhor solução para suas necessidades.
                </p>
              </div>
              <div className="mt-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-gray-500 dark:text-gray-400">
                    <p>henriquealexandredec@gmail.com</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-gray-500 dark:text-gray-400">
                    <p>(41) 99155-9480</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Siga-nos nas redes sociais</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://api.whatsapp.com/send/?phone=5541991559480&text=Ol%C3%A1%2C+Henrique!+Gostaria+de+conversar+sobre+um+projeto."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors duration-300"
                      aria-label="WhatsApp"
                    >
                      <img src="/social-icons/whatsapp.svg" alt="WhatsApp" className="w-6 h-6" />
                    </a>
                    <a
                      href="https://linkedin.com/company/henawebdesign"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <img src="/social-icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                    </a>
                    <a
                      href="https://instagram.com/henaweb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <img src="/social-icons/instagram.svg" alt="Instagram" className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 sm:mt-16 md:mt-0">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                {submitStatus.message && (
                  <div className={`p-4 rounded-md ${
                    submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nome
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white ${
                        validationErrors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {validationErrors.email && (
                      <p className="mt-2 text-sm text-red-600">{validationErrors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    WhatsApp
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="whatsapp"
                      id="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      className={`py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white ${
                        validationErrors.whatsapp ? 'border-red-500' : ''
                      }`}
                    />
                    {validationErrors.whatsapp && (
                      <p className="mt-2 text-sm text-red-600">{validationErrors.whatsapp}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mensagem
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 