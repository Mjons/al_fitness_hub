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

export const ChallengeProgress = ({
  challengeStates,
  onSelectChallenge,
  onNavigate,
}) => {
  const pillars = Object.keys(THIRTY_DAY_CHALLENGES);
  const todayKey = new Date().toISOString().split("T")[0];

  // Calculate overall stats
  const totalChallenges = pillars.length;
  const activeChallenges = pillars.filter(
    (id) => challengeStates[id]?.currentDay > 0,
  ).length;
  const completedChallenges = pillars.filter(
    (id) => challengeStates[id]?.currentDay >= 30,
  ).length;

  // Calculate total streak
  const totalStreak = pillars.reduce(
    (sum, id) => sum + (challengeStates[id]?.streakDays || 0),
    0,
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onNavigate("DASHBOARD")}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>30-Day Challenges</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Your Challenge Journey</Text>
        <Text style={styles.pageSubtitle}>
          Master each pillar with progressive 30-day challenges
        </Text>

        {/* Overall Progress Card */}
        <View style={styles.overallCard}>
          <View style={styles.overallHeader}>
            <View style={styles.overallIconContainer}>
              <MaterialIcons
                name="emoji-events"
                size={28}
                color={colors.warning}
              />
            </View>
            <View style={styles.overallInfo}>
              <Text style={styles.overallTitle}>Overall Progress</Text>
              <Text style={styles.overallSubtitle}>
                {activeChallenges} active, {completedChallenges} completed
              </Text>
            </View>
          </View>

          <View style={styles.overallStats}>
            <View style={styles.overallStatItem}>
              <Text style={styles.overallStatValue}>{activeChallenges}</Text>
              <Text style={styles.overallStatLabel}>Active</Text>
            </View>
            <View style={styles.overallStatDivider} />
            <View style={styles.overallStatItem}>
              <Text style={styles.overallStatValue}>{totalStreak}</Text>
              <Text style={styles.overallStatLabel}>Total Streak</Text>
            </View>
            <View style={styles.overallStatDivider} />
            <View style={styles.overallStatItem}>
              <Text style={styles.overallStatValue}>{completedChallenges}</Text>
              <Text style={styles.overallStatLabel}>Mastered</Text>
            </View>
          </View>
        </View>

        {/* Challenge Cards */}
        <Text style={styles.sectionTitle}>All Challenges</Text>
        <View style={styles.challengesList}>
          {pillars.map((pillarId) => {
            const challenge = THIRTY_DAY_CHALLENGES[pillarId];
            const state = challengeStates[pillarId] || {
              currentDay: 1,
              completedTasks: {},
              streakDays: 0,
            };
            const { currentDay, completedTasks, streakDays } = state;
            const currentWeek = getWeekFromDay(currentDay);
            const progressPercent = Math.round((currentDay / 30) * 100);
            const isCompleted = currentDay >= 30;
            const isActive = currentDay > 0;

            // Get today's completion status
            const todayTasks = completedTasks[todayKey] || [];
            const availableTasks = challenge.tasks.filter(
              (t) => t.unlockedDay <= currentDay,
            );
            const todayComplete =
              availableTasks.length > 0 &&
              availableTasks.every((t) => todayTasks.includes(t.id));

            return (
              <TouchableOpacity
                key={pillarId}
                style={[
                  styles.challengeCard,
                  isCompleted && styles.challengeCardCompleted,
                  todayComplete && styles.challengeCardTodayComplete,
                ]}
                onPress={() => onSelectChallenge(pillarId)}
                activeOpacity={0.7}
              >
                <View style={styles.challengeHeader}>
                  <View
                    style={[
                      styles.challengeIcon,
                      isCompleted && styles.challengeIconCompleted,
                      todayComplete && styles.challengeIconTodayComplete,
                    ]}
                  >
                    <MaterialIcons
                      name={challenge.icon}
                      size={24}
                      color={
                        isCompleted || todayComplete
                          ? colors.black
                          : colors.primary
                      }
                    />
                  </View>
                  <View style={styles.challengeInfo}>
                    <Text style={styles.challengeName}>{challenge.name}</Text>
                    <Text style={styles.challengeWeek}>
                      {isCompleted
                        ? "Challenge Complete!"
                        : `Week ${currentWeek} - Day ${currentDay}`}
                    </Text>
                  </View>
                  <View style={styles.challengeRight}>
                    {todayComplete && !isCompleted && (
                      <View style={styles.todayBadge}>
                        <MaterialIcons
                          name="check"
                          size={12}
                          color={colors.primary}
                        />
                      </View>
                    )}
                    {isCompleted && (
                      <View style={styles.completeBadge}>
                        <MaterialIcons
                          name="star"
                          size={14}
                          color={colors.warning}
                        />
                      </View>
                    )}
                    <MaterialIcons
                      name="chevron-right"
                      size={24}
                      color={colors.gray[500]}
                    />
                  </View>
                </View>

                {/* Progress Bar */}
                <View style={styles.challengeProgress}>
                  <View style={styles.progressBarBg}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${progressPercent}%` },
                        isCompleted && styles.progressBarFillComplete,
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>{progressPercent}%</Text>
                </View>

                {/* Stats Row */}
                <View style={styles.challengeStats}>
                  <View style={styles.challengeStat}>
                    <MaterialIcons
                      name="local-fire-department"
                      size={14}
                      color={colors.secondary}
                    />
                    <Text style={styles.challengeStatText}>
                      {streakDays} day streak
                    </Text>
                  </View>
                  <View style={styles.challengeStat}>
                    <MaterialIcons
                      name="assignment"
                      size={14}
                      color={colors.gray[500]}
                    />
                    <Text style={styles.challengeStatText}>
                      {currentWeek} task{currentWeek > 1 ? "s" : ""} active
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Info Section */}
        <View style={styles.infoCard}>
          <MaterialIcons name="info-outline" size={20} color={colors.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>How Challenges Work</Text>
            <Text style={styles.infoText}>
              Each pillar has a 30-day progressive challenge. Start with 1 task
              in Week 1 and build up to 4 tasks by Week 4. Complete all daily
              tasks to maintain your streak!
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomNav currentScreen="CHALLENGE_PROGRESS" onNavigate={onNavigate} />
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
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
  },
  pageSubtitle: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 4,
    marginBottom: 24,
  },
  overallCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: `${colors.warning}30`,
    marginBottom: 32,
  },
  overallHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  overallIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: `${colors.warning}20`,
    alignItems: "center",
    justifyContent: "center",
  },
  overallInfo: {
    marginLeft: 16,
  },
  overallTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  overallSubtitle: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  overallStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  overallStatItem: {
    alignItems: "center",
    flex: 1,
  },
  overallStatValue: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.white,
  },
  overallStatLabel: {
    fontSize: 10,
    color: colors.gray[500],
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 4,
  },
  overallStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 16,
  },
  challengesList: {
    gap: 16,
    marginBottom: 24,
  },
  challengeCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  challengeCardCompleted: {
    borderColor: `${colors.warning}40`,
    backgroundColor: `${colors.warning}10`,
  },
  challengeCardTodayComplete: {
    borderColor: `${colors.primary}40`,
  },
  challengeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  challengeIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  challengeIconCompleted: {
    backgroundColor: colors.warning,
  },
  challengeIconTodayComplete: {
    backgroundColor: colors.primary,
  },
  challengeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  challengeName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
  challengeWeek: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  challengeRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  todayBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: `${colors.primary}20`,
    alignItems: "center",
    justifyContent: "center",
  },
  completeBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: `${colors.warning}20`,
    alignItems: "center",
    justifyContent: "center",
  },
  challengeProgress: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 3,
    overflow: "hidden",
    marginRight: 12,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressBarFillComplete: {
    backgroundColor: colors.warning,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.gray[400],
    width: 35,
    textAlign: "right",
  },
  challengeStats: {
    flexDirection: "row",
    gap: 16,
  },
  challengeStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  challengeStatText: {
    fontSize: 12,
    color: colors.gray[500],
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: `${colors.primary}10`,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: `${colors.primary}20`,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.gray[400],
    lineHeight: 18,
  },
});
