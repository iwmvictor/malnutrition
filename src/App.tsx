import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './components/LandingPage';
import { RegistrationForm } from './components/RegistrationForm';
import { ParentDashboard } from './components/ParentDashboard';
import { HealthAdvisorDashboard } from './components/HealthAdvisorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Navbar } from './components/Navbar';
import { Parent, User } from './types';
import { 
  mockUser, 
  mockChildren, 
  mockNotifications, 
  mockHealthAdvisor,
  mockCellAdmin,
  mockSectorAdmin,
  mockDistrictAdmin,
  mockProvinceAdmin,
  mockMinistryAdmin
} from './utils/mockData';
import { getOverallRiskLevel } from './utils/aiInsights';

type AppView = 'landing' | 'registration' | 'dashboard';

function AppContent() {
  const { state, dispatch } = useApp();
  const [currentView, setCurrentView] = useState<AppView>('landing');

  useEffect(() => {
    // Apply theme to document
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  useEffect(() => {
    // Set initial view based on authentication state
    if (state.isAuthenticated) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('landing');
    }
  }, [state.isAuthenticated]);

  const handleGetStarted = () => {
    setCurrentView('registration');
  };

  const handleRegistrationComplete = (parent: Parent) => {
    // Create user from parent data
    const user: User = {
      id: parent.id,
      firstName: parent.firstName,
      lastName: parent.lastName,
      email: parent.email,
      role: 'parent',
      address: parent.address,
    };

    // Update children with calculated risk levels
    const childrenWithRisk = parent.children.map(child => ({
      ...child,
      riskLevel: getOverallRiskLevel(child),
    }));

    // Set app state
    dispatch({ type: 'SET_USER', payload: user });
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
    dispatch({ type: 'SET_CURRENT_PARENT', payload: parent });
    dispatch({ type: 'SET_CHILDREN', payload: childrenWithRisk });
    dispatch({ type: 'SET_NOTIFICATIONS', payload: mockNotifications });
    
    setCurrentView('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  // Mock login functions for different roles
  const handleMockLogin = (userType: string) => {
    let user: User;
    let children = [];
    let notifications = mockNotifications;

    switch (userType) {
      case 'parent':
        user = mockUser;
        children = mockChildren;
        break;
      case 'health_advisor':
        user = mockHealthAdvisor;
        break;
      case 'cell_admin':
        user = mockCellAdmin;
        break;
      case 'sector_admin':
        user = mockSectorAdmin;
        break;
      case 'district_admin':
        user = mockDistrictAdmin;
        break;
      case 'province_admin':
        user = mockProvinceAdmin;
        break;
      case 'ministry_admin':
        user = mockMinistryAdmin;
        break;
      default:
        user = mockUser;
        children = mockChildren;
    }

    dispatch({ type: 'SET_USER', payload: user });
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
    dispatch({ type: 'SET_CHILDREN', payload: children });
    dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
    setCurrentView('dashboard');
  };

  const renderDashboard = () => {
    if (!state.user) return null;

    switch (state.user.role) {
      case 'parent':
        return <ParentDashboard />;
      case 'health_advisor':
        return <HealthAdvisorDashboard />;
      case 'cell_admin':
        return <AdminDashboard adminLevel="cell" />;
      case 'sector_admin':
        return <AdminDashboard adminLevel="sector" />;
      case 'district_admin':
        return <AdminDashboard adminLevel="district" />;
      case 'province_admin':
        return <AdminDashboard adminLevel="province" />;
      case 'ministry_admin':
        return <AdminDashboard adminLevel="ministry" />;
      default:
        return <ParentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Show navbar only when authenticated */}
      {state.isAuthenticated && <Navbar />}
      
      {/* Main content */}
      {currentView === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      
      {currentView === 'registration' && (
        <RegistrationForm
          onComplete={handleRegistrationComplete}
          onBack={handleBackToLanding}
        />
      )}
      
      {currentView === 'dashboard' && state.isAuthenticated && renderDashboard()}

      {/* Demo Login Buttons (for development) */}
      {!state.isAuthenticated && currentView === 'landing' && (
        <div className="fixed bottom-4 right-4 space-y-2">
          <div className="bg-gray-800 rounded-lg p-4 space-y-2 opacity-75 hover:opacity-100 transition-opacity">
            <p className="text-white text-xs font-medium mb-2">Demo Logins:</p>
            <button
              onClick={() => handleMockLogin('parent')}
              className="block w-full px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
            >
              Parent
            </button>
            <button
              onClick={() => handleMockLogin('health_advisor')}
              className="block w-full px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
            >
              Health Advisor
            </button>
            <button
              onClick={() => handleMockLogin('cell_admin')}
              className="block w-full px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
            >
              Cell Admin
            </button>
            <button
              onClick={() => handleMockLogin('sector_admin')}
              className="block w-full px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition-colors"
            >
              Sector Admin
            </button>
            <button
              onClick={() => handleMockLogin('district_admin')}
              className="block w-full px-3 py-1 bg-pink-600 text-white text-xs rounded hover:bg-pink-700 transition-colors"
            >
              District Admin
            </button>
            <button
              onClick={() => handleMockLogin('province_admin')}
              className="block w-full px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
            >
              Province Admin
            </button>
            <button
              onClick={() => handleMockLogin('ministry_admin')}
              className="block w-full px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
            >
              Ministry Admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;