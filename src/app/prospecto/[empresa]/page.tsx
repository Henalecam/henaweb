'use client';

import { useParams } from 'next/navigation';
import { CheckCircle, Shield, Users, Clock, Scale } from 'lucide-react';

export default function ProspectPage() {
  const params = useParams();
  const empresa = params?.empresa as string;
  const empresaDisplay = empresa ? empresa.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'sua empresa';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Defenda seus direitos com{' '}
            <span className="text-blue-600">segurança</span> e{' '}
            <span className="text-blue-600">clareza jurídica</span>.
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Consultoria jurídica personalizada para <strong className="text-blue-600">{empresaDisplay}</strong>.
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-xl">
                <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center">
                  <Scale className="w-20 h-20 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Lawyer Info */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Dr. João Silva
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Advogado Especialista em Direito Empresarial
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Com mais de 15 anos de experiência, ofereço consultoria jurídica especializada 
                para empresas como a {empresaDisplay}, garantindo proteção legal completa 
                e estratégias personalizadas para o seu negócio.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">OAB/SP 123.456</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">Certificado CRM</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">500+ Clientes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Por que escolher nossa consultoria?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos um atendimento diferenciado, focado nas necessidades específicas da {empresaDisplay}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Atendimento claro e humanizado
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Linguagem acessível e explicações detalhadas sobre todos os processos jurídicos, 
                    garantindo que você compreenda cada etapa.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Avaliação inicial sem compromisso
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Primeira consulta gratuita para analisar sua situação e apresentar 
                    as melhores estratégias jurídicas para a {empresaDisplay}.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Scale className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Estratégias jurídicas sob medida
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Soluções personalizadas desenvolvidas especificamente para o perfil 
                    e necessidades da {empresaDisplay}.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Confidencialidade total
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Proteção absoluta das informações da {empresaDisplay} com sigilo 
                    profissional garantido pelo código de ética.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para proteger legalmente a {empresaDisplay}?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Agende sua consulta inicial gratuita e descubra como podemos ajudar 
            sua empresa a navegar com segurança no mundo jurídico.
          </p>
          
          <a
            href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma consulta inicial gratuita para a minha empresa."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Agende sua consulta inicial
          </a>
          
          <p className="text-blue-200 mt-6 text-sm">
            Resposta garantida em até 2 horas durante o horário comercial
          </p>
        </div>
      </section>
    </div>
  );
}