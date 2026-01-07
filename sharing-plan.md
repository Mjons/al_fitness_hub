# Sharing Coach Al App Away From WiFi

Options for testing/sharing the app when not on your local network.

---

## Option 1: Tunnel Mode (Quickest)

Use Expo's built-in tunnel to expose your dev server over the internet.

### Setup
```bash
# Install ngrok (one-time)
npm install -g @expo/ngrok

# Start with tunnel
npx expo start --tunnel
```

### How It Works
- Creates a public URL via ngrok
- QR code works anywhere with internet
- Good for quick demos

### Pros
- No build required
- Instant updates (hot reload)
- Free

### Cons
- Requires your computer running
- Can be slow (goes through ngrok servers)
- URL changes each session

---

## Option 2: EAS Update (Best for Sharing)

Push updates to Expo's cloud. Users open in Expo Go and it downloads latest.

### Setup (One-Time)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project
eas update:configure
```

### Publish an Update
```bash
# Publish to preview channel
eas update --branch preview --message "Latest version"
```

### Share With Others
1. Share the QR code or link from Expo dashboard
2. They open in Expo Go
3. App loads from cloud (no local server needed)

### Pros
- Works without your computer on
- Fast loading
- Easy to share link/QR
- Version history

### Cons
- Need Expo account (free)
- Still requires Expo Go app
- ~5 min to publish

---

## Option 3: Development Build APK (Best for Android)

Create a standalone APK that runs without Expo Go.

### Setup
```bash
# Configure EAS Build
eas build:configure

# Create development build for Android
eas build --profile development --platform android
```

### Install on Device
1. Download APK from EAS dashboard
2. Enable "Install from unknown sources" on Android
3. Install APK
4. App runs standalone

### For Local Development
```bash
# Start dev server in tunnel mode
npx expo start --dev-client --tunnel
```

### Pros
- No Expo Go needed
- Can install on any Android device
- Works offline (for built features)

### Cons
- Takes ~10-15 min to build
- Larger file size
- Need to rebuild for native changes

---

## Option 4: Preview Build (Production-like)

Create a preview/internal build for testing.

### Setup
```bash
# Android internal distribution
eas build --profile preview --platform android

# iOS (requires Apple Developer account)
eas build --profile preview --platform ios
```

### Share
- Get download link from EAS dashboard
- Share link with testers
- They install directly

---

## Quick Reference

| Method | Setup Time | Share Method | Needs Computer Running? |
|--------|-----------|--------------|------------------------|
| Tunnel | 1 min | QR code | Yes |
| EAS Update | 5 min | Link/QR | No |
| Dev Build APK | 15 min | APK file | No (for installed app) |
| Preview Build | 15 min | Download link | No |

---

## Recommended Approach

### For Quick Demo (showing someone nearby)
```bash
npx expo start --tunnel
```
Share the QR code - they scan with Expo Go.

### For Sharing While Away
```bash
# First time setup
eas login
eas update:configure

# Each time you want to share
eas update --branch preview --message "Demo version"
```
Share the link from expo.dev dashboard.

### For Installing on Tester Phones
```bash
eas build --profile preview --platform android
```
Send them the APK download link.

---

## Files to Add for EAS

### eas.json (create in project root)
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

---

## Checklist Before Sharing

- [ ] App runs locally without errors
- [ ] All screens navigate correctly
- [ ] Test on both light/dark mode
- [ ] Check on different screen sizes
- [ ] Remove any console.log statements
- [ ] Update app version in app.json if needed
