import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Scan from './pages/Scan';
import Checklist from './pages/Checklist';
import Results from './pages/Results';
import Pricing from './pages/Pricing';
import Collection from './pages/Collection';
import FakeOfTheDay from './pages/FakeOfTheDay';
import Challenge from './pages/Challenge';
import ExpertTips from './pages/ExpertTips';
import TipArticle from './pages/TipArticle';
import Community from './pages/Community';
import CommunityPost from './pages/CommunityPost';
import CreatePost from './pages/CreatePost';
import PaymentSuccess from './pages/PaymentSuccess';
import CustomCursor from './components/CustomCursor';
import LoadingSplash from './components/LoadingSplash';
import Chatbot from './components/Chatbot';

function App() {
  const location = useLocation();

  return (
    <Layout>
      <CustomCursor />
      <LoadingSplash />
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/daily" element={<FakeOfTheDay />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/checklist/:brandId/:modelId" element={<Checklist />} />
          <Route path="/results" element={<Results />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/tips" element={<ExpertTips />} />
          <Route path="/tips/:tipId" element={<TipArticle />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/post" element={<CreatePost />} />
          <Route path="/community/:postId" element={<CommunityPost />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </div>
      <Chatbot />
    </Layout>
  );
}

export default App;
