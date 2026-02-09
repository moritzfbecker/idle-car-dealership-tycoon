/**
 * useOfflineEarnings Hook
 * Display offline earnings modal when app reopens
 */

import { useState, useEffect } from 'react';
import { OfflineCalculator } from '@game/engine/OfflineCalculator';
import { useGameStore } from '@store/gameStore';
import { gameEngine } from '@game/engine/GameEngine';

export interface OfflineEarningsData {
  earnings: number;
  timeAwaySeconds: number;
  formattedTime: string;
  cappedAtMax: boolean;
}

/**
 * Hook to check for offline earnings on mount
 */
export function useOfflineEarnings() {
  const [offlineData, setOfflineData] = useState<OfflineEarningsData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const lastPlayTime = useGameStore((state) => state.lastPlayTime);
  const prestigeMultiplier = useGameStore((state) => state.prestigeMultiplier);
  const departments = useGameStore((state) => state.departments);

  useEffect(() => {
    checkOfflineEarnings();
  }, []);

  const checkOfflineEarnings = () => {
    const currentTime = Date.now();
    const timeAway = currentTime - lastPlayTime;

    // Only show if away for more than 30 seconds
    if (timeAway < 30000) {
      return;
    }

    // Calculate revenue per second
    const revenuePerSecond = gameEngine.getRevenuePerSecond();

    // Calculate offline earnings
    const result = OfflineCalculator.calculate(lastPlayTime, revenuePerSecond);

    if (result.earnings > 0) {
      setOfflineData({
        earnings: result.earnings,
        timeAwaySeconds: result.timeAwaySeconds,
        formattedTime: OfflineCalculator.formatOfflineTime(result.timeAwaySeconds),
        cappedAtMax: result.cappedAtMax,
      });
      setShowModal(true);
    }
  };

  const dismissModal = () => {
    setShowModal(false);
  };

  return {
    offlineData,
    showModal,
    dismissModal,
  };
}
