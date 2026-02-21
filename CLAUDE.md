# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Coach Al's Wellness Studio** — an Expo-managed React Native app (SDK 54) built around Coach Al Cummings' "7 Pillars of Health" (Breathing, Sleep, Hydration, Nutrition, Movement, Environment, Mindfulness). Includes onboarding assessment, daily check-ins, 30-day challenges per pillar, workouts, nutrition logging, guided meditations, progress tracking, and a full in-app book ("Burnt Out and Ready to Feel Great").

Targets iOS, Android, and Web. Dark mode only. Portrait-locked. Plain JavaScript (no TypeScript).

## Commands

```bash
npm start          # expo start (default)
npm run web        # expo start --web
npm run android    # expo start --android
npm run ios        # expo start --ios
```

No test runner, linter, or build scripts are configured.

## Architecture

### State & Routing (all in App.js)

All application state lives in `App.js` via `useState`. There is **no state management library** and **no navigation library** — routing is a manual `switch` on `currentScreen` string inside `renderScreen()`. Navigation happens through `navigateTo(screenName)` which updates state and persists to AsyncStorage.

Screen name constants are defined in `constants.js` under `SCREENS`.

### Data Flow

Top-down props only. `App.js` passes `onNavigate`, selection handlers, and scoring callbacks to all child components. Intake screens calculate pillar scores (1-10) internally and pass them up via `onNext`. After onboarding completes, `finalizeAssessment()` finds the weakest pillar and sets it as the user's focus.

### Persistence

AsyncStorage stores: current screen, user name, focus pillar, daily log state, streak, challenge states, read chapters. Loaded on mount via `loadSavedData()`.

### Navigation Flow

```
LANDING → WELCOME → INTAKE_PERSONAL → INTAKE_DEMOGRAPHICS → INTAKE_GOALS
→ INTAKE_MOVEMENT → INTAKE_NUTRITION → INTAKE_BREATHING_SLEEP
→ INTAKE_MINDFULNESS → SAFETY_NOTICE → DASHBOARD

From DASHBOARD (via BottomNav or cards):
  WORKOUT_LIST → WORKOUT_DETAIL
  NUTRITION_SUMMARY → NUTRITION_LOG
  PROGRESS_SUMMARY
  PILLARS_OVERVIEW
  MEDITATION_LIST
  CHALLENGE_PROGRESS → CHALLENGE_DETAIL
  BOOK → CHAPTER_VIEW
  SETTINGS
```

`BottomNav` (5 tabs: Home, Meditate, Pillars, Nutrition, Progress) is rendered by individual screen components — onboarding screens don't include it.

### Key Files

- **`App.js`** — Root component. All state, all routing logic, all AsyncStorage persistence.
- **`constants.js`** — All static data: pillars, workouts, meals, 30-day challenges (with progressive task unlocking at days 1/8/15/22), full book chapter content (9 chapters), screen name constants, helper functions (`getWeekFromDay`, `getAvailableTasks`).
- **`styles/theme.js`** — Design tokens: colors (primary `#13ec13` green, secondary `#ec7f13` orange, background `#111111`), spacing, borderRadius, fontSize, fontWeight.
- **`components/`** — One file per screen. Each uses `StyleSheet.create()` and imports `colors` (and occasionally `spacing`, `borderRadius`, `fontSize`) from `../styles/theme`.

### Dev Mode

`WelcomeScreen` and `ChallengeDetail` have `DEV_MODE` toggles (currently `true`). WelcomeScreen's "Skip with Random Data" calls `handleRandomFill()` in App.js to bypass onboarding.

### Dependencies of Note

- `@react-native-async-storage/async-storage` — all persistence
- `@react-native-community/slider` — intake assessment sliders
- `@expo/vector-icons` (MaterialIcons) — all icons
- `expo-sharing`, `expo-file-system`, `expo-asset` — sharing features
- `expo-router` is installed but **not used** — routing is manual
- `react-native-web` + `react-dom` — web platform support

### Conventions

- All styling uses React Native `StyleSheet.create()` with theme tokens
- Images are placeholder URLs (picsum.photos, i.pravatar.cc)
- Book content is rendered from `BOOK_CHAPTERS` in constants.js, not from the PDF in assets
- No abstractions for data fetching — everything is local/AsyncStorage
- Intake demographic data (age, sex, weight) is collected but not persisted beyond the session
