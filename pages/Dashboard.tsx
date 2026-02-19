
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HistoryItem } from '../types';
import { getHistory, clearHistory, exportHistoryCSV } from '../utils/storage';
import { Download, Trash2, Clock, Search, ExternalLink } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    if (confirm('Clear all analysis history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const filteredHistory = history.filter(item => 
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-orbitron">Analytics Vault</h1>
          <p className="text-gray-400">Review and manage your local analysis session data.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => exportHistoryCSV(history)}
            disabled={history.length === 0}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <Download size={18} /> Export CSV
          </button>
          <button 
            onClick={handleClear}
            disabled={history.length === 0}
            className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-red-500/20 transition-colors disabled:opacity-50"
          >
            <Trash2 size={18} /> Clear Session
          </button>
        </div>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:border-cyan-500/50 transition-all text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 text-xs font-orbitron uppercase">
                <th className="px-4 py-3 font-normal">Date</th>
                <th className="px-4 py-3 font-normal">Primary Email</th>
                <th className="px-4 py-3 font-normal">Username</th>
                <th className="px-4 py-3 font-normal">Variations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredHistory.map((item) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-4 text-xs text-gray-500 flex items-center gap-2">
                      <Clock size={12} />
                      {new Date(item.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 font-mono text-sm text-cyan-400">
                      {item.email}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300">
                      {item.username}
                    </td>
                    <td className="px-4 py-4 font-bold text-white">
                      {item.totalVariations.toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredHistory.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <div className="text-4xl mb-4">📭</div>
              No records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
