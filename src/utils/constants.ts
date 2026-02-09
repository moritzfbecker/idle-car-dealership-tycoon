/**
 * Game Constants
 * Idle Car Dealership Tycoon
 */

// Game Loop
export const TARGET_FPS = 60;
export const FRAME_INTERVAL = 1000 / TARGET_FPS;

// Offline Earnings
export const MAX_OFFLINE_HOURS = 4;
export const MAX_OFFLINE_SECONDS = MAX_OFFLINE_HOURS * 3600;

// Auto-Save
export const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

// Customer Spawning
export const BASE_CUSTOMER_SPAWN_INTERVAL = 3; // seconds
export const MAX_CUSTOMERS_ON_SCREEN = 50;

// Delivery Trucks
export const DELIVERY_TRUCK_INTERVAL = 1800; // 30 minutes in seconds
export const MAX_DELIVERY_TRUCKS = 4;

// Upgrade Cost Scaling
export const UPGRADE_COST_GROWTH_RATE = 1.15;

// Staff
export const BASE_STAFF_EFFICIENCY = 1.2;

// Currency Formatting
export const CURRENCY_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc'];

// Initial Game State
export const INITIAL_CASH = 1000;
export const INITIAL_GEMS = 0;

// Cities Data
export const CITIES = [
  {
    id: 1,
    name: 'Small Town Lot',
    unlockCost: 0,
    prestigeMultiplier: 1,
    theme: 'small_town',
  },
  {
    id: 2,
    name: 'Suburban Dealer',
    unlockCost: 500000,
    prestigeMultiplier: 2,
    theme: 'suburban',
  },
  {
    id: 3,
    name: 'City Dealership',
    unlockCost: 10000000,
    prestigeMultiplier: 4,
    theme: 'city',
  },
  {
    id: 4,
    name: 'Metropolitan Showroom',
    unlockCost: 250000000,
    prestigeMultiplier: 8,
    theme: 'metro',
  },
  {
    id: 5,
    name: 'Luxury Auto Plaza',
    unlockCost: 10000000000,
    prestigeMultiplier: 16,
    theme: 'luxury',
  },
  {
    id: 6,
    name: 'Exotic Car Empire',
    unlockCost: 500000000000,
    prestigeMultiplier: 32,
    theme: 'exotic',
  },
];

// Customer Type Probabilities
export const CUSTOMER_TYPE_PROBABILITIES = {
  budget: 0.5, // 50%
  midrange: 0.35, // 35%
  luxury: 0.12, // 12%
  service: 0.025, // 2.5%
  vip: 0.005, // 0.5%
};

// Storage Keys
export const STORAGE_KEY_GAME_STATE = 'game_state';
export const STORAGE_KEY_SETTINGS = 'game_settings';
