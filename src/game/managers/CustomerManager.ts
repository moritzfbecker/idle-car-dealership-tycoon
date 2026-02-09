/**
 * Customer Manager
 * Handles customer spawning, movement, and lifecycle
 */

import { Customer, CustomerType, DepartmentType } from '@types/game.types';
import {
  BASE_CUSTOMER_SPAWN_INTERVAL,
  MAX_CUSTOMERS_ON_SCREEN,
  CUSTOMER_TYPE_PROBABILITIES,
} from '@utils/constants';
import {
  calculateCustomerRevenue,
  calculateServiceTime,
} from '@utils/calculations';

export class CustomerManager {
  private spawnTimer: number = 0;
  private customerIdCounter: number = 0;

  /**
   * Update customer spawning and movement
   * @param deltaTime - Time since last frame in seconds
   * @param parkingCapacity - Current parking lot capacity
   * @param activeCustomerCount - Number of active customers
   * @returns New customers to spawn (if any)
   */
  update(
    deltaTime: number,
    parkingCapacity: number,
    activeCustomerCount: number
  ): Customer[] {
    const newCustomers: Customer[] = [];

    // Update spawn timer
    this.spawnTimer += deltaTime;

    // Calculate spawn interval based on parking capacity
    const spawnInterval = this.calculateSpawnInterval(parkingCapacity);

    // Spawn customer if timer exceeded and not at max capacity
    if (this.spawnTimer >= spawnInterval) {
      if (
        activeCustomerCount < parkingCapacity &&
        activeCustomerCount < MAX_CUSTOMERS_ON_SCREEN
      ) {
        const customer = this.spawnCustomer();
        newCustomers.push(customer);
      }
      this.spawnTimer = 0;
    }

    return newCustomers;
  }

  /**
   * Spawn a new customer
   */
  private spawnCustomer(): Customer {
    const type = this.determineCustomerType();
    const path = this.generateCustomerPath(type);

    const customer: Customer = {
      id: `customer_${Date.now()}_${this.customerIdCounter++}`,
      type,
      currentDepartment: DepartmentType.PARKING_LOT,
      nextDepartment: path[1] || null,
      serviceTimeRemaining: 0,
      revenue: calculateCustomerRevenue(type, 1),
      satisfactionLevel: 100,
      position: { x: 0, y: 0 },
      path,
      pathIndex: 0,
    };

    console.log(`[CustomerManager] Spawned ${type} customer: ${customer.id}`);
    return customer;
  }

  /**
   * Determine customer type based on probabilities
   */
  private determineCustomerType(): CustomerType {
    const rand = Math.random();
    let cumulative = 0;

    // Check each type's probability
    if (rand < (cumulative += CUSTOMER_TYPE_PROBABILITIES.budget)) {
      return CustomerType.BUDGET;
    }
    if (rand < (cumulative += CUSTOMER_TYPE_PROBABILITIES.midrange)) {
      return CustomerType.MIDRANGE;
    }
    if (rand < (cumulative += CUSTOMER_TYPE_PROBABILITIES.luxury)) {
      return CustomerType.LUXURY;
    }
    if (rand < (cumulative += CUSTOMER_TYPE_PROBABILITIES.service)) {
      return CustomerType.SERVICE;
    }
    return CustomerType.VIP;
  }

  /**
   * Generate customer path through departments
   */
  private generateCustomerPath(type: CustomerType): DepartmentType[] {
    const path: DepartmentType[] = [DepartmentType.PARKING_LOT];

    if (type === CustomerType.SERVICE) {
      // Service customers go straight to service center
      path.push(DepartmentType.SERVICE_CENTER);
    } else {
      // Sales customers visit showroom
      path.push(DepartmentType.SHOWROOM);

      // 50% chance to visit parts shop
      if (Math.random() > 0.5) {
        path.push(DepartmentType.PARTS_SHOP);
      }

      // Luxury customers often get detailing
      if (type === CustomerType.LUXURY || type === CustomerType.VIP) {
        if (Math.random() > 0.3) {
          path.push(DepartmentType.DETAILING);
        }
      }
    }

    // All customers end at finance office
    path.push(DepartmentType.FINANCE_OFFICE);

    return path;
  }

  /**
   * Calculate spawn interval based on parking capacity
   * More parking = faster spawns
   */
  private calculateSpawnInterval(parkingCapacity: number): number {
    // Base interval is 3 seconds
    // For every 10 parking spaces, reduce interval by 0.2s
    const reduction = Math.floor(parkingCapacity / 10) * 0.2;
    const interval = Math.max(0.5, BASE_CUSTOMER_SPAWN_INTERVAL - reduction);
    return interval;
  }

  /**
   * Move customer to next department in their path
   */
  moveToNextDepartment(customer: Customer): Customer {
    const nextIndex = customer.pathIndex + 1;

    if (nextIndex >= customer.path.length) {
      // Customer has completed their journey
      return {
        ...customer,
        currentDepartment: null,
        nextDepartment: null,
      };
    }

    const nextDepartment = customer.path[nextIndex];
    const nextNextDepartment = customer.path[nextIndex + 1] || null;

    return {
      ...customer,
      currentDepartment: nextDepartment,
      nextDepartment: nextNextDepartment,
      pathIndex: nextIndex,
      serviceTimeRemaining: 0, // Will be set by department manager
    };
  }

  /**
   * Check if customer should be removed (completed journey)
   */
  shouldRemoveCustomer(customer: Customer): boolean {
    return (
      customer.currentDepartment === null &&
      customer.serviceTimeRemaining <= 0
    );
  }

  /**
   * Update customer service time
   */
  updateServiceTime(customer: Customer, deltaTime: number): Customer {
    if (customer.serviceTimeRemaining > 0) {
      return {
        ...customer,
        serviceTimeRemaining: Math.max(0, customer.serviceTimeRemaining - deltaTime),
      };
    }
    return customer;
  }

  /**
   * Reset spawn timer (useful for testing)
   */
  resetSpawnTimer(): void {
    this.spawnTimer = 0;
  }
}
