/**
 * Prestige Manager
 * Handles city progression and prestige mechanics
 */

import { City } from '@types/game.types';
import { CITIES } from '@utils/constants';
import { calculatePrestigeMultiplier } from '@utils/calculations';

export class PrestigeManager {
  /**
   * Get all available cities
   */
  getAllCities(): City[] {
    return CITIES;
  }

  /**
   * Get city by ID
   */
  getCity(cityId: number): City | null {
    return CITIES.find((c) => c.id === cityId) || null;
  }

  /**
   * Check if player can move to a new city
   */
  canPrestige(currentCash: number, targetCityId: number): boolean {
    const targetCity = this.getCity(targetCityId);
    if (!targetCity) {
      return false;
    }

    return currentCash >= targetCity.unlockCost;
  }

  /**
   * Get prestige cost for a city
   */
  getPrestigeCost(cityId: number): number {
    const city = this.getCity(cityId);
    return city ? city.unlockCost : Infinity;
  }

  /**
   * Calculate prestige multiplier for a city
   */
  getPrestigeMultiplier(cityId: number): number {
    return calculatePrestigeMultiplier(cityId);
  }

  /**
   * Get next city
   */
  getNextCity(currentCityId: number): City | null {
    return this.getCity(currentCityId + 1);
  }

  /**
   * Check if there's a next city available
   */
  hasNextCity(currentCityId: number): boolean {
    return this.getNextCity(currentCityId) !== null;
  }

  /**
   * Calculate total prestige multiplier from all previous cities
   */
  calculateCumulativeMultiplier(cityId: number): number {
    // Multipliers are cumulative: City 1 = 1x, City 2 = 2x, City 3 = 4x, etc.
    return calculatePrestigeMultiplier(cityId);
  }

  /**
   * Get progress percentage to next city
   */
  getProgressToNextCity(currentCash: number, currentCityId: number): number {
    const nextCity = this.getNextCity(currentCityId);
    if (!nextCity) {
      return 100; // Max level reached
    }

    const progress = (currentCash / nextCity.unlockCost) * 100;
    return Math.min(100, progress);
  }

  /**
   * Should recommend prestige? (when progress is very slow)
   */
  shouldRecommendPrestige(
    currentCash: number,
    currentCityId: number,
    averageRevenuePerMinute: number
  ): boolean {
    const nextCity = this.getNextCity(currentCityId);
    if (!nextCity) {
      return false;
    }

    // If player can already afford it, recommend
    if (currentCash >= nextCity.unlockCost) {
      return true;
    }

    // If it would take more than 2 hours to reach next city at current rate, recommend
    const timeToNextCityMinutes =
      (nextCity.unlockCost - currentCash) / averageRevenuePerMinute;
    return timeToNextCityMinutes > 120; // 2 hours
  }

  /**
   * Get city description with benefits
   */
  getCityDescription(cityId: number): string {
    const city = this.getCity(cityId);
    if (!city) {
      return '';
    }

    const multiplier = this.getPrestigeMultiplier(cityId);
    return `${city.name} - ${multiplier}x Revenue Multiplier`;
  }
}
