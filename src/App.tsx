import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Casino from './pages/Casino';
import Slots from './pages/Slots';
import Promotions from './pages/Promotions';
import NotFound from './pages/NotFound';
import Account from './pages/Account';
import Registration from './pages/Registration';
import KYC from './pages/KYC';
import Wallet from './pages/Wallet';
import AgentManagement from './pages/AgentManagement';
import GameProviders from './pages/GameProviders';
import Reports from './pages/Reports';
import Bingo from './pages/Bingo';
import FAQ from './pages/FAQ';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgotPassword';
import Download from './pages/Download';
import Support from './pages/Support';
import Rewards from './pages/Rewards';

// New Affiliate Pages
import AffiliateProgram from './pages/AffiliateProgram';
import AffiliateRegistration from './pages/AffiliateRegistration';
import AffiliateDashboard from './pages/AffiliateDashboard';

// Admin Pages
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import GameManagement from './pages/GameManagement';
import PromotionsManagement from './pages/PromotionsManagement';
import ReportsAnalytics from './pages/ReportsAnalytics';
import SystemSettings from './pages/SystemSettings';
import AppearanceManagement from './pages/AppearanceManagement';
import ContentManagement from './pages/ContentManagement';
import CasinoGamesManagement from './pages/CasinoGamesManagement';
import SlotsManagement from './pages/SlotsManagement';
import PaymentSettings from './pages/PaymentSettings';
import TermsConditions from './pages/TermsConditions';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ConsentPopup from './components/ConsentPopup';
import SplashScreen from './components/SplashScreen';
import CardBackground from './components/CardBackground';

// Context
import { ConsentProvider, useConsent } from './contexts/ConsentContext';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import CasinoIcon from '@mui/icons-material/Casino';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonIcon from '@mui/icons-material/Person';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupIcon from '@mui/icons-material/Group';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import GetAppIcon from '@mui/icons-material/GetApp';
import ShareIcon from '@mui/icons-material/Share';

// Mobile Navigation Component
const MobileNav = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  
  const handleShare = () => {
    const title = 'Join MyCasino';
    const text = 'Join MyCasino and earn 50% commission on all players you refer! Start earning passive income today.';
    const url = window.location.origin + '?ref=' + Math.random().toString(36).substring(2, 10);
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      const shareText = encodeURIComponent(text + ' ' + url);
      
      // Try to detect mobile platforms for app-specific sharing
      const userAgent = navigator.userAgent.toLowerCase();
      
      if (userAgent.includes('android')) {
        // Android devices - primarily WhatsApp
        window.open(`https://wa.me/?text=${shareText}`, '_blank');
      } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        // iOS devices
        // Create a temporary input element to allow copying to clipboard
        const input = document.createElement('input');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        input.value = text + ' ' + url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        
        alert('Link copied to clipboard! Share it with your friends to earn 50% commission on all their deposits.');
      } else {
        // Desktop fallback
        window.open(`https://web.whatsapp.com/send?text=${shareText}`, '_blank');
      }
    }
  };
  
  return (
    <>
      <div className="mobile-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link to="/slots" className={location.pathname.includes('/slots') ? 'active' : ''}>
          <VideogameAssetIcon />
          <span>Slots</span>
        </Link>
        <Link to="/casino" className={location.pathname.includes('/casino') ? 'active' : ''}>
          <CasinoIcon />
          <span>Casino</span>
        </Link>
        <Link to="/download" className={location.pathname.includes('/download') ? 'active' : ''}>
          <GetAppIcon />
          <span>Download</span>
        </Link>
        <button onClick={handleShare} className="share-button">
          <ShareIcon />
          <span>Share</span>
        </button>
      </div>
    </>
  );
};

// Create a wrapper component for AgentManagement to hide its header when used in admin layout
const AdminAgentManagement = () => {
  return (
    <div className="admin-agent-management-wrapper">
      <AgentManagement />
    </div>
  );
};

// AppContent component to use the consent context
const AppContent = () => {
  const { showConsentPopup, setShowConsentPopup, setHasConsented } = useConsent();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  // Check if the current route is an auth page or admin page
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);
  const isAdminPage = location.pathname.startsWith('/admin');
  const isAffiliatePage = false; // Remove special handling for affiliate pages to show normal navigation

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProceed = () => {
    setHasConsented(true);
    setShowConsentPopup(false);
  };

  const handleExit = () => {
    // Redirect to another site or close the window
    window.location.href = 'https://www.google.com';
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // If splash screen is showing, only render that
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Don't render the standard layout for admin pages
  if (isAdminPage) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="appearance" element={<AppearanceManagement />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="games" element={<GameManagement />} />
          <Route path="casino" element={<CasinoGamesManagement />} />
          <Route path="slots" element={<SlotsManagement />} />
          <Route path="promotions" element={<PromotionsManagement />} />
          <Route path="payments" element={<PaymentSettings />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="agents" element={<AdminAgentManagement />} />
          <Route path="terms" element={<TermsConditions />} />
          <Route path="settings" element={<SystemSettings />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className="app-container">
      {!isAuthPage && !isAffiliatePage && <Header />}
      <div className={`content-container ${isAuthPage || isAffiliatePage ? 'auth-page' : ''}`}>
        {!isAuthPage && !isAffiliatePage && <Sidebar />}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/casino" element={<Casino />} />
            <Route path="/casino/:category" element={<Casino />} />
            <Route path="/slots" element={<Slots />} />
            <Route path="/bingo" element={<Bingo />} />
            <Route path="/poker" element={<NotFound />} />
            <Route path="/fishing" element={<NotFound />} />
            <Route path="/sport" element={<NotFound />} />
            <Route path="/specialty-game" element={<NotFound />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/account" element={<Account />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/kyc" element={<KYC />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/agent-management" element={<AgentManagement />} />
            <Route path="/game-providers" element={<GameProviders />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />} />
            <Route path="/download" element={<Download />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Affiliate Routes */}
            <Route path="/affiliate" element={<AffiliateProgram />} />
            <Route path="/affiliate/register" element={<AffiliateRegistration />} />
            <Route path="/affiliate/dashboard" element={<AffiliateDashboard />} />
            <Route path="/affiliate/forgot-password" element={<ForgotPassword />} />
            
            {/* Terms and Conditions Route */}
            <Route path="/terms" element={<TermsConditions />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      {!isAuthPage && !isAffiliatePage && <Footer />}
      {!isAuthPage && !isAffiliatePage && isMobile && <MobileNav />}
      
      {/* Consent Popup */}
      {showConsentPopup && (
        <ConsentPopup onProceed={handleProceed} onExit={handleExit} />
      )}
    </div>
  );
};

function App() {
  return (
    <ConsentProvider>
    <Router>
        <CardBackground />
        <AppContent />
      </Router>
      </ConsentProvider>
  );
}

export default App;
