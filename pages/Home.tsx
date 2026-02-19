
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Type, Users, Quote, BookOpen, ArrowRight, Spade, Crown, Zap, Mail } from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
}> = ({ icon, title, description, link, color }) => (
  <Link to={link}>
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-card p-6 flex flex-col gap-4 border-white/10 hover:border-cyan-500/50 transition-colors group h-full relative overflow-hidden"
    >
      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${color} group-hover:bg-white/10 transition-colors`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold font-orbitron">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        {icon}
      </div>
    </motion.div>
  </Link>
);

const Home: React.FC = () => {
  return (
    <div className="space-y-20 pt-10">
      {/* Hero Section */}
      <section className="text-center space-y-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold font-orbitron mb-4"
        >
          ULTIMATE POKER & IDENTITY TOOLKIT
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-orbitron font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Ace Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#6C63FF]">
            Identity
          </span>
        </motion.h1>

        <motion.p 
          className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          The most powerful suite for Poker Nicknames, Unicode Styling, and Ghost Mail Analysis. 
          Full support for English, Arabic, and Kurdish Sorani scripts.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            to="/poker-styles" 
            className="w-full sm:w-auto px-10 py-4 rounded-xl poker-blue-header font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity neon-glow-cyan text-white text-lg"
          >
            Style My Name <ArrowRight size={20} />
          </Link>
          <Link 
            to="/analyzer" 
            className="w-full sm:w-auto px-10 py-4 rounded-xl glass-card border-white/20 font-bold hover:bg-white/5 transition-colors text-white text-lg"
          >
            Email Analyzer
          </Link>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Type />} 
          title="Name Styles" 
          description="300+ Font variations. Premium support for Kurdish & Arabic script decorations."
          link="/poker-styles"
          color="text-cyan-400"
        />
        <FeatureCard 
          icon={<Mail />} 
          title="Email Analyzer" 
          description="Analyze Gmail dot aliasing. Calculate total variations and track testing progress."
          link="/analyzer"
          color="text-[#6C63FF]"
        />
        <FeatureCard 
          icon={<Users />} 
          title="Nickname Gen" 
          description="Generate aggressive or pro poker nicknames like 'River Shark' instantly."
          link="/nickname-gen"
          color="text-purple-400"
        />
      </section>

      {/* Table Stats Section */}
      <section className="glass-card p-10 text-center border-white/5 relative overflow-hidden bg-gradient-to-br from-black to-[#0a0a20]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/5 blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6C63FF]/5 blur-[100px] -z-10" />
        
        <div className="flex items-center justify-center gap-3 mb-12">
            <Zap className="text-cyan-400 animate-pulse" />
            <h2 className="text-2xl font-bold font-orbitron uppercase tracking-widest">Global Utilities</h2>
            <Zap className="text-cyan-400 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-5xl font-bold text-white font-orbitron drop-shadow-lg">3+</div>
            <div className="text-gray-400 text-sm font-bold uppercase tracking-widest">Scripts Supported</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold text-cyan-400 font-orbitron drop-shadow-lg">1,000+</div>
            <div className="text-gray-400 text-sm font-bold uppercase tracking-widest">Patterns</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold text-purple-400 font-orbitron drop-shadow-lg">0.01s</div>
            <div className="text-gray-400 text-sm font-bold uppercase tracking-widest">Processing Time</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
