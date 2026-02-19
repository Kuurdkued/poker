
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, Check, Search, Trash2, Star, Zap, Shuffle, Type, 
  Languages, Crown, Swords, Heart, Sparkles, Binary, Layout, 
  ChevronDown, Wand2, History as HistoryIcon 
} from 'lucide-react';

// --- Unicode Mappings Utility ---
const charMap: Record<string, Record<string, string>> = {
  bold: { a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳', A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉', K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙', '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗' },
  script: { a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: '𝑒', f: '𝒻', g: '𝑔', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: '𝑜', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏', A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ', I: 'ℐ', J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: 'ℛ', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵' },
  bubble: { a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ', A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ', K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ', N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ', U: 'Ⓤ', V: 'Ⓥ', W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ', '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨' },
  square: { a: '🄰', b: '🄱', c: '🄲', d: '🄳', e: '🄴', f: '🄵', g: '🄶', h: '🄷', i: '🄸', j: '🄹', k: '🄺', l: '🄻', m: '🄼', n: '🄽', o: '🄾', p: '🄿', q: '🅀', r: '🅁', s: '🅂', t: '🅃', u: '🅄', v: '🅅', w: '🅆', x: '🅇', y: '🅈', z: '🅉', A: '🄰', B: '🄱', C: '🄲', D: '🄳', E: '🄴', F: '🄵', G: '🄶', H: '🄷', I: '🄸', J: '🄹', K: '🄺', L: '🄻', M: '🄼', N: '🄽', O: '🄾', P: '🄿', Q: '🅀', R: '🅁', S: '🅂', T: '🅃', U: '🅄', V: '🅅', W: '🅆', X: '🅇', Y: '🅈', Z: '🅉' },
  doubleStruck: { a: '𝕒', b: '𝕓', c: '𝕔', d: '𝕕', e: '𝕖', f: '𝕗', g: '𝕘', h: '𝕙', i: '𝕚', j: '𝕛', k: '𝕜', l: '𝕝', m: '𝕞', n: '𝕟', o: '𝕠', p: '𝕡', q: '𝕢', r: '𝕣', s: '𝕤', t: '𝕥', u: '𝕦', v: '𝕧', w: '𝕨', x: '𝕩', y: '𝕪', z: '𝕫', A: '𝔸', B: '𝔹', C: 'ℂ', D: '𝔻', E: '𝔼', F: '𝔽', G: '𝔾', H: 'ℍ', I: '𝕀', J: '𝕁', K: '𝕂', L: '𝕃', M: '𝕄', N: 'ℕ', O: '𝕆', P: 'ℙ', Q: 'ℚ', R: 'ℝ', S: '𝕊', T: '𝕋', U: '𝕌', V: '𝕍', W: '𝕎', X: '𝕏', Y: '𝕐', Z: 'ℤ' },
  fraktur: { a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦', j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱', u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷', A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ', J: '𝔍', K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ', S: '', T: '𝔗', U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ' }
};

const applyStyle = (text: string, styleId: string): string => {
  if (styleId === 'reverse') return text.split('').reverse().join('');
  if (styleId === 'mirror') {
    const mirrorMap: any = { a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z' };
    return text.toLowerCase().split('').map(c => mirrorMap[c] || c).reverse().join('');
  }
  if (styleId === 'zalgo') {
    const zalgoChars = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'];
    return text.split('').map(char => char + zalgoChars[Math.floor(Math.random() * zalgoChars.length)]).join('');
  }
  if (styleId === 'wide') return text.split('').join('  ');
  if (styleId === 'tiny') {
    const tinyMap: any = { a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', q: 'ᵠ', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ' };
    return text.toLowerCase().split('').map(c => tinyMap[c] || c).join('');
  }
  
  const map = charMap[styleId];
  if (!map) return text;
  return text.split('').map(char => map[char] || char).join('');
};

// Expanded Library
const DECORATION_TEMPLATES = [
  // --- Arabic / Kurdish (Inspired by popular regional tools) ---
  { prefix: '۝ ', suffix: ' ۝', name: 'Calligraphy Border', category: 'Arabic' },
  { prefix: '۩ ', suffix: ' ۩', name: 'Dome Style', category: 'Arabic' },
  { prefix: '۞ ', suffix: ' ۞', name: 'Arabesque', category: 'Arabic' },
  { prefix: '﷽ ', suffix: ' ﷽', name: 'Bismillah Frame', category: 'Arabic' },
  { prefix: '﴿', suffix: '﴾', name: 'Hilya Bracket', category: 'Arabic' },
  { prefix: '『', suffix: '』', name: 'Arabic Shield', category: 'Arabic' },
  { prefix: '【', suffix: '】', name: 'Heavy Frame', category: 'Arabic' },
  { prefix: '꧁', suffix: '꧂', name: 'Kurdish King', category: 'Arabic' },
  { prefix: '◦•●◉✿ ', suffix: ' ✿◉●•◦', name: 'Floral Kurdish', category: 'Arabic' },
  { prefix: '×ـ', suffix: 'ـ×', name: 'Kashida X', category: 'Arabic' },
  { prefix: '﹄', suffix: '﹃', name: 'Classic Curve', category: 'Arabic' },
  { prefix: '「', suffix: '」', name: 'Hook Bracket', category: 'Arabic' },
  { prefix: '《', suffix: '》', name: 'Sword Bracket', category: 'Arabic' },
  { prefix: '๏ ', suffix: ' ๏', name: 'Dot Arab', category: 'Arabic' },
  { prefix: '⍟ ', suffix: ' ⍟', name: 'Crescent Star', category: 'Arabic' },

  // --- Gaming (Clan Tags, Battle Royale styles) ---
  { prefix: '亗 ', suffix: ' 亗', name: 'Crown King', category: 'Gaming' },
  { prefix: '๛', suffix: '๛', name: 'Scythe Blade', category: 'Gaming' },
  { prefix: '彡', suffix: '彡', name: 'Wings of War', category: 'Gaming' },
  { prefix: '〆', suffix: '〆', name: 'Deadly Mark', category: 'Gaming' },
  { prefix: 'ズ', suffix: 'ズ', name: 'Katana Slash', category: 'Gaming' },
  { prefix: '々', suffix: '々', name: 'Warrior Soul', category: 'Gaming' },
  { prefix: '帝', suffix: '帝', name: 'Emperor Tag', category: 'Gaming' },
  { prefix: '꧁☬', suffix: '☬꧂', name: 'Epic Phoenix', category: 'Gaming' },
  { prefix: '༺♰༻ ', suffix: '', name: 'Vampire Slayer', category: 'Gaming' },
  { prefix: '×͜× ', suffix: '', name: 'Ghost Smile', category: 'Gaming' },
  { prefix: '⚔️ ', suffix: ' ⚔️', name: 'Duelist', category: 'Gaming' },
  { prefix: '⚡ ', suffix: ' ⚡', name: 'High Volt', category: 'Gaming' },
  { prefix: '☢️ ', suffix: ' ☢️', name: 'Toxic Zone', category: 'Gaming' },
  { prefix: '⫷ ', suffix: ' ⫸', name: 'Chevrons', category: 'Gaming' },
  { prefix: '╾━╤デ╦︻ ', suffix: '', name: 'Sniper', category: 'Gaming' },

  // --- Cute / Social ---
  { prefix: '❤ ', suffix: ' ❤', name: 'Heart Beat', category: 'Cute' },
  { prefix: '✿ ', suffix: ' ✿', name: 'Flower Bud', category: 'Cute' },
  { prefix: '❀ ', suffix: ' ❀', name: 'Cherry Blossom', category: 'Cute' },
  { prefix: '✧ ', suffix: ' ✧', name: 'Sparkle Star', category: 'Cute' },
  { prefix: '✦ ', suffix: ' ✦', name: 'Diamond Star', category: 'Cute' },
  { prefix: '❁ ', suffix: ' ❁', name: 'Petal', category: 'Cute' },
  { prefix: '☾ ', suffix: ' ☽', name: 'Moon Orbit', category: 'Cute' },
  { prefix: '☁️ ', suffix: ' ☁️', name: 'Cloudy', category: 'Cute' },
  { prefix: '☕ ', suffix: ' ☕', name: 'Cozy Cafe', category: 'Cute' },
  { prefix: '🧸 ', suffix: ' 🧸', name: 'Teddy Hug', category: 'Cute' },
  { prefix: '🍡 ', suffix: ' 🍡', name: 'Sweet Dango', category: 'Cute' },
  { prefix: '☘️ ', suffix: ' ☘️', name: 'Lucky Clover', category: 'Cute' },
  { prefix: 'ʚ ', suffix: ' ɞ', name: 'Angel Wings', category: 'Cute' },
  { prefix: '꒰ ', suffix: ' ꒱', name: 'Hug Bracket', category: 'Cute' },

  // --- Royal / Luxury ---
  { prefix: '♛ ', suffix: ' ♛', name: 'Golden Crown', category: 'Royal' },
  { prefix: '♕ ', suffix: ' ♕', name: 'Silver Queen', category: 'Royal' },
  { prefix: '♚ ', suffix: ' ♚', name: 'Dark Knight', category: 'Royal' },
  { prefix: '♔ ', suffix: ' ♔', name: 'Light Knight', category: 'Royal' },
  { prefix: '💎 ', suffix: ' 💎', name: 'Diamond Frame', category: 'Royal' },
  { prefix: '⚜️ ', suffix: ' ⚜️', name: 'Fleur-de-lis', category: 'Royal' },
  { prefix: '🔱 ', suffix: ' 🔱', name: 'Poseidon', category: 'Royal' },
  { prefix: '⚖️ ', suffix: ' ⚖️', name: 'Justice', category: 'Royal' },
  { prefix: '🏛️ ', suffix: ' 🏛️', name: 'Pantheon', category: 'Royal' },
  { prefix: '📜 ', suffix: ' 📜', name: 'Old Scroll', category: 'Royal' },

  // --- Fantasy / Magical ---
  { prefix: '༻ ', suffix: ' ༺', name: 'Mythic Wings', category: 'Fantasy' },
  { prefix: 'ꕥ ', suffix: ' ꕥ', name: 'Enchanted Bloom', category: 'Fantasy' },
  { prefix: '⚕️ ', suffix: ' ⚕️', name: 'Alchemist', category: 'Fantasy' },
  { prefix: '♾️ ', suffix: ' ♾️', name: 'Infinity Rune', category: 'Fantasy' },
  { prefix: '🧿 ', suffix: ' 🧿', name: 'Evil Eye', category: 'Fantasy' },
  { prefix: '🛸 ', suffix: ' 🛸', name: 'Cosmos', category: 'Fantasy' },
  { prefix: '🐉 ', suffix: ' 🐉', name: 'Dragon Nest', category: 'Fantasy' },
  { prefix: '🔮 ', suffix: ' 🔮', name: 'Crystal Ball', category: 'Fantasy' },

  // --- Cyber / Glitch ---
  { prefix: '[ ', suffix: ' ]', name: 'Code Block', category: 'Cyber' },
  { prefix: '< ', suffix: ' />', name: 'Tag Component', category: 'Cyber' },
  { prefix: '0x', suffix: '', name: 'Hex Address', category: 'Cyber' },
  { prefix: '█▓▒░ ', suffix: ' ░▒▓█', name: 'Matrix Bar', category: 'Cyber' },
  { prefix: '👾 ', suffix: ' 👾', name: 'Retro Invader', category: 'Cyber' },
  { prefix: '⚙️ ', suffix: ' ⚙️', name: 'System Gear', category: 'Cyber' },
  { prefix: '🔋 ', suffix: ' 🔋', name: 'Full Charge', category: 'Cyber' },
  { prefix: '🔌 ', suffix: ' 🔌', name: 'Plugged In', category: 'Cyber' },

  // --- Minimal ---
  { prefix: '• ', suffix: ' •', name: 'Bullet Point', category: 'Minimal' },
  { prefix: '─ ', suffix: ' ─', name: 'Thin Line', category: 'Minimal' },
  { prefix: '│ ', suffix: ' │', name: 'Vertical Line', category: 'Minimal' },
  { prefix: '· ', suffix: ' ·', name: 'Interpunct', category: 'Minimal' },
  { prefix: '† ', suffix: ' †', name: 'Dagger', category: 'Minimal' },
  { prefix: '‡ ', suffix: ' ‡', name: 'Double Dagger', category: 'Minimal' },
];

// Generate dynamic patterns to reach 300+
const generateExtendedStyles = (inputText: string) => {
  const styles: any[] = [];
  const baseTypes = ['bold', 'script', 'bubble', 'square', 'doubleStruck', 'fraktur', 'monospace', 'tiny', 'wide'];
  
  // 1. Apply all templates to raw input
  DECORATION_TEMPLATES.forEach((tmpl, i) => {
    styles.push({
      id: `tmpl-${i}`,
      name: tmpl.name,
      category: tmpl.category,
      styled: `${tmpl.prefix}${inputText}${tmpl.suffix}`
    });
  });

  // 2. Mix templates with base text styles (Bold, Script etc)
  DECORATION_TEMPLATES.forEach((tmpl, i) => {
    baseTypes.forEach((type, ti) => {
      // Stratify to keep performance reasonable (approx 300 styles total)
      if ((i + ti) % 4 === 0) {
        styles.push({
          id: `mix-${i}-${type}`,
          name: `${tmpl.name} ${type.charAt(0).toUpperCase() + type.slice(1)}`,
          category: tmpl.category,
          styled: `${tmpl.prefix}${applyStyle(inputText, type)}${tmpl.suffix}`
        });
      }
    });
  });

  // 3. Frame Styles (Full borders)
  const frames = [
    { p: '✦══ ', s: ' ══✦', n: 'Light Frame' },
    { p: '✧════ ', s: ' ════✧', n: 'Fancy Rail' },
    { p: '┌──── ', s: ' ────┐', n: 'Box Top' },
    { p: '└──── ', s: ' ────┘', n: 'Box Bottom' },
    { p: '«═══ ', s: ' ═══»', n: 'Arrow Frame' },
    { p: '░▒▓ ', s: ' ▓▒░', n: 'Gradient Bar' },
    { p: '▂▃▅▆▇ ', s: ' ▇▆▅▃▂', n: 'Visualizer' },
    { p: '·.¸¸.·♩♪♫ ', s: ' ♫♪♩·.¸¸.·', n: 'Audio Wave' },
    { p: '↫↫↫ ', s: ' ↬↬↬', n: 'Swirl Path' },
  ];

  frames.forEach((f, idx) => {
    styles.push({
      id: `frame-${idx}`,
      name: f.n,
      category: 'Frames',
      styled: `${f.p}${inputText}${f.s}`
    });
  });

  return styles;
};

const CATEGORIES = ['All', 'Arabic', 'Gaming', 'Cute', 'Royal', 'Fantasy', 'Cyber', 'Minimal', 'Frames', 'Favorites'];

const FontStyles: React.FC = () => {
  const [inputText, setInputText] = useState('Marwan Tools');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState(30);

  // Mixer state
  const [mixerPrefix, setMixerPrefix] = useState('꧁');
  const [mixerSuffix, setMixerSuffix] = useState('꧂');
  const [mixerStyle, setMixerStyle] = useState('bold');

  useEffect(() => {
    const savedFavs = localStorage.getItem('font_favorites');
    const savedHistory = localStorage.getItem('font_history');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem('font_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('font_history', JSON.stringify(history));
  }, [history]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setHistory(prev => [text, ...prev.filter(h => h !== text)].slice(0, 10));
    setTimeout(() => setCopiedId(null), 2000);
  }, [history]);

  const allStyles = useMemo(() => {
    const generated = generateExtendedStyles(inputText);
    const filtered = generated.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            v.styled.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || 
                              (activeCategory === 'Favorites' ? favorites.includes(v.id) : v.category === activeCategory);
      return matchesSearch && matchesCategory;
    });
    return filtered;
  }, [inputText, searchTerm, activeCategory, favorites]);

  const mixedOutput = useMemo(() => {
    return `${mixerPrefix}${applyStyle(inputText, mixerStyle)}${mixerSuffix}`;
  }, [inputText, mixerPrefix, mixerSuffix, mixerStyle]);

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="text-center space-y-4 pt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] text-xs font-bold font-orbitron mb-4"
        >
          MARWAN TOOLS - V2.0 PREMIUM
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold">
          Ultimate <span className="text-cyan-400">Studio</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto flex items-center justify-center gap-2">
          <Languages size={18} className="text-[#6C63FF]" />
          250+ Premium Styles for English, Arabic, and Kurdish Sorani.
        </p>
      </section>

      {/* Mixer Section (Combine Two Styles) */}
      <div className="glass-card p-6 border-[#6C63FF]/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
          <Wand2 size={64} className="text-cyan-400" />
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <Wand2 className="text-cyan-400" size={20} />
          <h2 className="text-lg font-bold font-orbitron">Custom Mixer</h2>
          <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded uppercase">Experimental</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase font-orbitron">Prefix</label>
            <input 
              value={mixerPrefix}
              onChange={(e) => setMixerPrefix(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-center outline-none focus:border-cyan-500/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase font-orbitron">Text Style</label>
            <select 
              value={mixerStyle}
              onChange={(e) => setMixerStyle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-cyan-500/50 appearance-none"
            >
              <option value="none">Default</option>
              <option value="bold">Bold</option>
              <option value="script">Script</option>
              <option value="bubble">Bubble</option>
              <option value="square">Square</option>
              <option value="doubleStruck">Double Struck</option>
              <option value="fraktur">Fraktur</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase font-orbitron">Suffix</label>
            <input 
              value={mixerSuffix}
              onChange={(e) => setMixerSuffix(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-center outline-none focus:border-cyan-500/50"
            />
          </div>
          <div className="flex flex-col justify-end">
            <button
              onClick={() => handleCopy(mixedOutput, 'mixer')}
              className="w-full h-12 bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] rounded-lg text-black font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            >
              {copiedId === 'mixer' ? <Check size={18} /> : <Copy size={18} />}
              {copiedId === 'mixer' ? 'COPIED' : 'COPY MIX'}
            </button>
          </div>
        </div>
        
        <div className="mt-6 p-6 bg-black/40 rounded-xl border border-white/5 text-center">
           <div className="text-2xl font-medium text-white break-all">{mixedOutput}</div>
        </div>
      </div>

      {/* Main Controls */}
      <div className="glass-card p-6 md:p-8 border-white/10 sticky top-20 z-30 shadow-2xl space-y-6 bg-black/80 backdrop-blur-xl">
        <div className="relative group">
          <Type className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text"
            dir="auto"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your name or text..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-20 text-2xl font-medium outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-800 text-center"
          />
          {inputText && (
            <button 
              onClick={() => setInputText('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <Trash2 size={24} />
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 px-1">
            {CATEGORIES.map(cat => {
              const Icon = {
                'Arabic': Languages,
                'Gaming': Swords,
                'Cute': Heart,
                'Royal': Crown,
                'Fantasy': Sparkles,
                'Cyber': Binary,
                'Minimal': Zap,
                'Frames': Layout,
                'Favorites': Star,
                'All': Type
              }[cat] || Type;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setPageSize(30); // Reset pagination on category change
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-orbitron transition-all whitespace-nowrap ${
                    activeCategory === cat 
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <Icon size={14} fill={cat === 'Favorites' && activeCategory === 'Favorites' ? "currentColor" : "none"} />
                  {cat.toUpperCase()}
                </button>
              );
            })}
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search 250+ patterns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-5 text-sm outline-none focus:border-cyan-500/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid of Styles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {allStyles.slice(0, pageSize).map((style, idx) => {
            const isFav = favorites.includes(style.id);
            const isCopied = copiedId === style.id;
            
            return (
              <motion.div
                layout
                key={style.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: Math.min((idx % 30) * 0.01, 0.3) }}
                className="glass-card p-6 border-white/5 hover:border-cyan-500/40 transition-all group relative overflow-hidden flex flex-col justify-between h-56"
              >
                {/* Background Glow Effect */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6C63FF]/5 blur-[60px] group-hover:bg-[#6C63FF]/10 transition-colors" />

                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-orbitron text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                       {style.name}
                    </span>
                    <span className="text-[9px] text-[#6C63FF] font-bold uppercase">{style.category}</span>
                  </div>
                  <button 
                    onClick={() => toggleFavorite(style.id)}
                    className={`p-2 rounded-lg transition-all ${isFav ? 'bg-amber-400/10 text-amber-400' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                  >
                    <Star size={18} fill={isFav ? "currentColor" : "none"} />
                  </button>
                </div>

                <div 
                  dir="auto"
                  className="text-xl font-medium break-words line-clamp-2 text-white my-4 text-center leading-relaxed"
                >
                  {style.styled || <span className="text-gray-900 italic">Enter text...</span>}
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => handleCopy(style.styled, style.id)}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                      isCopied 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/10' 
                      : 'bg-white/5 text-gray-300 hover:bg-[#6C63FF] hover:text-white border border-white/10 hover:neon-glow-purple'
                    }`}
                  >
                    {isCopied ? (
                      <><Check size={16} /> COPIED TO CLIPBOARD</>
                    ) : (
                      <><Copy size={16} /> CLICK TO COPY STYLE</>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination / Load More */}
      {allStyles.length > pageSize && (
        <div className="flex justify-center pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPageSize(prev => prev + 30)}
            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold font-orbitron hover:bg-white/10 transition-colors"
          >
            LOAD MORE STYLES <ChevronDown size={20} />
          </motion.button>
        </div>
      )}

      {allStyles.length === 0 && (
        <div className="text-center py-32 opacity-30">
          <div className="text-8xl mb-6">🏜️</div>
          <p className="font-orbitron text-xl">NO STYLES MATCH YOUR SEARCH</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
            className="mt-4 text-cyan-400 underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* History & Favorites Floating Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-black font-bold shadow-2xl cursor-pointer"
          onClick={() => {
            const randomPhrases = [
              'Marwan Tools', 'Kurdish Sniper', 'زخرفة عربية', 'بەرنامەی فۆنت', 
              'Neon Knight', 'Legendary Clan', 'Golden Emperor', 'Cute Pixie',
              'Cyber Ghost', 'Royal Queen', 'Shadow Warrior', 'Marwan Style'
            ];
            setInputText(randomPhrases[Math.floor(Math.random() * randomPhrases.length)]);
          }}
        >
          <Shuffle size={18} />
          <span className="hidden sm:inline">RANDOMIZE TEXT</span>
        </motion.div>

        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 flex items-center gap-4 text-xs font-bold text-gray-400"
          >
            <HistoryIcon size={16} />
            <div className="flex gap-2 max-w-[200px] overflow-hidden whitespace-nowrap mask-fade-right">
              {history.map((h, i) => (
                <button 
                  key={i} 
                  onClick={() => navigator.clipboard.writeText(h)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {h.slice(0, 10)}...
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative Particle Background Effect (Specific for this page) */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C63FF]/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00E5FF]/20 rounded-full blur-[150px]" />
      </div>
    </div>
  );
};

export default FontStyles;
