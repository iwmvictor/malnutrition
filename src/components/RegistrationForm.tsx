import  { useState } from 'react';
import { ChevronLeft, ChevronRight, User, MapPin, Baby, Ruler, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import { rwandaLocations } from '../utils/mockData';
import { Parent, Child, Measurement, Address } from '../types';

interface RegistrationFormProps {
  onComplete: (parent: Parent) => void;
  onBack: () => void;
}

export function RegistrationForm({ onComplete, onBack }: RegistrationFormProps) {
  const { state } = useApp();
  const { t } = useTranslation(state.language);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [parentData, setParentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [addressData, setAddressData] = useState<Address>({
    province: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
  });

  const [childrenData, setChildrenData] = useState<Array<{
    name: string;
    dateOfBirth: string;
    gender: 'male' | 'female';
    height: string;
    weight: string;
    muac: string;
  }>>([{
    name: '',
    dateOfBirth: '',
    gender: 'male',
    height: '',
    weight: '',
    muac: '',
  }]);

  const steps = [
    { number: 1, title: t('parentInfo'), icon: <User className="w-5 h-5" /> },
    { number: 2, title: t('addressInfo'), icon: <MapPin className="w-5 h-5" /> },
    { number: 3, title: t('childrenInfo'), icon: <Baby className="w-5 h-5" /> },
    { number: 4, title: t('measurements'), icon: <Ruler className="w-5 h-5" /> },
    { number: 5, title: t('confirmation'), icon: <CheckCircle className="w-5 h-5" /> },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addChild = () => {
    setChildrenData([...childrenData, {
      name: '',
      dateOfBirth: '',
      gender: 'male',
      height: '',
      weight: '',
      muac: '',
    }]);
  };

  const removeChild = (index: number) => {
    if (childrenData.length > 1) {
      setChildrenData(childrenData.filter((_, i) => i !== index));
    }
  };

  const updateChild = (index: number, field: string, value: string) => {
    const updated = [...childrenData];
    updated[index] = { ...updated[index], [field]: value };
    setChildrenData(updated);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create parent object
    const children: Child[] = childrenData.map((childData, index) => {
      const measurement: Measurement = {
        id: `measurement-${index}`,
        childId: `child-${index}`,
        date: new Date().toISOString(),
        height: parseFloat(childData.height),
        weight: parseFloat(childData.weight),
        muac: parseFloat(childData.muac),
      };

      return {
        id: `child-${index}`,
        name: childData.name,
        dateOfBirth: childData.dateOfBirth,
        gender: childData.gender,
        measurements: [measurement],
        lastMeasurement: measurement,
        riskLevel: 'normal', // Will be calculated by AI
      };
    });

    const parent: Parent = {
      id: 'parent-1',
      firstName: parentData.firstName,
      lastName: parentData.lastName,
      email: parentData.email,
      phone: parentData.phone,
      address: addressData,
      children,
      registrationDate: new Date().toISOString(),
    };

    onComplete(parent);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return parentData.firstName && parentData.lastName && parentData.email && parentData.phone;
      case 2:
        return addressData.province && addressData.district && addressData.sector && addressData.cell && addressData.village;
      case 3:
        return childrenData.every(child => child.name && child.dateOfBirth);
      case 4:
        return childrenData.every(child => child.height && child.weight && child.muac);
      default:
        return true;
    }
  };

  const getAvailableDistricts = () => {
    return addressData.province ? Object.keys(rwandaLocations[addressData.province as keyof typeof rwandaLocations] || {}) : [];
  };

  const getAvailableSectors = () => {
    if (!addressData.province || !addressData.district) return [];
    const province = rwandaLocations[addressData.province as keyof typeof rwandaLocations];
    return province?.[addressData.district as keyof typeof province] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('registerTitle')}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Step {currentStep} of 5 - {steps[currentStep - 1].title}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.icon
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  currentStep > step.number
                    ? 'bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
          {/* Step 1: Parent Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Parent Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={parentData.firstName}
                    onChange={(e) => setParentData({...parentData, firstName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={parentData.lastName}
                    onChange={(e) => setParentData({...parentData, lastName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={parentData.email}
                    onChange={(e) => setParentData({...parentData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={parentData.phone}
                    onChange={(e) => setParentData({...parentData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="+250 788 123 456"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Address Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Address Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Province *
                  </label>
                  <select
                    value={addressData.province}
                    onChange={(e) => setAddressData({...addressData, province: e.target.value, district: '', sector: ''})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Province</option>
                    {Object.keys(rwandaLocations).map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    District *
                  </label>
                  <select
                    value={addressData.district}
                    onChange={(e) => setAddressData({...addressData, district: e.target.value, sector: ''})}
                    disabled={!addressData.province}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  >
                    <option value="">Select District</option>
                    {getAvailableDistricts().map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sector *
                  </label>
                  <select
                    value={addressData.sector}
                    onChange={(e) => setAddressData({...addressData, sector: e.target.value})}
                    disabled={!addressData.district}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  >
                    <option value="">Select Sector</option>
                    {getAvailableSectors().map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cell *
                  </label>
                  <input
                    type="text"
                    value={addressData.cell}
                    onChange={(e) => setAddressData({...addressData, cell: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your cell"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Village *
                  </label>
                  <input
                    type="text"
                    value={addressData.village}
                    onChange={(e) => setAddressData({...addressData, village: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your village"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Children Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Children Information
                </h3>
                <button
                  onClick={addChild}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Child
                </button>
              </div>
              
              {childrenData.map((child, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Child {index + 1}
                    </h4>
                    {childrenData.length > 1 && (
                      <button
                        onClick={() => removeChild(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={child.name}
                        onChange={(e) => updateChild(index, 'name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter child's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        value={child.dateOfBirth}
                        onChange={(e) => updateChild(index, 'dateOfBirth', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Gender *
                      </label>
                      <select
                        value={child.gender}
                        onChange={(e) => updateChild(index, 'gender', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Measurements */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Initial Measurements
              </h3>
              
              {childrenData.map((child, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {child.name || `Child ${index + 1}`}
                  </h4>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Height (cm) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={child.height}
                        onChange={(e) => updateChild(index, 'height', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="e.g., 95.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Weight (kg) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={child.weight}
                        onChange={(e) => updateChild(index, 'weight', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="e.g., 14.2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        MUAC (cm) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={child.muac}
                        onChange={(e) => updateChild(index, 'muac', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="e.g., 13.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Confirm Registration
              </h3>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Parent Information</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {parentData.firstName} {parentData.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{parentData.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{parentData.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Address:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {addressData.village}, {addressData.cell}, {addressData.sector}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Children ({childrenData.length})</h4>
                {childrenData.map((child, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-white font-medium">{child.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {child.dateOfBirth} • {child.gender}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Height: {child.height}cm • Weight: {child.weight}kg • MUAC: {child.muac}cm
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={currentStep === 1 ? onBack : handlePrevious}
              className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{currentStep === 1 ? 'Back to Home' : t('previous')}</span>
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>{t('next')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>{t('submit')}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}