import { useState } from "react";
import {
  ChevronDown,
  Star,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  Menu,
  X,
  Activity,
  Shield,
  Heart,
  BarChart3,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "../utils/tools/translations";
import { Language } from "../types";
import { useApp } from "../context/AppContext";

const LandingHome = () => {
  const { state, dispatch } = useApp();
  const { t } = useTranslation(state.language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "How does the malnutrition screening process work?",
      answer:
        "Our platform uses WHO-approved screening tools and anthropometric measurements. Healthcare workers input height, weight, MUAC measurements, and clinical observations. Our AI algorithms then assess malnutrition risk levels and provide immediate recommendations.",
    },
    {
      question:
        "Can the platform work in areas with limited internet connectivity?",
      answer:
        "Yes! Our platform is designed for offline functionality. Data can be collected offline and synchronized when internet connectivity is available. This ensures continuous monitoring even in remote areas.",
    },
    {
      question: "What types of reports and analytics are available?",
      answer:
        "The platform provides comprehensive dashboards showing malnutrition trends, recovery progress, intervention effectiveness, and population-level statistics. Reports can be customized for different stakeholders including healthcare providers, NGOs, and government agencies.",
    },
    {
      question: "How do you ensure data privacy and security?",
      answer:
        "We implement bank-level encryption, HIPAA-compliant data storage, and strict access controls. All personal health information is anonymized for reporting purposes, and we follow international data protection standards.",
    },
  ];

  const handleGetStarted = () => {
    window.location.href = "/auth/login";
  };
  const handleLanguageChange = (language: Language) => {
    dispatch({ type: "SET_LANGUAGE", payload: language });
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">BA</span>
                </div>
                <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                  Buzima App
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                <a
                  href="#home"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t("home")}
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t("about")}
                </a>
                <a
                  href="#features"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t("features")}
                </a>
                <a
                  href="#impact"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t("impact")}
                </a>
                <a
                  href="#faq"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t("faq")}
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t("contact")}
                </a>
              </div>

              <div className="hidden md:flex space-x-4">
                {/* <button className="text-blue-600 hover:text-blue-700 font-semibold">
                  Login
                </button> */}
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
                  {(["en", "rw", "fr"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        state.language === lang
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {lang === "en" ? "🇬🇧" : lang === "rw" ? "🇷🇼" : "🇫🇷"}{" "}
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>

                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={handleGetStarted}
                >
                  {t("getStarted")}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#home"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  About
                </a>
                <a
                  href="#features"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Features
                </a>
                <a
                  href="#impact"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Impact
                </a>
                <a
                  href="#faq"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  FAQ
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Contact
                </a>
                <div className="border-t pt-2 mt-2">
                  <button
                    className="block w-full text-left px-3 py-2 text-blue-600 font-semibold"
                    onClick={handleGetStarted}
                  >
                    Login
                  </button>
                  <button
                    className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-lg mx-3 mt-2"
                    onClick={handleGetStarted}
                  >
                    {t("getStarted")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <AlertTriangle size={16} />
                  <span>{t("fightingMalnutritionGlobally")}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Monitor, Track &{" "}
                  <span className="text-blue-600">Recover</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                  {t("heroDescription")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
                    onClick={handleGetStarted}
                  >
                    {t("getStarted")}
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors">
                    {t("watchDemo")}
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/6627374/pexels-photo-6627374.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    alt="Healthcare worker monitoring child nutrition"
                    className="w-full h-96 object-cover"
                  />
                </div>
                {/* Floating Stats Cards */}
                <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-green-600" size={20} />
                    <div>
                      <div className="text-sm text-gray-600">
                        {t("recoveryRate")}
                      </div>
                      <div className="font-bold text-green-600">94%</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
                  <div className="flex items-center space-x-2">
                    <Users className="text-blue-600" size={20} />
                    <div>
                      <div className="text-sm text-gray-600">
                        {t("childrenHelped")}
                      </div>
                      <div className="font-bold text-blue-600">50K+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Global Impact
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Working with healthcare organizations worldwide to combat
                malnutrition
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  50,000+
                </div>
                <div className="text-gray-600">Children Monitored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600">Healthcare Workers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  25
                </div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  94%
                </div>
                <div className="text-gray-600">Recovery Success</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Medical professional using tablet for patient monitoring"
                  className="rounded-3xl shadow-2xl w-full h-96 object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-600 mb-4">
                  ABOUT NUTRITRACK
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Transforming malnutrition care with technology
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  NutriTrack is a comprehensive digital platform designed to
                  address the global malnutrition crisis. We provide healthcare
                  workers, NGOs, and governments with powerful tools to screen,
                  monitor, and track recovery progress effectively.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-blue-600" size={20} />
                    <span className="text-gray-700">WHO Approved</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-blue-600" size={20} />
                    <span className="text-gray-700">Offline Capable</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-blue-600" size={20} />
                    <span className="text-gray-700">AI-Powered</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-blue-600" size={20} />
                    <span className="text-gray-700">
                      Secure & HIPAA Compliant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-sm font-semibold text-blue-600 mb-4">
                PLATFORM FEATURES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Comprehensive malnutrition management
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Everything you need to effectively screen, monitor, and support
                malnutrition recovery
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Activity className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Smart Screening
                </h3>
                <p className="text-gray-600">
                  WHO-approved screening protocols with automated risk
                  assessment and immediate intervention recommendations.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Real-time Analytics
                </h3>
                <p className="text-gray-600">
                  Comprehensive dashboards and reports showing malnutrition
                  trends, recovery progress, and intervention effectiveness.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Shield className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Secure Platform
                </h3>
                <p className="text-gray-600">
                  Bank-level encryption, HIPAA compliance, and secure data
                  storage with role-based access controls.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Users className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Multi-user Support
                </h3>
                <p className="text-gray-600">
                  Designed for healthcare teams, NGOs, and community health
                  workers with collaborative features.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Recovery Tracking
                </h3>
                <p className="text-gray-600">
                  Long-term monitoring with automated follow-up reminders and
                  progress tracking capabilities.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Clock className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Offline Functionality
                </h3>
                <p className="text-gray-600">
                  Works without internet connection, automatically syncing data
                  when connectivity is restored.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-sm font-semibold text-blue-200 mb-4">
                GLOBAL IMPACT
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Making a difference worldwide
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Our platform is helping organizations across the globe combat
                malnutrition more effectively
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Heart className="mx-auto mb-4 text-blue-200" size={48} />
                <h3 className="text-xl font-semibold mb-4">Early Detection</h3>
                <p className="text-blue-100">
                  Advanced screening algorithms help identify at-risk children
                  before severe malnutrition develops, enabling timely
                  interventions.
                </p>
              </div>
              <div className="text-center">
                <TrendingUp className="mx-auto mb-4 text-blue-200" size={48} />
                <h3 className="text-xl font-semibold mb-4">
                  Improved Outcomes
                </h3>
                <p className="text-blue-100">
                  Data-driven insights and personalized treatment plans have
                  increased recovery rates by 40% in pilot programs.
                </p>
              </div>
              <div className="text-center">
                <Users className="mx-auto mb-4 text-blue-200" size={48} />
                <h3 className="text-xl font-semibold mb-4">Empowered Teams</h3>
                <p className="text-blue-100">
                  Training and support tools help healthcare workers provide
                  better care with confidence and efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-sm font-semibold text-blue-600 mb-4">
                  SUCCESS STORY
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Transforming healthcare delivery
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  "NutriTrack has revolutionized how we approach malnutrition in
                  our region. The platform's ease of use and comprehensive
                  reporting have enabled us to identify at-risk children faster
                  and track their recovery more effectively. Our success rates
                  have improved dramatically."
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Dr. Sarah Johnson"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Dr. Sarah Johnson
                    </div>
                    <div className="text-gray-600">
                      Regional Health Director, East Africa
                    </div>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Healthcare team using tablets for patient care"
                  className="rounded-3xl shadow-2xl w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-sm font-semibold text-blue-600 mb-4">
                FAQ
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently asked questions
              </h2>
              <p className="text-gray-600 text-lg">
                Common questions about our malnutrition monitoring platform
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 mx-4 text-gray-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`text-gray-500 transition-transform ${
                        openFAQ === index ? "rotate-180" : ""
                      }`}
                      size={20}
                    />
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 ml-8">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform malnutrition care?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join healthcare organizations worldwide using NutriTrack to save
              lives and improve outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="text-blue-400" size={28} />
                  <span className="text-2xl font-bold">NutriTrack</span>
                </div>
                <p className="text-gray-400">
                  Empowering healthcare organizations to combat malnutrition
                  through innovative technology and data-driven solutions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#features"
                      className="hover:text-white transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      API Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Integration
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Training Materials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Research Papers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Support Center
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <div className="space-y-2 text-gray-400">
                  <p>support@nutritrack.org</p>
                  <p>+1 (555) 123-4567</p>
                  <p>Available 24/7 for critical support</p>
                  <div className="pt-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Emergency Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>
                &copy; 2025 NutriTrack. All rights reserved. | Privacy Policy |
                Terms of Service
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingHome;
