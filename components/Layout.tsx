
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Users, Quote, BookOpen, Spade, Crown, ShieldAlert, Mail } from 'lucide-react';
import DotBackground from './DotBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/poker-styles', label: 'Styles', icon: <Type size={18} /> },
    { path: '/nickname-gen', label: 'Nicks', icon: <Users size={18} /> },
    { path: '/analyzer', label: 'Analyzer', icon: <Mail size={18} /> },
    { path: '/strategy', label: 'Strategy', icon: <Quote size={18} /> },
    { path: '/guide', label: 'Guide', icon: <BookOpen size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <DotBackground />
      
      {/* Blue Poker Header */}
      <nav className="sticky top-0 z-50 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between glass-card px-6 py-3 border-white/10 shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 poker-blue-header opacity-90 -z-10" />
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center shrink-0">
              <motion.div 
                whileHover={{ rotate: -10, x: -5 }}
                className="w-8 h-12 bg-white rounded-md border-2 border-gray-200 flex items-center justify-center shadow-lg transform -rotate-12 z-0"
              >
                <Spade className="text-black" size={20} />
              </motion.div>
              <motion.div 
                whileHover={{ rotate: 10, x: 5 }}
                className="w-8 h-12 bg-white rounded-md border-2 border-gray-200 flex items-center justify-center shadow-xl absolute left-3 z-10"
              >
                <Crown className="text-red-600" size={20} />
              </motion.div>
            </div>
            <span className="font-orbitron font-bold text-white text-lg ml-6 drop-shadow-md hidden sm:flex items-center">
              ACEUP P<Spade size={16} className="inline mx-[-2px] mb-[-2px]" />KER HUB
            </span>
          </Link>

          <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-xs font-bold whitespace-nowrap ${
                    isActive 
                      ? 'bg-white/20 text-white border border-white/30' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon}
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative z-10 px-4 py-8 max-w-6xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Poker Hub Footer */}
      <footer className="relative z-10 px-4 py-12 mt-12 border-t border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-amber-400/80 mb-4 text-sm font-bold font-orbitron">
            <ShieldAlert size={18} />
            RESPONSIBLE GAMING
          </div>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed mb-8">
            AceUp Poker Hub is for educational and entertainment purposes. 
            Analyze strategies, generate nicknames, and simulate email variations. Always gamble responsibly.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white/40 text-[10px] uppercase font-bold tracking-widest mb-10">
            <div className="flex items-center justify-center gap-1"><Spade size={10} /> KURDISH / SORANI</div>
            <div className="flex items-center justify-center gap-1 text-red-500/50"><Crown size={10} /> ARABIC SUPPORT</div>
            <div className="flex items-center justify-center gap-1"><Users size={10} /> TABLE NICKNAMES</div>
            <div className="flex items-center justify-center gap-1 text-cyan-400/50"><Mail size={10} /> GHOST MAIL</div>
          </div>
          <div className="text-gray-600 text-[9px] font-orbitron tracking-widest uppercase py-4 border-t border-white/5">
             © 2024 ACEUP POKER HUB • PREMIUM GAMING UTILITY • 07503213212
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
