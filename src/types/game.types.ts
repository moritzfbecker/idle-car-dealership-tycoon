/**
 * Core Game Type Definitions
 * Idle Car Dealership Tycoon
 */

export enum DepartmentType {
  PARKING_LOT = 'parkingLot',
  SHOWROOM = 'showroom',
  SERVICE_CENTER = 'serviceCenter',
  PARTS_SHOP = 'partsShop',
  FINANCE_OFFICE = 'financeOffice',
  DETAILING = 'detailing',
}

export enum CustomerType {
  BUDGET = 'budget',
  MIDRANGE = 'midrange',
  LUXURY = 'luxury',
  SERVICE = 'service',
  VIP = 'vip',
}

export enum StaffRole {
  SALES_REP = 'salesRep',
  MECHANIC = 'mechanic',
  SERVICE_ADVISOR = 'serviceAdvisor',
  FINANCE_MANAGER = 'financeManager',
  PARTS_SPECIALIST = 'partsSpecialist',
  DETAILER = 'detailer',
  PARKING_ATTENDANT = 'parkingAttendant',
}

export interface Department {
  id: DepartmentType;
  name: string;
  level: number;
  capacity: number;
  quality: number;
  isUnlocked: boolean;
  staff: Staff[];
  activeCustomers: Customer[];
  revenuePerSecond: number;
  totalRevenue: number;
}

export interface Customer {
  id: string;
  type: CustomerType;
  currentDepartment: DepartmentType | null;
  nextDepartment: DepartmentType | null;
  serviceTimeRemaining: number;
  revenue: number;
  satisfactionLevel: number;
  position: { x: number; y: number };
  path: DepartmentType[];
  pathIndex: number;
}

export interface Staff {
  id: string;
  role: StaffRole;
  departmentId: DepartmentType;
  efficiency: number;
  salary: number;
  level: number;
}

export interface EpicUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number; // in gems
  multiplier: number;
  affectedDepartment: DepartmentType | 'all';
  isPurchased: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'achievement';
  progress: number;
  target: number;
  reward: QuestReward;
  isCompleted: boolean;
  expiresAt?: number; // timestamp for daily quests
}

export interface QuestReward {
  cash?: number;
  gems?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: number; // gems
  isUnlocked: boolean;
}

export interface City {
  id: number;
  name: string;
  unlockCost: number;
  prestigeMultiplier: number;
  theme: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  notificationsEnabled: boolean;
  language: string;
}

export interface GameStatistics {
  totalEarningsAllTime: number;
  customersServedTotal: number;
  totalPlayTime: number; // in seconds
  departmentsUnlocked: number;
  highestCity: number;
  prestigeCount: number;
}
