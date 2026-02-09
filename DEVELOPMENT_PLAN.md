# Idle Car Dealership Tycoon - Development Plan

## Version 1.0 | February 2026

---

## 1. Project Overview

**Goal**: Build a fully functional idle/tycoon mobile game inspired by Idle Supermarket Tycoon, adapted for a car dealership theme.

**Platform**: React Native (Android primary, iOS secondary)

**Timeline**: 10-12 weeks to MVP launch

**Current Status**: ✅ Game Design Complete, 🚧 Starting Development

---

## 2. Development Phases

### ✅ Phase 0: Foundation & Planning (Completed)

**Status**: COMPLETE

**Deliverables**:
- [x] Research Idle Supermarket Tycoon mechanics
- [x] Create comprehensive Game Design Document
- [x] Define technical architecture
- [x] Set up project structure plan

**Outcome**: Solid foundation with clear roadmap

---

### 🚧 Phase 1: Project Setup & Core Infrastructure (Week 1)

**Goal**: Clean up the project, set up proper architecture, install dependencies

#### Tasks:
1. **Project Structure Organization**
   - Create organized folder structure (src/, components/, game/, etc.)
   - Set up path aliases in TypeScript (@components, @game, etc.)
   - Clean up default React Native template files

2. **Install Core Dependencies**
   ```bash
   npm install zustand
   npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
   npm install @react-native-async-storage/async-storage
   npm install react-native-reanimated react-native-gesture-handler
   ```

3. **Configure TypeScript**
   - Set up strict type checking
   - Create type definition files
   - Configure path aliases

4. **Set up State Management**
   - Create Zustand store structure
   - Define game state interfaces
   - Implement persistence with AsyncStorage

5. **Basic Navigation**
   - Set up React Navigation
   - Create placeholder screens
   - Configure bottom tab navigation

**Deliverables**:
- ✅ Clean, organized project structure
- ✅ All dependencies installed
- ✅ TypeScript properly configured
- ✅ Zustand store initialized
- ✅ Basic navigation working

**Estimated Time**: 3-4 days

---

### 🚧 Phase 2: Game Engine Core (Week 2)

**Goal**: Build the heart of the game - the game loop and core mechanics

#### Tasks:
1. **Game Ticker System**
   - Implement 60 FPS game loop
   - Create delta-time based updates
   - Handle app backgrounding/foregrounding

2. **Department System**
   - Create Department entity class
   - Implement DepartmentManager
   - Set up basic department data structure

3. **Customer System**
   - Create Customer entity class
   - Implement CustomerManager
   - Basic customer spawning logic
   - Simple customer movement (no complex pathfinding yet)

4. **Revenue System**
   - RevenueManager implementation
   - Revenue calculation formulas
   - Cash accumulation in game state

5. **Save/Load System**
   - Auto-save every 30 seconds
   - Save on app background
   - Load game state on startup

**Deliverables**:
- ✅ Working game loop
- ✅ Departments generating revenue
- ✅ Customers spawning and moving
- ✅ Save/load functioning

**Estimated Time**: 5-7 days

---

### 🚧 Phase 3: UI Framework & First Playable (Week 3-4)

**Goal**: Create the visual interface and make the game actually playable

#### Tasks:
1. **UI Component Library**
   - Button component
   - Card component
   - ProgressBar component
   - Modal component
   - CurrencyDisplay component

2. **Main Game Screen**
   - Layout parking lot area
   - Render department cards
   - Display active customers (simple dots/icons)
   - Top bar (cash, gems, settings)

3. **Department Card Component**
   - Display department name, level, revenue
   - Show staff count
   - Tap to open upgrade panel

4. **Upgrade Panel**
   - Modal/drawer with upgrade options
   - List all available upgrades
   - Show costs and benefits
   - Purchase button with cost check

5. **First Playable Department: Showroom**
   - Fully functional showroom with upgrades
   - Capacity upgrades
   - Quality upgrades
   - Staff hiring

6. **Finance Office (Cashier Mechanic)**
   - Implement queue system
   - Bottleneck mechanic
   - Finance office upgrades

**Deliverables**:
- ✅ Attractive, functional UI
- ✅ Showroom fully playable
- ✅ Finance office working
- ✅ Upgrade system operational
- ✅ First playable build!

**Estimated Time**: 7-10 days

---

### 🚧 Phase 4: All Departments & Full Features (Week 5-6)

**Goal**: Implement all departments and core game features

#### Tasks:
1. **Remaining Departments**
   - Service Center
   - Parts & Accessories
   - Detailing
   - Parking Lot (as upgradable department)

2. **Staff Management**
   - StaffManager implementation
   - Staff entity with efficiency stats
   - Hiring mechanics
   - Salary adjustment (optional)

3. **Prestige System**
   - City unlock system
   - Reset mechanic
   - Multiplier application
   - City selection UI

4. **Delivery Truck System**
   - Truck spawning logic
   - Truck collection UI
   - Passive income calculation
   - Max 4 trucks stacking

5. **Epic Upgrades**
   - Define epic upgrade data
   - Permanent upgrade system
   - Epic upgrade shop UI

**Deliverables**:
- ✅ All 6 departments playable
- ✅ Staff system working
- ✅ Prestige system functional
- ✅ Delivery trucks spawning
- ✅ Epic upgrades purchasable

**Estimated Time**: 10-12 days

---

### 🚧 Phase 5: Progression Systems (Week 7)

**Goal**: Add depth with quests, achievements, offline earnings

#### Tasks:
1. **Offline Earnings**
   - Calculate offline time
   - Cap at 4 hours
   - Display "Welcome Back" modal with earnings

2. **Quest System**
   - QuestManager implementation
   - Daily quest generation
   - Quest tracking
   - Reward distribution

3. **Achievement System**
   - Define achievements
   - Track progress
   - Award gems on completion

4. **Statistics Screen**
   - Total earnings
   - Customers served
   - Time played
   - Departments unlocked

**Deliverables**:
- ✅ Offline earnings working
- ✅ Daily quests functional
- ✅ Achievements tracking
- ✅ Stats screen displaying data

**Estimated Time**: 5-7 days

---

### 🚧 Phase 6: Polish & Balancing (Week 8-9)

**Goal**: Make the game feel great and balance the economy

#### Tasks:
1. **Visual Polish**
   - Add animations (money particles, level-up effects)
   - Smooth transitions
   - Loading states
   - Visual feedback on all actions

2. **Game Balancing**
   - Test progression pacing
   - Adjust upgrade costs
   - Balance revenue rates
   - Tune prestige timing
   - Playtest extensively

3. **UI/UX Improvements**
   - Tooltips and help text
   - Tutorial/onboarding flow (simple)
   - Settings screen (sound, notifications)
   - Improved visual hierarchy

4. **Performance Optimization**
   - Profile and optimize render performance
   - Reduce memory usage
   - Ensure 60 FPS on mid-range devices

5. **Bug Fixes**
   - Fix all critical bugs
   - Handle edge cases
   - Crash prevention

**Deliverables**:
- ✅ Game feels polished and professional
- ✅ Balanced progression
- ✅ Smooth performance
- ✅ No critical bugs

**Estimated Time**: 10-12 days

---

### 🚧 Phase 7: Testing & Pre-Launch (Week 10)

**Goal**: Thorough testing and prepare for launch

#### Tasks:
1. **Internal Testing**
   - Full playthrough from start to City 5
   - Test all features
   - Test on multiple devices (Android 10+)

2. **Unit & Integration Tests**
   - Write tests for core calculations
   - Test save/load system
   - Test prestige system

3. **Beta Testing**
   - Set up Google Play Beta channel
   - Recruit 10-20 beta testers
   - Gather feedback
   - Iterate on feedback

4. **Store Listing Preparation**
   - Write app description
   - Create screenshots
   - Design app icon
   - Create promotional graphics

5. **Analytics Integration**
   - Set up basic analytics (Firebase or similar)
   - Track key events
   - Set up crash reporting

**Deliverables**:
- ✅ Thoroughly tested build
- ✅ Beta feedback incorporated
- ✅ Store listing ready
- ✅ Analytics tracking

**Estimated Time**: 5-7 days

---

### 🚧 Phase 8: Launch (Week 11-12)

**Goal**: Release the game to the world!

#### Tasks:
1. **Soft Launch** (Optional)
   - Launch in 1-2 small markets (e.g., Philippines, Canada)
   - Monitor analytics
   - Fix any critical issues
   - Gather initial user feedback

2. **Global Launch**
   - Submit to Google Play Store
   - Submit to Apple App Store (if iOS ready)
   - Prepare launch announcement
   - Monitor reviews and ratings

3. **Post-Launch Support**
   - Monitor crash reports
   - Respond to user feedback
   - Hot-fix critical bugs
   - Plan first content update

**Deliverables**:
- ✅ Game live on stores
- ✅ No critical bugs
- ✅ Positive initial reviews
- ✅ Post-launch plan in place

**Estimated Time**: 7-10 days

---

## 3. Prioritization Framework

### Must-Have (MVP)
- Core game loop (customers, departments, revenue)
- Showroom, Finance Office, Parking Lot
- Basic upgrade system
- Save/load
- One prestige level (City 2)
- Basic UI

### Should-Have
- All 6 departments
- Full prestige system (5+ cities)
- Quest system
- Offline earnings
- Epic upgrades
- Delivery trucks

### Nice-to-Have
- Achievements
- Advanced animations
- Sound effects
- Tutorial system
- Cloud saves

### Future Updates
- Multiplayer features
- Special events
- Cosmetics
- Additional cities
- Mini-games

---

## 4. Risk Management

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|---------|------------|
| Performance issues with many customers | Medium | High | Implement object pooling, optimize render |
| Save corruption | Low | High | Implement backup saves, checksums |
| Battery drain | Medium | Medium | Optimize game loop, reduce unnecessary updates |
| Memory leaks | Medium | Medium | Regular profiling, proper cleanup |

### Design Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|---------|------------|
| Game too grindy | Medium | High | Extensive playtesting, balance adjustments |
| Prestige too early/late | Medium | Medium | Test optimal prestige timing |
| Progression too slow | Low | High | Tune revenue rates and costs |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|---------|------------|
| Low user retention | Medium | High | Focus on core loop fun, daily quests |
| Poor monetization | Medium | Medium | Fair F2P balance, valuable IAPs |
| Negative reviews | Low | High | Polish, bug-free launch, respond to feedback |

---

## 5. Success Metrics

### Development Milestones
- Week 2: Game loop running ✅
- Week 4: First playable build ✅
- Week 6: Feature complete ✅
- Week 8: Polish complete ✅
- Week 10: Beta launch ✅
- Week 12: Global launch ✅

### Launch KPIs (First Month)
- **Downloads**: 1,000+
- **D1 Retention**: > 40%
- **D7 Retention**: > 20%
- **Average Session**: 15+ minutes
- **Rating**: 4.0+ stars
- **Crashes**: < 1% crash rate

---

## 6. Team & Resources

### Roles (Current Setup)
- **Development**: AI Agent (Claude Code) + User
- **Design**: Based on GDD
- **Testing**: User + Beta Testers
- **Art**: Placeholder assets initially (can upgrade later)

### Tools
- **IDE**: Visual Studio Code / IntelliJ IDEA
- **Version Control**: Git
- **Project Management**: This document + task list
- **Testing**: Android device/emulator
- **Analytics**: Firebase (free tier)

---

## 7. Next Immediate Steps

### Today (Week 1, Day 1):
1. ✅ Complete documentation (GDD, Architecture, this plan)
2. 🚧 Clean up project structure
3. 🚧 Create folder structure
4. 🚧 Install core dependencies
5. 🚧 Set up Zustand store skeleton

### This Week (Week 1):
- Complete all Phase 1 tasks
- Have clean project ready for core development
- Begin Phase 2 (Game Engine) by end of week

---

## 8. Communication & Iteration

### Daily Progress
- Update task list daily
- Note blockers and solutions
- Celebrate small wins

### Weekly Review
- Review completed vs. planned tasks
- Adjust timeline if needed
- Re-prioritize based on progress

### Flexibility
- This plan is a guide, not a rigid contract
- Adapt based on what we learn
- Focus on fun gameplay over perfect adherence to timeline

---

## 9. Post-Launch Roadmap

### Update 1 (Month 2): Polish & Fixes
- Bug fixes from user feedback
- Balance adjustments
- Performance improvements
- QoL features

### Update 2 (Month 3): New Content
- Cities 6-8
- New epic upgrades
- More customer types
- Visual themes

### Update 3 (Month 4): Events
- Limited-time events
- Seasonal content
- Special rewards

### Update 4 (Month 5+): Multiplayer
- Leaderboards
- Visit other dealerships
- Trading system

---

## 10. Conclusion

This development plan provides a clear path from current state to a launched, successful idle tycoon game. By following this structured approach and maintaining flexibility, we'll build a polished, fun game that players will love.

**Let's build an amazing game! 🚗💰🎮**

---

**Document Version**: 1.0
**Last Updated**: February 9, 2026
**Status**: Phase 1 In Progress
**Author**: Claude Code (AI Agent)
**Project**: Idle Car Dealership Tycoon
