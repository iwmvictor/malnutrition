import { ReactElement } from "react";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface SidebarLinkProps {
  text: string;
  Icon: ReactElement;
  to: string;
}


export interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  measurements: Measurement[];
  riskLevel: 'normal' | 'moderate' | 'severe';
  lastMeasurement?: Measurement;
}

export interface Measurement {
  id: string;
  childId: string;
  date: string;
  height: number; // cm
  weight: number; // kg
  muac: number; // cm
  bmi?: number;
  zScoreHeight?: number;
  zScoreWeight?: number;
  stunting?: 'normal' | 'moderate' | 'severe';
  wasting?: 'normal' | 'moderate' | 'severe';
  muacClassification?: 'normal' | 'moderate' | 'severe';
}

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  children: Child[];
  registrationDate: string;
}

export interface Address {
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
}

export interface IUser {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  roles: string[];
  photo: string;
}

export type UserRole = 'parent' | 'health_advisor' | 'village_admin' | 'cell_admin' | 'sector_admin' | 'district_admin' | 'province_admin' | 'ministry_admin';

export type Language = 'en' | 'rw' | 'fr';

export type Theme = 'light' | 'dark';

export interface AIInsight {
  childId: string;
  type: 'growth' | 'nutrition' | 'alert' | 'recommendation';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  recommendations: string[];
  generatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'alert' | 'reminder' | 'update' | 'achievement';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  childId?: string;
}