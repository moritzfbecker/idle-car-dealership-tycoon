/**
 * Main Game Store (Zustand)
 * Idle Car Dealership Tycoon
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Department,
  DepartmentType,
  Customer,
  Staff,
  EpicUpgrade,
  Quest,
  Achievement,
  GameSettings,
  GameStatistics,
} from '@types/game.types';
import {
  INITIAL_CASH,
  INITIAL_GEMS,
  STORAGE_KEY_GAME_STATE,
} from '@utils/constants';

interface GameState {
  // Player Resources
  cash: number;
  gems: number;

  // Current City / Prestige
  currentCity: number;
  prestigeMultiplier: number;

  // Departments
  departments: Record<DepartmentType, Department>;

  // Customers
  activeCustomers: Customer[];

  // Staff
  staff: Staff[];

  // Progression
  unlockedDepartments: DepartmentType[];
  epicUpgrades: EpicUpgrade[];

  // Quests & Achievements
  quests: Quest[];
  achievements: Achievement[];

  // Statistics
  statistics: GameStatistics;

  // Meta
  lastPlayTime: number;
  gameStartTime: number;

  // Settings
  settings: GameSettings;

  // Actions
  addCash: (amount: number) => void;
  spendCash: (amount: number) => boolean;
  addGems: (amount: number) => void;
  spendGems: (amount: number) => boolean;

  upgradeDepartment: (deptId: DepartmentType, upgradeType: string) => void;
  unlockDepartment: (deptId: DepartmentType) => void;

  hireStaff: (deptId: DepartmentType, staffRole: string) => void;
  removeStaff: (staffId: string) => void;

  addCustomer: (customer: Customer) => void;
  removeCustomer: (customerId: string) => void;
  updateCustomer: (customerId: string, updates: Partial<Customer>) => void;

  purchaseEpicUpgrade: (upgradeId: string) => boolean;

  prestige: (newCityId: number) => void;

  completeQuest: (questId: string) => void;
  unlockAchievement: (achievementId: string) => void;

  updateStatistics: (updates: Partial<GameStatistics>) => void;
  updateSettings: (updates: Partial<GameSettings>) => void;

  tick: (deltaTime: number) => void;

  resetGame: () => void;
}

// Initial department state
function createInitialDepartments(): Record<DepartmentType, Department> {
  return {
    [DepartmentType.PARKING_LOT]: {
      id: DepartmentType.PARKING_LOT,
      name: 'Parking Lot',
      level: 1,
      capacity: 10,
      quality: 1,
      isUnlocked: true,
      staff: [],
      activeCustomers: [],
      revenuePerSecond: 0,
      totalRevenue: 0,
    },
    [DepartmentType.SHOWROOM]: {
      id: DepartmentType.SHOWROOM,
      name: 'Showroom',
      level: 1,
      capacity: 3,
      quality: 1,
      isUnlocked: true,
      staff: [],
      activeCustomers: [],
      revenuePerSecond: 0,
      totalRevenue: 0,
    },
    [DepartmentType.SERVICE_CENTER]: {
      id: DepartmentType.SERVICE_CENTER,
      name: 'Service Center',
      level: 0,
      capacity: 0,
      quality: 0,
      isUnlocked: false,
      staff: [],
      activeCustomers: [],
      revenuePerSecond: 0,
      totalRevenue: 0,
    },
    [DepartmentType.PARTS_SHOP]: {
      id: DepartmentType.PARTS_SHOP,
      name: 'Parts & Accessories',
      level: 0,
      capacity: 0,
      quality: 0,
      isUnlocked: false,
      staff: [],
      activeCustomers: [],
      revenuePerSecond: 0,
      totalRevenue: 0,
    },
    [DepartmentType.FINANCE_OFFICE]: {
      id: DepartmentType.FINANCE_OFFICE,
      name: 'Finance Office',
      level: 1,
      capacity: 1,
      quality: 1,
      isUnlocked: true,
      staff: [],
      activeCustomers: [],
      revenuePerSecond: 0,
      totalRevenue: 0,
    },
    [DepartmentType.DETAILING]: {
      id: DepartmentType.DETAILING,
      name: 'Detailing',
      level: 0,
      capacity: 0,
      quality: 0,
      isUnlocked: false,
      staff: [],
      activeCustomers: [],
      revenuePerSecond: 0,
      totalRevenue: 0,
    },
  };
}

// Initial state
const initialState = {
  cash: INITIAL_CASH,
  gems: INITIAL_GEMS,
  currentCity: 1,
  prestigeMultiplier: 1,
  departments: createInitialDepartments(),
  activeCustomers: [],
  staff: [],
  unlockedDepartments: [
    DepartmentType.PARKING_LOT,
    DepartmentType.SHOWROOM,
    DepartmentType.FINANCE_OFFICE,
  ],
  epicUpgrades: [],
  quests: [],
  achievements: [],
  statistics: {
    totalEarningsAllTime: 0,
    customersServedTotal: 0,
    totalPlayTime: 0,
    departmentsUnlocked: 3,
    highestCity: 1,
    prestigeCount: 0,
  },
  lastPlayTime: Date.now(),
  gameStartTime: Date.now(),
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    notificationsEnabled: true,
    language: 'en',
  },
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Cash Actions
      addCash: (amount: number) => {
        set((state) => ({
          cash: state.cash + amount,
          statistics: {
            ...state.statistics,
            totalEarningsAllTime: state.statistics.totalEarningsAllTime + amount,
          },
        }));
      },

      spendCash: (amount: number) => {
        const state = get();
        if (state.cash >= amount) {
          set({ cash: state.cash - amount });
          return true;
        }
        return false;
      },

      // Gems Actions
      addGems: (amount: number) => {
        set((state) => ({
          gems: state.gems + amount,
        }));
      },

      spendGems: (amount: number) => {
        const state = get();
        if (state.gems >= amount) {
          set({ gems: state.gems - amount });
          return true;
        }
        return false;
      },

      // Department Actions
      upgradeDepartment: (deptId: DepartmentType, upgradeType: string) => {
        // Implementation will be added in department manager
        console.log(`Upgrading ${deptId} - ${upgradeType}`);
      },

      unlockDepartment: (deptId: DepartmentType) => {
        set((state) => ({
          departments: {
            ...state.departments,
            [deptId]: {
              ...state.departments[deptId],
              isUnlocked: true,
              level: 1,
              capacity: 1,
              quality: 1,
            },
          },
          unlockedDepartments: [...state.unlockedDepartments, deptId],
          statistics: {
            ...state.statistics,
            departmentsUnlocked: state.statistics.departmentsUnlocked + 1,
          },
        }));
      },

      // Staff Actions
      hireStaff: (deptId: DepartmentType, staffRole: string) => {
        console.log(`Hiring ${staffRole} for ${deptId}`);
      },

      removeStaff: (staffId: string) => {
        set((state) => ({
          staff: state.staff.filter((s) => s.id !== staffId),
        }));
      },

      // Customer Actions
      addCustomer: (customer: Customer) => {
        set((state) => ({
          activeCustomers: [...state.activeCustomers, customer],
        }));
      },

      removeCustomer: (customerId: string) => {
        set((state) => ({
          activeCustomers: state.activeCustomers.filter((c) => c.id !== customerId),
          statistics: {
            ...state.statistics,
            customersServedTotal: state.statistics.customersServedTotal + 1,
          },
        }));
      },

      updateCustomer: (customerId: string, updates: Partial<Customer>) => {
        set((state) => ({
          activeCustomers: state.activeCustomers.map((c) =>
            c.id === customerId ? { ...c, ...updates } : c
          ),
        }));
      },

      // Epic Upgrades
      purchaseEpicUpgrade: (upgradeId: string) => {
        const state = get();
        const upgrade = state.epicUpgrades.find((u) => u.id === upgradeId);

        if (upgrade && !upgrade.isPurchased && state.gems >= upgrade.cost) {
          set({
            gems: state.gems - upgrade.cost,
            epicUpgrades: state.epicUpgrades.map((u) =>
              u.id === upgradeId ? { ...u, isPurchased: true } : u
            ),
          });
          return true;
        }
        return false;
      },

      // Prestige
      prestige: (newCityId: number) => {
        const state = get();
        set({
          currentCity: newCityId,
          prestigeMultiplier: Math.pow(2, newCityId - 1),
          departments: createInitialDepartments(),
          activeCustomers: [],
          staff: [],
          cash: INITIAL_CASH,
          statistics: {
            ...state.statistics,
            highestCity: Math.max(state.statistics.highestCity, newCityId),
            prestigeCount: state.statistics.prestigeCount + 1,
          },
        });
      },

      // Quests & Achievements
      completeQuest: (questId: string) => {
        set((state) => ({
          quests: state.quests.map((q) =>
            q.id === questId ? { ...q, isCompleted: true } : q
          ),
        }));
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === achievementId ? { ...a, isUnlocked: true } : a
          ),
        }));
      },

      // Statistics & Settings
      updateStatistics: (updates: Partial<GameStatistics>) => {
        set((state) => ({
          statistics: { ...state.statistics, ...updates },
        }));
      },

      updateSettings: (updates: Partial<GameSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },

      // Game Loop
      tick: (deltaTime: number) => {
        set((state) => ({
          statistics: {
            ...state.statistics,
            totalPlayTime: state.statistics.totalPlayTime + deltaTime,
          },
        }));
      },

      // Reset
      resetGame: () => {
        set(initialState);
      },
    }),
    {
      name: STORAGE_KEY_GAME_STATE,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
