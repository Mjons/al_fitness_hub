# Session Log — Feb 22, 2026

## 1. Data Persistence Layer + Firebase Cloud Sync

**The big one.** Fixed the fundamentally broken data layer.

### Created
- `lib/firebase.js` — Firebase config (connected to `al-fitness-hub` project)
- `lib/storage.js` — Local persistence with `@al_` keys, date-aware streaks, calendar-enforced challenges, migration from v1
- `lib/sync.js` — Fire-and-forget Firestore writes for all user events
- `docs/data-layer-setup.md` — Full setup documentation

### Modified
- `App.js` — Replaced all raw AsyncStorage with storage/sync modules. Added handlers for demographics, goals, pillar scores. Daily log is now idempotent + date-aware.
- `IntakePersonal.js` — Now passes email upstream
- `IntakeDemographics.js` — Now passes age/sex/weight/goalWeight upstream
- `IntakeGoals.js` — Added injuries state, wired TextInput, passes all data upstream

### Firebase Setup
- Created Firebase project `al-fitness-hub`
- Registered web app, got config keys
- Created Firestore database
- Deployed open security rules (MVP)

---

## 2. Bug Fix: Firebase Install (WSL/Windows)

Firebase installed from WSL corrupted `package.json` inside `node_modules/firebase`. Reinstalled from Windows PowerShell to fix.

Also removed `proto-loader-gen-types` symlink in `.bin` that caused EACCES permission error (gRPC CLI tool not needed at runtime).

---

## 3. Removed "Upgrade to Pro" from Dashboard

Removed the `Upgrade to Pro` link and lock icons from the pillars section on the home page. Renamed section to "Other Pillars".

---

## 4. Landing Page — Responsive Pillars

The 7 pillars grid used a fixed width from `Dimensions.get("window")` captured once at import. Didn't adapt on mobile.

**Fix:**
- Switched to `useWindowDimensions` (reactive)
- Changed pillars from 2-column grid to vertical stack (each pillar = horizontal row with icon + text)
- Made features grid responsive (1 col on narrow, 2 on wide)
- Book section stacks vertically on very narrow screens


## 5. Light/Dark Mode Toggle

Full theme system implementation. App was dark-mode-only; now supports both with dark as default.

### Created
- `styles/ThemeContext.js` — React Context with `ThemeProvider` and `useTheme()` hook returning `{ colors, isDark, toggleTheme }`

### Major Rewrite
- `styles/theme.js` — Defined dual palettes (`darkColors` / `lightColors`) with identical key structure. Added semantic tokens: `text`, `textSecondary`, `textMuted`, `textInverse`, `divider`, `overlay`, `overlayLight`, `overlayMedium`, `cardOverlay`, `scrim`. Light palette inverts the gray scale so existing `gray[400]`/`gray[500]` references auto-map correctly. Backward-compat aliases (`backgroundDark`, `surfaceDark`, `white`, `black`) kept.

### Modified
- `lib/storage.js` — Added `THEME` key, `saveTheme()` export, theme field in `loadAllData()`
- `App.js` — Added `isDark` state, `toggleTheme` function, `ThemeProvider` wrapper, dynamic `StatusBar` barStyle, persists preference via AsyncStorage
- **All 23 component files** — Migrated from static `import { colors }` to `useTheme()` hook + `useMemo(() => makeStyles(colors), [colors])` factory pattern. Replaced `backgroundDark` → `background`, `surfaceDark` → `surface`, `colors.white` (text) → `colors.text`, `colors.black` (button text) → `colors.textInverse`, hardcoded `rgba(255,255,255,...)` → semantic tokens

### Theme Toggle Placement
- **Dashboard** — Sun/moon icon replaces notification bell in header
- **Landing Page** — Toggle next to "Get Started" button in header
- **All 7 intake steps + Safety Notice** — Toggle in top-right header (replaces empty spacer)

### Design Decisions
- Decorative/pillar colors (`#60A5FA`, `#A78BFA`, etc.) kept as-is in both modes
- Meal category colors (`#f97316`, `#6366f1`, etc.) kept as-is
- Text on colored buttons (green primary, orange CTA) stays literal white — correct on both backgrounds
- Image overlay rgba values kept as-is (always on dark image scrim)
- `ProgressSummary.js` and `SettingsScreen.js` not migrated (dead code per plan)

---

## 6. Intake Form Data Persistence (Back Navigation)

Previously, going back during the questionnaire reset all form data. Now all intake answers are preserved when navigating back.

### How it works
- `App.js` — Added `intakeData` state object. Each intake handler saves raw form data on forward navigation.
- All 7 intake components — Accept `initialData` prop, initialize `useState` from it with `??` fallback to defaults. Steps 4-7 pass raw form data as additional last argument to `onNext`.

### Files Modified
- `App.js` — `intakeData` state, updated all intake handlers and `renderScreen` cases to pass `initialData`
- `IntakePersonal.js` — Accepts `initialData`, inits `name`/`email` from it
- `IntakeDemographics.js` — Accepts `initialData`, inits `sex`/`age`/`weight`/`goalWeight`, passes raw strings as second arg to `onNext`
- `IntakeGoals.js` — Accepts `initialData`, inits `selectedGoals`/`experience`/`injuries`
- `IntakeMovement.js` — Accepts `initialData`, inits all 8 state vars, passes form data object with score
- `IntakeNutrition.js` — Accepts `initialData`, inits `processedFreq`/`water`, passes form data with scores
- `IntakeBreathingSleep.js` — Accepts `initialData`, inits all 6 state vars, passes form data with scores
- `IntakeMindfulness.js` — Accepts `initialData`, inits all 6 state vars, passes form data with scores

---

## 7. Light Mode Fix: Water Drop Visibility

Inactive water drops on Step 5 (IntakeNutrition) used `colors.overlay` which was `rgba(0,0,0,0.06)` in light mode — nearly invisible.

**Fix:** Changed inactive drop color from `colors.overlay` to `colors.gray[600]` — visible in both modes.

---

## 8. Safety Notice: Legal Disclaimer Visibility

The "Legal Disclaimer" title blended into the card in both modes.

**Fix:** Increased font size 12→16, weight 700→800, changed color from `gray[500]` to `colors.warning` (orange), added gavel icon next to title with a `disclaimerTitleRow` flex container.

---

## 9. Intake Steps 4 & 6: Spacing Tightened

Steps 4 (Movement) and 6 (Breathing & Sleep) required scrolling to see all content.

### Spacing Reductions (both files)
- Section margin: 40→24px
- Section header margin: 16→12px
- Title margin: 32→20px (Movement), titleSection margin: 32→20px + marginTop 16→8px (BreathingSleep)
- Slider card padding: 24→16px
- Slider margin-top: 16→8px
- Steps value font: 48→36px (Movement), 40→32px (BreathingSleep)
- Footer and button size kept consistent with other steps (height 64, padding 24/32)

---

## 10. Pillar Scoring Overhaul + Live Pillar Display

Redesigned all 7 pillar scoring formulas and wired real scores to the Pillars screen. Previously the Pillars screen showed hardcoded fake numbers — now it displays your actual onboarding answers.

**What changed:**
- Fixed a bug where the Mindfulness score was **inverted** (stressed users scored high, peaceful users scored low)
- The "Do you practice mindfulness?" question was collected but never used — now it factors into the score
- Widened scoring ranges for all pillars (most were stuck in a 3-point range like 4–7, now use the full 1–10 scale)
- Pillars screen now shows dynamic scores, a real average balance, auto-detected weakest pillar hint, and status labels based on your actual score
- Removed hardcoded scores/statuses from the PILLARS constant

**Full scoring details:** See [`docs/pillar-scoring.md`](./pillar-scoring.md)

**Files modified:** `IntakeMovement.js`, `IntakeNutrition.js`, `IntakeBreathingSleep.js`, `IntakeMindfulness.js`, `constants.js`, `PillarsOverview.js`, `App.js`

---

## 11. Firebase User Deletion Script

Admin script to completely remove a user's data from Firestore by email address.

### Created
- `scripts/delete-user.js` — Queries Firestore for user documents matching an email, shows matches with confirmation prompt, then deletes the user document and all subcollections (`dailyLogs`, `challengeProgress`, `challengeTasks`, `bookProgress`)

### Usage
```bash
node scripts/delete-user.js user@example.com
```

---

## 12. README

Added `README.md` to project root with project overview, setup/run instructions, and script usage documentation.