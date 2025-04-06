import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Simular envio do email
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 shadow-xl"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Receba Nossas Novidades
        </h2>
        <p className="text-indigo-100 mb-6">
          Inscreva-se em nossa newsletter para receber atualizações sobre novos projetos,
          dicas de tecnologia e ofertas especiais.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor e-mail"
            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Enviando...' : 'Inscrever-se'}
          </button>
        </form>
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-green-200"
          >
            Obrigado por se inscrever! Você receberá nossas novidades em breve.
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-red-200"
          >
            Ocorreu um erro. Por favor, tente novamente mais tarde.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
} 