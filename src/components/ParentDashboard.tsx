import React, { useState } from 'react';
import { Plus, TrendingUp, Users, AlertCircle, Heart, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/tools/translations';
import { ChildCard } from './ChildCard';
import { Child, IUser } from '../types';
import { generateNutritionTip, getOverallRiskLevel } from '../utils/tools/aiInsights';

interface ParentDashboardProps {
  user: IUser
}
export function ParentDashboard({user} : ParentDashboardProps) {
  const { state } = useApp();
  const { t } = useTranslation(state.language);
  const [showAddMeasurement, setShowAddMeasurement] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  const children = state.children;
  const nutritionTip = generateNutritionTip();

  // Calculate statistics
  const totalChildren = children.length;
  const normalChildren = children.filter(child => getOverallRiskLevel(child) === 'normal').length;
  const atRiskChildren = children.filter(child => ['moderate', 'severe'].includes(getOverallRiskLevel(child))).length;

  const handleAddMeasurement = (child: Child) => {
    setSelectedChild(child);
    setShowAddMeasurement(true);
  };

  const handleViewDetails = (child: Child) => {
    // Navigate to child details page
    console.log('View details for', child.name);
  };

  const stats = [
    {
      label: 'Total Children',
      value: totalChildren,
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300',
    },
    {
      label: 'Healthy Growth',
      value: normalChildren,
      icon: <Heart className="w-6 h-6" />,
      color: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
    },
    {
      label: 'Need Attention',
      value: atRiskChildren,
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300',
    },
    {
      label: 'Growth Target',
      value: '98%',
      icon: <Target className="w-6 h-6" />,
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {state.user?.firstName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your children's nutrition and get AI-powered insights for healthy growth.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Nutrition Tip */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-6 mb-8 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('nutritionTip')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "{nutritionTip}"
              </p>
            </div>
          </div>
        </div>

        {/* Children Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('myChildren')} ({children.length})
          </h2>
          <button className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Child</span>
          </button>
        </div>

        {children.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No children registered yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start tracking your child's nutrition by adding their information and measurements.
            </p>
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Add Your First Child</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {children.map((child) => (
              <ChildCard
                key={child.id}
                child={child}
                onAddMeasurement={handleAddMeasurement}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Measurement Modal - Placeholder */}
      {showAddMeasurement && selectedChild && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Measurement for {selectedChild.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This feature will allow you to add new measurements for your child.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddMeasurement(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save measurement logic here
                  setShowAddMeasurement(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}