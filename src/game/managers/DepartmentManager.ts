/**
 * Department Manager
 * Handles department operations, upgrades, and customer processing
 */

import { Department, DepartmentType, Customer } from '@types/game.types';
import { DEPARTMENT_DATA } from '@game/data/departments';
import {
  calculateUpgradeCost,
  calculateDepartmentRevenue,
  calculateServiceTime,
} from '@utils/calculations';

export type UpgradeType = 'capacity' | 'quality' | 'speed';

export class DepartmentManager {
  /**
   * Process customers in a department
   * @param dept - Department to process
   * @param customers - Active customers in this department
   * @param deltaTime - Time since last frame
   * @returns Array of customers that have completed service
   */
  processCustomers(
    dept: Department,
    customers: Customer[],
    deltaTime: number
  ): Customer[] {
    const completedCustomers: Customer[] = [];

    // Customers in this department
    const deptCustomers = customers.filter(
      (c) => c.currentDepartment === dept.id
    );

    // Determine how many customers can be served simultaneously
    const maxServing = Math.min(dept.capacity, deptCustomers.length);
    const staffCount = dept.staff.length || 1;

    // Process serving customers
    deptCustomers.slice(0, maxServing).forEach((customer) => {
      // If customer just arrived, set their service time
      if (customer.serviceTimeRemaining === 0) {
        const serviceTime = calculateServiceTime(customer.type, staffCount);
        customer.serviceTimeRemaining = serviceTime;
      }

      // Decrease service time
      customer.serviceTimeRemaining = Math.max(
        0,
        customer.serviceTimeRemaining - deltaTime
      );

      // If service complete, mark for completion
      if (customer.serviceTimeRemaining <= 0) {
        completedCustomers.push(customer);
      }
    });

    return completedCustomers;
  }

  /**
   * Calculate department revenue per second
   */
  calculateRevenue(
    dept: Department,
    prestigeMultiplier: number,
    epicMultipliers: number[] = []
  ): number {
    if (!dept.isUnlocked || dept.level === 0) {
      return 0;
    }

    return calculateDepartmentRevenue(dept, prestigeMultiplier, epicMultipliers);
  }

  /**
   * Calculate upgrade cost for a department
   */
  getUpgradeCost(dept: Department, upgradeType: UpgradeType): number {
    const config = DEPARTMENT_DATA[dept.id];
    const baseCost = config.upgradeTypes[upgradeType].baseCost;

    // Use current level of the specific upgrade type
    let currentLevel: number;
    switch (upgradeType) {
      case 'capacity':
        currentLevel = dept.capacity;
        break;
      case 'quality':
        currentLevel = dept.quality;
        break;
      case 'speed':
        currentLevel = dept.level; // Speed is tied to overall level
        break;
    }

    return calculateUpgradeCost(baseCost, currentLevel);
  }

  /**
   * Apply upgrade to department
   */
  applyUpgrade(dept: Department, upgradeType: UpgradeType): Department {
    const upgraded = { ...dept };

    switch (upgradeType) {
      case 'capacity':
        upgraded.capacity += 1;
        break;
      case 'quality':
        upgraded.quality += 1;
        break;
      case 'speed':
        upgraded.level += 1;
        break;
    }

    console.log(
      `[DepartmentManager] Upgraded ${dept.id} ${upgradeType}: level ${upgraded.level}`
    );

    return upgraded;
  }

  /**
   * Check if department can be unlocked
   */
  canUnlockDepartment(
    deptType: DepartmentType,
    currentCash: number
  ): boolean {
    const config = DEPARTMENT_DATA[deptType];
    return currentCash >= config.unlockCost;
  }

  /**
   * Get unlock cost for department
   */
  getUnlockCost(deptType: DepartmentType): number {
    return DEPARTMENT_DATA[deptType].unlockCost;
  }

  /**
   * Initialize a newly unlocked department
   */
  initializeDepartment(deptType: DepartmentType): Department {
    const config = DEPARTMENT_DATA[deptType];

    return {
      id: deptType,
      name: config.name,
      level: 1,
      capacity: 1,
      quality: 1,
      isUnlocked: true,
      staff: [],
      activeCustomers: [],
      revenuePerSecond: 0,
      totalRevenue: 0,
    };
  }

  /**
   * Calculate total dealership revenue per second
   */
  calculateTotalRevenue(
    departments: Record<DepartmentType, Department>,
    prestigeMultiplier: number
  ): number {
    let total = 0;

    Object.values(departments).forEach((dept) => {
      if (dept.isUnlocked) {
        total += this.calculateRevenue(dept, prestigeMultiplier);
      }
    });

    return total;
  }

  /**
   * Get department statistics
   */
  getDepartmentStats(dept: Department) {
    return {
      level: dept.level,
      capacity: dept.capacity,
      quality: dept.quality,
      staffCount: dept.staff.length,
      activeCustomers: dept.activeCustomers.length,
      revenuePerSecond: dept.revenuePerSecond,
      totalRevenue: dept.totalRevenue,
    };
  }
}
