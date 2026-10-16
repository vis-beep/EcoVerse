import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { FloatingCopilot } from './components/FloatingCopilot';

// Pages
import { HomePage } from './pages/HomePage';
import { WorkOrdersPage } from './pages/WorkOrdersPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { DashboardPage } from './pages/DashboardPage';
import { ReportsPage } from './pages/ReportsPage';
import { AdminReportingPage } from './pages/AdminReportingPage';
import { LoginPage } from './pages/LoginPage';
import { TracksOverviewPage } from './pages/TracksOverviewPage';
import { Track1SmartWastePage } from './pages/Track1SmartWastePage';
import { Track2SustainableCampusPage } from './pages/Track2SustainableCampusPage';
import { Track3EnergyOptimizationPage } from './pages/Track3EnergyOptimizationPage';
import { Track4GreenBuildingPage } from './pages/Track4GreenBuildingPage';
import { Track5CarbonIntelligencePage } from './pages/Track5CarbonIntelligencePage';
import { Track6SmartRecyclingPage } from './pages/Track6SmartRecyclingPage';
import { AboutPage } from './pages/AboutPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Helper component to redirect authenticated users to their role-appropriate home
const RoleBasedHome: React.FC = () => {
  const { currentRole } = useApp();
  if (currentRole === 'admin') {
    return <Navigate to="/admin-reporting" replace />;
  } else if (currentRole === 'maintenance') {
    return <Navigate to="/orders" replace />;
  }
  return <HomePage />;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, isDarkMode, syncStatus, syncMessage } = useApp();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If directly on /login route, display full-screen login portal
  if (location.pathname === '/login') {
    return <LoginPage />;
  }

  // If not authenticated, always display the Login portal first
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Prevent edits against the placeholder data while the shared records load.
  if (syncStatus === 'connecting') {
    return (
      <div role="status" className="min-h-screen flex items-center justify-center bg-slate-950 text-emerald-200 text-sm text-center px-6">
        Connecting to the shared EcoVerse workspace…
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-row font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Left Top-to-Bottom Vertical Dashboard Navigation */}
      <Sidebar 
        mobileOpen={mobileSidebarOpen} 
        setMobileOpen={setMobileSidebarOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopBar onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />
        
        {syncStatus !== 'live' && (
          <div role="status" className={`px-4 py-2 text-xs text-center border-b ${syncStatus === 'error' ? 'bg-red-950/80 text-red-200 border-red-700' : 'bg-amber-950/60 text-amber-200 border-amber-700/60'}`}>
            {syncMessage}
          </div>
        )}
        <main className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={isAuthenticated ? <RoleBasedHome /> : <LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Persona Segregated Primary Routes */}
            <Route path="/orders" element={<WorkOrdersPage />} />
            <Route path="/digital-twin" element={<DigitalTwinPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/admin-reporting" element={<AdminReportingPage />} />

            {/* Supplementary / Legacy Track Routes */}
            <Route path="/tracks" element={<TracksOverviewPage />} />
            <Route path="/tracks/smart-waste-management" element={<Track1SmartWastePage />} />
            <Route path="/tracks/sustainable-campus" element={<Track2SustainableCampusPage />} />
            <Route path="/tracks/energy-optimization" element={<Track3EnergyOptimizationPage />} />
            <Route path="/tracks/green-building" element={<Track4GreenBuildingPage />} />
            <Route path="/tracks/carbon-intelligence" element={<Track5CarbonIntelligencePage />} />
            <Route path="/tracks/smart-recycling" element={<Track6SmartRecyclingPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="*" element={<RoleBasedHome />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <FloatingCopilot />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
