/**
 * Revenue Manager
 * Handles revenue generation and cash flow
 */

import { Department, DepartmentType, Customer } from '@types/game.types';
import { DepartmentManager } from './DepartmentManager';

export interface RevenueSnapshot {
  totalRevenuePerSecond: number;
  departmentRevenues: Record<DepartmentType, number>;
  customerCompletionRevenue: number;
}

export class RevenueManager {
  private departmentManager: DepartmentManager;
  private revenueAccumulator: number = 0;

  constructor() {
    this.departmentManager = new DepartmentManager();
  }

  /**
   * Update revenue generation
   * @param deltaTime - Time since last frame
   * @param departments - All departments
   * @param completedCustomers - Customers who completed service this frame
   * @param prestigeMultiplier - Current prestige multiplier
   * @returns Revenue generated this frame
   */
  update(
    deltaTime: number,
    departments: Record<DepartmentType, Department>,
    completedCustomers: Customer[],
    prestigeMultiplier: number
  ): number {
    let totalRevenue = 0;

    // 1. Passive revenue from departments (per second)
    const revenuePerSecond = this.departmentManager.calculateTotalRevenue(
      departments,
      prestigeMultiplier
    );
    const passiveRevenue = revenuePerSecond * deltaTime;
    totalRevenue += passiveRevenue;

    // 2. Customer completion revenue (one-time bonuses)
    const customerRevenue = this.calculateCustomerRevenue(
      completedCustomers,
      prestigeMultiplier
    );
    totalRevenue += customerRevenue;

    // Accumulate for smoother updates
    this.revenueAccumulator += totalRevenue;

    // Return accumulated revenue if it's significant enough
    if (this.revenueAccumulator >= 1) {
      const revenue = Math.floor(this.revenueAccumulator);
      this.revenueAccumulator -= revenue;
      return revenue;
    }

    return 0;
  }

  /**
   * Calculate revenue from completed customers
   */
  private calculateCustomerRevenue(
    completedCustomers: Customer[],
    prestigeMultiplier: number
  ): number {
    let total = 0;

    completedCustomers.forEach((customer) => {
      // Only count revenue when customer reaches finance office
      if (customer.currentDepartment === DepartmentType.FINANCE_OFFICE) {
        const revenue = customer.revenue * prestigeMultiplier;
        total += revenue;
        console.log(
          `[RevenueManager] Customer ${customer.id} completed: $${revenue}`
        );
      }
    });

    return total;
  }

  /**
   * Get current revenue snapshot
   */
  getRevenueSnapshot(
    departments: Record<DepartmentType, Department>,
    prestigeMultiplier: number
  ): RevenueSnapshot {
    const departmentRevenues: Record<DepartmentType, number> = {} as any;
    let totalRevenuePerSecond = 0;

    Object.values(DepartmentType).forEach((deptType) => {
      const dept = departments[deptType];
      if (dept && dept.isUnlocked) {
        const revenue = this.departmentManager.calculateRevenue(
          dept,
          prestigeMultiplier
        );
        departmentRevenues[deptType] = revenue;
        totalRevenuePerSecond += revenue;
      } else {
        departmentRevenues[deptType] = 0;
      }
    });

    return {
      totalRevenuePerSecond,
      departmentRevenues,
      customerCompletionRevenue: 0, // This is per-frame, not per-second
    };
  }

  /**
   * Calculate projected revenue for next X seconds
   */
  calculateProjectedRevenue(
    departments: Record<DepartmentType, Department>,
    prestigeMultiplier: number,
    seconds: number
  ): number {
    const revenuePerSecond = this.departmentManager.calculateTotalRevenue(
      departments,
      prestigeMultiplier
    );
    return revenuePerSecond * seconds;
  }

  /**
   * Reset revenue accumulator
   */
  reset(): void {
    this.revenueAccumulator = 0;
  }
}
