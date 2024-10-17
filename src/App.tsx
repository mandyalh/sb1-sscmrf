import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import ContentCalendar from './components/ContentCalendar';
import Analytics from './components/Analytics';
import Sidebar from './components/Sidebar';
import Auth from './components/Auth';
import ContentAnalysis from './components/ContentAnalysis';
import SocialMediaIntegration from './components/SocialMediaIntegration';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import ContentScheduler from './components/ContentScheduler';
import Settings from './components/Settings';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 overflow-x-hidden overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/calendar" element={<ContentCalendar />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/content-analysis" element={<ContentAnalysis />} />
                    <Route path="/integrations" element={<SocialMediaIntegration />} />
                    <Route path="/advanced-analytics" element={<AdvancedAnalytics />} />
                    <Route path="/scheduler" element={<ContentScheduler />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;