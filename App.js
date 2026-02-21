import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StatusBar } from "react-native";

import { WelcomeScreen } from "./components/WelcomeScreen";
import { IntakePersonal } from "./components/IntakePersonal";
import { IntakeDemographics } from "./components/IntakeDemographics";
import { IntakeGoals } from "./components/IntakeGoals";
import { IntakeMovement } from "./components/IntakeMovement";
import { IntakeNutrition } from "./components/IntakeNutrition";
import { IntakeBreathingSleep } from "./components/IntakeBreathingSleep";
import { IntakeMindfulness } from "./components/IntakeMindfulness";
import { SafetyNotice } from "./components/SafetyNotice";
import { Dashboard } from "./components/Dashboard";
import { WorkoutList } from "./components/WorkoutList";
import { WorkoutDetail } from "./components/WorkoutDetail";
import { NutritionLog } from "./components/NutritionLog";
import { NutritionSummary } from "./components/NutritionSummary";
import { PillarsOverview } from "./components/PillarsOverview";
import { SupportScreen } from "./components/SupportScreen";
import { ChallengeProgress } from "./components/ChallengeProgress";
import { ChallengeDetail } from "./components/ChallengeDetail";
import { BookScreen } from "./components/BookScreen";
import { ChapterView } from "./components/ChapterView";
import { LandingPage } from "./components/LandingPage";
import { MeditationList } from "./components/MeditationList";
import { darkColors, lightColors } from "./styles/theme";
import { ThemeProvider } from "./styles/ThemeContext";
import { TWENTY_ONE_DAY_CHALLENGES } from "./constants";

import {
  migrateIfNeeded,
  getOrCreateUserId,
  loadAllData,
  evaluateDailyLogOnLoad,
  logToday,
  saveScreen,
  saveName,
  saveEmail,
  saveDemographics,
  saveGoals,
  savePillarScores,
  saveFocusPillar,
  saveIntakeCompleted,
  saveChallengeStates,
  saveReadChapters,
  advanceChallengeDay,
  clearAllData,
  saveAllData,
  saveTheme,
} from "./lib/storage";

import {
  syncUserProfile,
  syncPillarScores as syncPillarScoresCloud,
  syncDailyLog,
  syncChallengeProgress,
  syncChallengeTasks,
  syncBookProgress,
  syncAllData as syncAllDataCloud,
} from "./lib/sync";

const DEFAULT_SCORES = {
  breathing: 5,
  sleep: 5,
  hydration: 5,
  nutrition: 5,
  movement: 5,
  environment: 5,
  mindfulness: 5,
};

function buildInitialChallengeStates() {
  const initial = {};
  Object.keys(TWENTY_ONE_DAY_CHALLENGES).forEach((pillarId) => {
    initial[pillarId] = {
      currentDay: 1,
      completedTasks: {},
      streakDays: 0,
      completedDays: 0,
      lastCompletionDate: null,
      startDate: null,
    };
  });
  return initial;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("LANDING");
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Daily logging state
  const [isLoggedToday, setIsLoggedToday] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalDaysLogged, setTotalDaysLogged] = useState(0);
  const [lastLogDate, setLastLogDate] = useState(null);
  const [logHistory, setLogHistory] = useState({});

  // Scoring state
  const [pillarScores, setPillarScores] = useState(DEFAULT_SCORES);

  const [userName, setUserName] = useState("");
  const [focusPillar, setFocusPillar] = useState("breathing");

  // 21-day challenge states
  const [selectedChallengePillar, setSelectedChallengePillar] = useState(null);

  // Book reading states
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [readChapters, setReadChapters] = useState({});
  const [challengeStates, setChallengeStates] = useState(
    buildInitialChallengeStates,
  );

  // Intake form data (persisted across back navigation)
  const [intakeData, setIntakeData] = useState({});

  // Theme state
  const [isDark, setIsDark] = useState(true);

  // User ID ref (stable across renders, doesn't need to trigger re-renders)
  const userIdRef = useRef(null);

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      // Run migration first (v1 flat keys → v2 @al_ keys)
      await migrateIfNeeded();

      // Ensure we have a userId
      userIdRef.current = await getOrCreateUserId();

      // Load all data in one batch
      const data = await loadAllData();

      if (data.theme) setIsDark(data.theme === 'dark');
      if (data.screen) setCurrentScreen(data.screen);
      if (data.name) setUserName(data.name);
      if (data.focusPillar) setFocusPillar(data.focusPillar);
      if (data.pillarScores) setPillarScores(data.pillarScores);
      if (data.challengeStates) setChallengeStates(data.challengeStates);
      if (data.readChapters) setReadChapters(data.readChapters);
      setTotalDaysLogged(data.totalDaysLogged);
      setLogHistory(data.logHistory);
      setLastLogDate(data.lastLogDate);

      // Evaluate streak based on calendar dates
      const { isLoggedToday: logged, streak: evaluatedStreak } =
        evaluateDailyLogOnLoad(data.lastLogDate, data.streak);
      setIsLoggedToday(logged);
      setStreak(evaluatedStreak);
    } catch (error) {
      console.log("Error loading saved data:", error);
    }
  };

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    try {
      await saveTheme(next ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const themeColors = isDark ? darkColors : lightColors;

  const navigateTo = async (screen) => {
    setCurrentScreen(screen);
    try {
      await saveScreen(screen);
    } catch (error) {
      console.log("Error saving screen:", error);
    }
  };

  // --- Daily Check-In (date-aware, idempotent) ---

  const handleToggleLog = async () => {
    if (isLoggedToday) return; // Already logged today — do nothing

    try {
      const result = await logToday(streak, totalDaysLogged, logHistory);
      setIsLoggedToday(true);
      setStreak(result.streak);
      setTotalDaysLogged(result.totalDaysLogged);
      setLastLogDate(result.lastLogDate);
      setLogHistory(result.logHistory);

      // Fire-and-forget cloud sync
      if (userIdRef.current) {
        syncDailyLog(
          userIdRef.current,
          result.lastLogDate,
          result.streak,
          result.totalDaysLogged,
        );
      }
    } catch (error) {
      console.log("Error logging today:", error);
    }
  };

  // --- Intake Handlers ---

  const handleSaveName = async (name, email) => {
    setUserName(name);
    setIntakeData((prev) => ({ ...prev, personal: { name, email } }));
    try {
      await saveName(name);
      if (email) await saveEmail(email);

      // Fire-and-forget cloud sync
      if (userIdRef.current) {
        syncUserProfile(userIdRef.current, { name, email: email || null });
      }
    } catch (error) {
      console.log("Error saving name:", error);
    }
    navigateTo("INTAKE_DEMOGRAPHICS");
  };

  const handleSaveDemographics = async (demographics, formData) => {
    setIntakeData((prev) => ({ ...prev, demographics: formData || demographics }));
    try {
      await saveDemographics(demographics);

      if (userIdRef.current) {
        syncUserProfile(userIdRef.current, demographics);
      }
    } catch (error) {
      console.log("Error saving demographics:", error);
    }
    navigateTo("INTAKE_GOALS");
  };

  const handleSaveGoals = async (goals, experience, injuries) => {
    setIntakeData((prev) => ({ ...prev, goals: { selectedGoals: goals, experience, injuries } }));
    try {
      await saveGoals(goals, experience, injuries);

      if (userIdRef.current) {
        syncUserProfile(userIdRef.current, { goals, experience, injuries });
      }
    } catch (error) {
      console.log("Error saving goals:", error);
    }
    navigateTo("INTAKE_MOVEMENT");
  };

  // --- Assessment Finalization ---

  const finalizeAssessment = async () => {
    const entries = Object.entries(pillarScores);
    const weakest = entries.reduce((prev, curr) =>
      curr[1] < prev[1] ? curr : prev,
    );
    const weakestPillar = weakest[0];
    setFocusPillar(weakestPillar);

    try {
      await savePillarScores(pillarScores);
      await saveFocusPillar(weakestPillar);
      await saveIntakeCompleted();

      // Fire-and-forget cloud sync
      if (userIdRef.current) {
        syncPillarScoresCloud(userIdRef.current, pillarScores, weakestPillar);
      }
    } catch (error) {
      console.log("Error saving assessment:", error);
    }

    navigateTo("DASHBOARD");
  };

  // --- Challenge Handlers ---

  const handleSelectChallenge = (pillarId) => {
    setSelectedChallengePillar(pillarId);
    navigateTo("CHALLENGE_DETAIL");
  };

  const handleToggleChallengeTask = async (pillarId, taskId) => {
    setChallengeStates((prev) => {
      const pillarState = prev[pillarId];
      const updatedPillarState = advanceChallengeDay(
        pillarState,
        pillarId,
        taskId,
        TWENTY_ONE_DAY_CHALLENGES,
      );

      const newState = {
        ...prev,
        [pillarId]: updatedPillarState,
      };

      // Save locally
      saveChallengeStates(newState).catch((error) =>
        console.log("Error saving challenge states:", error),
      );

      // Fire-and-forget cloud sync
      if (userIdRef.current) {
        const today = new Date().toISOString().split("T")[0];
        const todayTasks = updatedPillarState.completedTasks[today] || [];
        syncChallengeProgress(
          userIdRef.current,
          pillarId,
          updatedPillarState,
        );
        syncChallengeTasks(userIdRef.current, pillarId, today, todayTasks);
      }

      return newState;
    });
  };

  // Dev mode: Set challenge day directly for testing
  const handleSetChallengeDay = async (pillarId, day) => {
    setChallengeStates((prev) => {
      const newState = {
        ...prev,
        [pillarId]: {
          ...prev[pillarId],
          currentDay: day,
        },
      };

      saveChallengeStates(newState).catch((error) =>
        console.log("Error saving challenge states:", error),
      );

      return newState;
    });
  };

  // --- Book Chapter Handlers ---

  const handleSelectChapter = (chapterId) => {
    setSelectedChapterId(chapterId);
    navigateTo("CHAPTER_VIEW");
  };

  const handleMarkChapterRead = async (chapterId, isRead) => {
    const newReadChapters = { ...readChapters, [chapterId]: isRead };
    setReadChapters(newReadChapters);
    try {
      await saveReadChapters(newReadChapters);

      // Fire-and-forget cloud sync
      if (userIdRef.current) {
        syncBookProgress(userIdRef.current, chapterId, isRead);
      }
    } catch (error) {
      console.log("Error saving read chapters:", error);
    }
  };

  // --- Random Fill (Dev/Testing) ---

  const handleRandomFill = async () => {
    const names = [
      "Alex",
      "Jordan",
      "Sam",
      "Taylor",
      "Morgan",
      "Casey",
      "Riley",
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomEmail = `${randomName.toLowerCase()}@test.com`;

    const randomScores = {
      breathing: Math.floor(Math.random() * 8) + 2,
      sleep: Math.floor(Math.random() * 8) + 2,
      hydration: Math.floor(Math.random() * 8) + 2,
      nutrition: Math.floor(Math.random() * 8) + 2,
      movement: Math.floor(Math.random() * 8) + 2,
      environment: Math.floor(Math.random() * 8) + 2,
      mindfulness: Math.floor(Math.random() * 8) + 2,
    };

    const entries = Object.entries(randomScores);
    const weakest = entries.reduce((prev, curr) =>
      curr[1] < prev[1] ? curr : prev,
    );
    const randomStreak = Math.floor(Math.random() * 15);

    // Set all states
    setUserName(randomName);
    setPillarScores(randomScores);
    setFocusPillar(weakest[0]);
    setStreak(randomStreak);

    const fillData = {
      name: randomName,
      email: randomEmail,
      age: 25 + Math.floor(Math.random() * 30),
      sex: ["Male", "Female", "Other"][Math.floor(Math.random() * 3)],
      weight: 140 + Math.floor(Math.random() * 80),
      goalWeight: 130 + Math.floor(Math.random() * 60),
      goals: ["fat", "energy"],
      experience: ["beg", "int", "adv"][Math.floor(Math.random() * 3)],
      injuries: "",
      pillarScores: randomScores,
      focusPillar: weakest[0],
      streak: randomStreak,
      screen: "DASHBOARD",
    };

    try {
      await saveAllData(fillData);

      // Ensure userId exists and sync
      if (!userIdRef.current) {
        userIdRef.current = await getOrCreateUserId();
      }
      syncAllDataCloud(userIdRef.current, {
        ...fillData,
        intakeCompleted: true,
      });
    } catch (error) {
      console.log("Error saving random data:", error);
    }

    navigateTo("DASHBOARD");
  };

  // --- Reset ---

  const handleReset = async () => {
    try {
      await clearAllData();
    } catch (error) {
      console.log("Error clearing storage:", error);
    }
    setCurrentScreen("LANDING");
    setSelectedWorkout(null);
    setIsLoggedToday(false);
    setStreak(0);
    setTotalDaysLogged(0);
    setLastLogDate(null);
    setLogHistory({});
    setPillarScores(DEFAULT_SCORES);
    setUserName("");
    setFocusPillar("breathing");
    setSelectedChallengePillar(null);
    setSelectedChapterId(null);
    setReadChapters({});
    setChallengeStates(buildInitialChallengeStates());
    userIdRef.current = null;
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "LANDING":
        return <LandingPage onGetStarted={() => navigateTo("WELCOME")} />;
      case "WELCOME":
        return (
          <WelcomeScreen
            onNext={() => navigateTo("INTAKE_PERSONAL")}
            onRandomFill={handleRandomFill}
          />
        );
      case "INTAKE_PERSONAL":
        return (
          <IntakePersonal
            initialData={intakeData.personal}
            onNext={handleSaveName}
            onBack={() => navigateTo("WELCOME")}
          />
        );
      case "INTAKE_DEMOGRAPHICS":
        return (
          <IntakeDemographics
            initialData={intakeData.demographics}
            onNext={handleSaveDemographics}
            onBack={() => navigateTo("INTAKE_PERSONAL")}
          />
        );
      case "INTAKE_GOALS":
        return (
          <IntakeGoals
            initialData={intakeData.goals}
            onNext={handleSaveGoals}
            onBack={() => navigateTo("INTAKE_DEMOGRAPHICS")}
          />
        );
      case "INTAKE_MOVEMENT":
        return (
          <IntakeMovement
            initialData={intakeData.movement}
            onNext={(score, formData) => {
              setPillarScores((p) => ({ ...p, movement: score }));
              setIntakeData((prev) => ({ ...prev, movement: formData }));
              navigateTo("INTAKE_NUTRITION");
            }}
            onBack={() => navigateTo("INTAKE_GOALS")}
          />
        );
      case "INTAKE_NUTRITION":
        return (
          <IntakeNutrition
            initialData={intakeData.nutrition}
            onNext={(nScore, hScore, formData) => {
              setPillarScores((p) => ({
                ...p,
                nutrition: nScore,
                hydration: hScore,
              }));
              setIntakeData((prev) => ({ ...prev, nutrition: formData }));
              navigateTo("INTAKE_BREATHING_SLEEP");
            }}
            onBack={() => navigateTo("INTAKE_MOVEMENT")}
          />
        );
      case "INTAKE_BREATHING_SLEEP":
        return (
          <IntakeBreathingSleep
            initialData={intakeData.breathingSleep}
            onNext={(bScore, sScore, formData) => {
              setPillarScores((p) => ({
                ...p,
                breathing: bScore,
                sleep: sScore,
              }));
              setIntakeData((prev) => ({ ...prev, breathingSleep: formData }));
              navigateTo("INTAKE_MINDFULNESS");
            }}
            onBack={() => navigateTo("INTAKE_NUTRITION")}
          />
        );
      case "INTAKE_MINDFULNESS":
        return (
          <IntakeMindfulness
            initialData={intakeData.mindfulness}
            onNext={(mScore, eScore, formData) => {
              setPillarScores((p) => ({
                ...p,
                mindfulness: mScore,
                environment: eScore,
              }));
              setIntakeData((prev) => ({ ...prev, mindfulness: formData }));
              navigateTo("SAFETY_NOTICE");
            }}
            onBack={() => navigateTo("INTAKE_BREATHING_SLEEP")}
          />
        );
      case "SAFETY_NOTICE":
        return (
          <SafetyNotice
            onNext={finalizeAssessment}
            onBack={() => navigateTo("INTAKE_MINDFULNESS")}
          />
        );
      case "DASHBOARD":
        return (
          <Dashboard
            userName={userName}
            focusPillarId={focusPillar}
            isLoggedToday={isLoggedToday}
            streak={streak}
            onToggleLog={handleToggleLog}
            onNavigate={navigateTo}
            onSelectWorkout={(w) => {
              setSelectedWorkout(w);
              navigateTo("WORKOUT_DETAIL");
            }}
            onReset={handleReset}
          />
        );
      case "WORKOUT_LIST":
        return (
          <WorkoutList
            onNavigate={navigateTo}
            onSelectWorkout={(w) => {
              setSelectedWorkout(w);
              navigateTo("WORKOUT_DETAIL");
            }}
          />
        );
      case "WORKOUT_DETAIL":
        return (
          <WorkoutDetail
            workout={selectedWorkout}
            onBack={() => navigateTo("WORKOUT_LIST")}
            onNavigate={navigateTo}
          />
        );
      case "NUTRITION_LOG":
        return <NutritionLog onNavigate={navigateTo} />;
      case "NUTRITION_SUMMARY":
        return <NutritionSummary onNavigate={navigateTo} />;
      case "MEDITATION_LIST":
        return (
          <MeditationList
            onNavigate={navigateTo}
            onSelectMeditation={(m) => console.log("Selected:", m.title)}
          />
        );
      case "PILLARS_OVERVIEW":
        return <PillarsOverview onNavigate={navigateTo} />;
      case "SUPPORT":
        return <SupportScreen onNavigate={navigateTo} />;
      case "BOOK":
        return (
          <BookScreen
            onNavigate={navigateTo}
            onSelectChapter={handleSelectChapter}
            readChapters={readChapters}
          />
        );
      case "CHAPTER_VIEW":
        return (
          <ChapterView
            chapterId={selectedChapterId}
            onNavigate={navigateTo}
            onMarkRead={handleMarkChapterRead}
            isRead={readChapters[selectedChapterId]}
          />
        );
      case "CHALLENGE_PROGRESS":
        return (
          <ChallengeProgress
            challengeStates={challengeStates}
            onSelectChallenge={handleSelectChallenge}
            onNavigate={navigateTo}
          />
        );
      case "CHALLENGE_DETAIL":
        return selectedChallengePillar ? (
          <ChallengeDetail
            pillarId={selectedChallengePillar}
            challengeState={challengeStates[selectedChallengePillar]}
            onToggleTask={handleToggleChallengeTask}
            onNavigate={navigateTo}
            onSetDay={handleSetChallengeDay}
          />
        ) : (
          <ChallengeProgress
            challengeStates={challengeStates}
            onSelectChallenge={handleSelectChallenge}
            onNavigate={navigateTo}
          />
        );
      default:
        return <LandingPage onGetStarted={() => navigateTo("WELCOME")} />;
    }
  };

  return (
    <ThemeProvider value={{ colors: themeColors, isDark, toggleTheme }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={themeColors.background}
        />
        {renderScreen()}
      </SafeAreaView>
    </ThemeProvider>
  );
}
