
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, AlertTriangle, Layers, Zap } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-orbitron">Educational Guide</h1>
        <p className="text-gray-400">Master the logic of Google Workspace and Gmail email routing.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <Sparkles />
          </div>
          <h2 className="text-xl font-bold font-orbitron">What is Dot Aliasing?</h2>
          <p className="text-gray-400 leading-relaxed text-sm">
            Gmail ignores dots in usernames. For example, <span className="text-cyan-400 font-mono">john.doe@gmail.com</span> is 
            identical to <span className="text-cyan-400 font-mono">johndoe@gmail.com</span> and <span className="text-cyan-400 font-mono">j.o.h.n.d.o.e@gmail.com</span>.
          </p>
          <p className="text-gray-400 leading-relaxed text-sm">
            This allows users to create variations of their email address that all route to the same central inbox.
          </p>
        </div>

        <div className="glass-card p-8 border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Layers />
          </div>
          <h2 className="text-xl font-bold font-orbitron">Plus Addressing</h2>
          <p className="text-gray-400 leading-relaxed text-sm">
            Beyond dots, Gmail supports <span className="text-purple-400 font-mono">+tags</span>. 
            Anything after a plus sign is ignored in routing.
          </p>
          <p className="text-gray-400 leading-relaxed text-sm font-mono p-2 bg-white/5 rounded border border-white/10">
            username+news@gmail.com
          </p>
          <p className="text-gray-400 leading-relaxed text-sm italic">
            Note: This tool focuses specifically on the mathematical dot permutations within the username base.
          </p>
        </div>
      </div>

      <section className="glass-card p-10 border-white/10 space-y-8 bg-gradient-to-br from-black to-[#050505]">
        <h2 className="text-2xl font-bold font-orbitron border-b border-white/5 pb-4">Real-World Use Cases</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-[#6C63FF] font-bold flex items-center gap-2">
              <Zap size={18} /> Sorting
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Register for services with specific dot variations to automatically 
              filter incoming mail into dedicated folders using inbox rules.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-cyan-400 font-bold flex items-center gap-2">
              <Shield size={18} /> Privacy
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Identify which third-party services sell your data by using a unique 
              alias for every subscription or account you create.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-amber-400 font-bold flex items-center gap-2">
              <AlertTriangle size={18} /> Testing
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Software developers can test multi-account workflows, onboarding 
              emails, and notifications without needing multiple physical mailboxes.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center p-12 glass-card border-cyan-500/20 bg-cyan-500/5">
        <h2 className="text-xl font-bold font-orbitron mb-4">Important Security Note</h2>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
          While dots are ignored by Gmail routing, many external website systems treat dots 
          as distinct characters. This means <span className="text-white">user@gmail.com</span> and 
          <span className="text-white">u.ser@gmail.com</span> would likely be treated as two 
          entirely separate accounts on most websites. Always use aliases responsibly.
        </p>
      </section>
    </div>
  );
};

export default Education;
