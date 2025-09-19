'use client';

import { useParams } from 'next/navigation';
import { CheckCircle, Globe, Smartphone, Search, ArrowRight, Gift } from 'lucide-react';

export default function ProspectPage() {
  const params = useParams();
  const empresa = params?.empresa as string;
  const empresaDisplay = empresa ? empresa.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'sua empresa';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full text-lg font-bold mb-8">
            <Gift className="w-5 h-5" />
            🎁 PROJETO GRATUITO - SEM COMPROMISSO
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Transforme o <span className="text-blue-600">{empresaDisplay}</span> em uma{' '}
            <span className="text-green-600">máquina de clientes</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            <strong>Projeto do seu site profissional totalmente GRÁTIS</strong> - 
            Veja como seria antes de decidir qualquer coisa
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🚀 Por que ter um site é ESSENCIAL para advogados?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Visibilidade 24/7</h3>
                <p className="text-sm text-gray-600">Apareça no Google quando clientes precisarem</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Credibilidade</h3>
                <p className="text-sm text-gray-600">Site profissional transmite confiança</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Mais Clientes</h3>
                <p className="text-sm text-gray-600">Clientes chegam automaticamente</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/5511999999999?text=🚀 Quero ver o projeto GRATUITO do meu site profissional!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              🎁 QUERO VER MEU PROJETO GRÁTIS!
            </a>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">✅ Sem compromisso</p>
              <p className="text-xs text-gray-500">Resposta em até 2 horas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            🎯 O que você recebe no projeto GRATUITO:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Design Profissional</h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Layout moderno e elegante</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">100% responsivo (celular/tablet)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Cores e identidade visual</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Estratégia SEO</h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Otimização para Google</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Palavras-chave jurídicas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Google My Business</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              💡 Veja como seria o seu site antes de decidir!
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Projeto completo, sem compromisso. Se gostar, podemos conversar sobre o desenvolvimento.
            </p>
            <div className="flex justify-center">
              <a
                href="https://wa.me/5511999999999?text=🎨 Quero ver o projeto visual do meu site!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                🎨 VER PROJETO VISUAL
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            🎁 Pronto para ver seu projeto GRATUITO?
          </h2>
          
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
            <strong>Sem compromisso, sem pressão.</strong> Veja como seria o site do {empresaDisplay} 
            e decida se faz sentido para você.
          </p>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-2xl p-8 mb-10">
            <h3 className="text-2xl font-bold text-white mb-6">✅ O que você recebe:</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>Projeto visual completo</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>Estratégia SEO personalizada</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>Análise da concorrência</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>100% gratuito</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>Sem compromisso</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>Entrega em 7 dias</span>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/5511999999999?text=🎁 Quero receber o projeto GRATUITO do meu site profissional!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-white text-green-600 px-12 py-6 rounded-full text-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            🎁 QUERO MEU PROJETO GRÁTIS!
          </a>
          
          <div className="text-center mt-8 space-y-2">
            <p className="text-green-100 text-lg font-semibold">
              ⏰ Resposta em até 2 horas
            </p>
            <p className="text-green-200 text-sm">
              💡 Sem compromisso • 🎯 Personalizado para você • 📱 WhatsApp direto
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}