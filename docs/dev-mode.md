# Dev Mode — Testing Controls

## Overview

Dev mode provides in-app controls on the Dashboard to simulate time passing within the 21-day challenge system. This lets developers test day advancement, missed days, milestone triggers, streak logic, and phase transitions without waiting real calendar days.

## Activation

`DEV_MODE = true` constant at the top of `components/Dashboard.js` (line 28). When `true` and the `onSetDay` / `onDevSimulate` props are present, the dev panel renders above the main scroll content.

## Dev Panel Sections

### Section 1: Jump to Phase

Four phase buttons + a D21 (Done) button. These call `handleSetChallengeDay(pillarId, day)` in `App.js` which directly sets `currentDay` on the challenge state. Only changes `currentDay` — no side effects on completedDays, streakDays, startDate, or completedTasks.

| Button | Sets `currentDay` to | Purpose |
|--------|---------------------|---------|
| P1 | 1 | Jump to Phase 1 start |
| P2 | 6 | Jump to Phase 2 start |
| P3 | 11 | Jump to Phase 3 start |
| P4 | 16 | Jump to Phase 4 start |
| D21 | 21 | Jump to completion |

### Section 2: Time Simulation

Three buttons that call `handleDevSimulateDay(pillarId, action)` in `App.js`. These simulate what happens when real calendar days pass.

| Button | Action | What It Does |
|--------|--------|-------------|
| **+1 Day** | `forward1` | Increments `currentDay` by 1 (capped at 21). Clears today's `completedTasks` so tasks appear unchecked. Sets `lastCompletionDate = null` so the next log counts as a new day. Runs `acknowledgeMilestones(lastLoggedChallengeDay)` to dismiss triggers from the previous logged day (same as `autoAdvanceChallengeDay`). Does NOT auto-log — dev must manually press "Log Today's Tasks" to test the check-in flow. |
| **-1 Day** | `back1` | Decrements `currentDay` by 1 (floor at 1). Clears today's `completedTasks`. Decrements `completedDays` by 1. Sets `lastCompletionDate = null`. |
| **Reset** | `reset` | Resets to Day 1 with `startDate = today`. Clears all challenge state (`completedTasks`, `streakDays`, `completedDays`, `acknowledgedMilestones`, `lastLoggedChallengeDay`). Also resets global state: `isLoggedToday = false`, `streak = 0`, `totalDaysLogged = 0`, `lastLogDate = null`, `logHistory = {}`. |

### Debug Readout

Two monospace text lines below the buttons showing live state:

```
Start: 2026-02-24 | Day: 4/21 | Done: 2 | Missed: 1
Streak: 3 | Total Logged: 5
```

- **Start** — `challengeState.startDate` (immutable once set)
- **Day** — `currentDay / 21`
- **Done** — `completedDays` (how many days user actually logged)
- **Missed** — from `getMissedDays()` (effectiveDay - 1 - completedDays)
- **Streak** — global daily streak from App.js
- **Total Logged** — global totalDaysLogged from App.js

## Handler Implementation (`App.js` lines 399-456)

```js
const handleDevSimulateDay = async (pillarId, action) => {
  const pillarState = challengeStates[pillarId];
  const today = new Date().toISOString().split("T")[0];
  let updated;

  switch (action) {
    case "forward1": { ... }   // currentDay + 1, clear today's tasks
    case "back1": { ... }      // currentDay - 1, decrement completedDays
    case "reset": { ... }      // Full reset to Day 1
  }

  const newStates = { ...challengeStates, [pillarId]: updated };
  setChallengeStates(newStates);
  saveChallengeStates(newStates);
};
```

The handler is **not** inside a `setChallengeStates` callback — it reads `challengeStates` directly. This is intentional: it also needs to update global state (`setIsLoggedToday`, `setStreak`, etc.) which can't happen inside a state setter callback.

## Critical Design Rules

1. **`startDate` is IMMUTABLE** — Dev controls never modify `startDate`. Only `reset` sets it (to today). The `+1 Day` and `-1 Day` buttons only change `currentDay`.

2. **`currentDay` is the source of truth for day display** — On real app load, `autoAdvanceChallengeDay()` sets `currentDay` from the calendar. In dev mode, buttons override it directly.

3. **`lastCompletionDate` must be cleared on advance** — Without this, the `lastCompletionDate !== today` guard in `advanceChallengeDay` / `bulkCompleteChallengeTasks` blocks the next log from incrementing `completedDays`.

4. **Today's `completedTasks` must be cleared on advance** — Otherwise the same task IDs persist and the UI shows tasks as already checked on the "new" day.

5. **No auto-log on +1 Day** — The dev must manually press "Log Today's Tasks" after advancing. This tests the real user flow where tasks appear unchecked each day.

6. **Dev controls vs real users** — Real users never see these controls. Their day advances via `autoAdvanceChallengeDay()` on app load (calendar-based). Dev controls exist solely to simulate what happens across multiple real-world days in a single session.

## Props Passed to Dashboard

```js
<Dashboard
  streak={streak}                     // Global daily streak
  totalDaysLogged={totalDaysLogged}   // Global total days logged
  onSetDay={handleSetChallengeDay}    // Jump to Phase buttons
  onDevSimulate={handleDevSimulateDay} // Time Simulation buttons
  onReset={handleReset}               // Reset Intro Flow button
/>
```

## Styles

Dev panel reuses existing styles: `devPanel`, `devPanelLabel`, `devButtonRow`, `devWeekButton`, `devWeekButtonActive`, `devWeekButtonText`, `devWeekButtonTextActive`, `devWeekButtonSub`, `devCompleteButton`.

Added: `devInfoText` — `{ fontSize: 10, fontFamily: "monospace", color: "#ef4444", textAlign: "center", marginTop: 8 }`.

## Testing Workflow

1. Open app with dev panel visible
2. **Test missed days**: Press +1 Day without logging → missed count increases, warning banner appears
3. **Test logging**: Press "Log Today's Tasks" → completedDays increments, missed count drops
4. **Test milestone triggers**: Advance to Day 5/10/15 without logging → triggers stack up, persist
5. **Test trigger dismissal**: Log on any day >= trigger day → trigger permanently disappears
6. **Test phase transitions**: Use Jump to Phase or +1 Day → tasks unlock progressively
7. **Test completion**: Advance to Day 21 → completion banner, "Cherry on Top" card, rewards
8. **Test reset**: Press Reset → clean Day 1 state, all counters zero
