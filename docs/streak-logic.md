# Streak Logic — Comprehensive Reference

## Two Independent Streak Systems

The app has two completely separate streak counters that don't interact with each other.

---

## 1. Challenge Streak (`streakDays`)

**Location:** `challengeState.streakDays` per pillar
**Updated by:** `advanceChallengeDay()` and `bulkCompleteChallengeTasks()` in `lib/storage.js`
**Tracks:** Consecutive days the user completed ALL challenge tasks for a pillar

### How It Works

Only changes when the user completes all available tasks for the current day:

```
lastCompletionDate === yesterday  →  streakDays + 1  (consecutive)
lastCompletionDate === null       →  streakDays + 1  (first ever log)
lastCompletionDate is 2+ days ago →  streakDays = 1  (reset, today counts as day 1)
lastCompletionDate === today      →  no change       (already logged today)
```

### Key Behaviors

- **Does NOT reset on app load.** If you had a 5-day streak and missed 3 days, it still shows 5 until you log again (then drops to 1). `autoAdvanceChallengeDay` never touches `streakDays`.
- **Resets to 1, not 0.** When you log after a gap, today counts as day 1 of the new streak.
- **Per-pillar.** Each pillar has its own independent streak.
- **Triggered by task completion only.** Opening the app, advancing days, or pressing dev buttons does not affect it.

### Triggered By

| Action | Updates `streakDays`? |
|--------|----------------------|
| Individual task tap in ChallengeDetail (last task completes the day) | Yes |
| "Log Today's Tasks" button on Dashboard | Yes |
| Opening the app | No |
| Dev +1 Day / -1 Day / Reset | No (Reset zeroes it as part of full state clear) |
| `autoAdvanceChallengeDay` on load | No |

### Example Flow

```
Day 1: Log all tasks     → streakDays = 1
Day 2: Log all tasks     → streakDays = 2  (yesterday was logged)
Day 3: Log all tasks     → streakDays = 3
Day 4: Miss (don't log)  → streakDays still shows 3 (no passive reset)
Day 5: Log all tasks     → streakDays = 1  (lastCompletionDate was 2 days ago, reset)
Day 6: Log all tasks     → streakDays = 2
```

### Where It's Displayed

- `ChallengeDetail.js` — shown in the challenge stats
- NOT shown on Dashboard (Dashboard shows global streak in dev readout only)

### Synced to Firestore

Yes — via `syncChallengeProgress()` as `streakDays` field in `users/{userId}/challengeProgress/{pillarId}`.

---

## 2. Global Streak (`streak`)

**Location:** `streak` state in `App.js`
**Updated by:** `evaluateDailyLogOnLoad()` and `logToday()` in `lib/storage.js`
**Tracks:** Consecutive days the user logged via the Dashboard

### How It Works

**On app load** (`evaluateDailyLogOnLoad`):
```
lastLogDate === today     →  isLoggedToday = true, keep streak
lastLogDate === yesterday →  isLoggedToday = false, keep streak
lastLogDate is 2+ days ago or null  →  isLoggedToday = false, streak = 0
```

**On log** (`logToday`):
```
newStreak = min(21, currentStreak + 1)
```

### Key Behaviors

- **Resets passively on app load.** If you missed 2+ days, opening the app resets streak to 0 before you even log.
- **Capped at 21.** `logToday` caps the streak at 21 (matching the challenge duration).
- **Only triggered by Dashboard log.** Completing tasks individually in ChallengeDetail does NOT update the global streak.

### Triggered By

| Action | Updates global `streak`? |
|--------|------------------------|
| "Log Today's Tasks" button on Dashboard | Yes (via `logToday()`) |
| Individual task tap in ChallengeDetail | **No** |
| Opening the app | Yes (evaluates, may reset to 0) |
| Dev Reset | Yes (zeroes everything) |

### Gap: ChallengeDetail Doesn't Update Global Streak

If a user completes all tasks by tapping them individually in ChallengeDetail (not via Dashboard), the challenge `streakDays` updates but the global `streak` does NOT. This means:
- `streak` and `totalDaysLogged` won't increment
- `isLoggedToday` (App.js state) stays false
- `syncDailyLog` doesn't fire (no daily log entry in Firestore)

The Dashboard will correctly show tasks as checked (because it reads from `challengeState.completedTasks`), but the global streak counter won't reflect the log.

### Where It's Displayed

- Dashboard dev readout: `Streak: X | Total Logged: X`
- `ProgressSummary.js` (if implemented)

### Synced to Firestore

Yes — via `syncDailyLog()` as `currentStreak` and `totalDaysLogged` on the user document, plus a daily log entry at `users/{userId}/dailyLogs/{date}`.

---

## Comparison Table

| | Challenge `streakDays` | Global `streak` |
|---|---|---|
| **Scope** | Per pillar | Whole app |
| **Resets on load** | No | Yes (if 2+ days missed) |
| **Resets to** | 1 (on next log) | 0 (on load) |
| **Cap** | None | 21 |
| **Triggered by** | Task completion (any screen) | Dashboard log only |
| **Stored in** | `challengeState.streakDays` | App.js `streak` + AsyncStorage `@al_streak` |
| **Firestore field** | `streakDays` in challengeProgress | `currentStreak` on user doc |

---

## Related State

### `lastCompletionDate` (challenge state)
Date string (YYYY-MM-DD) of the last day all challenge tasks were completed. Used by challenge streak to determine if the streak continues (yesterday) or resets (2+ days ago).

### `lastLogDate` (global, AsyncStorage)
Date string of the last day the user logged via Dashboard. Used by global streak evaluation on app load.

### `totalDaysLogged` (global, App.js)
Running count of all days the user has ever logged. Only incremented by Dashboard log (`logToday()`). Not affected by ChallengeDetail.
