
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PokerNameStyles from './pages/PokerNameStyles';
import NicknameGenerator from './pages/NicknameGenerator';
import StrategyQuotes from './pages/StrategyQuotes';
import PokerGuide from './pages/PokerGuide';
import Analyzer from './pages/Analyzer';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poker-styles" element={<PokerNameStyles />} />
          <Route path="/nickname-gen" element={<NicknameGenerator />} />
          <Route path="/strategy" element={<StrategyQuotes />} />
          <Route path="/guide" element={<PokerGuide />} />
          <Route path="/analyzer" element={<Analyzer />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
