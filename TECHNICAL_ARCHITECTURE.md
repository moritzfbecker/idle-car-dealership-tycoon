# Idle Car Dealership Tycoon - Technical Architecture

## Version 1.0 | February 2026

---

## 1. Technology Stack

### Core Framework
- **React Native**: 0.83.1 (Latest stable)
- **TypeScript**: 5.8.3 (Type safety)
- **Node.js**: >= 20 (Required)

### State Management
- **Zustand**: 4.x (Lightweight, fast, simple API)
  - **Why Zustand**: Minimal boilerplate, perfect for game state, better performance than Redux for frequent updates

### Navigation
- **React Navigation**: 6.x
  - Stack Navigator for screens
  - Bottom Tab Navigator for main sections

### Persistence
- **AsyncStorage**: @react-native-async-storage/async-storage
  - Local game saves
  - Player preferences
  - Offline earnings cache

### Animation & UI
- **React Native Reanimated**: 3.x (60fps animations)
- **React Native Gesture Handler**: 2.x (Touch interactions)
- **React Native Safe Area Context**: 5.x (Screen boundaries)

### Performance
- **Hermes Engine**: Enabled (faster startup, lower memory)
- **FlashList**: For scrollable lists (replacement for FlatList)

### Development Tools
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Jest**: Unit testing
- **React Native Testing Library**: Component testing

---

## 2. Project Structure

```
idlecardealertycoon/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── common/              # Generic components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── Modal.tsx
│   │   ├── game/                # Game-specific components
│   │   │   ├── DepartmentCard.tsx
│   │   │   ├── Customer.tsx
│   │   │   ├── Staff.tsx
│   │   │   ├── Vehicle.tsx
│   │   │   └── ParkingLot.tsx
│   │   └── ui/                  # UI elements
│   │       ├── CurrencyDisplay.tsx
│   │       ├── UpgradePanel.tsx
│   │       └── QuestCard.tsx
│   │
│   ├── screens/                 # Main application screens
│   │   ├── GameScreen.tsx       # Main gameplay screen
│   │   ├── UpgradeScreen.tsx    # Upgrade management
│   │   ├── StoreScreen.tsx      # Premium shop
│   │   ├── StatsScreen.tsx      # Statistics
│   │   ├── QuestScreen.tsx      # Quests & achievements
│   │   └── SettingsScreen.tsx   # Game settings
│   │
│   ├── game/                    # Core game logic
│   │   ├── engine/              # Game engine
│   │   │   ├── GameEngine.ts    # Main game loop
│   │   │   ├── GameTicker.ts    # Frame-based updates
│   │   │   └── OfflineCalculator.ts
│   │   ├── managers/            # Game systems
│   │   │   ├── DepartmentManager.ts
│   │   │   ├── CustomerManager.ts
│   │   │   ├── StaffManager.ts
│   │   │   ├── RevenueManager.ts
│   │   │   ├── PrestigeManager.ts
│   │   │   └── QuestManager.ts
│   │   ├── entities/            # Game entities
│   │   │   ├── Department.ts
│   │   │   ├── Customer.ts
│   │   │   ├── Staff.ts
│   │   │   └── Vehicle.ts
│   │   └── data/                # Game data
│   │       ├── departments.ts   # Department configs
│   │       ├── upgrades.ts      # Upgrade definitions
│   │       ├── quests.ts        # Quest data
│   │       └── cities.ts        # City/prestige data
│   │
│   ├── store/                   # State management (Zustand)
│   │   ├── gameStore.ts         # Main game state
│   │   ├── uiStore.ts           # UI state (modals, etc.)
│   │   ├── slices/              # State slices
│   │   │   ├── playerSlice.ts
│   │   │   ├── departmentSlice.ts
│   │   │   └── customerSlice.ts
│   │   └── types.ts             # TypeScript interfaces
│   │
│   ├── services/                # External services
│   │   ├── StorageService.ts    # Save/load game
│   │   ├── AnalyticsService.ts  # Analytics tracking
│   │   └── AdService.ts         # Ad integration (future)
│   │
│   ├── utils/                   # Utility functions
│   │   ├── currency.ts          # formatCurrency, parseCurrency
│   │   ├── calculations.ts      # Game math formulas
│   │   ├── time.ts              # Time-related utilities
│   │   └── constants.ts         # Game constants
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useGameLoop.ts       # Game loop hook
│   │   ├── useDepartment.ts     # Department logic hook
│   │   └── useOfflineEarnings.ts
│   │
│   ├── assets/                  # Static assets
│   │   ├── images/              # Image files
│   │   ├── fonts/               # Custom fonts
│   │   └── sounds/              # Sound effects (future)
│   │
│   ├── types/                   # TypeScript type definitions
│   │   ├── game.types.ts
│   │   ├── ui.types.ts
│   │   └── api.types.ts
│   │
│   └── App.tsx                  # Root component
│
├── android/                     # Android native code
├── ios/                         # iOS native code
├── __tests__/                   # Test files
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   └── e2e/                     # End-to-end tests (future)
│
├── docs/                        # Additional documentation
│   ├── API.md                   # Code API documentation
│   ├── BALANCING.md             # Game balancing notes
│   └── TROUBLESHOOTING.md       # Common issues
│
├── .vscode/                     # VSCode settings
├── .github/                     # GitHub workflows (future)
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── babel.config.js              # Babel config
├── metro.config.js              # Metro bundler config
├── jest.config.js               # Jest config
├── .eslintrc.js                 # ESLint config
├── .prettierrc.js               # Prettier config
├── GAME_DESIGN_DOCUMENT.md      # Game design doc
├── TECHNICAL_ARCHITECTURE.md    # This file
└── README.md                    # Project overview
```

---

## 3. Core Game Engine Architecture

### 3.1 Game Loop System

The game uses a frame-based update loop running at 60 FPS.

```typescript
// game/engine/GameTicker.ts
class GameTicker {
  private lastFrameTime: number = 0;
  private targetFPS: number = 60;
  private frameInterval: number = 1000 / this.targetFPS;
  private animationFrameId: number | null = null;

  start(updateCallback: (deltaTime: number) => void) {
    const loop = (currentTime: number) => {
      const deltaTime = currentTime - this.lastFrameTime;

      if (deltaTime >= this.frameInterval) {
        updateCallback(deltaTime / 1000); // Convert to seconds
        this.lastFrameTime = currentTime;
      }

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
```

### 3.2 Main Game Engine

```typescript
// game/engine/GameEngine.ts
class GameEngine {
  private ticker: GameTicker;
  private departmentManager: DepartmentManager;
  private customerManager: CustomerManager;
  private revenueManager: RevenueManager;

  constructor() {
    this.ticker = new GameTicker();
    this.departmentManager = new DepartmentManager();
    this.customerManager = new CustomerManager();
    this.revenueManager = new RevenueManager();
  }

  start() {
    this.ticker.start((deltaTime) => {
      this.update(deltaTime);
    });
  }

  stop() {
    this.ticker.stop();
  }

  private update(deltaTime: number) {
    // Update all game systems
    this.customerManager.update(deltaTime);
    this.departmentManager.update(deltaTime);
    this.revenueManager.update(deltaTime);

    // Update game state in Zustand store
    useGameStore.getState().tick(deltaTime);
  }
}
```

### 3.3 Department System

```typescript
// game/entities/Department.ts
export interface Department {
  id: string;
  name: string;
  type: DepartmentType;
  level: number;
  capacity: number;
  quality: number;
  staff: Staff[];
  activeCustomers: Customer[];
  revenuePerSecond: number;
  totalRevenue: number;
}

export enum DepartmentType {
  SHOWROOM = 'showroom',
  SERVICE_CENTER = 'serviceCenter',
  PARTS_SHOP = 'partsShop',
  FINANCE_OFFICE = 'financeOffice',
  DETAILING = 'detailing',
  PARKING_LOT = 'parkingLot',
}

// game/managers/DepartmentManager.ts
class DepartmentManager {
  update(deltaTime: number) {
    const departments = useGameStore.getState().departments;

    Object.values(departments).forEach((dept) => {
      // Process customers in department
      this.processCustomers(dept, deltaTime);

      // Calculate revenue
      const revenue = this.calculateRevenue(dept, deltaTime);
      useGameStore.getState().addCash(revenue);
    });
  }

  private processCustomers(dept: Department, deltaTime: number) {
    dept.activeCustomers.forEach((customer) => {
      customer.serviceTimeRemaining -= deltaTime;

      if (customer.serviceTimeRemaining <= 0) {
        // Customer served, generate revenue
        this.completeService(dept, customer);
      }
    });
  }

  private calculateRevenue(dept: Department, deltaTime: number): number {
    const baseRevenue = DEPARTMENT_DATA[dept.type].baseRevenue;
    const qualityMultiplier = 1 + (dept.quality * 0.1);
    const staffMultiplier = dept.staff.length * 1.2;
    const prestigeMultiplier = useGameStore.getState().prestigeMultiplier;

    return baseRevenue * qualityMultiplier * staffMultiplier * prestigeMultiplier * deltaTime;
  }
}
```

### 3.4 Customer System

```typescript
// game/entities/Customer.ts
export interface Customer {
  id: string;
  type: CustomerType;
  currentDepartment: DepartmentType | null;
  serviceTimeRemaining: number;
  revenue: number;
  satisfactionLevel: number;
  position: { x: number; y: number };
  path: DepartmentType[];
}

export enum CustomerType {
  BUDGET = 'budget',
  MIDRANGE = 'midrange',
  LUXURY = 'luxury',
  SERVICE = 'service',
  VIP = 'vip',
}

// game/managers/CustomerManager.ts
class CustomerManager {
  private spawnTimer: number = 0;
  private spawnInterval: number = 3; // seconds

  update(deltaTime: number) {
    this.spawnTimer += deltaTime;

    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnCustomer();
      this.spawnTimer = 0;
    }

    // Update customer positions and states
    this.updateCustomerMovement(deltaTime);
  }

  private spawnCustomer() {
    const parkingLot = useGameStore.getState().departments.parkingLot;

    // Check if parking lot has capacity
    if (parkingLot.activeCustomers.length < parkingLot.capacity) {
      const customer = this.createCustomer();
      useGameStore.getState().addCustomer(customer);
    }
  }

  private createCustomer(): Customer {
    // Randomly determine customer type
    const rand = Math.random();
    let type: CustomerType;

    if (rand < 0.5) type = CustomerType.BUDGET;
    else if (rand < 0.85) type = CustomerType.MIDRANGE;
    else if (rand < 0.97) type = CustomerType.LUXURY;
    else type = CustomerType.VIP;

    return {
      id: `customer_${Date.now()}_${Math.random()}`,
      type,
      currentDepartment: DepartmentType.PARKING_LOT,
      serviceTimeRemaining: 0,
      revenue: this.calculateCustomerRevenue(type),
      satisfactionLevel: 100,
      position: { x: 0, y: 0 },
      path: this.generateCustomerPath(type),
    };
  }

  private generateCustomerPath(type: CustomerType): DepartmentType[] {
    // Customers visit different departments based on type
    const path: DepartmentType[] = [DepartmentType.PARKING_LOT];

    if (type === CustomerType.SERVICE) {
      path.push(DepartmentType.SERVICE_CENTER);
    } else {
      path.push(DepartmentType.SHOWROOM);

      // Chance to visit parts shop
      if (Math.random() > 0.5) {
        path.push(DepartmentType.PARTS_SHOP);
      }

      // Luxury customers often get detailing
      if (type === CustomerType.LUXURY && Math.random() > 0.3) {
        path.push(DepartmentType.DETAILING);
      }
    }

    // All customers end at finance office
    path.push(DepartmentType.FINANCE_OFFICE);

    return path;
  }
}
```

---

## 4. State Management with Zustand

### 4.1 Main Game Store

```typescript
// store/gameStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GameState {
  // Player
  cash: number;
  gems: number;
  totalEarningsAllTime: number;
  currentCity: number;
  prestigeMultiplier: number;

  // Departments
  departments: Record<DepartmentType, Department>;

  // Customers
  activeCustomers: Customer[];
  customersServedTotal: number;

  // Staff
  staff: Staff[];

  // Progression
  unlockedDepartments: DepartmentType[];
  epicUpgrades: string[];

  // Meta
  lastPlayTime: number;
  gameStartTime: number;

  // Actions
  addCash: (amount: number) => void;
  spendCash: (amount: number) => boolean;
  addGems: (amount: number) => void;
  spendGems: (amount: number) => boolean;
  upgradeDepartment: (deptId: DepartmentType, upgradeType: string) => void;
  hireStaff: (deptId: DepartmentType) => void;
  addCustomer: (customer: Customer) => void;
  removeCustomer: (customerId: string) => void;
  prestige: (newCity: number) => void;
  tick: (deltaTime: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial State
      cash: 1000,
      gems: 0,
      totalEarningsAllTime: 0,
      currentCity: 1,
      prestigeMultiplier: 1,
      departments: initializeDepartments(),
      activeCustomers: [],
      customersServedTotal: 0,
      staff: [],
      unlockedDepartments: [DepartmentType.PARKING_LOT, DepartmentType.SHOWROOM],
      epicUpgrades: [],
      lastPlayTime: Date.now(),
      gameStartTime: Date.now(),

      // Actions
      addCash: (amount) =>
        set((state) => ({
          cash: state.cash + amount,
          totalEarningsAllTime: state.totalEarningsAllTime + amount,
        })),

      spendCash: (amount) => {
        const state = get();
        if (state.cash >= amount) {
          set({ cash: state.cash - amount });
          return true;
        }
        return false;
      },

      addGems: (amount) =>
        set((state) => ({
          gems: state.gems + amount,
        })),

      spendGems: (amount) => {
        const state = get();
        if (state.gems >= amount) {
          set({ gems: state.gems - amount });
          return true;
        }
        return false;
      },

      upgradeDepartment: (deptId, upgradeType) => {
        // Upgrade logic
        set((state) => {
          const dept = state.departments[deptId];
          const cost = calculateUpgradeCost(dept, upgradeType);

          if (state.cash >= cost) {
            return {
              cash: state.cash - cost,
              departments: {
                ...state.departments,
                [deptId]: applyUpgrade(dept, upgradeType),
              },
            };
          }
          return state;
        });
      },

      hireStaff: (deptId) => {
        // Hiring logic
      },

      addCustomer: (customer) =>
        set((state) => ({
          activeCustomers: [...state.activeCustomers, customer],
        })),

      removeCustomer: (customerId) =>
        set((state) => ({
          activeCustomers: state.activeCustomers.filter((c) => c.id !== customerId),
          customersServedTotal: state.customersServedTotal + 1,
        })),

      prestige: (newCity) => {
        // Prestige logic - reset progress, apply multiplier
        set({
          currentCity: newCity,
          prestigeMultiplier: calculatePrestigeMultiplier(newCity),
          departments: initializeDepartments(),
          activeCustomers: [],
          staff: [],
          cash: 1000,
        });
      },

      tick: (deltaTime) => {
        // Called every frame by GameEngine
        // Update timers, process ongoing actions
      },
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### 4.2 UI Store (Separate)

```typescript
// store/uiStore.ts
interface UIState {
  selectedDepartment: DepartmentType | null;
  isUpgradePanelOpen: boolean;
  isStoreOpen: boolean;
  notifications: Notification[];

  setSelectedDepartment: (dept: DepartmentType | null) => void;
  openUpgradePanel: () => void;
  closeUpgradePanel: () => void;
  addNotification: (notif: Notification) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedDepartment: null,
  isUpgradePanelOpen: false,
  isStoreOpen: false,
  notifications: [],

  setSelectedDepartment: (dept) => set({ selectedDepartment: dept }),
  openUpgradePanel: () => set({ isUpgradePanelOpen: true }),
  closeUpgradePanel: () => set({ isUpgradePanelOpen: false }),
  addNotification: (notif) =>
    set((state) => ({
      notifications: [...state.notifications, notif],
    })),
}));
```

---

## 5. Key Algorithms & Formulas

### 5.1 Upgrade Cost Calculation

```typescript
// utils/calculations.ts
export function calculateUpgradeCost(
  baseCost: number,
  currentLevel: number,
  growthRate: number = 1.15
): number {
  return Math.floor(baseCost * Math.pow(growthRate, currentLevel));
}

// Example:
// baseCost = 100, level 0 → 1: $100
// baseCost = 100, level 5 → 6: $201
// baseCost = 100, level 10 → 11: $405
```

### 5.2 Revenue Calculation

```typescript
export function calculateDepartmentRevenue(
  dept: Department,
  gameState: GameState
): number {
  const baseRevenue = DEPARTMENT_DATA[dept.type].baseRevenue;
  const qualityMultiplier = 1 + dept.quality * 0.1; // +10% per quality level
  const staffMultiplier = dept.staff.reduce((sum, s) => sum + s.efficiency, 0);
  const prestigeMultiplier = gameState.prestigeMultiplier;

  // Epic upgrades
  const epicMultiplier = gameState.epicUpgrades.reduce((sum, upgradeId) => {
    const upgrade = EPIC_UPGRADES[upgradeId];
    if (upgrade.affectedDepartment === dept.type) {
      return sum * upgrade.multiplier;
    }
    return sum;
  }, 1);

  return (
    baseRevenue *
    qualityMultiplier *
    staffMultiplier *
    prestigeMultiplier *
    epicMultiplier
  );
}
```

### 5.3 Offline Earnings

```typescript
// game/engine/OfflineCalculator.ts
export function calculateOfflineEarnings(
  lastPlayTime: number,
  currentTime: number,
  revenuePerSecond: number,
  maxOfflineHours: number = 4
): number {
  const timeDiff = (currentTime - lastPlayTime) / 1000; // seconds
  const maxOfflineSeconds = maxOfflineHours * 3600;

  const offlineSeconds = Math.min(timeDiff, maxOfflineSeconds);
  return Math.floor(offlineSeconds * revenuePerSecond);
}
```

### 5.4 Prestige Multiplier

```typescript
export function calculatePrestigeMultiplier(cityLevel: number): number {
  // City 1: 1x, City 2: 2x, City 3: 4x, City 4: 8x, etc.
  return Math.pow(2, cityLevel - 1);
}

export function getPrestigeCost(targetCity: number): number {
  const costs = [0, 500000, 10000000, 250000000, 10000000000, 500000000000];
  return costs[targetCity - 1] || costs[costs.length - 1] * Math.pow(10, targetCity - 6);
}
```

---

## 6. Performance Optimization

### 6.1 Memory Management

- **Object Pooling**: Reuse customer/staff objects instead of creating new ones
- **Lazy Loading**: Load department assets only when unlocked
- **Image Optimization**: Use WebP format, compress assets
- **State Normalization**: Store only IDs in arrays, full objects in maps

### 6.2 Rendering Optimization

- **React.memo**: Memoize components that don't change frequently
- **useMemo/useCallback**: Prevent unnecessary re-renders
- **FlatList Optimization**: Use `getItemLayout`, `removeClippedSubviews`
- **Animation on Native Thread**: Use `react-native-reanimated` worklets

### 6.3 Zustand Optimization

- **Selective Subscriptions**: Only subscribe to needed state slices
- **Shallow Comparison**: Use `shallow` from `zustand/shallow`

```typescript
// Bad - re-renders on any state change
const state = useGameStore();

// Good - only re-renders when cash changes
const cash = useGameStore((state) => state.cash);
```

---

## 7. Testing Strategy

### 7.1 Unit Tests

```typescript
// __tests__/unit/calculations.test.ts
import { calculateUpgradeCost, calculateDepartmentRevenue } from '@/utils/calculations';

describe('calculateUpgradeCost', () => {
  it('should return base cost for level 0', () => {
    expect(calculateUpgradeCost(100, 0)).toBe(100);
  });

  it('should calculate exponential growth', () => {
    expect(calculateUpgradeCost(100, 5)).toBe(201);
  });
});
```

### 7.2 Integration Tests

```typescript
// __tests__/integration/gameEngine.test.ts
import { GameEngine } from '@/game/engine/GameEngine';
import { useGameStore } from '@/store/gameStore';

describe('GameEngine', () => {
  it('should generate revenue over time', () => {
    const engine = new GameEngine();
    const initialCash = useGameStore.getState().cash;

    engine.start();
    // Simulate 1 second
    jest.advanceTimersByTime(1000);
    engine.stop();

    expect(useGameStore.getState().cash).toBeGreaterThan(initialCash);
  });
});
```

### 7.3 Component Tests

```typescript
// __tests__/components/DepartmentCard.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import DepartmentCard from '@/components/game/DepartmentCard';

describe('DepartmentCard', () => {
  it('should display department info', () => {
    const dept = mockDepartment();
    const { getByText } = render(<DepartmentCard department={dept} />);

    expect(getByText('Showroom')).toBeTruthy();
    expect(getByText('Level 5')).toBeTruthy();
  });

  it('should call onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <DepartmentCard department={mockDepartment()} onPress={onPress} />
    );

    fireEvent.press(getByTestId('department-card'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

---

## 8. Build & Deployment

### 8.1 Development

```bash
# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run tests
npm test

# Lint
npm run lint
```

### 8.2 Production Build

**Android**:
```bash
cd android
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

**iOS**:
```bash
cd ios
pod install
# Build in Xcode: Product → Archive
```

### 8.3 Environment Variables

```bash
# .env
GAME_VERSION=1.0.0
API_URL=https://api.idlecardealership.com
ANALYTICS_KEY=your_analytics_key
AD_UNIT_ID_ANDROID=ca-app-pub-xxx
AD_UNIT_ID_IOS=ca-app-pub-xxx
```

---

## 9. Security Considerations

### 9.1 Save Game Integrity

- **Checksum Validation**: Include hash with save data to detect tampering
- **Server Validation**: Validate critical actions server-side (IAP, prestige)
- **Obfuscation**: Obfuscate save data to discourage editing

### 9.2 Anti-Cheat

- **Time Checks**: Validate system time for offline earnings
- **Sanity Checks**: Flag impossible progression (e.g., reaching City 10 in 1 hour)

---

## 10. Analytics & Monitoring

### 10.1 Key Events to Track

```typescript
// services/AnalyticsService.ts
export enum AnalyticsEvent {
  GAME_START = 'game_start',
  DEPARTMENT_UPGRADE = 'department_upgrade',
  STAFF_HIRED = 'staff_hired',
  PRESTIGE = 'prestige',
  IAP_PURCHASE = 'iap_purchase',
  AD_WATCHED = 'ad_watched',
  QUEST_COMPLETED = 'quest_completed',
  SESSION_LENGTH = 'session_length',
}

export function trackEvent(event: AnalyticsEvent, params?: object) {
  // Send to analytics provider (Firebase, Amplitude, etc.)
  console.log(`[Analytics] ${event}`, params);
}
```

### 10.2 Crash Reporting

- **Sentry** or **Firebase Crashlytics**: Automatic crash reporting
- **Error Boundaries**: Catch React errors gracefully

---

## 11. Future Technical Improvements

### Post-Launch Enhancements

1. **Cloud Saves**: Sync across devices (Firebase, AWS)
2. **Multiplayer Backend**: Node.js API for leaderboards, trading
3. **Push Notifications**: Remind players of offline earnings
4. **A/B Testing**: Test balance changes on subsets of players
5. **Live Events**: Server-driven seasonal events
6. **Localization**: Multi-language support (i18n)

---

## 12. Dependencies

### Key NPM Packages

```json
{
  "dependencies": {
    "react": "19.2.0",
    "react-native": "0.83.1",
    "zustand": "^4.5.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "react-native-reanimated": "^3.6.1",
    "react-native-gesture-handler": "^2.14.1",
    "react-native-safe-area-context": "^5.5.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.45",
    "@types/react-native": "^0.72.8",
    "typescript": "^5.8.3",
    "@testing-library/react-native": "^12.4.3",
    "@testing-library/jest-native": "^5.4.3",
    "jest": "^29.6.3",
    "eslint": "^8.19.0",
    "prettier": "^2.8.8"
  }
}
```

---

**Document Version**: 1.0
**Last Updated**: February 9, 2026
**Author**: Claude Code (AI Agent)
**Project**: Idle Car Dealership Tycoon
