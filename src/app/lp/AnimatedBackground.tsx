'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full bg-indigo-400/30 blur-3xl"
        style={{ top: '-10%', left: '-5%' }}
        animate={{ x: [0, 20, -10, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-80 h-80 md:w-[30rem] md:h-[30rem] rounded-full bg-fuchsia-400/20 blur-3xl"
        style={{ bottom: '-15%', right: '-10%' }}
        animate={{ x: [0, -15, 10, 0], y: [0, 10, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute w-60 h-60 md:w-[22rem] md:h-[22rem] rounded-full bg-blue-400/20 blur-3xl"
        style={{ top: '30%', right: '20%' }}
        animate={{ x: [0, 10, -10, 0], y: [0, 5, -5, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}