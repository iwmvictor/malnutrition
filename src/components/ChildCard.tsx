import React, { useState } from 'react';
import { User, Calendar, Ruler, Weight, Activity, AlertTriangle, CheckCircle, Plus } from 'lucide-react';
import { Child } from '../types';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import { calculateAgeInMonths, getAiInsight, generateNutritionTip } from '../utils/aiInsights';
import { clsx } from 'clsx';

interface ChildCardProps {
  child: Child;
  onAddMeasurement: (child: Child) => void;
  onViewDetails: (child: Child) => void;
}

export function ChildCard({ child, onAddMeasurement, onViewDetails }: ChildCardProps) {
  const { state } = useApp();
  const { t } = useTranslation(state.language);
  const [showInsights, setShowInsights] = useState(false);

  const ageInMonths = calculateAgeInMonths(child.dateOfBirth);
  const ageInYears = Math.floor(ageInMonths / 12);
  const remainingMonths = ageInMonths % 12;
  const insights = getAiInsight(child);
  const nutritionTip = generateNutritionTip();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'normal':
        return 'text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'moderate':
        return 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'severe':
        return 'text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default:
        return 'text-gray-700 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'normal':
        return <CheckCircle className="w-4 h-4" />;
      case 'moderate':
      case 'severe':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {child.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {child.name}
              </h3>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>
                  {ageInYears > 0 ? `${ageInYears}y ` : ''}{remainingMonths}m • {child.gender}
                </span>
              </div>
            </div>
          </div>
          
          <div className={clsx(
            'inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium',
            getRiskColor(child.riskLevel)
          )}>
            {getRiskIcon(child.riskLevel)}
            <span>{t(child.riskLevel)}</span>
          </div>
        </div>
      </div>

      {/* Measurements */}
      {child.lastMeasurement && (
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Latest Measurements
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-1">
                <Ruler className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {child.lastMeasurement.height}cm
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Height</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-1">
                <Weight className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {child.lastMeasurement.weight}kg
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Weight</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-1">
                <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {child.lastMeasurement.muac}cm
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">MUAC</div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            AI Insights
          </h4>
          <button
            onClick={() => setShowInsights(!showInsights)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            {showInsights ? 'Hide' : 'Show'} Details
          </button>
        </div>
        
        {insights.length > 0 ? (
          <div className="space-y-2">
            <div className={clsx(
              'flex items-start space-x-2 p-3 rounded-lg text-sm',
              insights[0].severity === 'critical' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' :
              insights[0].severity === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' :
              'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
            )}>
              <div className="flex-shrink-0 mt-0.5">
                {insights[0].severity === 'critical' || insights[0].severity === 'warning' ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
              </div>
              <div>
                <p className="font-medium">{insights[0].title}</p>
                <p className="mt-1 opacity-90">{insights[0].description}</p>
              </div>
            </div>
            
            {showInsights && insights[0].recommendations && (
              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recommendations:
                </h5>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {insights[0].recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No specific insights at this time. Regular monitoring recommended.
          </p>
        )}
      </div>

      {/* Nutrition Tip */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('nutritionTip')}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
          "{nutritionTip}"
        </p>
      </div>

      {/* Actions */}
      <div className="p-6 flex space-x-3">
        <button
          onClick={() => onAddMeasurement(child)}
          className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addMeasurement')}</span>
        </button>
        <button
          onClick={() => onViewDetails(child)}
          className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <User className="w-4 h-4" />
          <span>{t('viewDetails')}</span>
        </button>
      </div>
    </div>
  );
}