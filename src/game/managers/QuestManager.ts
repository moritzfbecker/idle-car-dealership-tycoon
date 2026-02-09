/**
 * Quest Manager
 * Handles daily quests and achievements
 */

import { Quest, Achievement, QuestReward } from '@types/game.types';

export class QuestManager {
  /**
   * Generate daily quests (resets every 24 hours)
   */
  generateDailyQuests(): Quest[] {
    const now = Date.now();
    const expiresAt = now + 24 * 60 * 60 * 1000; // 24 hours from now

    return [
      {
        id: 'daily_customers_50',
        title: 'Serve Customers',
        description: 'Serve 50 customers today',
        type: 'daily',
        progress: 0,
        target: 50,
        reward: { cash: 50000 },
        isCompleted: false,
        expiresAt,
      },
      {
        id: 'daily_earn_1m',
        title: 'Daily Revenue',
        description: 'Earn $1M in total revenue',
        type: 'daily',
        progress: 0,
        target: 1000000,
        reward: { cash: 100000 },
        isCompleted: false,
        expiresAt,
      },
      {
        id: 'daily_upgrade_5',
        title: 'Upgrade Departments',
        description: 'Upgrade any department 5 times',
        type: 'daily',
        progress: 0,
        target: 5,
        reward: { gems: 10 },
        isCompleted: false,
        expiresAt,
      },
      {
        id: 'daily_hire_2',
        title: 'Hire Staff',
        description: 'Hire 2 staff members',
        type: 'daily',
        progress: 0,
        target: 2,
        reward: { gems: 5, cash: 25000 },
        isCompleted: false,
        expiresAt,
      },
    ];
  }

  /**
   * Check if daily quests should be refreshed
   */
  shouldRefreshDailyQuests(currentQuests: Quest[]): boolean {
    if (currentQuests.length === 0) {
      return true;
    }

    // Check if any quest has expired
    const now = Date.now();
    const hasExpired = currentQuests.some(
      (q) => q.type === 'daily' && q.expiresAt && q.expiresAt < now
    );

    return hasExpired;
  }

  /**
   * Update quest progress
   */
  updateQuestProgress(
    quest: Quest,
    incrementBy: number = 1
  ): Quest {
    if (quest.isCompleted) {
      return quest;
    }

    const newProgress = Math.min(quest.progress + incrementBy, quest.target);
    const isCompleted = newProgress >= quest.target;

    return {
      ...quest,
      progress: newProgress,
      isCompleted,
    };
  }

  /**
   * Claim quest reward
   */
  claimQuestReward(quest: Quest): QuestReward | null {
    if (!quest.isCompleted) {
      return null;
    }

    console.log(`[QuestManager] Quest completed: ${quest.title}`);
    return quest.reward;
  }

  /**
   * Get initial achievements
   */
  getInitialAchievements(): Achievement[] {
    return [
      {
        id: 'first_sale',
        title: 'First Sale',
        description: 'Serve your first customer',
        progress: 0,
        target: 1,
        reward: 5,
        isUnlocked: false,
      },
      {
        id: 'millionaire',
        title: 'Millionaire',
        description: 'Earn $1M in total revenue',
        progress: 0,
        target: 1000000,
        reward: 20,
        isUnlocked: false,
      },
      {
        id: 'hiring_spree',
        title: 'Hiring Spree',
        description: 'Hire 10 staff members',
        progress: 0,
        target: 10,
        reward: 15,
        isUnlocked: false,
      },
      {
        id: 'department_master',
        title: 'Department Master',
        description: 'Upgrade any department to level 10',
        progress: 0,
        target: 10,
        reward: 30,
        isUnlocked: false,
      },
      {
        id: 'unlock_all',
        title: 'Grand Opening',
        description: 'Unlock all departments',
        progress: 0,
        target: 6,
        reward: 50,
        isUnlocked: false,
      },
      {
        id: 'city_traveler',
        title: 'City Traveler',
        description: 'Move to City 5',
        progress: 0,
        target: 5,
        reward: 100,
        isUnlocked: false,
      },
      {
        id: 'customer_100',
        title: 'Customer Favorite',
        description: 'Serve 100 customers',
        progress: 0,
        target: 100,
        reward: 10,
        isUnlocked: false,
      },
      {
        id: 'customer_1000',
        title: 'Dealership Legend',
        description: 'Serve 1,000 customers',
        progress: 0,
        target: 1000,
        reward: 50,
        isUnlocked: false,
      },
    ];
  }

  /**
   * Update achievement progress
   */
  updateAchievementProgress(
    achievement: Achievement,
    newProgress: number
  ): Achievement {
    if (achievement.isUnlocked) {
      return achievement;
    }

    const progress = Math.min(newProgress, achievement.target);
    const isUnlocked = progress >= achievement.target;

    if (isUnlocked && !achievement.isUnlocked) {
      console.log(`[QuestManager] Achievement unlocked: ${achievement.title}`);
    }

    return {
      ...achievement,
      progress,
      isUnlocked,
    };
  }

  /**
   * Get quest completion percentage
   */
  getQuestProgress(quest: Quest): number {
    return Math.min(100, Math.floor((quest.progress / quest.target) * 100));
  }
}
