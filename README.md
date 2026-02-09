# Idle Car Dealership Tycoon 🚗💰

> A mobile idle/tycoon game where you build and manage a car dealership empire!

## 📋 Project Overview

**Idle Car Dealership Tycoon** is a React Native mobile game inspired by *Idle Supermarket Tycoon* by Codigames. Players start with a small car lot and gradually expand into a multi-department automotive retail empire through strategic upgrades, staff management, and prestige mechanics.

### Key Features

- 🏢 **6 Unique Departments**: Showroom, Service Center, Parts Shop, Finance Office, Detailing, Parking Lot
- 👥 **Staff Management**: Hire and upgrade employees to boost efficiency
- 💎 **Dual Currency System**: Cash and Gems
- 🌆 **Prestige System**: Move to bigger cities for permanent multipliers
- 📦 **Delivery Trucks**: Passive income mechanic
- 🎯 **Quests & Achievements**: Daily challenges and long-term goals
- 💤 **Offline Earnings**: Earn money even when you're away (up to 4 hours)
- 🎨 **Polished UI**: Smooth animations and satisfying feedback

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 20
- **React Native CLI**: Installed globally
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd idlecardealertycoon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Start Metro Bundler
```bash
npm start
```

### Development Commands

```bash
npm run lint          # Run ESLint
npm test              # Run Jest tests
npm run type-check    # Check TypeScript types
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/          # Generic components (Button, Card, etc.)
│   ├── game/            # Game-specific components (Customer, Staff, etc.)
│   └── ui/              # UI elements (CurrencyDisplay, UpgradePanel, etc.)
├── screens/             # Main app screens
├── game/                # Core game logic
│   ├── engine/          # Game loop and ticker
│   ├── managers/        # Game systems (customers, departments, revenue)
│   ├── entities/        # Game entities (Customer, Staff, Department classes)
│   └── data/            # Game data and configuration
├── store/               # State management (Zustand)
├── services/            # External services (storage, analytics)
├── utils/               # Utility functions
├── hooks/               # Custom React hooks
├── assets/              # Images, fonts, sounds
└── types/               # TypeScript type definitions
```

## 🎮 Game Design

For detailed game mechanics and design decisions, see:
- **[Game Design Document](./GAME_DESIGN_DOCUMENT.md)** - Complete game design and mechanics
- **[Technical Architecture](./TECHNICAL_ARCHITECTURE.md)** - Code architecture and system design
- **[Development Plan](./DEVELOPMENT_PLAN.md)** - Roadmap and development phases

## 🛠️ Tech Stack

- **Framework**: React Native 0.83.1
- **Language**: TypeScript 5.8.3
- **State Management**: Zustand
- **Navigation**: React Navigation 6.x
- **Persistence**: AsyncStorage
- **Animation**: React Native Reanimated 3.x
- **Testing**: Jest + React Native Testing Library

## 📊 Game Mechanics Summary

### Core Loop
1. Customers arrive at parking lot
2. Browse departments (Showroom, Service, etc.)
3. Complete purchase at Finance Office
4. Revenue generated automatically

### Progression
- **Upgrades**: Improve department capacity, quality, and speed
- **Staff**: Hire employees to boost efficiency
- **Prestige**: Move to bigger cities for permanent multipliers
- **Epic Upgrades**: Permanent bonuses purchased with gems

### Economy
- **Cash**: Primary currency, earned from customers
- **Gems**: Premium currency, earned from quests/achievements
- **Offline Earnings**: Accumulate up to 4 hours of revenue while away

## 🎯 Development Status

### ✅ Completed
- [x] Game Design Documentation
- [x] Technical Architecture
- [x] Project Structure Setup
- [x] Core Type Definitions
- [x] Utility Functions
- [x] Game Store (Zustand)
- [x] Department Data Configuration

### 🚧 In Progress
- [ ] Game Engine Implementation
- [ ] UI Components
- [ ] Customer System
- [ ] Revenue Calculation

### 📅 Upcoming
- [ ] All 6 Departments
- [ ] Prestige System
- [ ] Quest System
- [ ] Polish & Balancing
- [ ] Testing & Launch

See [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) for detailed roadmap.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

## 📱 Building for Production

### Android
```bash
cd android
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### iOS
```bash
cd ios
# Open in Xcode and archive
# Product → Archive
```

## 📝 Documentation

- **[Game Design Document](./GAME_DESIGN_DOCUMENT.md)** - Game mechanics, features, progression
- **[Technical Architecture](./TECHNICAL_ARCHITECTURE.md)** - Code structure, systems, algorithms
- **[Development Plan](./DEVELOPMENT_PLAN.md)** - Roadmap, phases, milestones

## 🤝 Contributing

This is a learning project. Contributions, feedback, and suggestions are welcome!

## 📄 License

[MIT License](./LICENSE)

## 🙏 Credits

- **Inspired by**: *Idle Supermarket Tycoon* by Codigames
- **Research Sources**:
  - [Idle Supermarket Tycoon on App Store](https://apps.apple.com/us/app/idle-supermarket-tycoon-shop/id1442064951)
  - [Codigames Official](https://codigames.com/game/idle-supermarket-tycoon/)
  - Various strategy guides and community resources

## 📞 Support

For questions or issues:
- Open an issue in the repository
- Check the documentation in `/docs`

---

**Made with ❤️ and Claude Code**

*Let's build an amazing car dealership empire!* 🚗💰🎮
