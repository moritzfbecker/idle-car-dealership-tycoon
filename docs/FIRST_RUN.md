# First Run Guide

## 🚀 Getting Started

### Prerequisites

1. **Node.js** >= 20 installed
2. **Android Studio** (for Android development)
3. **Android SDK** and emulator configured
4. **Java JDK** installed

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Metro Bundler**
   ```bash
   npm start
   ```

3. **Run on Android** (in new terminal)
   ```bash
   npm run android
   ```

### First Time Setup

The first time you run the app:
- Game will initialize with $1,000 starting cash
- Parking Lot, Showroom, and Finance Office are unlocked
- You'll start in City 1
- Daily quests will be generated

### Gameplay Basics

1. **Tap Departments** - Tap any department card to open upgrades
2. **Upgrade** - Spend cash to upgrade capacity, quality, or speed
3. **Hire Staff** - Hire employees to boost efficiency
4. **Watch Revenue** - Revenue accumulates automatically
5. **Progress** - Unlock new departments and move to bigger cities

### Troubleshooting

#### Metro Bundler Issues
```bash
# Clear cache and restart
npm start -- --reset-cache
```

#### Android Build Failures
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
npm run android
```

#### TypeScript Errors
```bash
# Check types
npm run type-check
```

### Key Features to Test

- ✅ Department upgrades (tap any department)
- ✅ Staff hiring
- ✅ Revenue generation (watch top bar)
- ✅ Customer spawning
- ✅ Quest system (Quests tab)
- ✅ Statistics (Stats tab)
- ✅ Epic upgrades (Store tab)
- ✅ Prestige system (tap "City 1" at top)
- ✅ Offline earnings (close app, reopen after 1+ minute)

### Performance Tips

- Game runs at 60 FPS by default
- Auto-saves every 30 seconds
- Offline earnings cap at 4 hours
- Maximum 50 customers on screen at once

### Next Steps

1. Play for 5-10 minutes
2. Try upgrading departments
3. Test prestige system (reach $500K)
4. Check quest system
5. Report any bugs!

---

**Have fun building your car dealership empire!** 🚗💰
