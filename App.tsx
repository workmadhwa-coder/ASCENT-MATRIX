
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Sponsorship from './pages/Sponsorship';
import Volunteer from './pages/Volunteer';
import Upcoming from './pages/Upcoming';
import Admin from './pages/Admin';
import PaymentPortal from './pages/PaymentPortal';
import Confirm from './pages/Confirm';
import Fail from './pages/Fail';
import Venue from './pages/Venue';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';

// Use namespace to resolve named export issues in the environment
const { Routes, Route } = ReactRouterDOM as any;

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<PaymentPortal />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/sponsorship" element={<Sponsorship />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/admin-info" element={<Admin />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>
    </Layout>
  );
};

export default App;
