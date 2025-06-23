// import { Measurement, Child, AIInsight } from '../types';
import {  Child, AIInsight } from '../types';

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getStunting(height: number, ageInMonths: number, gender: 'male' | 'female'): 'normal' | 'moderate' | 'severe' {
  // Simplified WHO Z-score calculation for stunting
  // In production, this would use proper WHO growth standards tables
  const expectedHeight = gender === 'male' ? 
    (ageInMonths * 0.65 + 50) :
    (ageInMonths * 0.63 + 49); 
  
  const zScore = (height - expectedHeight) / (expectedHeight * 0.15);
  
  if (zScore >= -2) return 'normal';
  if (zScore >= -3) return 'moderate';
  return 'severe';
}

export function getWasting(weight: number, height: number): 'normal' | 'moderate' | 'severe' {
  const bmi = calculateBMI(weight, height);
  // Simplified wasting classification based on BMI-for-age
  if (bmi >= 18.5) return 'normal';
  if (bmi >= 16) return 'moderate';
  return 'severe';
}

export function getAcuteMUAC(muac: number, ageInMonths: number): 'normal' | 'moderate' | 'severe' {
  // MUAC classification for children 6-60 months
  if (ageInMonths < 6 || ageInMonths > 60) return 'normal';
  
  if (muac >= 12.5) return 'normal';
  if (muac >= 11.5) return 'moderate';
  return 'severe';
}

export function calculateAgeInMonths(dateOfBirth: string): number {
  const birth = new Date(dateOfBirth);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - birth.getTime());
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
  return diffMonths;
}

export function getOverallRiskLevel(child: Child): 'normal' | 'moderate' | 'severe' {
  if (!child.lastMeasurement) return 'normal';
  
  const ageInMonths = calculateAgeInMonths(child.dateOfBirth);
  const stunting = getStunting(child.lastMeasurement.height, ageInMonths, child.gender);
  const wasting = getWasting(child.lastMeasurement.weight, child.lastMeasurement.height);
  const muacClass = getAcuteMUAC(child.lastMeasurement.muac, ageInMonths);
  
  if (stunting === 'severe' || wasting === 'severe' || muacClass === 'severe') {
    return 'severe';
  }
  if (stunting === 'moderate' || wasting === 'moderate' || muacClass === 'moderate') {
    return 'moderate';
  }
  return 'normal';
}

export function getAiInsight(child: Child): AIInsight[] {
  if (!child.lastMeasurement) return [];
  
  const insights: AIInsight[] = [];
  const ageInMonths = calculateAgeInMonths(child.dateOfBirth);
  const measurement = child.lastMeasurement;
  
  const stunting = getStunting(measurement.height, ageInMonths, child.gender);
  const wasting = getWasting(measurement.weight, measurement.height);
  const muacClass = getAcuteMUAC(measurement.muac, ageInMonths);
  
  // Stunting insight
  if (stunting !== 'normal') {
    insights.push({
      childId: child.id,
      type: 'alert',
      severity: stunting === 'severe' ? 'critical' : 'warning',
      title: `${stunting === 'severe' ? 'Severe' : 'Moderate'} Stunting Detected`,
      description: `${child.name} shows signs of ${stunting} stunting, indicating chronic malnutrition.`,
      recommendations: [
        'Increase nutrient-dense foods in daily meals',
        'Ensure regular medical check-ups',
        'Consider iron and vitamin supplementation',
        'Monitor growth progress monthly'
      ],
      generatedAt: new Date().toISOString()
    });
  }
  
  // Wasting insight
  if (wasting !== 'normal') {
    insights.push({
      childId: child.id,
      type: 'alert',
      severity: wasting === 'severe' ? 'critical' : 'warning',
      title: `${wasting === 'severe' ? 'Severe' : 'Moderate'} Wasting Detected`,
      description: `${child.name} shows signs of acute malnutrition requiring immediate attention.`,
      recommendations: [
        'Increase caloric intake immediately',
        'Provide therapeutic feeding if available',
        'Seek immediate medical consultation',
        'Monitor weight gain weekly'
      ],
      generatedAt: new Date().toISOString()
    });
  }
  
  // MUAC insight
  if (muacClass !== 'normal') {
    insights.push({
      childId: child.id,
      type: 'alert',
      severity: muacClass === 'severe' ? 'critical' : 'warning',
      title: `MUAC Indicates ${muacClass === 'severe' ? 'Severe' : 'Moderate'} Malnutrition`,
      description: `${child.name}'s mid-upper arm circumference suggests acute malnutrition.`,
      recommendations: [
        'Urgent nutritional intervention required',
        'Visit health center immediately',
        'Start ready-to-use therapeutic food (RUTF)',
        'Daily monitoring recommended'
      ],
      generatedAt: new Date().toISOString()
    });
  }
  
  // Positive growth insight
  if (stunting === 'normal' && wasting === 'normal' && muacClass === 'normal') {
    insights.push({
      childId: child.id,
      type: 'growth',
      severity: 'info',
      title: 'Healthy Growth Progress',
      description: `${child.name} is showing healthy growth patterns. Keep up the excellent care!`,
      recommendations: [
        'Continue current feeding practices',
        'Maintain regular health check-ups',
        'Ensure diverse, nutritious meals',
        'Monitor development milestones'
      ],
      generatedAt: new Date().toISOString()
    });
  }
  
  return insights;
}

export function generateNutritionTip(): string {
  const tips = [
    "Include iron-rich foods like beans, spinach, and meat in your child's diet to prevent anemia.",
    "Breastfeeding is recommended for the first 6 months and should continue alongside solid foods.",
    "Vitamin A-rich foods like sweet potatoes and carrots support healthy vision and immune system.",
    "Ensure your child drinks clean, safe water to prevent waterborne diseases.",
    "Small, frequent meals help children get adequate nutrition throughout the day.",
    "Zinc-rich foods like eggs and fish support growth and wound healing.",
    "Encourage handwashing before meals to prevent infections that affect nutrition.",
    "Seasonal fruits provide essential vitamins - include local varieties in meals.",
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
}