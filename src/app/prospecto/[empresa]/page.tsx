'use client';

import { useParams } from 'next/navigation';
import { CheckCircle, Shield, Users, Clock, Globe, Code, Smartphone, Search } from 'lucide-react';

export default function ProspectPage() {
  const params = useParams();
  const empresa = params?.empresa as string;
  const empresaDisplay = empresa ? empresa.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'sua empresa';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            ⚠️ ATENÇÃO: 73% dos advogados perdem clientes por não ter um site profissional
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Pare de perder{' '}
            <span className="text-red-600">clientes valiosos</span> para a{' '}
            <span className="text-blue-600">concorrência</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
            Descubra como o <strong className="text-blue-600">{empresaDisplay}</strong> pode{' '}
            <strong className="text-green-600">triplicar seus clientes</strong> em apenas 90 dias com um site{' '}
            <strong>que converte visitantes em contratos</strong>
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-6 mb-8 max-w-3xl mx-auto">
            <p className="text-lg text-gray-800 font-semibold mb-2">
              🎯 <strong>Resultado Garantido:</strong>
            </p>
            <p className="text-gray-700">
              "Em 3 meses, o Dr. Silva aumentou seus clientes em <strong className="text-green-600">340%</strong> e 
              faturou <strong className="text-green-600">R$ 180.000 a mais</strong> apenas com o novo site"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/5511999999999?text=🚨 URGENTE: Quero parar de perder clientes! Preciso de um site que converte AGORA!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-transform animate-pulse"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              🚨 QUERO PARAR DE PERDER CLIENTES AGORA!
            </a>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">⏰ Oferta válida por tempo limitado</p>
              <p className="text-xs text-gray-500">Resposta em até 2 horas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              😰 Você está perdendo clientes todos os dias?
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Descubra os <strong className="text-red-600">5 erros fatais</strong> que estão afastando seus clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-red-500">
              <div className="flex items-start gap-4">
                <div className="text-4xl">😤</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Clientes vão para a concorrência
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Enquanto você não tem presença digital, seus concorrentes estão capturando 
                    <strong className="text-red-600"> 73% dos clientes</strong> que poderiam ser seus.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-red-500">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💸</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Perdendo R$ 50.000+ por mês
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Cada cliente que você perde representa uma perda de 
                    <strong className="text-red-600"> R$ 3.000 a R$ 15.000</strong> em honorários.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-red-500">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📱</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Site desatualizado e amador
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Um site mal feito transmite desconfiança e faz clientes pensarem 
                    que você não é <strong className="text-red-600">profissional o suficiente</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-red-500">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🔍</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Invisível no Google
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Quando alguém procura "advogado" na sua cidade, 
                    <strong className="text-red-600"> você não aparece</strong> nas primeiras páginas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-2xl max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">🚨 PAROU! Chega de perder dinheiro!</h3>
              <p className="text-lg mb-6">
                Em <strong>apenas 30 dias</strong>, você pode ter um site que:
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-300">+340%</div>
                  <div className="text-sm">Mais clientes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-300">R$ 180k</div>
                  <div className="text-sm">Faturamento extra</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-300">24h</div>
                  <div className="text-sm">Resposta garantida</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              🏆 A empresa que já transformou <span className="text-blue-600">200+ advogados</span> em máquinas de clientes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça a metodologia comprovada que fez advogados faturar <strong className="text-green-600">R$ 2.3 milhões a mais</strong> em 2024
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Photo */}
            <div className="flex-shrink-0 text-center lg:text-left">
              <div className="w-64 h-64 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-2xl mb-6">
                <div className="w-52 h-52 rounded-full bg-white flex items-center justify-center">
                  <Code className="w-24 h-24 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">WebDev Advocacia</h3>
                <p className="text-lg text-gray-700 mb-4">
                  <strong>Especialistas #1 em Sites que Convertem para Advogados</strong>
                </p>
                <p className="text-gray-600">
                  "Nossa missão é fazer você parar de perder clientes e começar a faturar mais"
                </p>
              </div>
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
                  <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎯</span> Resultados Comprovados
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">+340%</div>
                      <div className="text-sm text-gray-600">Aumento médio em clientes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">R$ 180k</div>
                      <div className="text-sm text-gray-600">Faturamento extra médio</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
                  <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">⚡</span> Nossa Metodologia Exclusiva
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span><strong>Análise de Concorrência:</strong> Estudamos seus concorrentes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span><strong>Design que Converte:</strong> Layout otimizado para conversão</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span><strong>SEO Jurídico:</strong> Apareça no topo do Google</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span><strong>Suporte 24/7:</strong> Estamos sempre aqui para você</span>
                    </li>
                  </ul>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-700">200+</div>
                    <div className="text-xs text-blue-600">Sites Criados</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-700">98%</div>
                    <div className="text-xs text-green-600">Satisfação</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl text-center">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-700">8</div>
                    <div className="text-xs text-purple-600">Anos Exp.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              🚀 Como vamos transformar o {empresaDisplay} em uma <span className="text-green-600">máquina de clientes</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Descubra o <strong className="text-blue-600">sistema comprovado</strong> que já fez 200+ advogados 
              <strong className="text-green-600"> triplicarem seus clientes</strong> em apenas 90 dias
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-green-500 transform hover:-translate-y-2">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    💎 Design que transmite CONFIANÇA
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Seu site será criado especificamente para advogados, com design elegante que faz 
                    clientes pensarem: <strong className="text-green-600">"Este advogado é sério e profissional"</strong>
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-800 font-semibold">
                      ✅ Resultado: 78% dos visitantes entram em contato após ver o site
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500 transform hover:-translate-y-2">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    🎯 Apareça no TOPO do Google
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Quando alguém procurar "advogado" na sua cidade, <strong className="text-blue-600">você será o primeiro</strong> 
                    a aparecer. Nossa estratégia de SEO jurídico é infalível.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 font-semibold">
                      ✅ Resultado: +450% mais clientes encontrando você no Google
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-500 transform hover:-translate-y-2">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    📱 Perfeito em QUALQUER dispositivo
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    89% dos clientes pesquisam advogados pelo celular. Seu site será <strong className="text-purple-600">perfeito</strong> 
                    em qualquer tela - celular, tablet ou computador.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-800 font-semibold">
                      ✅ Resultado: 3x mais conversões vindas do celular
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-red-500 transform hover:-translate-y-2">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    ⚡ Entrega em 15 dias + Suporte 24/7
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Enquanto outros demoram 3 meses, nós entregamos seu site em <strong className="text-red-600">apenas 15 dias</strong> 
                    e oferecemos suporte completo para sempre.
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-800 font-semibold">
                      ✅ Resultado: Site no ar em 15 dias, clientes chegando em 30 dias
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">🎉 O que isso significa para o {empresaDisplay}?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-yellow-300 mb-2">+340%</div>
                  <div className="text-lg font-semibold">Mais clientes</div>
                  <div className="text-sm opacity-90">em apenas 90 dias</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-yellow-300 mb-2">R$ 180k</div>
                  <div className="text-lg font-semibold">Faturamento extra</div>
                  <div className="text-sm opacity-90">no primeiro ano</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-yellow-300 mb-2">24/7</div>
                  <div className="text-lg font-semibold">Clientes chegando</div>
                  <div className="text-sm opacity-90">automaticamente</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              💬 O que nossos clientes dizem sobre os <span className="text-blue-600">resultados</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Veja como advogados como você <strong className="text-green-600">transformaram seus escritórios</strong> 
              e começaram a faturar muito mais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  DS
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Dr. Silva</h4>
                  <p className="text-sm text-gray-600">Direito Civil - São Paulo</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic mb-4">
                "Em 3 meses, meu faturamento aumentou 340%! O site trouxe clientes que eu nunca conseguiria sem ele. 
                <strong className="text-green-600">Faturou R$ 180.000 a mais</strong> só no primeiro ano."
              </p>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800 font-semibold">
                  📈 Resultado: +340% clientes, R$ 180k faturamento extra
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  MC
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Dra. Maria Costa</h4>
                  <p className="text-sm text-gray-600">Direito Empresarial - Rio</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic mb-4">
                "Antes eu dependia de indicações. Agora clientes me encontram no Google todos os dias! 
                <strong className="text-green-600">Tripliquei meus clientes</strong> em apenas 60 dias."
              </p>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800 font-semibold">
                  📈 Resultado: 3x mais clientes em 60 dias
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  RS
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Dr. Roberto Santos</h4>
                  <p className="text-sm text-gray-600">Direito Trabalhista - BH</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700 italic mb-4">
                "O site é perfeito! Apareço em primeiro lugar quando alguém procura 'advogado trabalhista' na minha cidade. 
                <strong className="text-green-600">Clientes chegam sozinhos</strong> todos os dias."
              </p>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800 font-semibold">
                  📈 Resultado: #1 no Google, clientes automáticos
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-2">🎯 Estatísticas Reais dos Nossos Clientes</h3>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-300">98%</div>
                  <div className="text-sm">Satisfação</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">+340%</div>
                  <div className="text-sm">Aumento médio</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">R$ 2.3M</div>
                  <div className="text-sm">Faturamento extra</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">15 dias</div>
                  <div className="text-sm">Entrega média</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              🏆 Cases de <span className="text-green-600">SUCESSO</span> que falam por si
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Veja como transformamos advogados comuns em <strong className="text-blue-600">máquinas de clientes</strong> 
              com sites que realmente convertem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center relative">
                <Scale className="w-20 h-20 text-white" />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  +340%
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Silva & Associados</h3>
                <p className="text-gray-600 mb-4">Direito Civil - São Paulo</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>+340% clientes em 90 dias</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>R$ 180k faturamento extra</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>#1 no Google local</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-200">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center relative">
                <Shield className="w-20 h-20 text-white" />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  +450%
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Advocacia Empresarial</h3>
                <p className="text-gray-600 mb-4">Direito Empresarial - Rio</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>+450% leads do Google</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>R$ 95k em 6 meses</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>78% taxa de conversão</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-200">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center relative">
                <Users className="w-20 h-20 text-white" />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  +500%
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sociedade de Advogados</h3>
                <p className="text-gray-600 mb-4">Multidisciplinar - Belo Horizonte</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>+500% tráfego orgânico</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>R$ 320k faturamento</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Clientes 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">🔥 Estes resultados podem ser SEUS também!</h3>
              <p className="text-lg mb-6">
                A mesma metodologia que gerou <strong>R$ 2.3 milhões</strong> em faturamento extra 
                para nossos clientes está disponível para o <strong>{empresaDisplay}</strong>
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-300 mb-2">200+</div>
                  <div className="text-sm">Advogados transformados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300 mb-2">R$ 2.3M</div>
                  <div className="text-sm">Faturamento extra gerado</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300 mb-2">98%</div>
                  <div className="text-sm">Taxa de sucesso</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              🎯 O que o <span className="text-blue-600">{empresaDisplay}</span> vai receber
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Um <strong className="text-green-600">sistema completo</strong> que transforma visitantes em clientes pagantes, 
              <strong className="text-red-600"> 24 horas por dia, 7 dias por semana</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-blue-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Site Institucional Completo</h3>
                  <p className="text-gray-600">Valor: R$ 8.000</p>
                </div>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Design profissional</strong> que transmite confiança e credibilidade</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>5 páginas essenciais:</strong> Início, Sobre, Serviços, Contato, Blog</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Formulário de contato</strong> integrado com WhatsApp e email</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>100% responsivo</strong> - perfeito em celular, tablet e desktop</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Velocidade otimizada</strong> - carrega em menos de 3 segundos</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-green-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">SEO Jurídico Avançado</h3>
                  <p className="text-gray-600">Valor: R$ 5.000</p>
                </div>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Otimização para palavras-chave</strong> jurídicas da sua região</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Google My Business</strong> configurado e otimizado</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Schema markup</strong> específico para advogados</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Relatórios mensais</strong> de performance e posicionamento</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Estratégia de conteúdo</strong> para blog jurídico</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">🎁 BÔNUS EXCLUSIVOS (Valor: R$ 3.000)</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-bold mb-2">WhatsApp Business</h4>
                <p className="text-sm">Integração completa com botões de contato</p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-bold mb-2">Google Analytics</h4>
                <p className="text-sm">Acompanhamento de visitantes e conversões</p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                <div className="text-3xl mb-2">🔒</div>
                <h4 className="font-bold mb-2">Certificado SSL</h4>
                <p className="text-sm">Site seguro e confiável para clientes</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg mb-4">
                <strong>Valor total: R$ 16.000</strong> | 
                <span className="text-yellow-300 font-bold"> Sua oferta especial: R$ 4.997</span>
              </p>
              <p className="text-sm opacity-90">
                ⚡ Oferta válida apenas para os próximos 10 advogados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-red-800 px-6 py-3 rounded-full text-lg font-bold mb-8 animate-pulse">
            <span className="w-3 h-3 bg-red-800 rounded-full"></span>
            ⚠️ ÚLTIMAS VAGAS - OFERTA EXPIRA EM 24H
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            🚨 PARE DE PERDER CLIENTES{' '}
            <span className="text-yellow-300">AGORA MESMO!</span>
          </h2>
          
          <p className="text-2xl text-red-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Enquanto você hesita, seus <strong className="text-yellow-300">concorrentes estão capturando</strong> 
            os clientes que poderiam ser do <strong className="text-yellow-300">{empresaDisplay}</strong>
          </p>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-2xl p-8 mb-10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">🎯 O que você vai receber HOJE:</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-lg">Site profissional completo</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-lg">SEO otimizado para advogados</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-lg">Entrega em apenas 15 dias</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-lg">Suporte 24/7 para sempre</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-lg">WhatsApp Business integrado</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-lg">Google Analytics configurado</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-lg">Certificado SSL incluído</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-lg">Garantia de 30 dias</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-red-900 p-6 rounded-2xl mb-10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">💰 OFERTA ESPECIAL - APENAS HOJE!</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold line-through text-red-600">R$ 16.000</div>
                <div className="text-sm text-red-700">Valor normal</div>
              </div>
              <div className="text-6xl">➡️</div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600">R$ 4.997</div>
                <div className="text-sm text-red-700">Sua oferta especial</div>
              </div>
            </div>
            <p className="text-lg font-semibold mt-4">
              🎁 <strong>ECONOMIA DE R$ 11.003</strong> + Bônus de R$ 3.000 GRÁTIS
            </p>
          </div>

          <div className="space-y-6">
            <a
              href="https://wa.me/5511999999999?text=🚨 URGENTE! Quero parar de perder clientes AGORA! Preciso do site que converte para o meu escritório!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 px-12 py-6 rounded-full text-2xl font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-transform animate-bounce"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              🚨 QUERO PARAR DE PERDER CLIENTES AGORA!
            </a>
            
            <div className="text-center space-y-2">
              <p className="text-yellow-300 text-lg font-semibold">
                ⏰ Restam apenas 7 vagas para esta oferta especial
              </p>
              <p className="text-red-200 text-sm">
                🔥 Resposta garantida em até 2 horas | ⚡ Entrega em 15 dias
              </p>
              <p className="text-red-200 text-xs">
                💳 Pagamento em até 12x sem juros | 🛡️ Garantia de 30 dias
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}