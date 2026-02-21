import { db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// Fire-and-forget: all sync functions are wrapped in try/catch.
// If offline or Firebase is down, the app works normally via AsyncStorage.

export async function syncUserProfile(userId, profile) {
  try {
    await setDoc(
      doc(db, "users", userId),
      {
        ...profile,
        lastActiveAt: serverTimestamp(),
      },
      { merge: true },
    );
  } catch (e) {
    console.log("Sync: profile failed (offline?)", e.message);
  }
}

export async function syncPillarScores(userId, scores, focusPillar) {
  try {
    await setDoc(
      doc(db, "users", userId),
      {
        pillarScores: scores,
        focusPillar,
        intakeCompleted: true,
        lastActiveAt: serverTimestamp(),
      },
      { merge: true },
    );
  } catch (e) {
    console.log("Sync: pillar scores failed (offline?)", e.message);
  }
}

export async function syncDailyLog(userId, date, streak, totalDaysLogged) {
  try {
    // Update user summary
    await setDoc(
      doc(db, "users", userId),
      {
        currentStreak: streak,
        lastLogDate: date,
        totalDaysLogged,
        lastActiveAt: serverTimestamp(),
      },
      { merge: true },
    );

    // Write daily log entry
    await setDoc(doc(db, "users", userId, "dailyLogs", date), {
      logged: true,
      loggedAt: serverTimestamp(),
    });
  } catch (e) {
    console.log("Sync: daily log failed (offline?)", e.message);
  }
}

export async function syncChallengeProgress(userId, pillarId, state) {
  try {
    await setDoc(
      doc(db, "users", userId, "challengeProgress", pillarId),
      {
        currentDay: state.currentDay,
        startDate: state.startDate,
        lastCompletionDate: state.lastCompletionDate || null,
        streakDays: state.streakDays,
        completedDays: state.completedDays || 0,
        updatedAt: serverTimestamp(),
      },
    );
  } catch (e) {
    console.log("Sync: challenge progress failed (offline?)", e.message);
  }
}

export async function syncChallengeTasks(userId, pillarId, date, tasks) {
  try {
    const docId = `${pillarId}_${date}`;
    await setDoc(doc(db, "users", userId, "challengeTasks", docId), {
      pillarId,
      date,
      tasks,
      allCompleted: tasks.length > 0,
      updatedAt: serverTimestamp(),
    });
  } catch (e) {
    console.log("Sync: challenge tasks failed (offline?)", e.message);
  }
}

export async function syncBookProgress(userId, chapterId, isRead) {
  try {
    await setDoc(doc(db, "users", userId, "bookProgress", chapterId), {
      isRead,
      readAt: isRead ? serverTimestamp() : null,
    });
  } catch (e) {
    console.log("Sync: book progress failed (offline?)", e.message);
  }
}

// Sync all data at once (used by random fill and migration)
export async function syncAllData(userId, data) {
  try {
    await setDoc(
      doc(db, "users", userId),
      {
        name: data.name || null,
        email: data.email || null,
        age: data.age || null,
        sex: data.sex || null,
        weight: data.weight || null,
        goalWeight: data.goalWeight || null,
        goals: data.goals || null,
        experience: data.experience || null,
        injuries: data.injuries || null,
        intakeCompleted: data.intakeCompleted || false,
        pillarScores: data.pillarScores || null,
        focusPillar: data.focusPillar || null,
        currentStreak: data.streak || 0,
        lastLogDate: data.lastLogDate || null,
        totalDaysLogged: data.totalDaysLogged || 0,
        createdAt: serverTimestamp(),
        lastActiveAt: serverTimestamp(),
      },
      { merge: true },
    );
  } catch (e) {
    console.log("Sync: bulk sync failed (offline?)", e.message);
  }
}
