'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Accessibility() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 16,
    highContrast: false,
    grayscale: false,
    reducedMotion: false,
  });

  useEffect(() => {
    // Aplicar configurações de acessibilidade
    document.documentElement.style.setProperty('--font-size', `${settings.fontSize}px`);
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
    document.documentElement.classList.toggle('grayscale', settings.grayscale);
    document.documentElement.classList.toggle('reduced-motion', settings.reducedMotion);
  }, [settings]);

  const handleFontSizeChange = (increase: boolean) => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.max(12, Math.min(24, prev.fontSize + (increase ? 2 : -2))),
    }));
  };

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-20 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Configurações de acessibilidade"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Configurações de Acessibilidade
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tamanho do Texto
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleFontSizeChange(false)}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded"
                    aria-label="Diminuir tamanho do texto"
                  >
                    A-
                  </button>
                  <span className="text-gray-900 dark:text-white">
                    {settings.fontSize}px
                  </span>
                  <button
                    onClick={() => handleFontSizeChange(true)}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded"
                    aria-label="Aumentar tamanho do texto"
                  >
                    A+
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.highContrast}
                    onChange={(e) =>
                      setSettings({ ...settings, highContrast: e.target.checked })
                    }
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Alto Contraste
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.grayscale}
                    onChange={(e) =>
                      setSettings({ ...settings, grayscale: e.target.checked })
                    }
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Escala de Cinza
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={(e) =>
                      setSettings({ ...settings, reducedMotion: e.target.checked })
                    }
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Reduzir Movimento
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 