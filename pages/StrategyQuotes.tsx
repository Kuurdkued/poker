
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Shuffle, Copy, Check, Spade } from 'lucide-react';

const QUOTES = [
  "Poker is a hard way to make an easy living.",
  "Trust everyone, but always cut the cards.",
  "You don't play the cards, you play the man across from you.",
  "The beautiful thing about poker is that everybody thinks they can play.",
  "Last night I stayed up late playing poker with Tarot cards. I got a full house and four people died.",
  "Poker is a combination of luck and skill. People think mastering the skill part is hard, but they’re wrong. Mastering the luck part is much harder.",
  "Limit poker is a science, but No-limit is an art. In No-limit, you are shooting at the target. In limit, the target is shooting at you.",
  "If you can't spot the sucker in your first half-hour at the table, then you are the sucker.",
  "Life, like poker, has an element of risk. It shouldn't be avoided. It should be faced.",
  "No-limit Hold'em: Hours of boredom followed by moments of sheer terror.",
  "Winning isn't everything, it's the only thing that matters at the final table.",
  "Fold and live to play another hand.",
  "The goal of poker is to keep your opponents' money.",
  "Don't get mad that you lost, get mad that you didn't play better.",
  "Position is power. Play tight from the blinds, loose from the button."
];

const StrategyQuotes: React.FC = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [randomQuotes, setRandomQuotes] = useState(QUOTES.sort(() => Math.random() - 0.5).slice(0, 12));

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idx);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShuffle = () => {
    setRandomQuotes(QUOTES.sort(() => Math.random() - 0.5).slice(0, 12));
  };

  return (
    <div className="space-y-12 pb-20">
      <section className="text-center space-y-4 pt-8">
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold">
          Strategy <span className="text-amber-400">Quotes</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Tactical wisdom and mental game fuel from poker legends.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {randomQuotes.map((quote, idx) => (
            <motion.div
              layout
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 border-white/5 flex flex-col justify-between gap-6 hover:border-amber-500/40 transition-all group relative overflow-hidden"
            >
              <Quote className="text-amber-500/20 absolute top-4 left-4" size={48} />
              <p className="text-lg text-gray-200 leading-relaxed relative z-10 italic">"{quote}"</p>
              <button
                onClick={() => handleCopy(quote, idx)}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${copiedId === idx ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-gray-300 hover:bg-amber-500 hover:text-black border border-white/10'}`}
              >
                {copiedId === idx ? <Check size={16} className="inline mr-2" /> : <Copy size={16} className="inline mr-2" />}
                {copiedId === idx ? 'COPIED' : 'COPY QUOTE'}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center pt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShuffle}
          className="flex items-center gap-2 px-8 py-4 bg-amber-500 text-black font-bold rounded-full shadow-2xl"
        >
          <Shuffle size={20} />
          <span>RANDOMIZE QUOTES</span>
        </motion.button>
      </div>
    </div>
  );
};

export default StrategyQuotes;
