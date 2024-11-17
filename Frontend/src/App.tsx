import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard'
import WebsiteBuilder from './pages/website-builder/website-builder';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/website-builder" element={<WebsiteBuilder />} />
    </Routes>
  );
};

export default App;
