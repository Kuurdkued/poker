
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const DotBackground: React.FC = () => {
  const dots = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-[#0d0d2b]" />
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          initial={{ opacity: 0.1, y: '100%' }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            y: ['100%', '-10%'],
            x: [`${dot.x}%`, `${dot.x + (Math.random() * 10 - 5)}%`],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "linear",
          }}
          className="absolute rounded-full bg-cyan-500/20 blur-[1px]"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.x}%`,
          }}
        />
      ))}
    </div>
  );
};

export default DotBackground;
