import { Child, Parent, User, Notification, Measurement } from '../types';

export const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Uwimana Grace',
    dateOfBirth: '2020-03-15',
    gender: 'female',
    riskLevel: 'normal',
    measurements: [
      {
        id: '1',
        childId: '1',
        date: '2024-01-15',
        height: 95,
        weight: 14.2,
        muac: 13.5,
        bmi: 15.7,
        stunting: 'normal',
        wasting: 'normal',
        muacClassification: 'normal',
      },
    ],
    lastMeasurement: {
      id: '1',
      childId: '1',
      date: '2024-01-15',
      height: 95,
      weight: 14.2,
      muac: 13.5,
      bmi: 15.7,
      stunting: 'normal',
      wasting: 'normal',
      muacClassification: 'normal',
    },
  },
  {
    id: '2',
    name: 'Mugabo Eric',
    dateOfBirth: '2019-08-22',
    gender: 'male',
    riskLevel: 'moderate',
    measurements: [
      {
        id: '2',
        childId: '2',
        date: '2024-01-15',
        height: 89,
        weight: 11.8,
        muac: 12.2,
        bmi: 14.9,
        stunting: 'moderate',
        wasting: 'normal',
        muacClassification: 'moderate',
      },
    ],
    lastMeasurement: {
      id: '2',
      childId: '2',
      date: '2024-01-15',
      height: 89,
      weight: 11.8,
      muac: 12.2,
      bmi: 14.9,
      stunting: 'moderate',
      wasting: 'normal',
      muacClassification: 'moderate',
    },
  },
];

export const mockParent: Parent = {
  id: '1',
  firstName: 'Jean',
  lastName: 'Nkurunziza',
  email: 'jean.nkurunziza@example.com',
  phone: '+250788123456',
  address: {
    province: 'Eastern Province',
    district: 'Nyagatare',
    sector: 'Karangazi',
    cell: 'Kinyababa',
    village: 'Rugarama',
  },
  children: mockChildren,
  registrationDate: '2024-01-01',
};

export const mockUser: User = {
  id: '1',
  firstName: 'Jean',
  lastName: 'Nkurunziza',
  email: 'jean.nkurunziza@example.com',
  role: 'parent',
  address: {
    province: 'Eastern Province',
    district: 'Nyagatare',
    sector: 'Karangazi',
    cell: 'Kinyababa',
    village: 'Rugarama',
  },
};

// Mock users for different roles
export const mockHealthAdvisor: User = {
  id: '2',
  firstName: 'Marie',
  lastName: 'Uwimana',
  email: 'marie.uwimana@health.gov.rw',
  role: 'health_advisor',
  assignedArea: {
    province: 'Eastern Province',
    district: 'Nyagatare',
    sector: 'Karangazi',
    cell: 'Kinyababa',
    village: 'Rugarama',
  },
};

export const mockCellAdmin: User = {
  id: '3',
  firstName: 'Paul',
  lastName: 'Kagame',
  email: 'paul.kagame@admin.gov.rw',
  role: 'cell_admin',
  assignedArea: {
    province: 'Eastern Province',
    district: 'Nyagatare',
    sector: 'Karangazi',
    cell: 'Kinyababa',
    village: '',
  },
};

export const mockSectorAdmin: User = {
  id: '4',
  firstName: 'Grace',
  lastName: 'Mukamana',
  email: 'grace.mukamana@admin.gov.rw',
  role: 'sector_admin',
  assignedArea: {
    province: 'Eastern Province',
    district: 'Nyagatare',
    sector: 'Karangazi',
    cell: '',
    village: '',
  },
};

export const mockDistrictAdmin: User = {
  id: '5',
  firstName: 'Emmanuel',
  lastName: 'Gasana',
  email: 'emmanuel.gasana@admin.gov.rw',
  role: 'district_admin',
  assignedArea: {
    province: 'Eastern Province',
    district: 'Nyagatare',
    sector: '',
    cell: '',
    village: '',
  },
};

export const mockProvinceAdmin: User = {
  id: '6',
  firstName: 'Jeanne',
  lastName: 'Mukamugema',
  email: 'jeanne.mukamugema@admin.gov.rw',
  role: 'province_admin',
  assignedArea: {
    province: 'Eastern Province',
    district: '',
    sector: '',
    cell: '',
    village: '',
  },
};

export const mockMinistryAdmin: User = {
  id: '7',
  firstName: 'Daniel',
  lastName: 'Ngamije',
  email: 'daniel.ngamije@minisante.gov.rw',
  role: 'ministry_admin',
  assignedArea: {
    province: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
  },
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'alert',
    title: 'Measurement Reminder',
    message: 'Time to measure Mugabo Eric\'s growth progress',
    read: false,
    createdAt: '2024-01-15T10:00:00Z',
    childId: '2',
  },
  {
    id: '2',
    userId: '1',
    type: 'achievement',
    title: 'Growth Milestone',
    message: 'Uwimana Grace has reached a healthy weight milestone!',
    read: false,
    createdAt: '2024-01-14T15:30:00Z',
    childId: '1',
  },
];

export const rwandaLocations = {
  'Kigali City': {
    'Gasabo': ['Bumbogo', 'Gatsata', 'Jali', 'Gikomero', 'Gisozi', 'Jabana', 'Kinyinya', 'Ndera', 'Nduba', 'Rusororo', 'Rutunga', 'Kacyiru', 'Kimihurura', 'Kimisagara', 'Remera'],
    'Kicukiro': ['Gahanga', 'Gatenga', 'Gikondo', 'Kagarama', 'Kanombe', 'Kicukiro', 'Kigarama', 'Masaka', 'Niboye', 'Nyarugunga'],
    'Nyarugenge': ['Gitega', 'Kanyinya', 'Kigali', 'Kimisagara', 'Mageragere', 'Muhima', 'Nyakabanda', 'Nyamirambo', 'Nyarugenge', 'Rwezamenyo']
  },
  'Eastern Province': {
    'Bugesera': ['Gashora', 'Juru', 'Kamabuye', 'Ntarama', 'Nyamata', 'Nyarugenge', 'Rilima', 'Ruhuha', 'Rweru', 'Shyara'],
    'Gatsibo': ['Gasange', 'Gatsibo', 'Gitoki', 'Kageyo', 'Kiramuruzi', 'Kiziguro', 'Muhura', 'Murambi', 'Ngarama', 'Nyagihanga', 'Remera', 'Rugarama', 'Rwimbogo'],
    'Nyagatare': ['Gatunda', 'Karangazi', 'Katabagemu', 'Kiyombe', 'Matimba', 'Mimuri', 'Mukama', 'Musheli', 'Nyagatare', 'Rukomo', 'Rwempasha', 'Rwimiyaga', 'Tabagwe']
  },
  'Western Province': {
    'Karongi': ['Bwishyura', 'Gashari', 'Gishyita', 'Gisovu', 'Gitesi', 'Mukungu', 'Murundi', 'Mutuntu', 'Rubengera', 'Rugabano', 'Ruganda', 'Rwankuba', 'Twumba'],
    'Nyabihu': ['Bigogwe', 'Jenda', 'Jomba', 'Kabatwa', 'Karago', 'Kintobo', 'Mukamira', 'Muringa', 'Rambura', 'Rugera', 'Rurembo', 'Shyira'],
    'Rubavu': ['Bugeshi', 'Busasamana', 'Cyanzarwe', 'Gisenyi', 'Kanama', 'Kanzenze', 'Mudende', 'Nyakiliba', 'Nyamyumba', 'Rubavu', 'Rugerero']
  },
  'Northern Province': {
    'Gicumbi': ['Bukure', 'Bwisige', 'Byumba', 'Cyumba', 'Gicumbi', 'Kaniga', 'Kanyinya', 'Manyagiro', 'Miyove', 'Mukarange', 'Mutete', 'Nyamiyaga', 'Nyankenke', 'Rubaya', 'Rukomo', 'Rushaki', 'Rutare', 'Rwerere', 'Shangasha'],
    'Musanze': ['Busogo', 'Cyuve', 'Gacaca', 'Gashaki', 'Gataraga', 'Kimonyi', 'Kinigi', 'Muhoza', 'Muko', 'Musanze', 'Nkotsi', 'Nyange', 'Remera', 'Rwaza', 'Shingiro'],
    'Rulindo': ['Base', 'Burega', 'Bushoki', 'Buyoga', 'Cyinzuzi', 'Cyungo', 'Kinihira', 'Kisaro', 'Mbogo', 'Murambi', 'Ngoma', 'Ntarabana', 'Rukozo', 'Rusiga', 'Shyorongi', 'Tumba']
  },
  'Southern Province': {
    'Gisagara': ['Gikonko', 'Gishubi', 'Kansi', 'Kibirizi', 'Kigembe', 'Muganza', 'Mukindo', 'Ndora', 'Nyanza', 'Save'],
    'Huye': ['Gishamvu', 'Karama', 'Kigoma', 'Kinazi', 'Maraba', 'Mbazi', 'Mukura', 'Ngoma', 'Ruhashya', 'Tumba', 'Rusatira', 'Rwaniro', 'Simbi', 'Huye'],
    'Nyamagabe': ['Buruhukiro', 'Cyanika', 'Gasaka', 'Gatare', 'Kaduha', 'Kamegeri', 'Kibirizi', 'Kibumbwe', 'Kitabi', 'Mbazi', 'Mugano', 'Musange', 'Musebeya', 'Nkomane', 'Tare', 'Uwinkingi']
  }
};

// Mock data for different administrative levels
export const mockAreaData = {
  families: {
    cell: 45,
    sector: 234,
    district: 1456,
    province: 8934,
    ministry: 45678,
  },
  children: {
    cell: 89,
    sector: 467,
    district: 2890,
    province: 17845,
    ministry: 91234,
  },
  healthAdvisors: {
    cell: 2,
    sector: 12,
    district: 45,
    province: 234,
    ministry: 1234,
  },
};