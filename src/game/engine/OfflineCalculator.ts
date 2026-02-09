/**
 * Offline Earnings Calculator
 * Calculate earnings accumulated while app was closed
 */

import { MAX_OFFLINE_SECONDS } from '@utils/constants';
import { calculateOfflineEarnings } from '@utils/calculations';

export interface OfflineEarningsResult {
  earnings: number;
  timeAwaySeconds: number;
  cappedAtMax: boolean;
}

export class OfflineCalculator {
  /**
   * Calculate offline earnings based on last play time
   * @param lastPlayTime - Timestamp when user last played
   * @param revenuePerSecond - Current revenue rate
   * @param maxOfflineSeconds - Max offline time to accumulate (default: 4 hours)
   * @returns Offline earnings result
   */
  static calculate(
    lastPlayTime: number,
    revenuePerSecond: number,
    maxOfflineSeconds: number = MAX_OFFLINE_SECONDS
  ): OfflineEarningsResult {
    const currentTime = Date.now();
    const timeAwayMs = currentTime - lastPlayTime;
    const timeAwaySeconds = Math.floor(timeAwayMs / 1000);

    // If less than 10 seconds away, no offline earnings
    if (timeAwaySeconds < 10) {
      return {
        earnings: 0,
        timeAwaySeconds,
        cappedAtMax: false,
      };
    }

    // Cap at maximum offline time
    const cappedSeconds = Math.min(timeAwaySeconds, maxOfflineSeconds);
    const cappedAtMax = timeAwaySeconds > maxOfflineSeconds;

    // Calculate earnings
    const earnings = calculateOfflineEarnings(
      revenuePerSecond,
      cappedSeconds,
      maxOfflineSeconds
    );

    console.log(
      `[OfflineCalculator] Away for ${timeAwaySeconds}s, earned ${earnings} (capped: ${cappedAtMax})`
    );

    return {
      earnings,
      timeAwaySeconds,
      cappedAtMax,
    };
  }

  /**
   * Format offline time as human-readable string
   */
  static formatOfflineTime(seconds: number): string {
    if (seconds < 60) {
      return `${seconds} seconds`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours < 24) {
      return remainingMinutes > 0
        ? `${hours}h ${remainingMinutes}m`
        : `${hours} hours`;
    }

    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0
      ? `${days}d ${remainingHours}h`
      : `${days} days`;
  }
}
