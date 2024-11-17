import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WebsiteBuilder from './pages/WebsiteBuilder';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/website-builder" element={<WebsiteBuilder />} />
    </Routes>
  );
};

export default App;
