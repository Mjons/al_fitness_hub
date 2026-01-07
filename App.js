import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { WelcomeScreen } from "./components/WelcomeScreen";
import { IntakePersonal } from "./components/IntakePersonal";
import { IntakeDemographics } from "./components/IntakeDemographics";
import { IntakeGoals } from "./components/IntakeGoals";
import { IntakeMovement } from "./components/IntakeMovement";
import { IntakeNutrition } from "./components/IntakeNutrition";
import { IntakeBreathingSleep } from "./components/IntakeBreathingSleep";
import { IntakeMindfulness } from "./components/IntakeMindfulness";
import { IntakeRisk } from "./components/IntakeRisk";
import { SafetyNotice } from "./components/SafetyNotice";
import { Dashboard } from "./components/Dashboard";
import { WorkoutList } from "./components/WorkoutList";
import { WorkoutDetail } from "./components/WorkoutDetail";
import { NutritionLog } from "./components/NutritionLog";
import { NutritionSummary } from "./components/NutritionSummary";
import { ProgressSummary } from "./components/ProgressSummary";
import { PillarsOverview } from "./components/PillarsOverview";
import { SettingsScreen } from "./components/SettingsScreen";
import { ChallengeProgress } from "./components/ChallengeProgress";
import { ChallengeDetail } from "./components/ChallengeDetail";
import { BookScreen } from "./components/BookScreen";
import { ChapterView } from "./components/ChapterView";
import { colors } from "./styles/theme";
import { THIRTY_DAY_CHALLENGES } from "./constants";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("WELCOME");
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Daily logging state
  const [isLoggedToday, setIsLoggedToday] = useState(false);
  const [streak, setStreak] = useState(0);

  // Scoring state
  const [pillarScores, setPillarScores] = useState({
    breathing: 5,
    sleep: 5,
    hydration: 5,
    nutrition: 5,
    movement: 5,
    environment: 5,
    mindfulness: 5,
  });

  const [userName, setUserName] = useState("Sarah");
  const [focusPillar, setFocusPillar] = useState("breathing");

  // 30-day challenge states
  const [selectedChallengePillar, setSelectedChallengePillar] = useState(null);

  // Book reading states
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [readChapters, setReadChapters] = useState({});
  const [challengeStates, setChallengeStates] = useState(() => {
    // Initialize challenge state for each pillar
    const initial = {};
    Object.keys(THIRTY_DAY_CHALLENGES).forEach((pillarId) => {
      initial[pillarId] = {
        currentDay: 1,
        completedTasks: {},
        streakDays: 0,
        startDate: null,
      };
    });
    return initial;
  });

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedScreen = await AsyncStorage.getItem("currentScreen");
      if (savedScreen) setCurrentScreen(savedScreen);

      const savedName = await AsyncStorage.getItem("userName");
      if (savedName) setUserName(savedName);

      const savedFocus = await AsyncStorage.getItem("focusPillar");
      if (savedFocus) setFocusPillar(savedFocus);

      const savedLogged = await AsyncStorage.getItem("isLoggedToday");
      if (savedLogged === "true") setIsLoggedToday(true);

      const savedStreak = await AsyncStorage.getItem("streak");
      if (savedStreak) setStreak(parseInt(savedStreak));

      // Load challenge states
      const savedChallengeStates =
        await AsyncStorage.getItem("challengeStates");
      if (savedChallengeStates) {
        setChallengeStates(JSON.parse(savedChallengeStates));
      }

      // Load read chapters
      const savedReadChapters = await AsyncStorage.getItem("readChapters");
      if (savedReadChapters) {
        setReadChapters(JSON.parse(savedReadChapters));
      }
    } catch (error) {
      console.log("Error loading saved data:", error);
    }
  };

  const navigateTo = async (screen) => {
    setCurrentScreen(screen);
    try {
      await AsyncStorage.setItem("currentScreen", screen);
    } catch (error) {
      console.log("Error saving screen:", error);
    }
  };

  const handleToggleLog = async () => {
    const newState = !isLoggedToday;
    setIsLoggedToday(newState);

    const newStreak = newState ? streak + 1 : Math.max(0, streak - 1);
    setStreak(newStreak);

    try {
      await AsyncStorage.setItem("isLoggedToday", newState.toString());
      await AsyncStorage.setItem("streak", newStreak.toString());
    } catch (error) {
      console.log("Error saving log state:", error);
    }
  };

  const handleReset = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log("Error clearing storage:", error);
    }
    setCurrentScreen("WELCOME");
    setSelectedWorkout(null);
    setIsLoggedToday(false);
    setStreak(0);
    setPillarScores({
      breathing: 5,
      sleep: 5,
      hydration: 5,
      nutrition: 5,
      movement: 5,
      environment: 5,
      mindfulness: 5,
    });
    setUserName("Sarah");
    setFocusPillar("breathing");
    setSelectedChallengePillar(null);
    setSelectedChapterId(null);
    setReadChapters({});
    // Reset challenge states
    const initialChallengeStates = {};
    Object.keys(THIRTY_DAY_CHALLENGES).forEach((pillarId) => {
      initialChallengeStates[pillarId] = {
        currentDay: 1,
        completedTasks: {},
        streakDays: 0,
        startDate: null,
      };
    });
    setChallengeStates(initialChallengeStates);
  };

  const finalizeAssessment = async () => {
    const entries = Object.entries(pillarScores);
    const weakest = entries.reduce((prev, curr) =>
      curr[1] < prev[1] ? curr : prev,
    );
    setFocusPillar(weakest[0]);

    try {
      await AsyncStorage.setItem("focusPillar", weakest[0]);
    } catch (error) {
      console.log("Error saving focus pillar:", error);
    }

    navigateTo("DASHBOARD");
  };

  const handleSaveName = async (name) => {
    setUserName(name);
    try {
      await AsyncStorage.setItem("userName", name);
    } catch (error) {
      console.log("Error saving name:", error);
    }
    navigateTo("INTAKE_DEMOGRAPHICS");
  };

  // Random fill handler for dev/testing - generates random pillar scores
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

    // Generate random scores between 2-9 for each pillar
    const randomScores = {
      breathing: Math.floor(Math.random() * 8) + 2,
      sleep: Math.floor(Math.random() * 8) + 2,
      hydration: Math.floor(Math.random() * 8) + 2,
      nutrition: Math.floor(Math.random() * 8) + 2,
      movement: Math.floor(Math.random() * 8) + 2,
      environment: Math.floor(Math.random() * 8) + 2,
      mindfulness: Math.floor(Math.random() * 8) + 2,
    };

    // Find the weakest pillar
    const entries = Object.entries(randomScores);
    const weakest = entries.reduce((prev, curr) =>
      curr[1] < prev[1] ? curr : prev,
    );

    // Set all the states
    setUserName(randomName);
    setPillarScores(randomScores);
    setFocusPillar(weakest[0]);
    setStreak(Math.floor(Math.random() * 15)); // Random streak 0-14

    // Save to AsyncStorage
    try {
      await AsyncStorage.setItem("userName", randomName);
      await AsyncStorage.setItem("focusPillar", weakest[0]);
      await AsyncStorage.setItem("currentScreen", "DASHBOARD");
    } catch (error) {
      console.log("Error saving random data:", error);
    }

    navigateTo("DASHBOARD");
  };

  // Challenge handlers
  const handleSelectChallenge = (pillarId) => {
    setSelectedChallengePillar(pillarId);
    navigateTo("CHALLENGE_DETAIL");
  };

  const handleToggleChallengeTask = async (pillarId, taskId) => {
    const todayKey = new Date().toISOString().split("T")[0];

    setChallengeStates((prev) => {
      const pillarState = prev[pillarId];
      const todayTasks = pillarState.completedTasks[todayKey] || [];
      const isCompleted = todayTasks.includes(taskId);

      let newTodayTasks;
      if (isCompleted) {
        newTodayTasks = todayTasks.filter((t) => t !== taskId);
      } else {
        newTodayTasks = [...todayTasks, taskId];
      }

      // Check if all available tasks for today are completed
      const challenge = THIRTY_DAY_CHALLENGES[pillarId];
      const availableTasks = challenge.tasks.filter(
        (t) => t.unlockedDay <= pillarState.currentDay,
      );
      const allCompleted = availableTasks.every((t) =>
        newTodayTasks.includes(t.id),
      );

      // Update streak
      let newStreakDays = pillarState.streakDays;
      if (allCompleted && !isCompleted) {
        newStreakDays = pillarState.streakDays + 1;
      } else if (
        !allCompleted &&
        isCompleted &&
        todayTasks.length === availableTasks.length
      ) {
        newStreakDays = Math.max(0, pillarState.streakDays - 1);
      }

      // Advance day if all tasks completed and day < 30
      let newCurrentDay = pillarState.currentDay;
      if (allCompleted && pillarState.currentDay < 30) {
        newCurrentDay = pillarState.currentDay + 1;
      }

      const newState = {
        ...prev,
        [pillarId]: {
          ...pillarState,
          currentDay: newCurrentDay,
          completedTasks: {
            ...pillarState.completedTasks,
            [todayKey]: newTodayTasks,
          },
          streakDays: newStreakDays,
          startDate: pillarState.startDate || todayKey,
        },
      };

      // Save to AsyncStorage
      AsyncStorage.setItem("challengeStates", JSON.stringify(newState)).catch(
        (error) => console.log("Error saving challenge states:", error),
      );

      return newState;
    });
  };

  // Book chapter handlers
  const handleSelectChapter = (chapterId) => {
    setSelectedChapterId(chapterId);
    navigateTo("CHAPTER_VIEW");
  };

  const handleMarkChapterRead = async (chapterId, isRead) => {
    const newReadChapters = { ...readChapters, [chapterId]: isRead };
    setReadChapters(newReadChapters);
    try {
      await AsyncStorage.setItem(
        "readChapters",
        JSON.stringify(newReadChapters),
      );
    } catch (error) {
      console.log("Error saving read chapters:", error);
    }
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

      AsyncStorage.setItem("challengeStates", JSON.stringify(newState)).catch(
        (error) => console.log("Error saving challenge states:", error),
      );

      return newState;
    });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "WELCOME":
        return (
          <WelcomeScreen
            onNext={() => navigateTo("INTAKE_PERSONAL")}
            onRandomFill={handleRandomFill}
          />
        );
      case "INTAKE_PERSONAL":
        return <IntakePersonal onNext={handleSaveName} />;
      case "INTAKE_DEMOGRAPHICS":
        return <IntakeDemographics onNext={() => navigateTo("INTAKE_GOALS")} />;
      case "INTAKE_GOALS":
        return <IntakeGoals onNext={() => navigateTo("INTAKE_MOVEMENT")} />;
      case "INTAKE_MOVEMENT":
        return (
          <IntakeMovement
            onNext={(score) => {
              setPillarScores((p) => ({ ...p, movement: score }));
              navigateTo("INTAKE_NUTRITION");
            }}
          />
        );
      case "INTAKE_NUTRITION":
        return (
          <IntakeNutrition
            onNext={(nScore, hScore) => {
              setPillarScores((p) => ({
                ...p,
                nutrition: nScore,
                hydration: hScore,
              }));
              navigateTo("INTAKE_BREATHING_SLEEP");
            }}
          />
        );
      case "INTAKE_BREATHING_SLEEP":
        return (
          <IntakeBreathingSleep
            onNext={(bScore, sScore) => {
              setPillarScores((p) => ({
                ...p,
                breathing: bScore,
                sleep: sScore,
              }));
              navigateTo("INTAKE_MINDFULNESS");
            }}
          />
        );
      case "INTAKE_MINDFULNESS":
        return (
          <IntakeMindfulness
            onNext={(mScore, eScore) => {
              setPillarScores((p) => ({
                ...p,
                mindfulness: mScore,
                environment: eScore,
              }));
              navigateTo("INTAKE_RISK");
            }}
          />
        );
      case "INTAKE_RISK":
        return <IntakeRisk onNext={() => navigateTo("SAFETY_NOTICE")} />;
      case "SAFETY_NOTICE":
        return <SafetyNotice onNext={finalizeAssessment} />;
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
      case "PROGRESS_SUMMARY":
        return <ProgressSummary onNavigate={navigateTo} />;
      case "PILLARS_OVERVIEW":
        return <PillarsOverview onNavigate={navigateTo} />;
      case "SETTINGS":
        return <SettingsScreen onNavigate={navigateTo} />;
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
        return (
          <WelcomeScreen
            onNext={() => navigateTo("INTAKE_PERSONAL")}
            onRandomFill={handleRandomFill}
          />
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundDark }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundDark}
      />
      {renderScreen()}
    </SafeAreaView>
  );
}
