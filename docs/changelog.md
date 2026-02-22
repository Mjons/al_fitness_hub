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

---

## 13. Personalized Nutrition Targets

The Nutrition and Quick Meal Log screens were static mockups — every number was hardcoded ("2,100 kcal", "140g protein", "Goal: Weight Loss", "Fueling your day, Sarah!"). Now they show real personalized targets calculated from the user's onboarding data.

**How it works:** The app already collected weight, age, sex, goals, and experience during onboarding but `App.js` never loaded them back into state after a restart and never passed them to the nutrition screens. This change adds a calculation utility and wires everything together.

### Created
- `lib/nutrition.js` — Pure calculation utility using the Mifflin-St Jeor equation. Computes BMR → TDEE → calorie/protein/fiber/water targets based on the user's body stats, goals, and experience level. Handles goal priority (fat > muscle > maintenance), calorie floors (1,500M / 1,200F), and gracefully returns `null` when data is missing.
- `docs/nutrition-targets.md` — Full documentation with formulas, worked examples, and a 5-profile comparison table

### Modified
- `App.js` — Added 6 new state variables (`userAge`, `userSex`, `userWeight`, `userGoalWeight`, `userGoals`, `userExperience`). Wired into `loadSavedData()` (restore on mount), `handleSaveDemographics()`, `handleSaveGoals()`, `handleRandomFill()`, `handleReset()`. Passes props to both nutrition screens.
- `NutritionSummary.js` — Accepts new props, computes targets via `useMemo`, replaces hardcoded calories/protein/fiber/goal badge with real values. Added water target card. Progress bars show 0% with "Log meals to track progress" hint. Shows `--` when data is missing.
- `NutritionLog.js` — Accepts new props, fixes hardcoded "Sarah!" greeting to use `userName`, replaces fake meal entries with empty state UI ("No meals logged yet"), Coach Al's tip now shows personalized calorie/protein/water targets.

**Full calculation details:** See [`docs/nutrition-targets.md`](./nutrition-targets.md)

---

## 14. Discount Code Copy Button

The 15% off coaching discount code (`PILLAR15`) shown on challenge days 15–20 was plain text with no way to copy it. Added a copy-to-clipboard button.

### What changed
- `ChallengeDetail.js` — The code text is now bolded inline. Below it, a "Copy Code" button copies `PILLAR15` to the clipboard on tap, then shows a green checkmark + "Copied!" for 2 seconds before resetting.

### Added dependency
- `expo-clipboard` — Expo's cross-platform clipboard API (iOS, Android, Web)

---

## 15. Light/Dark Toggle on All Remaining Screens

Extended the theme toggle to every screen that was still missing it. The sun/moon icon now appears in the top-right header slot on all screens.

### Modified
- `MeditationList.js`, `BookScreen.js`, `ChallengeProgress.js`, `ChallengeDetail.js` — First batch: replaced empty `width: 40` spacer with theme toggle
- `NutritionSummary.js`, `NutritionLog.js`, `SupportScreen.js`, `PillarsOverview.js` — Second batch: same treatment
- `ChapterView.js` — Added toggle alongside the existing bookmark button in the header

---

## 16. Fix: Missing Bottom Navigation on Meditate Screen

The Meditate screen (`MeditationList.js`) never imported or rendered `BottomNav`, so the tab bar disappeared when navigating there.

**Fix:** Added `BottomNav` import and rendered it with `currentScreen="MEDITATION_LIST"`. Added `paddingBottom: 120` to content so it scrolls clear of the nav bar. The Meditate tab highlights correctly since it was already defined in `BottomNav.js`.

---

## 17. Nutrition: Commented Out Fake Progress Tracking

The Nutrition Summary stat cards (Daily Calories, Daily Protein) showed a progress bar stuck at 0% and a "Log meals to track progress" hint — but meal logging isn't implemented, so this was misleading.

**Fix:** Commented out the `progressBar`, `progressFill`, and `progressHint` elements in `NutritionSummary.js`. The stat cards now show targets only without implying tracking exists.

---

## 18. Meditation: "Coming Soon" Modal

Tapping any meditation card (Breath Awareness, Present Moment, Grounding & Space) previously tried to navigate to a meditation player that doesn't exist yet.

**Fix:** Added a "Coming Soon" modal in `MeditationList.js`. Tapping any card now shows a centered modal with a meditation icon, "Coming Soon" title, message about sessions being crafted by Coach Al, and a "Got It" dismiss button. Cards no longer call `onSelectMeditation`.

---

## 19. Unified Dashboard Check-in with 21-Day Challenge System

The Dashboard check-in and the 21-day challenge system were completely disconnected. The Dashboard showed one static action (e.g., "Nose Breathing") and incremented a generic streak counter unrelated to challenges. The real challenge progression only lived in ChallengeDetail. Now the Dashboard displays actual challenge tasks and the log button completes them all at once, syncing directly with the challenge system.

### `lib/storage.js`
- **`advanceChallengeDay`** — Prevented unchecking completed tasks. Once a task is checked for today, tapping it again is a no-op (returns `pillarState` unchanged). Removed the toggle-off branch.
- **`bulkCompleteChallengeTasks`** (new) — Marks all available tasks for `currentDay` as completed in one shot. Advances `currentDay` by 1 if eligible (same calendar-enforcement: max 1 per day, cap at 21). Updates streak, completedDays, lastCompletionDate. Returns updated pillarState. Used by Dashboard's log button.

### `App.js`
- **`handleDashboardLog`** (new) — Calls `bulkCompleteChallengeTasks`, updates `challengeStates`, persists to AsyncStorage, keeps generic streak in sync via `logToday()`, fire-and-forget syncs to Firebase (challengeProgress + challengeTasks + dailyLog).
- **Dashboard render** — Replaced `isLoggedToday`/`streak` props with `challengeState={challengeStates[focusPillar]}` and `onToggleLog={handleDashboardLog}`. Added `onSetDay` prop for dev controls.

### `components/Dashboard.js`
- **Props change** — Accepts `challengeState` and `onSetDay` instead of `isLoggedToday`/`streak`. Derives both internally from challenge data.
- **Task list** — Replaced single static action card with real task list from `TWENTY_ONE_DAY_CHALLENGES`. Shows each unlocked task with name, description, and check/circle status. Tasks are read-only (no individual tap) — the log button handles all at once.
- **Day counter** — Shows `Day {currentDay}/21` from challenge state instead of generic streak.
- **Progress bar** — Added thin progress bar + "{N} days logged" label inside the check-in card.
- **Completion state** — When `currentDay >= 21`, shows trophy + completion message instead of tasks.
- **Log button** — Now reads "Log Today's Tasks" / "All Tasks Logged". Disabled after logging.

### `components/ChallengeDetail.js`
- **Uncheck guard** — Completed tasks no longer respond to taps. `onPress` is a no-op when `completed === true`, `activeOpacity` set to 1 so they don't visually respond.

---

## 20. Dashboard Dev Panel (Phase Jump)

Added DEV_MODE controls to Dashboard matching ChallengeDetail's existing dev panel, so day advancement can be tested without navigating away.

- Red-tinted bar at top with P1/P2/P3/P4/D21 jump buttons
- Current phase button highlighted green
- Only renders when `DEV_MODE = true` and `onSetDay` prop is provided
- Calls `handleSetChallengeDay(focusPillarId, day)` for the user's focus pillar

---

## 21. Dashboard Milestone Triggers + Confetti

Ported all challenge milestone triggers from ChallengeDetail to Dashboard and added confetti animation for celebration.

### Trigger Cards (below check-in card)
- **Day 5–9**: Phase 1 encouragement — pillar-specific motivational message
- **Day 10–14**: Mid-Challenge Video — prompt to watch Coach Al's tips
- **Day 15–20**: 15% Off Coaching — shows `PILLAR15` code with copy-to-clipboard button (uses `expo-clipboard`)
- **Day 21+**: Full celebration card — cherry-on-top challenge name/description, rewards list, "Schedule Your Free Session" button linking to Calendly

### Confetti Overlay
- 24 animated pieces (mix of squares and circles) in brand colors (`#13ec13`, `#ec7f13`, `#FFD700`, `#FF6B6B`, `#4ECDC4`, `#A78BFA`)
- Falls from top with horizontal drift, rotation, and fade-out using React Native `Animated` API
- No extra dependencies
- Fires on two occasions:
  1. Tapping "Log Today's Tasks" (immediate reward feedback)
  2. When `currentDay` hits a milestone (5, 10, 15, 21) — e.g., via dev panel phase jumps

### New imports added to Dashboard
- `useState`, `useRef`, `useEffect` from React
- `Animated`, `Dimensions` from react-native
- `expo-clipboard` for discount code copy
- `DAY_21_CHALLENGES`, `DAY_21_REWARDS`, `PHASE_ENCOURAGEMENT` from constants

---

## 22. Other Pillars Visibility Fix

The "Other Pillars" grid on the Dashboard was too faded to read in both light and dark mode.

### Changes
- **Opacity**: `0.5` → `0.75`
- **Icon color**: `gray[500]` → `gray[400]` (brighter in both themes — the gray scale is inverted between dark/light modes so `gray[400]` maps to a more visible shade in each)
- **Label font size**: `8px` → `9px` for better readability

---

## 23. Removed "Coming Soon" Locked Tasks from ChallengeDetail

Removed the "Coming Soon" section that previewed locked/upcoming tasks in `ChallengeDetail.js`. Users now only see their currently available tasks — no spoilers for future phases. Also removed the unused `lockedTasks` variable and associated styles (`lockedTaskCard`, `lockedTaskCheckbox`, `lockedTaskName`, `lockedTaskDescription`, `unlockBadge`, `unlockBadgeText`).

---

## 24. Reset Intro Flow — Dev Only

Moved the "Reset Intro Flow" button on the Dashboard behind the `DEV_MODE` flag. Normal users no longer see it — only visible during development alongside the phase jump panel.

---

## 25. Hide "Skip with Random Data" Button

Set `DEV_MODE = false` in `WelcomeScreen.js`. The "Skip with Random Data (Dev)" button is now hidden from users. All underlying logic (`onRandomFill`, `handleRandomFill` in App.js) remains intact — flip `DEV_MODE` back to `true` to re-enable.

---

## 26. Coach Al Photo on Landing Page

Added Coach Al's actual photo to the Landing Page "Meet Your Coach" section. Reverted WelcomeScreen back to its original picsum placeholder + "High Intensity" badge.

### Changes
- `LandingPage.js` — Replaced gray circle placeholder in the "About Coach Al" section with `require("../assets/al-coach.png")`. Increased image container height from 160→220px for better photo display. Added `aboutImage` style with `resizeMode: "cover"`.
- `WelcomeScreen.js` — Reverted hero image back to `picsum.photos/400/360` placeholder and restored "High Intensity" badge with bolt icon.
- `assets/al-coach.png` — Already copied from Desktop in previous step.

---

## 27. Lock Non-Focus Pillars in 21-Day Challenges

Only the user's weakest pillar (determined by the onboarding questionnaire) is unlocked in the Challenge Progress screen. All other pillars are locked until the focus pillar's 21-day challenge is completed.

### Changes
- `App.js` — Passes `focusPillar` prop to both `ChallengeProgress` renders.
- `ChallengeProgress.js`:
  - Accepts new `focusPillar` prop
  - Non-focus pillars render as locked: 55% opacity, lock icon replacing pillar icon, "Complete your focus pillar first" subtitle, no stats row, progress bar shows "—"
  - Locked cards are not tappable (no-op `onPress`, `activeOpacity: 1`)
  - Already-completed pillars remain visible and tappable regardless of focus
  - Updated info card text to explain the sequential unlock flow
  - New styles: `challengeCardLocked`, `challengeIconLocked`, `lockedText`, `lockedSubtext`