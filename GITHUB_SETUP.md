# GitHub Setup Guide

## 🚀 Push to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository:
   - **Name**: `idle-car-dealership-tycoon`
   - **Description**: "Mobile idle/tycoon game built with React Native"
   - **Visibility**: Public or Private (your choice)
   - ⚠️ **DO NOT** initialize with README, .gitignore, or license
3. Click "Create repository"

### Step 2: Connect Local Repository

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/idle-car-dealership-tycoon.git

# Verify remote
git remote -v
```

### Step 3: Push to GitHub

```bash
# Push to main branch
git push -u origin main
```

### Alternative: Using SSH

If you prefer SSH:

```bash
# Add SSH remote
git remote add origin git@github.com:YOUR_USERNAME/idle-car-dealership-tycoon.git

# Push
git push -u origin main
```

---

## 📥 Clone on Mac

Once pushed to GitHub, on your Mac:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/idle-car-dealership-tycoon.git

# Navigate to project
cd idle-car-dealership-tycoon

# Install dependencies
npm install

# Install iOS dependencies
cd ios && pod install && cd ..

# Run on iOS Simulator
npm run ios
```

---

## 🍎 iOS Setup on Mac

### Prerequisites

1. **Xcode** installed (from App Store)
2. **Xcode Command Line Tools**:
   ```bash
   xcode-select --install
   ```
3. **CocoaPods** installed:
   ```bash
   sudo gem install cocoapods
   ```
4. **Node.js** >= 20
5. **Watchman** (optional but recommended):
   ```bash
   brew install watchman
   ```

### First-Time iOS Build

```bash
# Install npm dependencies
npm install

# Install iOS pods
cd ios
pod install
cd ..

# Start Metro Bundler
npm start

# In another terminal, run on iOS
npm run ios
```

### Troubleshooting iOS

If you get errors:

```bash
# Clean iOS build
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# Clean Metro cache
npm start -- --reset-cache
```

---

## 🔄 Workflow

### On Windows (Current Machine)
```bash
# Make changes
# Stage changes
git add .

# Commit
git commit -m "Your commit message"

# Push
git push
```

### On Mac
```bash
# Pull latest changes
git pull

# Run iOS
npm run ios
```

---

## 📦 Current Commit

Your current commit includes:
- ✅ Complete MVP (100% features)
- ✅ 49 files changed
- ✅ 20,365+ lines added
- ✅ Full documentation
- ✅ Ready for iOS and Android

---

## 🎯 Quick Commands Reference

```bash
# Check status
git status

# View commit history
git log --oneline

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Pull latest changes
git pull

# Push changes
git push
```

---

## 📱 Testing on Different Platforms

### Android (Windows)
```bash
npm run android
```

### iOS (Mac)
```bash
npm run ios
```

### Both platforms work from same codebase! 🎉

---

**Ready to push? Run these commands:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/idle-car-dealership-tycoon.git
git push -u origin main
```

Then clone on your Mac and test! 🚀
