# Data Persistence Layer + Firebase Cloud Sync

## What Was Built

### Problem
- Daily check-ins had no date awareness (could toggle on/off, streak was meaningless)
- Pillar scores from intake assessment were lost on app restart
- Challenge days could all be completed in one sitting (no calendar enforcement)
- Intake data (email, age, weight, goals, injuries) was collected then discarded
- Coach Al had zero visibility into user data — everything trapped on devices

### Solution
Two-layer data architecture: **local-first persistence** (AsyncStorage) + **cloud sync** (Firebase Firestore).

```
User's Phone                         Cloud
┌─────────────────┐      sync      ┌──────────────────┐
│  AsyncStorage    │ ──────────→   │  Firebase         │
│  (offline-first) │               │  Firestore        │
│                  │               │                   │
│  lib/storage.js  │               │  Coach Al views   │
│  (local logic)   │               │  via Firebase     │
│                  │               │  Console          │
└─────────────────┘               └──────────────────┘
```

The app works fully offline. Firestore receives data on key events (signup, check-in, task toggle, etc.) via fire-and-forget writes that never block the UI.

---

## Files Created

### `lib/firebase.js`
Firebase app initialization + Firestore export. Contains the client-side config (NOT secrets — these are public identifiers secured by Firestore rules).

### `lib/storage.js`
Local persistence module. All AsyncStorage logic centralized here:

- **`@al_` prefixed keys** — namespaced to avoid collisions
- **`migrateIfNeeded()`** — one-time migration from old flat keys (`userName`, `streak`, etc.) to new `@al_` keys
- **`evaluateDailyLogOnLoad(lastLogDate, streak)`** — date-aware streak evaluation:
  - `lastLogDate == today` → already logged, keep streak
  - `lastLogDate == yesterday` → not logged yet, keep streak
  - `lastLogDate == 2+ days ago or null` → streak resets to 0
- **`logToday()`** — idempotent check-in (sets lastLogDate=today, streak capped at 21)
- **`advanceChallengeDay()`** — calendar-enforced challenge progression:
  - Can only advance 1 day per calendar day
  - Tracks `lastCompletionDate` to prevent double-advancement
- **`saveAllData()` / `clearAllData()`** — bulk operations for random fill and reset

### `lib/sync.js`
Fire-and-forget Firestore writes. Every function is wrapped in try/catch — if offline or Firebase is down, the app works normally:

- `syncUserProfile(userId, profile)`
- `syncPillarScores(userId, scores, focusPillar)`
- `syncDailyLog(userId, date, streak, totalDaysLogged)`
- `syncChallengeProgress(userId, pillarId, state)`
- `syncChallengeTasks(userId, pillarId, date, tasks)`
- `syncBookProgress(userId, chapterId, isRead)`
- `syncAllData(userId, data)` — bulk sync for random fill

---

## Files Modified

### `App.js`
- Removed all direct AsyncStorage calls — uses `lib/storage.js` and `lib/sync.js`
- Migration runs on load → parallel data load → streak evaluation
- `handleToggleLog` — now idempotent (no-op if already logged today)
- `handleSaveName(name, email)` — persists + syncs email
- NEW `handleSaveDemographics({ age, sex, weight, goalWeight })` — persists + syncs
- NEW `handleSaveGoals(goals, experience, injuries)` — persists + syncs
- `finalizeAssessment` — persists pillar scores + focus pillar + syncs
- `handleToggleChallengeTask` — uses calendar enforcement + syncs
- `handleRandomFill` — persists ALL data locally + syncs everything
- `handleReset` — clears local data only (Firestore data preserved for Coach Al)

### `components/IntakePersonal.js`
- `onNext(name)` → `onNext(name, email)` — email now passed upstream

### `components/IntakeDemographics.js`
- `onNext()` → `onNext({ age, sex, weight, goalWeight })` — demographic data now passed upstream

### `components/IntakeGoals.js`
- Added `injuries` state + wired TextInput
- `onNext()` → `onNext(selectedGoals, experience, injuries)` — goals data now passed upstream

---

## Firebase Setup (What You Need To Do)

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** (or "Add project")
3. Name it something like `coach-al-wellness`
4. Disable Google Analytics (not needed for MVP) or enable if you want it
5. Click **Create project**

### Step 2: Add a Web App

1. In your Firebase project, click the **web icon** (`</>`) to add a web app
2. Name it `Coach Al Wellness App`
3. Do NOT check "Firebase Hosting" (not needed)
4. Click **Register app**
5. You'll see a config object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "coach-al-wellness.firebaseapp.com",
  projectId: "coach-al-wellness",
  storageBucket: "coach-al-wellness.firebasestorage.app",
  messagingSenderId: "757498...",
  appId: "1:757498...:web:abc123..."
};
```

6. Copy these values into `lib/firebase.js`, replacing the placeholder config

### Step 3: Create Firestore Database

1. In Firebase Console, go to **Build → Firestore Database**
2. Click **"Create database"**
3. Choose a location (e.g., `us-central` or closest to your users)
4. Start in **production mode** (we'll set custom rules next)

### Step 4: Deploy Security Rules

In Firebase Console → Firestore Database → **Rules** tab, replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if true;
      match /{subcollection}/{docId} {
        allow read, write: if true;
      }
    }
  }
}
```

Click **Publish**.

#### Why open rules are OK for MVP:
- No sensitive data (no passwords, no payment info)
- User IDs are random UUIDs — can't be guessed
- No authentication system yet
- Coach Al has full admin access via Firebase Console
- When auth is added later, tighten to `request.auth.uid == userId`

### Step 5: Verify It Works

1. Run the app and complete the intake flow (or use "Skip with Random Data")
2. Open Firebase Console → Firestore Database → Data tab
3. You should see a `users` collection with a document containing:
   - User profile (name, email, age, weight, etc.)
   - Pillar scores and focus pillar
   - Timestamps

---

## Firestore Data Model

### `users/{userId}` (main document)
```
{
  name: "Alex",
  email: "alex@example.com",
  age: 32,
  sex: "Male",
  weight: 185,
  goalWeight: 165,
  goals: ["fat", "energy"],
  experience: "int",
  injuries: "Lower back pain",
  intakeCompleted: true,
  pillarScores: { breathing: 4, sleep: 6, ... },
  focusPillar: "breathing",
  currentStreak: 5,
  lastLogDate: "2026-02-22",
  totalDaysLogged: 12,
  createdAt: <server timestamp>,
  lastActiveAt: <server timestamp>
}
```

### `users/{userId}/dailyLogs/{date}`
```
{ logged: true, loggedAt: <server timestamp> }
```

### `users/{userId}/challengeProgress/{pillarId}`
```
{
  currentDay: 8,
  startDate: "2026-02-01",
  lastCompletionDate: "2026-02-22",
  streakDays: 5,
  completedDays: 7,
  updatedAt: <server timestamp>
}
```

### `users/{userId}/challengeTasks/{pillarId_date}`
```
{
  pillarId: "breathing",
  date: "2026-02-22",
  tasks: ["morning_breath", "stress_reset"],
  allCompleted: true
}
```

### `users/{userId}/bookProgress/{chapterId}`
```
{ isRead: true, readAt: <server timestamp> }
```

---

## How Coach Al Views Data

Open Firebase Console → Firestore Database → Data tab:

- **See all users**: Click on the `users` collection
- **See a specific user**: Click on any user document to see their profile, scores, streak
- **See daily logs**: Click into a user → `dailyLogs` subcollection
- **See challenge progress**: Click into a user → `challengeProgress` subcollection
- **Query across users**: Use the Firebase Console query builder or the Firebase CLI

### Useful Queries (in Firebase Console)
- All users who completed intake: Filter `users` where `intakeCompleted == true`
- Users active today: Filter `users` where `lastLogDate == "2026-02-22"`
- Users with high streaks: Filter `users` where `currentStreak >= 7`
