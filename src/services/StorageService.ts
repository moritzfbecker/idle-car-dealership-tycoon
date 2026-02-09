/**
 * Storage Service
 * Handle game save/load operations
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY_GAME_STATE, STORAGE_KEY_SETTINGS } from '@utils/constants';

export class StorageService {
  /**
   * Save game state to AsyncStorage
   */
  static async saveGameState(state: any): Promise<boolean> {
    try {
      const jsonState = JSON.stringify(state);
      await AsyncStorage.setItem(STORAGE_KEY_GAME_STATE, jsonState);
      console.log('[StorageService] Game state saved successfully');
      return true;
    } catch (error) {
      console.error('[StorageService] Failed to save game state:', error);
      return false;
    }
  }

  /**
   * Load game state from AsyncStorage
   */
  static async loadGameState(): Promise<any | null> {
    try {
      const jsonState = await AsyncStorage.getItem(STORAGE_KEY_GAME_STATE);
      if (jsonState !== null) {
        const state = JSON.parse(jsonState);
        console.log('[StorageService] Game state loaded successfully');
        return state;
      }
      return null;
    } catch (error) {
      console.error('[StorageService] Failed to load game state:', error);
      return null;
    }
  }

  /**
   * Clear all game data (for reset)
   */
  static async clearGameData(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY_GAME_STATE);
      console.log('[StorageService] Game data cleared');
      return true;
    } catch (error) {
      console.error('[StorageService] Failed to clear game data:', error);
      return false;
    }
  }

  /**
   * Save game settings
   */
  static async saveSettings(settings: any): Promise<boolean> {
    try {
      const jsonSettings = JSON.stringify(settings);
      await AsyncStorage.setItem(STORAGE_KEY_SETTINGS, jsonSettings);
      return true;
    } catch (error) {
      console.error('[StorageService] Failed to save settings:', error);
      return false;
    }
  }

  /**
   * Load game settings
   */
  static async loadSettings(): Promise<any | null> {
    try {
      const jsonSettings = await AsyncStorage.getItem(STORAGE_KEY_SETTINGS);
      if (jsonSettings !== null) {
        return JSON.parse(jsonSettings);
      }
      return null;
    } catch (error) {
      console.error('[StorageService] Failed to load settings:', error);
      return null;
    }
  }
}
