
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, Check, Search, Trash2, Star, Zap, Shuffle, Type, 
  ChevronDown, Wand2, History as HistoryIcon, Spade, Heart, Clubs, Diamond, Languages
} from 'lucide-react';

// --- Unicode Mappings Utility ---
const charMap: Record<string, Record<string, string>> = {
  bold: { a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳', A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉', K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙', '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗' },
  script: { a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: '𝑒', f: '𝒻', g: '𝑔', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: '𝑜', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏', A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ', I: 'ℐ', J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: 'ℛ', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵' },
  bubble: { a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ', A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ', K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ', N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ', U: 'Ⓤ', V: 'Ⓥ', W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ' },
};

const applyStyle = (text: string, styleId: string): string => {
  if (styleId === 'wide') return text.split('').join('  ');
  const map = charMap[styleId];
  if (!map) return text;
  return text.split('').map(char => map[char] || char).join('');
};

const POKER_TEMPLATES = [
  // --- Arabic & Kurdish Sorani (Regional Patterns) ---
  { prefix: '۝ ', suffix: ' ۝', name: 'Calligraphy Border', category: 'Arabic/Kurdish' },
  { prefix: '۩ ', suffix: ' ۩', name: 'Dome Style', category: 'Arabic/Kurdish' },
  { prefix: '۞ ', suffix: ' ۞', name: 'Arabesque', category: 'Arabic/Kurdish' },
  { prefix: '﷽ ', suffix: '', name: 'Bismillah', category: 'Arabic/Kurdish' },
  { prefix: '﴿', suffix: '﴾', name: 'Hilya Bracket', category: 'Arabic/Kurdish' },
  { prefix: '◦•●◉✿ ', suffix: ' ✿◉●•◦', name: 'Floral Kurd', category: 'Arabic/Kurdish' },
  { prefix: '×ـ', suffix: 'ـ×', name: 'Kashida X', category: 'Arabic/Kurdish' },
  
  // --- Poker/Shark Theme ---
  { prefix: '♠ ', suffix: ' ♠', name: 'Ace Spade', category: 'Shark' },
  { prefix: '♥ ', suffix: ' ♥', name: 'Red Heart', category: 'Luxury' },
  { prefix: '꧁♠', suffix: '♠꧂', name: 'Shark King', category: 'Shark' },
  { prefix: '♛ ', suffix: ' ♛', name: 'Royal Poker', category: 'Luxury' },
  { prefix: '〆', suffix: '〆', name: 'The Reaper', category: 'Aggressive' },
  { prefix: '『', suffix: '』', name: 'Elite Tag', category: 'Minimal' },
  { prefix: '[VIP] ', suffix: ' [VIP]', name: 'VIP Table', category: 'Luxury' },
  { prefix: '█▓▒░ ', suffix: ' ░▒▓█', name: 'Cyber Table', category: 'Cyber' },
];

const CATEGORIES = ['All', 'Arabic/Kurdish', 'Shark', 'Aggressive', 'Minimal', 'Luxury', 'Cyber', 'Favorites'];

const PokerNameStyles: React.FC = () => {
  const [inputText, setInputText] = useState('Ace Player');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(30);

  useEffect(() => {
    const savedFavs = localStorage.getItem('poker_favorites');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem('poker_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const allStyles = useMemo(() => {
    const variations: any[] = [];
    const baseTypes = ['bold', 'script', 'bubble', 'wide'];

    POKER_TEMPLATES.forEach((tmpl, i) => {
      variations.push({
        id: `poker-${i}`,
        name: tmpl.name,
        category: tmpl.category,
        styled: `${tmpl.prefix}${inputText}${tmpl.suffix}`
      });
      
      baseTypes.forEach((type, ti) => {
        if ((i + ti) % 3 === 0) {
          variations.push({
            id: `poker-mix-${i}-${type}`,
            name: `${tmpl.name} ${type}`,
            category: tmpl.category,
            styled: `${tmpl.prefix}${applyStyle(inputText, type)}${tmpl.suffix}`
          });
        }
      });
    });

    return variations.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.styled.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || (activeCategory === 'Favorites' ? favorites.includes(v.id) : v.category === activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [inputText, searchTerm, activeCategory, favorites]);

  return (
    <div className="space-y-12 pb-20">
      <section className="text-center space-y-4 pt-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold font-orbitron mb-4">
          ACEUP VISUAL STUDIO - KURDISH & ARABIC ENABLED
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold">
          Style <span className="text-[#00E5FF]">Generator</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto flex items-center justify-center gap-2">
          <Languages size={18} className="text-cyan-400" />
          Supports English, Arabic, and Kurdish Sorani.
        </p>
      </section>

      <div className="glass-card p-6 md:p-8 border-white/10 sticky top-20 z-30 shadow-2xl space-y-6 bg-black/80 backdrop-blur-xl">
        <div className="relative group">
          <Type className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text"
            dir="auto"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your table name..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-20 text-2xl font-medium outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-800 text-center"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 px-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setPageSize(30); }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold font-orbitron transition-all whitespace-nowrap ${activeCategory === cat ? 'poker-blue-header text-white shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search themes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-5 text-sm outline-none focus:border-cyan-500/30 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {allStyles.slice(0, pageSize).map((style, idx) => (
            <motion.div
              layout
              key={style.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card p-6 border-white/5 hover:border-cyan-500/40 transition-all group relative overflow-hidden flex flex-col justify-between h-52"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-orbitron text-gray-500 uppercase tracking-widest">{style.name}</span>
                <button onClick={() => toggleFavorite(style.id)} className={`p-2 rounded-lg transition-all ${favorites.includes(style.id) ? 'bg-amber-400/10 text-amber-400' : 'bg-white/5 text-gray-500 hover:text-white'}`}>
                  <Star size={18} fill={favorites.includes(style.id) ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="text-xl font-medium text-white my-4 text-center break-all" dir="auto">{style.styled}</div>
              <button
                onClick={() => handleCopy(style.styled, style.id)}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${copiedId === style.id ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-gray-300 hover:bg-cyan-500 hover:text-white border border-white/10'}`}
              >
                {copiedId === style.id ? <Check size={16} className="inline mr-2" /> : <Copy size={16} className="inline mr-2" />}
                {copiedId === style.id ? 'COPIED' : 'COPY STYLE'}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const randomPhrases = ['AceUp Shark', 'Poker King', 'زخرفة عربية', 'بەرنامەی فۆنت', 'Bluff Master'];
            setInputText(randomPhrases[Math.floor(Math.random() * randomPhrases.length)]);
          }}
          className="flex items-center gap-2 px-8 py-4 poker-blue-header text-white font-bold rounded-full shadow-2xl neon-glow-cyan"
        >
          <Shuffle size={20} />
          <span>RANDOMIZE TEXT</span>
        </motion.button>
      </div>
    </div>
  );
};

export default PokerNameStyles;
