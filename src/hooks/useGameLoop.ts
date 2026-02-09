/**
 * useGameLoop Hook
 * React hook to control the game engine lifecycle
 */

import { useEffect, useRef } from 'react';
import { gameEngine } from '@game/engine/GameEngine';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Hook to start/stop game loop based on app lifecycle
 */
export function useGameLoop() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Initialize and start game engine
    gameEngine.initialize();
    gameEngine.start();

    // Handle app state changes (background/foreground)
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // Cleanup when component unmounts
      gameEngine.stop();
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // App came to foreground - restart game loop
      console.log('[useGameLoop] App became active');
      gameEngine.start();
    } else if (
      appState.current === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      // App went to background - stop game loop and save
      console.log('[useGameLoop] App became inactive/background');
      gameEngine.stop();
    }

    appState.current = nextAppState;
  };

  return {
    isRunning: gameEngine.isRunning(),
    getRevenuePerSecond: () => gameEngine.getRevenuePerSecond(),
  };
}
