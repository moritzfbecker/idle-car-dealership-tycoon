/**
 * Game Calculations
 * Core formulas for the game economy and progression
 */

import { UPGRADE_COST_GROWTH_RATE, BASE_STAFF_EFFICIENCY } from './constants';
import { Department, Customer, CustomerType } from '@types/game.types';

/**
 * Calculate upgrade cost using exponential growth
 * @param baseCost - Base cost at level 0
 * @param currentLevel - Current level
 * @param growthRate - Growth rate multiplier (default: 1.15)
 * @returns Cost for next level
 */
export function calculateUpgradeCost(
  baseCost: number,
  currentLevel: number,
  growthRate: number = UPGRADE_COST_GROWTH_RATE
): number {
  return Math.floor(baseCost * Math.pow(growthRate, currentLevel));
}

/**
 * Calculate staff hiring cost
 * @param baseCost - Base hiring cost
 * @param currentStaffCount - Number of staff already hired
 * @returns Cost to hire next staff member
 */
export function calculateStaffHireCost(
  baseCost: number,
  currentStaffCount: number
): number {
  return calculateUpgradeCost(baseCost, currentStaffCount, 1.25);
}

/**
 * Calculate department revenue per second
 * @param dept - Department data
 * @param prestigeMultiplier - Current prestige multiplier
 * @param epicMultipliers - Array of epic upgrade multipliers
 * @returns Revenue per second
 */
export function calculateDepartmentRevenue(
  dept: Department,
  prestigeMultiplier: number,
  epicMultipliers: number[] = []
): number {
  // Base revenue depends on department level and quality
  const baseRevenue = 10 * dept.level * (1 + dept.quality * 0.1);

  // Staff multiplier
  const staffMultiplier = dept.staff.reduce(
    (sum, staff) => sum + staff.efficiency,
    0
  ) || 1;

  // Epic upgrades multiplier
  const epicMultiplier = epicMultipliers.reduce((prod, mult) => prod * mult, 1);

  return baseRevenue * staffMultiplier * prestigeMultiplier * epicMultiplier;
}

/**
 * Calculate customer revenue based on type
 * @param type - Customer type
 * @param departmentQuality - Quality level of the department
 * @returns Revenue amount
 */
export function calculateCustomerRevenue(
  type: CustomerType,
  departmentQuality: number = 1
): number {
  const baseRevenues: Record<CustomerType, number> = {
    budget: 100,
    midrange: 500,
    luxury: 2500,
    service: 300,
    vip: 10000,
  };

  const baseRevenue = baseRevenues[type];
  const qualityMultiplier = 1 + departmentQuality * 0.1;

  return Math.floor(baseRevenue * qualityMultiplier);
}

/**
 * Calculate customer service time
 * @param type - Customer type
 * @param staffCount - Number of staff in department
 * @returns Service time in seconds
 */
export function calculateServiceTime(
  type: CustomerType,
  staffCount: number
): number {
  const baseTimes: Record<CustomerType, number> = {
    budget: 5,
    midrange: 10,
    luxury: 20,
    service: 15,
    vip: 30,
  };

  const baseTime = baseTimes[type];
  const staffMultiplier = Math.max(0.5, 1 - staffCount * 0.1);

  return baseTime * staffMultiplier;
}

/**
 * Calculate prestige multiplier for a given city level
 * @param cityLevel - City level (1-based)
 * @returns Multiplier value
 */
export function calculatePrestigeMultiplier(cityLevel: number): number {
  return Math.pow(2, cityLevel - 1);
}

/**
 * Calculate offline earnings
 * @param revenuePerSecond - Current revenue per second
 * @param offlineSeconds - Time offline in seconds
 * @param maxOfflineSeconds - Maximum offline time that accumulates
 * @returns Offline earnings amount
 */
export function calculateOfflineEarnings(
  revenuePerSecond: number,
  offlineSeconds: number,
  maxOfflineSeconds: number
): number {
  const cappedSeconds = Math.min(offlineSeconds, maxOfflineSeconds);
  return Math.floor(revenuePerSecond * cappedSeconds);
}

/**
 * Calculate quest progress percentage
 * @param current - Current progress
 * @param target - Target progress
 * @returns Percentage (0-100)
 */
export function calculateQuestProgress(current: number, target: number): number {
  return Math.min(100, Math.floor((current / target) * 100));
}

/**
 * Calculate delivery truck reward
 * @param revenuePerSecond - Current revenue per second
 * @param truckInterval - Time between trucks in seconds
 * @returns Truck reward amount
 */
export function calculateDeliveryTruckReward(
  revenuePerSecond: number,
  truckInterval: number
): number {
  // Trucks give roughly 20-30 minutes worth of revenue
  const multiplier = truckInterval * 0.5; // Half the interval time
  return Math.floor(revenuePerSecond * multiplier);
}
