/**
 * Main Game Engine
 * Orchestrates all game systems and updates
 */

import { gameTicker, GameTicker } from './GameTicker';
import { CustomerManager } from '@game/managers/CustomerManager';
import { DepartmentManager } from '@game/managers/DepartmentManager';
import { RevenueManager } from '@game/managers/RevenueManager';
import { OfflineCalculator } from './OfflineCalculator';
import { useGameStore } from '@store/gameStore';
import { Customer, DepartmentType } from '@types/game.types';
import { AUTO_SAVE_INTERVAL } from '@utils/constants';

export class GameEngine {
  private static instance: GameEngine | null = null;

  private ticker: GameTicker;
  private customerManager: CustomerManager;
  private departmentManager: DepartmentManager;
  private revenueManager: RevenueManager;

  private isInitialized: boolean = false;
  private autoSaveTimer: number = 0;

  private constructor() {
    this.ticker = gameTicker;
    this.customerManager = new CustomerManager();
    this.departmentManager = new DepartmentManager();
    this.revenueManager = new RevenueManager();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): GameEngine {
    if (!GameEngine.instance) {
      GameEngine.instance = new GameEngine();
    }
    return GameEngine.instance;
  }

  /**
   * Initialize the game engine
   */
  public initialize(): void {
    if (this.isInitialized) {
      console.warn('[GameEngine] Already initialized');
      return;
    }

    // Calculate offline earnings
    this.calculateOfflineEarnings();

    // Register game loop callback
    this.ticker.registerCallback(this.update);

    this.isInitialized = true;
    console.log('[GameEngine] Initialized');
  }

  /**
   * Start the game engine
   */
  public start(): void {
    if (!this.isInitialized) {
      this.initialize();
    }

    this.ticker.start();
    console.log('[GameEngine] Started');
  }

  /**
   * Stop the game engine
   */
  public stop(): void {
    this.ticker.stop();
    this.saveGame();
    console.log('[GameEngine] Stopped');
  }

  /**
   * Main update loop (called every frame)
   */
  private update = (deltaTime: number): void => {
    const state = useGameStore.getState();

    // 1. Update customer spawning
    const parkingLot = state.departments[DepartmentType.PARKING_LOT];
    const newCustomers = this.customerManager.update(
      deltaTime,
      parkingLot.capacity,
      state.activeCustomers.length
    );

    // Add new customers to state
    newCustomers.forEach((customer) => {
      useGameStore.getState().addCustomer(customer);
    });

    // 2. Update existing customers
    const updatedCustomers: Customer[] = [];
    const customersToRemove: string[] = [];
    const completedCustomers: Customer[] = [];

    state.activeCustomers.forEach((customer) => {
      // Update service time
      let updated = this.customerManager.updateServiceTime(customer, deltaTime);

      // Check if customer completed service in current department
      if (
        updated.serviceTimeRemaining === 0 &&
        updated.currentDepartment !== null
      ) {
        // Move to next department
        updated = this.customerManager.moveToNextDepartment(updated);

        // If at finance office, they generate revenue
        if (updated.currentDepartment === DepartmentType.FINANCE_OFFICE) {
          completedCustomers.push(updated);
        }
      }

      // Check if customer should be removed
      if (this.customerManager.shouldRemoveCustomer(updated)) {
        customersToRemove.push(updated.id);
      } else {
        updatedCustomers.push(updated);
      }
    });

    // Remove completed customers
    customersToRemove.forEach((id) => {
      useGameStore.getState().removeCustomer(id);
    });

    // 3. Calculate and add revenue
    const revenue = this.revenueManager.update(
      deltaTime,
      state.departments,
      completedCustomers,
      state.prestigeMultiplier
    );

    if (revenue > 0) {
      useGameStore.getState().addCash(revenue);
    }

    // 4. Update game statistics
    useGameStore.getState().tick(deltaTime);

    // 5. Auto-save
    this.autoSaveTimer += deltaTime;
    if (this.autoSaveTimer >= AUTO_SAVE_INTERVAL / 1000) {
      this.saveGame();
      this.autoSaveTimer = 0;
    }
  };

  /**
   * Calculate offline earnings when app reopens
   */
  private calculateOfflineEarnings(): void {
    const state = useGameStore.getState();
    const lastPlayTime = state.lastPlayTime;
    const currentTime = Date.now();

    // Only calculate if more than 10 seconds have passed
    if (currentTime - lastPlayTime < 10000) {
      return;
    }

    // Calculate revenue per second
    const revenuePerSecond = this.revenueManager.calculateProjectedRevenue(
      state.departments,
      state.prestigeMultiplier,
      1
    );

    // Calculate offline earnings
    const result = OfflineCalculator.calculate(lastPlayTime, revenuePerSecond);

    if (result.earnings > 0) {
      console.log(
        `[GameEngine] Offline earnings: $${result.earnings} (${OfflineCalculator.formatOfflineTime(result.timeAwaySeconds)})`
      );

      // Add offline earnings
      useGameStore.getState().addCash(result.earnings);

      // TODO: Show offline earnings modal to user
    }

    // Update last play time
    useGameStore.setState({ lastPlayTime: currentTime });
  }

  /**
   * Save game to storage
   */
  private saveGame(): void {
    // Update last play time
    useGameStore.setState({ lastPlayTime: Date.now() });
    // Zustand persist middleware handles the actual saving
    console.log('[GameEngine] Game saved');
  }

  /**
   * Get current revenue per second
   */
  public getRevenuePerSecond(): number {
    const state = useGameStore.getState();
    const snapshot = this.revenueManager.getRevenueSnapshot(
      state.departments,
      state.prestigeMultiplier
    );
    return snapshot.totalRevenuePerSecond;
  }

  /**
   * Check if engine is running
   */
  public isRunning(): boolean {
    return this.ticker.getIsRunning();
  }

  /**
   * Cleanup (for testing or reset)
   */
  public destroy(): void {
    this.stop();
    this.ticker.unregisterCallback(this.update);
    this.isInitialized = false;
    GameEngine.instance = null;
    console.log('[GameEngine] Destroyed');
  }
}

// Export singleton instance
export const gameEngine = GameEngine.getInstance();
