import { Globe, ArrowRight, Shield, Users, TrendingUp, Award, LucideMoon, LucideSun } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/tools/translations';
import { Language } from '../types';
import { useEffect } from 'react';

export function LandingPage() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation(state.language);

  const handleGetStarted = () => {
    window.location.href = '/auth/login';
  };
  const handleLanguageChange = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const handleThemeToggle = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'AI-Powered Insights',
      description: 'Advanced algorithms analyze growth patterns and provide personalized nutrition recommendations.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Multi-Role Platform',
      description: 'Designed for parents, health advisors, and administrators across all administrative levels.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Private',
      description: 'Your family\'s health data is protected with enterprise-grade security.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Multilingual Support',
      description: 'Available in English, Kinyarwanda, and French to serve all communities.',
    },
  ];

  const trustedPartners = [
    'Ministry of Health',
    'WHO Rwanda',
    'University of Rwanda',
    'UNICEF Rwanda',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">BA</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                Buzima App
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
                {(['en', 'rw', 'fr'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      state.language === lang
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? '🇬🇧' : lang === 'rw' ? '🇷🇼' : '🇫🇷'} {lang.toUpperCase()}
                  </button>
                ))}
              </div>
              
              {/* Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {state.theme === 'light' ? <LucideMoon/> : <LucideSun/>}
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {t('welcomeTitle')}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              {t('welcomeSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <span className="text-lg">{t('startTracking')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="text-lg">{t('learnMore')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              {t('trustedBy')}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
              {trustedPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-center">
                    <Award className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {partner}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Health Intelligence
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with local healthcare expertise to provide 
              comprehensive malnutrition tracking and prevention.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 hover:transform hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-2xl mb-6">
                  <div className="text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BA</span>
              </div>
              <span className="ml-2 text-xl font-bold text-white">
                Buzima App
              </span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2025 Buzima App. Empowering healthier communities through technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}