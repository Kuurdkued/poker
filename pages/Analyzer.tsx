
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, AlertCircle, Hash, List, Copy, CheckCircle2, Circle } from 'lucide-react';
import { AnalysisResult } from '../types';
import { saveToHistory } from '../utils/storage';

const Analyzer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeDots, setActiveDots] = useState<number[]>([]);
  const [usedVariations, setUsedVariations] = useState<Set<string>>(new Set());
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const validateEmail = (val: string) => {
    if (!val) return '';
    const parts = val.split('@');
    if (parts.length !== 2) return 'Invalid email format';
    if (!parts[0] || !parts[1]) return 'Missing username or domain';
    if (!parts[1].includes('.')) return 'Invalid domain';
    return '';
  };

  const handleAnalyze = () => {
    const err = validateEmail(email);
    if (err) {
      setError(err);
      setResult(null);
      return;
    }

    setError('');
    const [username, domain] = email.split('@');
    const usernameLength = username.length;
    const dotPositions = Math.max(0, usernameLength - 1);
    const totalVariations = Math.pow(2, dotPositions);

    const newResult: AnalysisResult = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      username,
      domain,
      usernameLength,
      dotPositions,
      totalVariations,
      timestamp: Date.now(),
    };

    setResult(newResult);
    setActiveDots([]);
    setUsedVariations(new Set());
    saveToHistory(newResult);
  };

  const toggleDot = (idx: number) => {
    setActiveDots(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const toggleUsed = (variant: string) => {
    setUsedVariations(prev => {
      const next = new Set(prev);
      if (next.has(variant)) {
        next.delete(variant);
      } else {
        next.add(variant);
      }
      return next;
    });
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const simulatedAlias = useMemo(() => {
    if (!result) return '';
    const chars = result.username.split('');
    let output = '';
    chars.forEach((char, i) => {
      output += char;
      if (activeDots.includes(i) && i < chars.length - 1) {
        output += '.';
      }
    });
    return `${output}@${result.domain}`;
  }, [result, activeDots]);

  const singleDotVariations = useMemo(() => {
    if (!result || result.usernameLength < 2) return [];
    const variations: string[] = [];
    const username = result.username;
    const domain = result.domain;

    for (let i = username.length - 1; i >= 1; i--) {
      const variation = username.slice(0, i) + '.' + username.slice(i) + '@' + domain;
      variations.push(variation);
    }
    return variations;
  }, [result]);

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4 pt-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold font-orbitron mb-4">
          GHOST MAIL ANALYSIS ENGINE
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold leading-tight">
          Email <span className="text-cyan-400">Analyzer</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Simulate Gmail dot variations for testing and identity management.
        </p>
      </div>

      <div className="glass-card p-8 border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 poker-blue-header opacity-5 -z-10" />
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="relative flex-grow w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              placeholder="username@gmail.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-5 pl-12 pr-4 text-lg focus:border-cyan-500/50 outline-none transition-all"
            />
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-6 left-2 text-red-400 text-xs flex items-center gap-1 font-bold"
                >
                  <AlertCircle size={12} /> {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button 
            onClick={handleAnalyze}
            className="w-full sm:w-auto px-10 py-5 poker-blue-header rounded-xl font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
          >
            ANALYZE
          </button>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Stats Cards */}
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center gap-2 border-white/5">
              <span className="text-gray-500 text-[10px] font-orbitron uppercase tracking-widest">Username Size</span>
              <span className="text-4xl font-bold text-white font-orbitron">{result.usernameLength}</span>
              <span className="text-gray-600 text-[10px] uppercase">Characters</span>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center gap-2 border-white/5">
              <span className="text-gray-500 text-[10px] font-orbitron uppercase tracking-widest">Dot Positions</span>
              <span className="text-4xl font-bold text-cyan-400 font-orbitron">{result.dotPositions}</span>
              <span className="text-gray-600 text-[10px] uppercase">Gaps</span>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center gap-2 border-white/5">
              <span className="text-gray-500 text-[10px] font-orbitron uppercase tracking-widest">Calculated Aliases</span>
              <span className="text-4xl font-bold text-blue-500 font-orbitron">{result.totalVariations.toLocaleString()}</span>
              <span className="text-gray-600 text-[10px] uppercase">Permutations</span>
            </div>

            {/* Single Dot List Section */}
            <div className="col-span-1 md:col-span-3 glass-card p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold font-orbitron flex items-center gap-3">
                  <List className="text-cyan-400" />
                  Single-Dot Variations
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-gray-500 uppercase font-orbitron bg-white/5 px-3 py-1 rounded-full">
                    {usedVariations.size} / {singleDotVariations.length} TRACKED
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
                {singleDotVariations.map((variant, idx) => {
                  const isUsed = usedVariations.has(variant);
                  const isCopied = copiedIndex === idx;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 group ${
                        isUsed 
                        ? 'bg-blue-500/10 border-blue-500/30' 
                        : 'bg-white/5 border-white/10 hover:border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-grow overflow-hidden">
                        <button 
                          onClick={() => toggleUsed(variant)}
                          className={`flex-shrink-0 transition-all transform active:scale-90 ${isUsed ? 'text-blue-400' : 'text-gray-600 hover:text-gray-400'}`}
                        >
                          {isUsed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                        </button>
                        <code className={`text-sm md:text-base font-mono truncate transition-all ${
                          isUsed ? 'text-gray-600 line-through' : 'text-gray-200'
                        }`}>
                          {variant}
                        </code>
                      </div>
                      
                      <button 
                        onClick={() => handleCopy(variant, idx)}
                        className={`flex-shrink-0 p-3 rounded-lg transition-all ${
                          isCopied 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-white/10 text-gray-400 hover:text-white hover:bg-blue-500 border border-white/10'
                        }`}
                      >
                        {isCopied ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Visual Mapper */}
            <div className="col-span-1 md:col-span-3 glass-card p-8 space-y-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold font-orbitron flex items-center gap-3">
                  <Hash className="text-blue-500" />
                  Interactive Mapper
                </h3>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Toggle dots manually</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 p-10 bg-black/40 rounded-2xl border border-white/5">
                {result.username.split('').map((char, idx) => (
                  <React.Fragment key={idx}>
                    <div className="w-12 h-16 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-2xl font-bold font-mono text-white shadow-inner">
                      {char}
                    </div>
                    {idx < result.usernameLength - 1 && (
                      <button 
                        onClick={() => toggleDot(idx)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          activeDots.includes(idx) 
                            ? 'bg-blue-500 text-white scale-110 shadow-lg shadow-blue-500/30' 
                            : 'bg-white/10 text-gray-600 hover:bg-white/20'
                        }`}
                      >
                        <span className="font-bold text-xl leading-none">.</span>
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-8 rounded-xl border border-white/10 space-y-4">
                <div className="text-center">
                  <span className="text-[10px] font-orbitron text-gray-500 uppercase tracking-widest font-bold">Generated Identity Result</span>
                  <div className="mt-3 text-2xl md:text-3xl font-mono text-white break-all flex items-center justify-center gap-4">
                    <span className="text-blue-400">{simulatedAlias.split('@')[0]}</span>
                    <span className="text-gray-500">@{simulatedAlias.split('@')[1]}</span>
                    <button 
                      onClick={() => handleCopy(simulatedAlias, -1)}
                      className="p-3 rounded-lg bg-white/10 hover:bg-blue-500 transition-all text-gray-400 hover:text-white"
                    >
                      {copiedIndex === -1 ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Analyzer;
