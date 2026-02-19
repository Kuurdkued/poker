
import React from 'react';
import { motion } from 'framer-motion';
import { Spade, Clubs, Heart, Diamond, Trophy, BookOpen, ShieldAlert, Zap } from 'lucide-react';

const PokerGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-20">
      <section className="text-center space-y-4 pt-8">
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold">
          Poker <span className="text-red-500">Guide</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Master the fundamentals and dominate the high-stakes digital tables.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 border-white/10 space-y-4 hover:border-cyan-500/50 transition-all">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <Trophy />
          </div>
          <h2 className="text-xl font-bold font-orbitron">Hand Rankings</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex justify-between border-b border-white/5 pb-1"><span className="text-white font-bold">Royal Flush</span> <span>A, K, Q, J, 10 Same Suit</span></li>
            <li className="flex justify-between border-b border-white/5 pb-1"><span className="text-white font-bold">Straight Flush</span> <span>5 Consecutive Same Suit</span></li>
            <li className="flex justify-between border-b border-white/5 pb-1"><span className="text-white font-bold">Four of a Kind</span> <span>4 of Same Rank</span></li>
            <li className="flex justify-between border-b border-white/5 pb-1"><span className="text-white font-bold">Full House</span> <span>3 + Pair</span></li>
            <li className="flex justify-between border-b border-white/5 pb-1"><span className="text-white font-bold">Flush</span> <span>5 of Same Suit</span></li>
          </ul>
        </div>

        <div className="glass-card p-8 border-white/10 space-y-4 hover:border-purple-500/50 transition-all">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <BookOpen />
          </div>
          <h2 className="text-xl font-bold font-orbitron">The Betting Rounds</h2>
          <div className="space-y-4 text-sm text-gray-400">
            <div>
              <span className="text-white font-bold block mb-1">Pre-Flop</span>
              Everyone gets 2 cards. Initial betting starts.
            </div>
            <div>
              <span className="text-white font-bold block mb-1">The Flop</span>
              3 community cards dealt face up.
            </div>
            <div>
              <span className="text-white font-bold block mb-1">The Turn</span>
              4th community card dealt.
            </div>
            <div>
              <span className="text-white font-bold block mb-1">The River</span>
              5th and final community card dealt. Showdown follows.
            </div>
          </div>
        </div>
      </div>

      <section className="glass-card p-10 border-white/10 space-y-8 bg-gradient-to-br from-black to-[#0a0a20]">
        <h2 className="text-2xl font-bold font-orbitron border-b border-white/5 pb-4 text-center">Pro Player Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-cyan-400 font-bold flex items-center gap-2"><Zap size={18} /> Tight-Aggressive</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Play fewer hands, but when you do play, bet big. This is the TAG style that dominates many tables.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-purple-400 font-bold flex items-center gap-2"><Spade size={18} /> Bankroll Mgmt</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Never risk more than 5% of your total bankroll on a single table. Longevity is key in poker.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-amber-400 font-bold flex items-center gap-2"><ShieldAlert size={18} /> Table Position</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Acting last is a huge advantage. You have information on everyone's bets before you make yours.</p>
          </div>
        </div>
      </section>

      <section className="text-center p-12 glass-card border-red-500/20 bg-red-500/5">
        <h2 className="text-xl font-bold font-orbitron mb-4 text-red-500">High Stakes Disclaimer</h2>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Poker involves significant financial risk. This guide is for entertainment and visual styling purposes. 
          The hub does not facilitate gambling. Please follow local laws and play responsibly.
        </p>
      </section>
    </div>
  );
};

export default PokerGuide;
