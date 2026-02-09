# Idle Car Dealership Tycoon - Game Design Document

## Version 1.0 | February 2026

---

## 1. Executive Summary

**Idle Car Dealership Tycoon** is a mobile idle/tycoon game inspired by Idle Supermarket Tycoon by Codigames. Players build and manage a car dealership empire, starting from a small used car lot and expanding into a multi-department automotive retail powerhouse.

### Core Game Loop
1. Customers arrive at the dealership and browse vehicles
2. Sales staff help customers, generating revenue
3. Players reinvest profits into upgrades (more inventory, better staff, additional departments)
4. Offline earnings accumulate when players are away
5. Prestige system allows players to move to bigger cities for permanent multipliers

### Target Platform
- **Primary**: Android (React Native)
- **Secondary**: iOS (future expansion)

### Key Features
- Multiple revenue-generating departments
- Idle/incremental progression system
- Prestige mechanic (city expansion)
- Dual currency system (Cash & Gems)
- Offline earnings
- Staff management
- Customer satisfaction mechanics
- Upgrade and progression trees

---

## 2. Game Mechanics

### 2.1 Core Gameplay Loop

#### Customer Flow
1. **Arrival**: Customers spawn at the parking lot at a rate determined by parking lot level
2. **Browsing**: Customers move to departments (Showroom, Service Center, etc.)
3. **Service**: Staff members serve customers, time depends on staff efficiency
4. **Purchase**: Customers complete transactions at the Finance Office
5. **Departure**: Satisfied customers leave, generating revenue

#### Idle Mechanics
- Game continues to generate revenue when app is closed
- Maximum offline earnings: 4 hours of accumulated income
- Players must return to collect earnings
- Managers can be hired to automate departments (no manual tapping required)

### 2.2 Departments

Each department represents a revenue stream and can be upgraded independently.

#### 1. **Showroom (Sales Floor)**
- **Description**: Main sales area where new and used cars are displayed
- **Initial State**: 2-3 basic vehicle slots
- **Upgrades**:
  - Number of display slots (more inventory = more customers served simultaneously)
  - Vehicle quality (low-end sedans → luxury cars → supercars)
  - Sales staff count and efficiency
- **Revenue**: Primary income source
- **Staff Types**: Sales Representatives

#### 2. **Service Center**
- **Description**: Auto repair and maintenance facility
- **Initial State**: 1 service bay
- **Upgrades**:
  - Number of service bays
  - Service speed and quality
  - Mechanic count and skill level
  - Types of services offered (oil change → full engine rebuild)
- **Revenue**: Recurring revenue from existing customers
- **Staff Types**: Mechanics, Service Advisors

#### 3. **Parts & Accessories Department**
- **Description**: Aftermarket parts, accessories, and customization options
- **Initial State**: Basic accessories (floor mats, air fresheners)
- **Upgrades**:
  - Product variety (wheels, audio systems, performance parts)
  - Display area size
  - Staff expertise
- **Revenue**: High-margin add-on sales
- **Staff Types**: Parts Specialists

#### 4. **Finance Office**
- **Description**: Where customers complete paperwork and financing
- **Initial State**: 1 finance desk
- **Upgrades**:
  - Number of finance desks
  - Processing speed (reduces customer wait time)
  - Loan approval rate (more approvals = more sales)
- **Revenue**: Interest on loans + processing fees
- **Staff Types**: Finance Managers
- **Special**: Acts as "cashier" bottleneck - all customers must pass through here

#### 5. **Detailing & Car Wash**
- **Description**: Vehicle cleaning and aesthetic services
- **Initial State**: Basic hand wash
- **Upgrades**:
  - Service types (wash → detail → ceramic coating)
  - Number of wash bays
  - Staff count and speed
- **Revenue**: Quick, repeatable revenue
- **Staff Types**: Detailers

#### 6. **Parking Lot**
- **Description**: Customer parking area
- **Initial State**: 10 parking spaces
- **Upgrades**:
  - Total capacity (determines max customer spawn rate)
  - Parking attendants (faster customer entry/exit)
  - Lot amenities (charging stations, covered parking)
- **Impact**: Directly affects customer arrival rate
- **Special**: More spaces = more customers per minute

### 2.3 Staff Management

#### Staff Types & Roles

| Staff Type | Department | Primary Function | Upgrade Path |
|------------|-----------|------------------|--------------|
| Sales Representative | Showroom | Serve customers, close deals | Speed, sales skill, commission rate |
| Mechanics | Service Center | Repair vehicles | Speed, expertise level |
| Service Advisor | Service Center | Manage service appointments | Customer handling capacity |
| Finance Manager | Finance Office | Process transactions | Processing speed, approval rate |
| Parts Specialist | Parts & Accessories | Sell aftermarket items | Product knowledge, upsell rate |
| Detailer | Detailing | Clean and detail vehicles | Service speed, quality |
| Parking Attendant | Parking Lot | Manage customer flow | Entry/exit speed |

#### Hiring & Upgrades
- **Hiring Cost**: Increases exponentially with each additional staff member
- **Salary**: Ongoing cost, but can be increased to boost staff efficiency
- **Training**: Upgrade individual staff members for permanent bonuses
- **Managers**: Special premium staff that automate departments (no tapping needed)

### 2.4 Customer Mechanics

#### Customer Types
1. **Budget Buyers**: Quick sales, low revenue, high volume
2. **Mid-Range Customers**: Moderate sales time and revenue
3. **Luxury Buyers**: Slow, high-value transactions
4. **Service Customers**: Regular maintenance visits
5. **VIP Customers**: Rare, extremely high revenue (10x normal)

#### Customer Satisfaction
- **Wait Time**: Long queues at Finance Office reduce satisfaction
- **Service Quality**: Higher staff levels improve satisfaction
- **Product Quality**: Better vehicles/services increase satisfaction
- **Impact**: Higher satisfaction = more repeat customers, better reviews, higher revenue multipliers

#### Queue System
- Customers form queues at each department
- Queue length depends on staff count and efficiency
- Bottlenecks (typically at Finance Office) slow overall revenue
- **Visual**: Customers shown waiting in line, frustrated icons if wait is too long

### 2.5 Upgrade System

#### Three Categories of Upgrades

##### A. Department Upgrades
- **Capacity**: More inventory slots, service bays, etc.
- **Quality**: Better products/services (higher revenue per transaction)
- **Efficiency**: Faster service times
- **Cost**: Exponential growth (follows formula: `baseCost * (1.15 ^ level)`)

##### B. Staff Upgrades
- **Count**: Hire additional staff members
- **Training**: Improve individual staff efficiency
- **Salary**: Increase pay to boost performance temporarily
- **Cost**: Exponential growth per staff member

##### C. Epic Upgrades (Permanent Bonuses)
Permanent, one-time purchases that affect the entire dealership:
- **Robotic Finance System**: +50% finance office processing speed
- **Customer Loyalty Program**: +25% repeat customer rate
- **Premium Showroom**: +100% showroom revenue
- **Express Service Lane**: +50% service center speed
- **Smart Parking System**: +30% customer arrival rate
- **Master Negotiator**: +20% all sales revenue
- **Cost**: Paid with Gems (premium currency)

### 2.6 Currency System

#### Primary Currency: Cash ($)
- **Earned From**: All customer transactions
- **Used For**:
  - Department upgrades
  - Hiring staff
  - Increasing staff salaries
  - Unlocking new departments
- **Display**: Formatted as K (thousands), M (millions), B (billions), T (trillions)

#### Premium Currency: Gems (💎)
- **Earned From**:
  - Daily login bonuses
  - Completing quests/achievements
  - Watching ads (optional)
  - Prestige rewards
  - In-app purchases (real money)
- **Used For**:
  - Epic Upgrades (permanent bonuses)
  - Speeding up progress (time skips)
  - Unlocking new cities early
  - Premium decorations/cosmetics
- **Display**: Whole numbers

### 2.7 Progression System

#### Early Game (City 1: Small Town)
- **Focus**: Learn basic mechanics
- **Goals**:
  - Unlock all basic departments
  - Hire first staff members
  - Reach $1M total earnings
- **Duration**: 30-60 minutes of active play

#### Mid Game (Cities 2-4)
- **Focus**: Optimize efficiency, balance upgrades
- **Goals**:
  - Maximize all departments
  - Unlock all staff positions
  - Complete daily quests
  - Purchase first Epic Upgrades
- **Duration**: Several hours per city

#### Late Game (Cities 5+)
- **Focus**: Prestige optimization, min-maxing
- **Goals**:
  - Achieve maximum prestige multipliers
  - Complete all Epic Upgrades
  - Optimize prestige timing
- **Duration**: Ongoing endgame loop

#### Prestige System (City Expansion)
- **Mechanic**: Player can "move" to a bigger city, resetting all progress
- **Benefit**: Permanent revenue multiplier (e.g., 2x → 4x → 8x)
- **Multipliers Stack**: Moving from City 1 to City 5 gives cumulative multipliers
- **Cost**: Unlocking new cities requires cash (increasing cost per city)
- **When to Prestige**: When progress slows significantly (upgrade costs become prohibitive)

**City Progression Table**:
| City | Unlock Cost | Multiplier | Theme |
|------|------------|------------|-------|
| 1 | $0 (start) | 1x | Small Town Lot |
| 2 | $500K | 2x | Suburban Dealer |
| 3 | $10M | 4x | City Dealership |
| 4 | $250M | 8x | Metropolitan Showroom |
| 5 | $10B | 16x | Luxury Auto Plaza |
| 6+ | Increasing | 32x, 64x... | Exotic & Supercar Dealers |

### 2.8 Delivery Truck System (Passive Income)

Inspired by Idle Supermarket Tycoon's delivery mechanic:

- **Mechanic**: Trucks periodically arrive at a special lot area
- **Collection**: Player must tap truck to collect earnings
- **Capacity**: Maximum 4 trucks can stack
- **Revenue**: Instant lump sum (typically 10-30 minutes of active earnings)
- **Frequency**: One truck every 15-30 minutes (based on dealership size)
- **Visual**: Trucks appear in a dedicated area outside the main dealership view

**Strategic Importance**: Encourages players to check in regularly, provides catch-up mechanic

---

## 3. User Interface & Experience

### 3.1 Main Screen Layout

```
┌─────────────────────────────────────────┐
│  💵 Cash: $1.5M    💎 Gems: 45    ⚙️    │  ← Top Bar
├─────────────────────────────────────────┤
│                                         │
│  [PARKING LOT] 🚗🚗🚗                  │  ← Customer Spawn
│                                         │
│  ┌──────────────┐  ┌──────────────┐   │
│  │  SHOWROOM    │  │  SERVICE     │   │
│  │  🚗 🚗 🚗    │  │  CENTER 🔧   │   │  ← Department Cards
│  │  Level 5     │  │  Level 3     │   │
│  │  👤👤        │  │  👤          │   │
│  └──────────────┘  └──────────────┘   │
│                                         │
│  [FINANCE OFFICE] 👔 Queue: 3          │  ← Bottleneck Area
│                                         │
│  [UPGRADES] [EXPAND] [QUESTS]          │  ← Bottom Actions
└─────────────────────────────────────────┘
```

### 3.2 UI Components

#### Department Cards
- **Display**:
  - Department name & icon
  - Current level
  - Staff count (visual icons)
  - Revenue per minute
  - Customer queue (if any)
- **Interaction**: Tap to open upgrade panel

#### Upgrade Panel
```
┌─────────────────────────────────┐
│  SHOWROOM UPGRADES              │
├─────────────────────────────────┤
│  Inventory Capacity             │
│  Level 5 → 6                    │
│  10 slots → 12 slots            │
│  Cost: $250K        [UPGRADE]   │
├─────────────────────────────────┤
│  Vehicle Quality                │
│  Level 3 → 4                    │
│  Sedans → SUVs                  │
│  Cost: $180K        [UPGRADE]   │
├─────────────────────────────────┤
│  Hire Sales Rep                 │
│  Current: 2 → 3                 │
│  Cost: $75K         [HIRE]      │
└─────────────────────────────────┘
```

#### Top Bar
- **Cash Display**: Current cash balance (formatted: $1.5M)
- **Gems Display**: Gem count
- **Settings Icon**: Access game settings, cloud save, etc.
- **Quest Notification**: Badge showing active quests

#### Bottom Navigation
- **Upgrades**: Opens comprehensive upgrade menu
- **Expand**: Shows new departments to unlock
- **Quests**: Daily challenges and achievements
- **Store**: Premium shop (gems, boosters, ad removal)
- **Stats**: Game statistics (total revenue, customers served, etc.)

### 3.3 Visual Design Principles

#### Art Style
- **3D Isometric View**: Similar to Idle Supermarket Tycoon
- **Colorful & Bright**: Appealing, family-friendly aesthetic
- **Animated Characters**: Customers and staff have simple walk cycles
- **Vehicle Models**: Simple 3D car models that upgrade visually with quality level

#### Animations
- **Customers Walking**: From parking to departments to finance to exit
- **Staff Movement**: Staff members walk between customers
- **Money Particles**: Visual feedback when revenue is earned
- **Upgrade Effects**: Flash/glow when upgrades are purchased
- **Truck Arrival**: Delivery trucks drive in with horn sound

#### UI/UX Best Practices
- **One-Tap Actions**: Most actions require single tap
- **Clear Affordances**: Buttons look tappable, clear visual hierarchy
- **Progress Bars**: Show progress toward next level/milestone
- **Tooltips**: Hold-to-view info on upgrades and mechanics
- **Haptic Feedback**: Vibration on important actions (iOS/Android)

---

## 4. Progression Balancing

### 4.1 Revenue Formula

```
Total Revenue per Second = Σ (Department_Revenue × Staff_Multiplier × Prestige_Multiplier × Epic_Upgrades)
```

**Example Calculation (Showroom Level 5)**:
- Base Revenue: $100/sale
- Sale Time: 10 seconds
- Staff Multiplier: 2 staff × 1.2 efficiency = 2.4x
- Prestige Multiplier: City 3 = 4x
- Epic Upgrade: +100% showroom revenue = 2x
- **Result**: $100 × 2.4 × 4 × 2 = $1,920 per sale ÷ 10 sec = $192/second

### 4.2 Upgrade Cost Scaling

**Formula**: `Cost = BaseCost × (1.15 ^ CurrentLevel)`

**Example**:
- Showroom Capacity Level 1 → 2: $100
- Showroom Capacity Level 2 → 3: $115
- Showroom Capacity Level 5 → 6: $175
- Showroom Capacity Level 10 → 11: $405

This exponential scaling ensures:
- Early game: Rapid progression
- Mid game: Strategic choice between upgrades
- Late game: Necessity of prestige to continue

### 4.3 Prestige Timing

**Optimal Prestige Point**: When upgrade costs exceed 1 hour of grinding

**Example**:
- Current revenue: $10K/minute
- Next meaningful upgrade: $2M (200 minutes = 3.3 hours)
- Prestige multiplier: 2x
- **Decision**: Prestige now to earn $20K/minute in new city, reaching $2M in 100 minutes

### 4.4 Quest System

#### Daily Quests (Reset every 24 hours)
1. "Serve 50 customers" → Reward: $50K
2. "Upgrade any department 5 times" → Reward: 10 gems
3. "Earn $1M total revenue" → Reward: $100K
4. "Watch 1 ad" → Reward: 5 gems
5. "Hire 2 staff members" → Reward: $25K

#### Achievements (One-time, permanent)
- "First Sale": Serve your first customer → 5 gems
- "Millionaire": Earn $1M total → 20 gems
- "Hiring Spree": Hire 10 staff members → 15 gems
- "Department King": Max out any department → 50 gems
- "Prestige Master": Move to City 5 → 100 gems

---

## 5. Technical Specifications

### 5.1 Technology Stack

- **Framework**: React Native 0.83.1
- **Language**: TypeScript 5.8.3
- **State Management**: Zustand (lightweight, simple for game state)
- **Navigation**: React Navigation 6.x
- **Persistence**: AsyncStorage (for save games)
- **Animation**: React Native Reanimated 3.x
- **Testing**: Jest + React Native Testing Library

### 5.2 Core Systems Architecture

```
src/
├── components/          # Reusable UI components
│   ├── DepartmentCard.tsx
│   ├── UpgradeButton.tsx
│   ├── Customer.tsx
│   ├── Staff.tsx
│   └── CurrencyDisplay.tsx
├── screens/             # Main app screens
│   ├── GameScreen.tsx
│   ├── UpgradeScreen.tsx
│   ├── StoreScreen.tsx
│   └── StatsScreen.tsx
├── game/                # Game logic (engine)
│   ├── GameEngine.ts         # Main game loop
│   ├── DepartmentManager.ts  # Department logic
│   ├── CustomerManager.ts    # Customer spawning/flow
│   ├── RevenueCalculator.ts  # Economy calculations
│   └── PrestigeManager.ts    # Prestige system
├── store/               # State management
│   ├── gameStore.ts     # Zustand store for game state
│   └── types.ts         # TypeScript interfaces
├── utils/               # Utility functions
│   ├── formatCurrency.ts
│   ├── calculations.ts
│   └── constants.ts
├── assets/              # Images, fonts, sounds
└── services/            # External services
    └── StorageService.ts  # Save/load game
```

### 5.3 Game State Structure

```typescript
interface GameState {
  // Player Data
  cash: number;
  gems: number;
  totalEarningsAllTime: number;
  currentCity: number;
  prestigeMultiplier: number;

  // Departments
  departments: {
    showroom: Department;
    serviceCenter: Department;
    partsShop: Department;
    financeOffice: Department;
    detailing: Department;
    parkingLot: Department;
  };

  // Staff
  staff: Staff[];

  // Customers
  activeCustomers: Customer[];
  customersServedTotal: number;

  // Progression
  unlockedDepartments: string[];
  epicUpgrades: EpicUpgrade[];
  quests: Quest[];
  achievements: Achievement[];

  // Meta
  lastPlayTime: number;  // For offline earnings
  settings: Settings;
}
```

### 5.4 Game Loop

**Update Frequency**: 60 FPS (16.67ms per frame)

**Core Loop**:
1. **Customer Spawning**: Check if new customers should spawn based on parking lot capacity
2. **Customer Movement**: Update customer positions (pathfinding to departments)
3. **Service Processing**: Tick service timers, generate revenue when complete
4. **Revenue Collection**: Add earned revenue to player cash
5. **Offline Earnings**: Calculate when app is reopened
6. **Auto-Save**: Save game state every 30 seconds

### 5.5 Save System

**Save Triggers**:
- Every 30 seconds (auto-save)
- When app goes to background
- After any purchase/upgrade
- Before prestige

**Save Format**: JSON serialized game state stored in AsyncStorage

**Cloud Save** (Future Feature):
- Sync to user account (Google Play Games, Game Center)
- Cross-device play

### 5.6 Performance Targets

- **Startup Time**: < 3 seconds
- **Frame Rate**: Stable 60 FPS with 20+ customers on screen
- **Memory Usage**: < 150MB RAM
- **Battery Usage**: < 5% per hour of active play
- **App Size**: < 100MB download

---

## 6. Monetization Strategy

### 6.1 Revenue Streams

#### 1. Optional Rewarded Ads
- **Placement**:
  - 2x revenue boost for 2 minutes
  - Instant delivery truck collection (all 4 trucks)
  - Skip 1 hour of offline time
  - Free gems (5-10 gems per ad)
- **Frequency Limit**: Max 5 ads per hour
- **User Control**: 100% optional, never forced

#### 2. In-App Purchases (IAP)
- **Gem Packs**:
  - Small: $0.99 → 50 gems
  - Medium: $4.99 → 300 gems
  - Large: $9.99 → 750 gems
  - Huge: $19.99 → 2000 gems
- **Special Offers**:
  - Starter Pack: $2.99 → 100 gems + $500K cash
  - Remove Ads: $4.99 → Permanent ad removal
  - VIP Pass: $9.99/month → Daily gems, exclusive cosmetics, faster progression

#### 3. Cosmetic Items (Future)
- Custom dealership themes
- Exclusive vehicle skins
- Staff uniforms
- Decorations

### 6.2 Free-to-Play Balance

**Core Principles**:
- Game is 100% playable without spending money
- Ads are optional and rewarding (not punishing)
- No energy systems or hard time gates
- Prestige system accessible to all players
- Reasonable gem earning rate through gameplay

**F2P vs Premium Comparison**:
- Free Player: Can complete all cities, takes longer (weeks)
- Premium Player: Faster progression, convenience, cosmetics

---

## 7. Development Roadmap

### Phase 1: Core Foundation (Weeks 1-2)
- [x] Game design documentation
- [ ] Project structure setup
- [ ] Basic UI framework (React Navigation, components)
- [ ] Game state management (Zustand setup)
- [ ] Core game engine (game loop, tick system)

### Phase 2: MVP Features (Weeks 3-4)
- [ ] Implement Showroom department (first playable department)
- [ ] Customer spawning and movement
- [ ] Basic upgrade system
- [ ] Revenue calculation and display
- [ ] Save/load system
- [ ] Finance Office (cashier mechanic)

### Phase 3: Full Feature Set (Weeks 5-7)
- [ ] All departments implemented
- [ ] Staff management system
- [ ] Prestige/city system
- [ ] Quest system
- [ ] Epic upgrades
- [ ] Delivery truck mechanic
- [ ] Offline earnings calculation

### Phase 4: Polish & Balance (Week 8)
- [ ] UI/UX refinement
- [ ] Visual effects and animations
- [ ] Sound effects and music
- [ ] Game balancing (revenue rates, costs, prestige timing)
- [ ] Bug fixes and optimization

### Phase 5: Testing & Launch Prep (Week 9-10)
- [ ] Internal testing
- [ ] Beta testing (TestFlight/Google Play Beta)
- [ ] Performance optimization
- [ ] Analytics integration
- [ ] Store listing preparation (screenshots, description)

### Phase 6: Soft Launch (Week 11)
- [ ] Launch in select regions
- [ ] Monitor analytics and player feedback
- [ ] Rapid iteration on balance issues
- [ ] Bug fixes

### Phase 7: Global Launch (Week 12)
- [ ] Full release on Google Play Store
- [ ] Marketing push
- [ ] Community engagement
- [ ] Post-launch support

---

## 8. Future Features & Expansions

### Post-Launch Content

#### Update 1: Special Events
- Limited-time seasonal events (Summer Car Show, Black Friday Sale)
- Exclusive rewards and vehicles
- Leaderboards

#### Update 2: Multiplayer Features
- Visit other players' dealerships
- Trading system (vehicles, parts)
- Co-op challenges

#### Update 3: Advanced Customization
- Build custom dealership layouts
- Choose architectural styles
- Landscaping and decoration

#### Update 4: New Cities & Prestige+
- Additional cities (City 7-10)
- Prestige+ system (reset cities for even bigger multipliers)
- Endgame content

#### Update 5: Mini-Games
- Car racing mini-game
- Negotiation mini-game with customers
- Inventory management puzzle

---

## 9. Key Takeaways from Idle Supermarket Tycoon Research

Based on extensive research of Idle Supermarket Tycoon by Codigames, here are the critical learnings applied to this design:

### What Makes Idle Supermarket Tycoon Successful:
1. **Simple, Clear Progression**: Player always knows what to upgrade next
2. **Satisfying Feedback**: Money particles, level-up animations, visual improvements
3. **Strategic Depth**: Balancing departments, staff, and cashiers requires thought
4. **Prestige System**: Provides long-term goal and sense of mastery
5. **Offline Earnings**: Respects player time, allows casual play
6. **Regular Content**: Daily quests keep players returning
7. **Visual Upgrades**: Departments visually improve as they level up
8. **Bottleneck Management**: Cashier queues create strategic decision-making
9. **Passive Income**: Delivery trucks reward check-ins without requiring constant attention
10. **Polish**: Smooth animations, clear UI, excellent game feel

### Adaptations for Car Dealership Theme:
- **Showroom** replaces produce section (high-value, low-volume sales)
- **Finance Office** replaces cashiers (same bottleneck mechanic)
- **Service Center** replaces bakery (recurring revenue)
- **Parts Shop** replaces grocery aisles (add-on sales)
- **Detailing** replaces deli (quick, repeatable services)
- **Parking Lot** replaces store parking (customer spawning)
- **Delivery Trucks** adapted to car delivery trucks (same mechanic)

---

## 10. Success Metrics & KPIs

### Player Engagement
- **DAU (Daily Active Users)**: Target 1000+ after 1 month
- **Session Length**: Average 15-20 minutes per session
- **Sessions per Day**: 3-5 sessions
- **D1 Retention**: > 40%
- **D7 Retention**: > 20%
- **D30 Retention**: > 10%

### Monetization
- **ARPU (Average Revenue Per User)**: $0.50 - $1.00
- **Conversion Rate**: 2-5% (percentage who make IAP)
- **Ad Revenue**: $0.10 - $0.20 per user per month

### Gameplay Metrics
- **Time to First Prestige**: 2-4 hours
- **Quests Completed**: 70%+ daily quest completion rate
- **Upgrade Frequency**: 10-20 upgrades per session

---

## Research Sources

This game design is based on comprehensive research of Idle Supermarket Tycoon by Codigames:

- [Idle Supermarket Tycoon on App Store](https://apps.apple.com/us/app/idle-supermarket-tycoon-shop/id1442064951)
- [Codigames Official Page](https://codigames.com/game/idle-supermarket-tycoon/)
- [Idle Supermarket Tycoon on Google Play](https://play.google.com/store/apps/details?id=com.codigames.market.idle.tycoon&hl=en_US)
- [Gameplay Help Center](https://codigames.helpshift.com/hc/en/7-idle-supermarket-tycoon/section/35-gameplay/)
- [Tips and Strategy Guides](https://www.levelwinner.com/idle-supermarket-tycoon-guide-tips-cheats-strategies-to-maximize-your-profits/)
- [Additional Strategy Resources](https://heavy.com/games/2019/02/idle-supermarket-tycoon-shop-tips-guide/)

---

**Document Version**: 1.0
**Last Updated**: February 9, 2026
**Author**: Claude Code (AI Agent)
**Project**: Idle Car Dealership Tycoon
**Platform**: React Native (Android/iOS)
