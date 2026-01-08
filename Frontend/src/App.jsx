import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { setAuthFunction } from './api/client';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Navigation from './components/Navigation';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Clerk Publishable Key');
}

function AppLayout() {
  const { getToken } = useAuth();

  useEffect(() => {
    setAuthFunction(getToken);
  }, [getToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics/:code" element={<Analytics />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Router>
        <SignedOut>
          <LoginPage />
        </SignedOut>
        <SignedIn>
          <AppLayout />
        </SignedIn>
      </Router>
    </ClerkProvider>
  );
}

export default App;
