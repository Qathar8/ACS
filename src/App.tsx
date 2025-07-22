import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PlayerManagement from './pages/PlayerManagement';
import TrainingManagement from './pages/TrainingManagement';
import MatchManagement from './pages/MatchManagement';
import Analytics from './pages/Analytics';
import MedicalRecords from './pages/MedicalRecords';
import FeesPayments from './pages/FeesPayments';
import StaffManagement from './pages/StaffManagement';
import ScoutingTrials from './pages/ScoutingTrials';
import MediaGallery from './pages/MediaGallery';
import { UserProvider } from './context/UserContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/players" element={<PlayerManagement />} />
        <Route path="/training" element={<TrainingManagement />} />
        <Route path="/matches" element={<MatchManagement />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/medical" element={<MedicalRecords />} />
        <Route path="/fees" element={<FeesPayments />} />
        <Route path="/staff" element={<StaffManagement />} />
        <Route path="/scouting" element={<ScoutingTrials />} />
        <Route path="/media" element={<MediaGallery />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <Router>
            <AppContent />
          </Router>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;