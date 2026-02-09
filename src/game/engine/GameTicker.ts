/**
 * Game Ticker
 * Manages the game loop at 60 FPS
 */

import { TARGET_FPS, FRAME_INTERVAL } from '@utils/constants';

export type TickCallback = (deltaTime: number) => void;

export class GameTicker {
  private isRunning: boolean = false;
  private lastFrameTime: number = 0;
  private animationFrameId: number | null = null;
  private targetFPS: number = TARGET_FPS;
  private frameInterval: number = FRAME_INTERVAL;
  private callbacks: TickCallback[] = [];

  /**
   * Register a callback to be called on each tick
   */
  public registerCallback(callback: TickCallback): void {
    if (!this.callbacks.includes(callback)) {
      this.callbacks.push(callback);
    }
  }

  /**
   * Unregister a callback
   */
  public unregisterCallback(callback: TickCallback): void {
    const index = this.callbacks.indexOf(callback);
    if (index > -1) {
      this.callbacks.splice(index, 1);
    }
  }

  /**
   * Start the game loop
   */
  public start(): void {
    if (this.isRunning) {
      console.warn('[GameTicker] Already running');
      return;
    }

    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.tick(this.lastFrameTime);
    console.log('[GameTicker] Started');
  }

  /**
   * Stop the game loop
   */
  public stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    console.log('[GameTicker] Stopped');
  }

  /**
   * Main tick function (recursive)
   */
  private tick = (currentTime: number): void => {
    if (!this.isRunning) {
      return;
    }

    // Calculate delta time in milliseconds
    const deltaTimeMs = currentTime - this.lastFrameTime;

    // Only update if enough time has passed (frame limiting)
    if (deltaTimeMs >= this.frameInterval) {
      // Convert to seconds for game logic
      const deltaTimeSec = deltaTimeMs / 1000;

      // Call all registered callbacks
      this.callbacks.forEach((callback) => {
        try {
          callback(deltaTimeSec);
        } catch (error) {
          console.error('[GameTicker] Error in callback:', error);
        }
      });

      this.lastFrameTime = currentTime;
    }

    // Schedule next frame
    this.animationFrameId = requestAnimationFrame(this.tick);
  };

  /**
   * Check if ticker is running
   */
  public getIsRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Get current FPS (approximate)
   */
  public getCurrentFPS(): number {
    return this.targetFPS;
  }
}

// Singleton instance
export const gameTicker = new GameTicker();
