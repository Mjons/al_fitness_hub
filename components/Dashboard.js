import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import { WORKOUTS, PILLARS, PILLAR_ACTIONS } from "../constants";
import { BottomNav } from "./BottomNav";

export const Dashboard = ({
  userName,
  focusPillarId,
  isLoggedToday,
  streak,
  onToggleLog,
  onNavigate,
  onSelectWorkout,
  onReset,
}) => {
  const focusPillar = PILLARS.find((p) => p.id === focusPillarId) || PILLARS[0];
  const pillarAction = PILLAR_ACTIONS[focusPillarId];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: "https://picsum.photos/100?user" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.welcomeLabel}>Welcome back</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.notifButton}
          onPress={() => onNavigate("SETTINGS")}
        >
          <MaterialIcons name="notifications" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.heroTitle}>
            It's time to fix your{"\n"}
            <Text style={styles.heroAccent}>{focusPillar.name}</Text>.
          </Text>
          <View style={styles.focusBadge}>
            <MaterialIcons name="bolt" size={16} color={colors.primary} />
            <Text style={styles.focusBadgeText}>Active Focus Pillar</Text>
          </View>
        </View>

        <View
          style={[
            styles.checkinCard,
            isLoggedToday && styles.checkinCardLogged,
          ]}
        >
          <View style={styles.checkinHeader}>
            <View style={styles.checkinLeft}>
              <View
                style={[
                  styles.checkinIcon,
                  isLoggedToday && styles.checkinIconLogged,
                ]}
              >
                <MaterialIcons
                  name="air"
                  size={28}
                  color={isLoggedToday ? colors.black : colors.primary}
                />
              </View>
              <View>
                <Text style={styles.checkinTitle}>
                  {focusPillar.name} Check-in
                </Text>
                <Text style={styles.checkinSubtitle}>
                  {isLoggedToday
                    ? "Completed for today!"
                    : "Today's Focus Action"}
                </Text>
              </View>
            </View>
            <View style={styles.checkinStreak}>
              <Text
                style={[
                  styles.streakValue,
                  isLoggedToday && styles.streakValueActive,
                ]}
              >
                {streak}/30
              </Text>
              <Text style={styles.streakLabel}>Day Streak</Text>
            </View>
          </View>

          <View
            style={[
              styles.actionCard,
              isLoggedToday && styles.actionCardLogged,
            ]}
          >
            <View style={styles.actionRow}>
              <MaterialIcons
                name="auto-awesome"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.actionTitle}>{pillarAction.action}</Text>
            </View>
            <Text style={styles.actionDesc}>{pillarAction.description}</Text>
          </View>

          <TouchableOpacity
            style={[styles.logButton, isLoggedToday && styles.logButtonLogged]}
            onPress={onToggleLog}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name={isLoggedToday ? "done-all" : "check-circle"}
              size={24}
              color={isLoggedToday ? colors.primary : colors.black}
            />
            <Text
              style={[
                styles.logButtonText,
                isLoggedToday && styles.logButtonTextLogged,
              ]}
            >
              {isLoggedToday
                ? "Logged Today"
                : `Log ${focusPillar.name} Action`}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => onNavigate("MEDITATION_LIST")}
            >
              <View style={styles.quickActionIcon}>
                <MaterialIcons
                  name="self-improvement"
                  size={24}
                  color={colors.secondary}
                />
              </View>
              <Text style={styles.quickActionTitle}>Start Meditation</Text>
              <Text style={styles.quickActionSub}>Guided Sessions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => onNavigate("BOOK")}
            >
              <View style={styles.quickActionIcon}>
                <MaterialIcons
                  name="auto-stories"
                  size={24}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.quickActionTitle}>Read the Book</Text>
              <Text style={styles.quickActionSub}>"Burnt Out & Ready"</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 30-Day Challenges - Big Prominent Card */}
        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <View style={styles.challengeIconBig}>
              <MaterialIcons
                name="emoji-events"
                size={40}
                color={colors.warning}
              />
            </View>
            <View style={styles.challengeBadge}>
              <Text style={styles.challengeBadgeText}>NEW</Text>
            </View>
          </View>
          <Text style={styles.challengeTitleBig}>30-Day Challenges</Text>
          <Text style={styles.challengeDesc}>
            Master each pillar with progressive daily tasks. Start with 1 task,
            build up to 4 by Week 4.
          </Text>
          <View style={styles.challengeFeatures}>
            <View style={styles.challengeFeature}>
              <MaterialIcons
                name="check-circle"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.challengeFeatureText}>7 Pillars</Text>
            </View>
            <View style={styles.challengeFeature}>
              <MaterialIcons
                name="local-fire-department"
                size={16}
                color={colors.secondary}
              />
              <Text style={styles.challengeFeatureText}>Streaks</Text>
            </View>
            <View style={styles.challengeFeature}>
              <MaterialIcons name="star" size={16} color={colors.warning} />
              <Text style={styles.challengeFeatureText}>Badges</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.challengeButton}
            onPress={() => onNavigate("CHALLENGE_PROGRESS")}
            activeOpacity={0.8}
          >
            <Text style={styles.challengeButtonText}>View All Challenges</Text>
            <MaterialIcons
              name="arrow-forward"
              size={20}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Locked Pillars</Text>
            <TouchableOpacity onPress={() => onNavigate("SETTINGS")}>
              <Text style={styles.upgradeLink}>Upgrade to Pro</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pillarsGrid}>
            {PILLARS.filter((p) => p.id !== focusPillarId).map((p, i) => (
              <View key={i} style={styles.lockedPillar}>
                <MaterialIcons
                  name="lock"
                  size={12}
                  color={colors.gray[600]}
                  style={styles.lockIcon}
                />
                <MaterialIcons
                  name={p.icon}
                  size={24}
                  color={colors.gray[500]}
                />
                <Text style={styles.lockedPillarName}>{p.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>
            Struggling with {focusPillar.name}?
          </Text>
          <Text style={styles.ctaDesc}>
            Book a free call with Coach Al and let's fix all 7 pillars together.
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => Linking.openURL("https://calendly.com")}
          >
            <Text style={styles.ctaButtonText}>Book a Free Call</Text>
            <MaterialIcons
              name="calendar-today"
              size={16}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <MaterialIcons name="refresh" size={18} color={colors.gray[400]} />
          <Text style={styles.resetButtonText}>Reset Intro Flow</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav currentScreen="DASHBOARD" onNavigate={onNavigate} />
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
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: `${colors.primary}50`,
  },
  welcomeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.gray[500],
  },
  userName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
  },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceDark,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  titleSection: {
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.white,
    lineHeight: 34,
  },
  heroAccent: {
    color: colors.primary,
  },
  focusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 12,
    gap: 6,
  },
  focusBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  checkinCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: `${colors.primary}30`,
    marginBottom: 32,
  },
  checkinCardLogged: {
    backgroundColor: `${colors.primary}20`,
    borderColor: colors.primary,
  },
  checkinHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  checkinLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkinIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  checkinIconLogged: {
    backgroundColor: colors.primary,
  },
  checkinTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.white,
  },
  checkinSubtitle: {
    fontSize: 12,
    color: colors.gray[500],
  },
  checkinStreak: {
    alignItems: "flex-end",
  },
  streakValue: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.white,
  },
  streakValueActive: {
    color: colors.primary,
  },
  streakLabel: {
    fontSize: 8,
    fontWeight: "700",
    color: colors.gray[500],
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  actionCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginBottom: 24,
  },
  actionCardLogged: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderColor: `${colors.primary}20`,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
  },
  actionDesc: {
    fontSize: 12,
    color: colors.gray[400],
    lineHeight: 18,
  },
  logButton: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logButtonLogged: {
    backgroundColor: `${colors.primary}15`,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  logButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.black,
  },
  logButtonTextLogged: {
    color: colors.primary,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 16,
  },
  upgradeLink: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  quickActionsGrid: {
    flexDirection: "row",
    gap: 16,
  },
  quickActionCard: {
    flex: 1,
    height: 176,
    backgroundColor: colors.surfaceDark,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    padding: 20,
    justifyContent: "space-between",
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
  },
  quickActionSub: {
    fontSize: 10,
    color: colors.gray[500],
  },
  pillarsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  lockedPillar: {
    width: "31%",
    aspectRatio: 1,
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
    gap: 8,
    position: "relative",
  },
  lockIcon: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  lockedPillarName: {
    fontSize: 8,
    fontWeight: "700",
    color: colors.gray[500],
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  ctaCard: {
    backgroundColor: colors.secondary,
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.white,
  },
  ctaDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 8,
    lineHeight: 22,
    fontWeight: "500",
  },
  ctaButton: {
    height: 48,
    backgroundColor: colors.white,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
  },
  ctaButtonText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.black,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    marginTop: 8,
  },
  resetButtonText: {
    fontSize: 12,
    color: colors.gray[400],
  },
  challengeCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: colors.warning,
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  challengeIconBig: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: `${colors.warning}25`,
    alignItems: "center",
    justifyContent: "center",
  },
  challengeBadge: {
    backgroundColor: colors.warning,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  challengeBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.black,
    letterSpacing: 1,
  },
  challengeTitleBig: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.white,
    marginBottom: 8,
  },
  challengeDesc: {
    fontSize: 14,
    color: colors.gray[400],
    lineHeight: 20,
    marginBottom: 16,
  },
  challengeFeatures: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  challengeFeature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  challengeFeatureText: {
    fontSize: 12,
    color: colors.gray[300],
    fontWeight: "600",
  },
  challengeButton: {
    backgroundColor: colors.warning,
    height: 52,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  challengeButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
  },
});
