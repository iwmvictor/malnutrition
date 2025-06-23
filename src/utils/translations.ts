import { Language } from '../types';

export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    children: 'Children',
    insights: 'AI Insights',
    profile: 'Profile',
    logout: 'Logout',
    
    // Landing Page
    welcomeTitle: 'Because every child deserves better nutrition',
    welcomeSubtitle: 'AI-powered malnutrition tracking and prevention for healthier communities across Rwanda',
    startTracking: 'Start Tracking Your Child',
    trustedBy: 'Trusted by',
    learnMore: 'Learn More',
    
    // Registration
    registerTitle: 'Register Your Family',
    parentInfo: 'Parent Information',
    addressInfo: 'Address Information',
    childrenInfo: 'Children Information',
    measurements: 'Initial Measurements',
    confirmation: 'Confirmation',
    
    // Dashboard
    myChildren: 'My Children',
    addMeasurement: 'Add Measurement',
    viewDetails: 'View Details',
    aiInsights: 'AI Insights',
    nutritionTip: 'Daily Nutrition Tip',
    
    // Risk Levels
    normal: 'Normal',
    moderate: 'Moderate Risk',
    severe: 'Severe Risk',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    loading: 'Loading...',
  },
  rw: {
    // Navigation
    dashboard: 'Imbonerahamwe',
    children: 'Abana',
    insights: 'Ubwenge bwa AI',
    profile: 'Umwirondoro',
    logout: 'Gusohoka',
    
    // Landing Page
    welcomeTitle: 'Kuko buri mwana akwiriye imirire myiza',
    welcomeSubtitle: 'Gukurikirana no kurinda imirire mibi mu bana binyuze mu bwenge bwa AI',
    startTracking: 'Tangira Gukurikirana Umwana Wawe',
    trustedBy: 'Bikemezwa na',
    learnMore: 'Menya Byinshi',
    
    // Registration
    registerTitle: 'Andikisha Umuryango Wawe',
    parentInfo: 'Amakuru y\'Ababyeyi',
    addressInfo: 'Amakuru y\'Aderesi',
    childrenInfo: 'Amakuru y\'Abana',
    measurements: 'Ibipimo by\'Itangiriro',
    confirmation: 'Kwemeza',
    
    // Dashboard
    myChildren: 'Abana Banjye',
    addMeasurement: 'Ongeraho Igipimo',
    viewDetails: 'Reba Amakuru Arambuye',
    aiInsights: 'Ubwenge bwa AI',
    nutritionTip: 'Inama z\'Imirire ya Buri Munsi',
    
    // Risk Levels
    normal: 'Bisanzwe',
    moderate: 'Akaga Gafise',
    severe: 'Akaga Gakomeye',
    
    // Common
    save: 'Bika',
    cancel: 'Kuraho',
    next: 'Komeza',
    previous: 'Subira',
    submit: 'Ohereza',
    loading: 'Biragendanwa...',
  },
  fr: {
    // Navigation
    dashboard: 'Tableau de bord',
    children: 'Enfants',
    insights: 'Informations IA',
    profile: 'Profil',
    logout: 'Déconnexion',
    
    // Landing Page
    welcomeTitle: 'Parce que chaque enfant mérite une meilleure nutrition',
    welcomeSubtitle: 'Suivi et prévention de la malnutrition alimenté par l\'IA pour des communautés plus saines au Rwanda',
    startTracking: 'Commencer le Suivi de Votre Enfant',
    trustedBy: 'Approuvé par',
    learnMore: 'En Savoir Plus',
    
    // Registration
    registerTitle: 'Enregistrer Votre Famille',
    parentInfo: 'Informations des Parents',
    addressInfo: 'Informations d\'Adresse',
    childrenInfo: 'Informations des Enfants',
    measurements: 'Mesures Initiales',
    confirmation: 'Confirmation',
    
    // Dashboard
    myChildren: 'Mes Enfants',
    addMeasurement: 'Ajouter une Mesure',
    viewDetails: 'Voir les Détails',
    aiInsights: 'Informations IA',
    nutritionTip: 'Conseil Nutritionnel Quotidien',
    
    // Risk Levels
    normal: 'Normal',
    moderate: 'Risque Modéré',
    severe: 'Risque Sévère',
    
    // Common
    save: 'Enregistrer',
    cancel: 'Annuler',
    next: 'Suivant',
    previous: 'Précédent',
    submit: 'Soumettre',
    loading: 'Chargement...',
  },
};

export function useTranslation(language: Language) {
  return {
    t: (key: string): string => {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      return value || key;
    },
  };
}