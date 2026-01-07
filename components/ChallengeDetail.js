import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import { THIRTY_DAY_CHALLENGES, getWeekFromDay } from "../constants";
import { BottomNav } from "./BottomNav";

// DEV_MODE: Set to false to hide dev controls
const DEV_MODE = true;

export const ChallengeDetail = ({
  pillarId,
  challengeState,
  onToggleTask,
  onNavigate,
  onSetDay, // Dev mode: allows setting the current day
}) => {
  const challenge = THIRTY_DAY_CHALLENGES[pillarId];
  if (!challenge) return null;

  const { currentDay, completedTasks, streakDays } = challengeState;
  const currentWeek = getWeekFromDay(currentDay);
  const todayKey = new Date().toISOString().split("T")[0];
  const todayCompletedTasks = completedTasks[todayKey] || [];

  // Calculate progress
  const totalDays = 30;
  const progressPercent = Math.round((currentDay / totalDays) * 100);

  // Get tasks for current week
  const availableTasks = challenge.tasks.filter(
    (task) => task.unlockedDay <= currentDay,
  );
  const lockedTasks = challenge.tasks.filter(
    (task) => task.unlockedDay > currentDay,
  );

  const isTaskCompleted = (taskId) => todayCompletedTasks.includes(taskId);
  const allTasksCompleted =
    availableTasks.length > 0 &&
    availableTasks.every((task) => isTaskCompleted(task.id));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onNavigate("CHALLENGE_PROGRESS")}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{challenge.name} Challenge</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Dev Mode Controls */}
      {DEV_MODE && onSetDay && (
        <View style={styles.devPanel}>
          <Text style={styles.devPanelLabel}>DEV: Jump to Week</Text>
          <View style={styles.devButtonRow}>
            {[
              { week: 1, day: 1 },
              { week: 2, day: 8 },
              { week: 3, day: 15 },
              { week: 4, day: 22 },
            ].map(({ week, day }) => (
              <TouchableOpacity
                key={week}
                style={[
                  styles.devWeekButton,
                  currentDay >= day &&
                    currentDay < (day === 22 ? 31 : day + 7) &&
                    styles.devWeekButtonActive,
                ]}
                onPress={() => onSetDay(pillarId, day)}
              >
                <Text
                  style={[
                    styles.devWeekButtonText,
                    currentDay >= day &&
                      currentDay < (day === 22 ? 31 : day + 7) &&
                      styles.devWeekButtonTextActive,
                  ]}
                >
                  W{week}
                </Text>
                <Text style={styles.devWeekButtonSub}>Day {day}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.devWeekButton, styles.devCompleteButton]}
              onPress={() => onSetDay(pillarId, 30)}
            >
              <Text style={styles.devWeekButtonText}>D30</Text>
              <Text style={styles.devWeekButtonSub}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.progressIcon}>
              <MaterialIcons
                name={challenge.icon}
                size={32}
                color={colors.primary}
              />
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>30-Day Challenge</Text>
              <Text style={styles.progressWeek}>Week {currentWeek} of 4</Text>
            </View>
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeText}>Day {currentDay}</Text>
            </View>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercent}%` },
                ]}
              />
            </View>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <MaterialIcons
                name="local-fire-department"
                size={20}
                color={colors.secondary}
              />
              <Text style={styles.statValue}>{streakDays}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialIcons
                name="check-circle"
                size={20}
                color={colors.success}
              />
              <Text style={styles.statValue}>
                {todayCompletedTasks.length}/{availableTasks.length}
              </Text>
              <Text style={styles.statLabel}>Today</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialIcons
                name="emoji-events"
                size={20}
                color={colors.warning}
              />
              <Text style={styles.statValue}>{currentWeek}</Text>
              <Text style={styles.statLabel}>Tasks Active</Text>
            </View>
          </View>
        </View>

        {/* Today's Status */}
        {allTasksCompleted && (
          <View style={styles.completedBanner}>
            <MaterialIcons
              name="celebration"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.completedBannerText}>
              All tasks completed for today!
            </Text>
          </View>
        )}

        {/* Today's Tasks */}
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.tasksList}>
          {availableTasks.map((task) => {
            const completed = isTaskCompleted(task.id);
            return (
              <TouchableOpacity
                key={task.id}
                style={[styles.taskCard, completed && styles.taskCardCompleted]}
                onPress={() => onToggleTask(pillarId, task.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.taskCheckbox,
                    completed && styles.taskCheckboxCompleted,
                  ]}
                >
                  {completed && (
                    <MaterialIcons
                      name="check"
                      size={16}
                      color={colors.black}
                    />
                  )}
                </View>
                <View style={styles.taskContent}>
                  <View style={styles.taskHeader}>
                    <Text
                      style={[
                        styles.taskName,
                        completed && styles.taskNameCompleted,
                      ]}
                    >
                      {task.name}
                    </Text>
                    {task.unlockedDay > 1 && (
                      <View style={styles.weekBadge}>
                        <Text style={styles.weekBadgeText}>
                          Week {getWeekFromDay(task.unlockedDay)}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.taskDescription,
                      completed && styles.taskDescriptionCompleted,
                    ]}
                  >
                    {task.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Locked Tasks Preview */}
        {lockedTasks.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Coming Soon</Text>
            <View style={styles.tasksList}>
              {lockedTasks.map((task) => (
                <View key={task.id} style={styles.lockedTaskCard}>
                  <View style={styles.lockedTaskCheckbox}>
                    <MaterialIcons
                      name="lock"
                      size={14}
                      color={colors.gray[600]}
                    />
                  </View>
                  <View style={styles.taskContent}>
                    <View style={styles.taskHeader}>
                      <Text style={styles.lockedTaskName}>{task.name}</Text>
                      <View style={styles.unlockBadge}>
                        <MaterialIcons
                          name="schedule"
                          size={10}
                          color={colors.gray[500]}
                        />
                        <Text style={styles.unlockBadgeText}>
                          Day {task.unlockedDay}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.lockedTaskDescription}>
                      {task.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Weekly Breakdown */}
        <Text style={styles.sectionTitle}>Weekly Progression</Text>
        <View style={styles.weeklyBreakdown}>
          {[1, 2, 3, 4].map((week) => {
            const isCurrentWeek = week === currentWeek;
            const isPastWeek = week < currentWeek;
            const taskCount = week;
            return (
              <View
                key={week}
                style={[
                  styles.weekItem,
                  isCurrentWeek && styles.weekItemCurrent,
                  isPastWeek && styles.weekItemPast,
                ]}
              >
                <View
                  style={[
                    styles.weekNumber,
                    isCurrentWeek && styles.weekNumberCurrent,
                    isPastWeek && styles.weekNumberPast,
                  ]}
                >
                  {isPastWeek ? (
                    <MaterialIcons
                      name="check"
                      size={14}
                      color={colors.black}
                    />
                  ) : (
                    <Text
                      style={[
                        styles.weekNumberText,
                        isCurrentWeek && styles.weekNumberTextCurrent,
                      ]}
                    >
                      {week}
                    </Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.weekLabel,
                    isCurrentWeek && styles.weekLabelCurrent,
                  ]}
                >
                  Week {week}
                </Text>
                <Text style={styles.weekTasks}>
                  {taskCount} task{taskCount > 1 ? "s" : ""}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <BottomNav currentScreen="CHALLENGE_DETAIL" onNavigate={onNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  progressCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: `${colors.primary}30`,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  progressIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  progressInfo: {
    flex: 1,
    marginLeft: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  progressWeek: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 2,
  },
  dayBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  dayBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.black,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 12,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    width: 40,
    textAlign: "right",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 10,
    color: colors.gray[500],
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  completedBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${colors.primary}20`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  completedBannerText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 16,
  },
  tasksList: {
    gap: 12,
    marginBottom: 24,
  },
  taskCard: {
    flexDirection: "row",
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  taskCardCompleted: {
    backgroundColor: `${colors.primary}15`,
    borderColor: `${colors.primary}30`,
  },
  taskCheckbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray[600],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  taskCheckboxCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  taskContent: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
    flex: 1,
  },
  taskNameCompleted: {
    color: colors.primary,
  },
  weekBadge: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  weekBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.gray[400],
  },
  taskDescription: {
    fontSize: 13,
    color: colors.gray[400],
    lineHeight: 18,
  },
  taskDescriptionCompleted: {
    color: colors.gray[500],
  },
  lockedTaskCard: {
    flexDirection: "row",
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    opacity: 0.5,
  },
  lockedTaskCheckbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  lockedTaskName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[500],
    flex: 1,
  },
  lockedTaskDescription: {
    fontSize: 13,
    color: colors.gray[600],
    lineHeight: 18,
  },
  unlockBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
    gap: 4,
  },
  unlockBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.gray[500],
  },
  weeklyBreakdown: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  weekItem: {
    flex: 1,
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  weekItemCurrent: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  weekItemPast: {
    borderColor: `${colors.primary}30`,
  },
  weekNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  weekNumberCurrent: {
    backgroundColor: `${colors.primary}30`,
  },
  weekNumberPast: {
    backgroundColor: colors.primary,
  },
  weekNumberText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.gray[500],
  },
  weekNumberTextCurrent: {
    color: colors.primary,
  },
  weekLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.gray[500],
  },
  weekLabelCurrent: {
    color: colors.white,
  },
  weekTasks: {
    fontSize: 10,
    color: colors.gray[600],
    marginTop: 4,
  },
  // Dev mode styles
  devPanel: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(239, 68, 68, 0.3)",
    padding: 12,
  },
  devPanelLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#ef4444",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    textAlign: "center",
  },
  devButtonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  devWeekButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  devWeekButtonActive: {
    backgroundColor: `${colors.primary}30`,
    borderColor: colors.primary,
  },
  devWeekButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.gray[400],
  },
  devWeekButtonTextActive: {
    color: colors.primary,
  },
  devWeekButtonSub: {
    fontSize: 9,
    color: colors.gray[600],
    marginTop: 2,
  },
  devCompleteButton: {
    backgroundColor: `${colors.warning}20`,
    borderColor: `${colors.warning}40`,
  },
});
