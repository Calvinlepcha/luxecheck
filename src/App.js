import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Scan from './pages/Scan';
import Checklist from './pages/Checklist';
import Results from './pages/Results';
import Pricing from './pages/Pricing';
import Collection from './pages/Collection';

function App() {
  const location = useLocation();

  return (
    <Layout>
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/checklist/:brandId/:modelId" element={<Checklist />} />
          <Route path="/results" element={<Results />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
