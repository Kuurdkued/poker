
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Shuffle, Copy, Check, Star, Spade, Clubs, Heart, Diamond } from 'lucide-react';

const PREFIXES = [
  'The', 'River', 'Ace', 'Sharp', 'Royal', 'Bluffing', 'Aggressive', 'Patient', 'All-In', 'Full-House',
  'Suited', 'Silent', 'Wicked', 'Midnight', 'Lucky', 'Iron', 'Golden', 'Silver', 'Shadow', 'Savage'
];

const NOUNS = [
  'Shark', 'Dealer', 'Grinder', 'Gambler', 'Sniper', 'King', 'Queen', 'Joker', 'Fish', 'Whale',
  'Mage', 'Viking', 'Knight', 'Assassin', 'Raider', 'Slayer', 'Ghost', 'Legend', 'Icon', 'Master'
];

const SUFFIXES = [
  '♠', '♥', '♣', '♦', 'Ace', 'Pro', 'Shark', 'King', 'Queen', 'Deuce', 'River', 'Flop', 'Turn', 'Showdown'
];

const NicknameGenerator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const nicknames = useMemo(() => {
    const list = [];
    const base = inputText || 'Player';
    
    for (let i = 0; i < 50; i++) {
      const p = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
      const n = NOUNS[Math.floor(Math.random() * NOUNS.length)];
      const s = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
      
      const formats = [
        `${p} ${base} ${n}`,
        `${base} ${n} ${s}`,
        `${p} ${n} [${base}]`,
        `${s} ${base} ${s}`,
        `${base} the ${n}`,
        `[${base}] ${p} ${n}`,
        `${n} ${base}`,
        `${p}${base}${s}`
      ];
      
      list.push(formats[i % formats.length]);
    }
    return list;
  }, [inputText]);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idx);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-12 pb-20">
      <section className="text-center space-y-4 pt-8">
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold">
          Nickname <span className="text-purple-400">Generator</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Generate professional and aggressive poker aliases to hide your tells.
        </p>
      </section>

      <div className="glass-card p-6 md:p-8 border-white/10 sticky top-20 z-30 shadow-2xl bg-black/80 backdrop-blur-xl">
        <div className="relative group max-w-2xl mx-auto">
          <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your name or initials..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-xl font-medium outline-none focus:border-purple-500/50 transition-all text-center"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {nicknames.map((nick, idx) => (
            <motion.div
              layout
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 border-white/5 hover:border-purple-500/40 transition-all group flex flex-col justify-between h-40"
            >
              <div className="text-xl font-bold text-white text-center font-orbitron">{nick}</div>
              <button
                onClick={() => handleCopy(nick, idx)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${copiedId === idx ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-gray-300 hover:bg-purple-600 hover:text-white border border-white/10'}`}
              >
                {copiedId === idx ? <Check size={16} className="inline mr-2" /> : <Copy size={16} className="inline mr-2" />}
                {copiedId === idx ? 'COPIED' : 'COPY NICKNAME'}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setInputText('')}
          className="flex items-center gap-2 px-8 py-4 poker-blue-header text-white font-bold rounded-full shadow-2xl neon-glow-cyan"
        >
          <Shuffle size={20} />
          <span>GENERATE RANDOM SET</span>
        </motion.button>
      </div>
    </div>
  );
};

export default NicknameGenerator;
