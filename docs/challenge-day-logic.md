# Challenge Day Logic — Comprehensive Reference

## Challenge State Shape

Each pillar has its own state object stored in `challengeStates[pillarId]`:

```js
{
  currentDay: 1,                  // Which day of the 21-day challenge (1-21)
  completedTasks: {},             // { "2026-02-24": ["task_1", "task_2"], ... }
  streakDays: 0,                  // Consecutive days logged within this challenge
  completedDays: 0,               // Total days the user actually logged
  lastCompletionDate: null,       // "YYYY-MM-DD" of last day all tasks were completed
  startDate: null,                // "YYYY-MM-DD" set once on first log, never changes after
  acknowledgedMilestones: [],     // [5, 10, 15] — milestones permanently dismissed on next day transition
  lastLoggedChallengeDay: null,   // The currentDay value when user last completed all tasks (number)
}
```

Built by `buildInitialChallengeStates()` in `App.js` (line 74). Stored via `saveChallengeStates()` in AsyncStorage under `@al_challenge_states`.

---

## Day Advancement — Two Systems

### 1. Calendar-Based (Real Users)

On every app load, `autoAdvanceChallengeDay()` in `lib/storage.js` (line 409) runs:

```
calendarDay = min(21, daysBetween(startDate, today) + 1)
if calendarDay > currentDay → set currentDay = calendarDay
```

This means:
- If user opens app 3 days after starting, `currentDay` jumps to 4 (if it was 1)
- `startDate` is set once (on first task completion) and **never changes**
- `currentDay` can only go forward, never backward, via calendar

### 2. Dev Controls (Testing Only)

`handleDevSimulateDay()` in `App.js` (line 399) directly sets `currentDay` via `+1 Day` / `-1 Day` buttons. Does not touch `startDate`. See `docs/dev-mode.md` for full details.

---

## Task Completion Flow

### Single Task Toggle (`advanceChallengeDay` — `lib/storage.js` line 293)

Called from `handleToggleChallengeTask` in `App.js` when user taps individual task checkbox (used in `ChallengeDetail`).

1. If task already in `completedTasks[today]` → no-op (no unchecking)
2. Add task ID to `completedTasks[today]`
3. Check if ALL available tasks for `currentDay` are now complete
4. If all done AND `lastCompletionDate !== today`:
   - Set `lastCompletionDate = today`
   - Increment `completedDays`
   - Run `acknowledgeMilestones()` — marks any trigger milestones as permanently dismissed
   - Update `streakDays` based on whether `lastCompletionDate` was yesterday (continue streak) or older (reset to 1)

**Does NOT increment `currentDay`.** Day advancement is only via calendar or dev controls.

### Bulk Complete (`bulkCompleteChallengeTasks` — `lib/storage.js` line 353)

Called from `handleDashboardLog` in `App.js` when user presses "Log Today's Tasks" on Dashboard.

1. Gets all available task IDs for `currentDay`
2. Merges them into `completedTasks[today]`
3. If already all done → returns same state (no-op)
4. Same completion logic as single toggle: increment `completedDays`, update streak, acknowledge milestones
5. `handleDashboardLog` also calls `logToday()` to update global streak/totalDaysLogged

**Does NOT increment `currentDay`.**

---

## `startDate` — The Immutable Anchor

- Set to today's date on the first task completion (`startDate: pillarState.startDate || today`)
- **Never modified after that** — not by logging, not by dev +1/-1 Day, not by any user action
- Only exception: dev "Reset" button sets `startDate = today` (fresh start)
- Used by `autoAdvanceChallengeDay()` to calculate real calendar day
- Used by `getMissedDays()` to calculate how many days were skipped

---

## Missed Days Calculation

`getMissedDays()` in `lib/storage.js` (line 423):

```js
calendarDay = min(21, daysBetween(startDate, today) + 1)
effectiveDay = max(currentDay, calendarDay)  // Supports dev mode where currentDay > calendar
pastDays = effectiveDay - 1                  // Days that have elapsed (not counting today)
missedDays = max(0, pastDays - completedDays)
```

### Why `Math.max(currentDay, calendarDay)`?

- **Real users**: `currentDay` matches calendar, so `effectiveDay = calendarDay`
- **Dev mode**: `currentDay` can be artificially advanced past the calendar day. Without `Math.max`, missed days would always calculate from the real calendar and show 0 in dev mode.

### Display

- **Progress row** (line 346): `"X days logged  •  Y missed"` — inline, only shows missed part if > 0
- **Warning banner** (line 350): Appears when `missedDays > 0 && !isLoggedToday`. Two-line format:
  - Line 1: `"You missed X day(s)."`
  - Line 2: `"No worries — check in today to keep going!"` (hidden on Day 21 when `isCompleted`)
- Banner has `marginTop: 4`, warning-amber icon, orange tinted background

---

## Streak Logic

Two independent streak systems exist — challenge-level and global. They don't interact.

**Full details:** See [`docs/streak-logic.md`](./streak-logic.md)

**Quick summary:**
- **Challenge `streakDays`** — per-pillar, consecutive days all tasks completed, resets to 1 on gap, does NOT reset on app load
- **Global `streak`** — whole app, consecutive days logged via Dashboard, resets to 0 on app load if 2+ days missed, capped at 21

---

## Milestone Trigger Display

### Trigger Conditions (Dashboard lines 429-481)

Three milestone triggers at days 5, 10, and 15:

| Day | Trigger | Content |
|-----|---------|---------|
| 5 | "You're Building Momentum!" | Pillar-specific encouragement from `PHASE_ENCOURAGEMENT` |
| 10 | "Mid-Challenge Video" | Coach Al motivation and tips |
| 15 | "15% Off Coaching!" | Discount code `PILLAR15` with copy button |

### Visibility Rule (Days 1-20)

A trigger is visible when:
```
!isCompleted  AND  currentDay >= triggerDay  AND  !acknowledgedMilestones.includes(triggerDay)
```

Regular triggers are hidden on Day 21 (`!isCompleted`) — the recap section takes over.

### Stacking Behavior

If user misses multiple days without logging, triggers **stack up**. Example:
- User logs Day 4, doesn't open app for a week
- On next open, `currentDay` auto-advances to Day 11
- Both Day 5 AND Day 10 triggers appear simultaneously
- They stay visible until the user logs AND the next day arrives

### Dismissal Timing — "Stay for the Day, Gone Tomorrow"

Triggers stay visible for the entire day the user logs in. They only disappear on the **next day transition**. This is implemented via a two-step system:

**Step 1: At log time** (`advanceChallengeDay` / `bulkCompleteChallengeTasks`):
- Sets `lastLoggedChallengeDay = currentDay` (records which challenge day was logged)
- Does NOT modify `acknowledgedMilestones` — triggers remain visible

**Step 2: At day transition** (`autoAdvanceChallengeDay` on app load / dev `+1 Day`):
- Runs `acknowledgeMilestones(lastLoggedChallengeDay, existing)`
- Acknowledges milestones where `triggerDay <= lastLoggedChallengeDay`
- Now those triggers are permanently dismissed

```js
function acknowledgeMilestones(lastLoggedDay, existing) {
  if (!lastLoggedDay) return existing || [];
  const ack = existing || [];
  const newAck = [5, 10, 15].filter(m => lastLoggedDay >= m && !ack.includes(m));
  return newAck.length > 0 ? [...ack, ...newAck] : ack;
}
```

### Examples

**Log on trigger day:**
1. Day 5 — trigger appears. User logs. `lastLoggedChallengeDay = 5`. Trigger stays.
2. Day 6 — `autoAdvanceChallengeDay` fires. `acknowledgeMilestones(5, [])` → `5 >= 5` → acknowledged. Trigger gone.

**Miss trigger day, log later:**
1. Day 5 — trigger appears. User doesn't log. `lastLoggedChallengeDay` stays `null`.
2. Day 6 — app opens. `acknowledgeMilestones(null, [])` → null guard, returns `[]`. Trigger stays.
3. User logs on Day 6. `lastLoggedChallengeDay = 6`. Trigger stays for rest of Day 6.
4. Day 7 — `acknowledgeMilestones(6, [])` → `6 >= 5` → acknowledged. Trigger gone.

**Miss multiple days:**
1. User logs Day 3. `lastLoggedChallengeDay = 3`.
2. User doesn't open app until Day 12. `autoAdvanceChallengeDay` fires. `acknowledgeMilestones(3, [])` → no milestones <= 3 to acknowledge. Day 5 and Day 10 triggers both appear.
3. User logs on Day 12. `lastLoggedChallengeDay = 12`. Both triggers stay.
4. Day 13 — `acknowledgeMilestones(12, [])` → `12 >= 5` and `12 >= 10` → both acknowledged. Both gone.

Once acknowledged, a trigger **never shows again** — even if the user goes backward with dev controls.

### Day 21 — Recap + Celebration

On Day 21 (`isCompleted = true`), two things happen:

**1. Cherry on Top celebration card:**
- Capstone challenge from `DAY_21_CHALLENGES[pillarId]`
- Rewards from `DAY_21_REWARDS` (free coaching call, free training session)
- "Schedule Your Free Session" button (Calendly link)
- Uses `isCompleted` (`currentDay >= 21`) — not the milestone system

**2. Recap triggers (always shown, ignoring acknowledgment status):**

| Label | Content |
|-------|---------|
| "Look How Far You've Come!" | Generic motivational text (not pillar-specific) — "21 days of showing up for yourself..." |
| "Watch Your Motivation Video" | Coach Al's message for continuing the journey beyond the challenge |
| "Your Coaching Discount" | Same `PILLAR15` discount code with copy button |

These recap triggers are **not** gated by `acknowledgedMilestones`. They always appear on Day 21 as a motivational summary of what the user earned during the journey. This means even if the user acknowledged all milestones along the way, they still see these as a final recap on completion.

---

## Phase System

Phases group days into 4 blocks. Each phase unlocks new tasks.

| Phase | Days | Tasks Unlocked |
|-------|------|---------------|
| 1 | 1-5 | Tasks with `unlockedDay <= currentDay` |
| 2 | 6-10 | More tasks unlock |
| 3 | 11-15 | More tasks unlock |
| 4 | 16-21 | All tasks available |

`getPhaseFromDay(day)` in `constants.js`:
```js
if (day <= 5) return 1;
if (day <= 10) return 2;
if (day <= 15) return 3;
return 4;
```

Tasks are filtered by `challenge.tasks.filter(t => t.unlockedDay <= currentDay)`.

---

## Confetti Animation

`ConfettiOverlay` component triggers when `currentDay` changes to a milestone value (5, 10, 15, 21). Uses `useRef` to track previous day and `useEffect` to detect changes. Only fires once per day change via `confettiKey` state counter.

Also triggers when user presses "Log Today's Tasks" button.

---

## Data Flow Summary

```
App Load
  └→ loadAllData() reads from AsyncStorage
  └→ autoAdvanceChallengeDay() recalculates currentDay from calendar
  │     └→ acknowledgeMilestones(lastLoggedChallengeDay) — dismisses triggers from previous logged day
  └→ evaluateDailyLogOnLoad() evaluates streak from lastLogDate

User Taps "Log Today's Tasks" (Dashboard)
  └→ handleDashboardLog()
     └→ bulkCompleteChallengeTasks() — marks all tasks done, sets lastLoggedChallengeDay
     └→ logToday() — updates global streak/totalDaysLogged
     └→ saveChallengeStates() — persists to AsyncStorage
     └→ syncChallengeProgress() — fire-and-forget to Firestore
     (triggers stay visible — dismissed on next day transition)

User Taps Individual Task (ChallengeDetail)
  └→ handleToggleChallengeTask()
     └→ advanceChallengeDay() — toggles single task, sets lastLoggedChallengeDay if all done
     └→ saveChallengeStates() — persists to AsyncStorage

Next Real Day (user reopens app)
  └→ autoAdvanceChallengeDay() bumps currentDay + acknowledges milestones
  └→ Tasks for today appear unchecked (new date key in completedTasks)
  └→ If yesterday wasn't logged → missedDays increases
  └→ Triggers from logged days are now dismissed
```

---

## Key Invariants

1. `startDate` never changes after initial set
2. `currentDay` only increases via calendar (or dev controls) — task completion never touches it
3. `completedTasks` is keyed by real date string (YYYY-MM-DD), not by day number
4. `lastCompletionDate` gates against double-counting logs on the same day
5. `acknowledgedMilestones` is append-only — milestones once dismissed stay dismissed
6. `lastLoggedChallengeDay` records which `currentDay` the user last logged — used for delayed trigger dismissal
7. Triggers stay visible for the entire day the user logs — dismissed only on the next day transition (via `autoAdvanceChallengeDay` or dev `+1 Day`)
6. `getMissedDays` works for both real calendar users and dev-simulated days via `Math.max`
