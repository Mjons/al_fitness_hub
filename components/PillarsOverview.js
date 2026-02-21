import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../styles/ThemeContext";
import { PILLARS } from "../constants";
import { BottomNav } from "./BottomNav";

export const PillarsOverview = ({ onNavigate }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onNavigate("DASHBOARD")}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pillars Overview</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>My 7 Pillars</Text>
        <Text style={styles.pageSubtitle}>
          Building your foundation, one step at a time.
        </Text>

        <View style={styles.balanceCard}>
          <View style={styles.balanceContent}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <View style={styles.balanceValue}>
              <Text style={styles.balanceNumber}>6.5</Text>
              <Text style={styles.balanceMax}>/10</Text>
            </View>
            <Text style={styles.balanceHint}>
              Great start! Keep pushing on Nutrition.
            </Text>
          </View>
          <View style={styles.circleChart}>
            <View style={styles.circleInner}>
              <MaterialIcons
                name="fitness-center"
                size={24}
                color={colors.primary}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.challengeBanner}
          onPress={() => onNavigate("CHALLENGE_PROGRESS")}
          activeOpacity={0.8}
        >
          <View style={styles.challengeBannerIcon}>
            <MaterialIcons
              name="emoji-events"
              size={24}
              color={colors.warning}
            />
          </View>
          <View style={styles.challengeBannerContent}>
            <Text style={styles.challengeBannerTitle}>21-Day Challenges</Text>
            <Text style={styles.challengeBannerSubtitle}>
              Start a progressive challenge for any pillar
            </Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={colors.gray[500]}
          />
        </TouchableOpacity>

        <View style={styles.pillarsList}>
          {PILLARS.map((p, i) => (
            <View key={i} style={styles.pillarCard}>
              <View style={styles.pillarHeader}>
                <View style={styles.pillarLeft}>
                  <View style={styles.pillarIcon}>
                    <MaterialIcons
                      name={p.icon}
                      size={24}
                      color={colors.primary}
                    />
                  </View>
                  <View>
                    <Text style={styles.pillarName}>{p.name}</Text>
                    <Text style={styles.pillarStatus}>Status: {p.status}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.pillarScore,
                    p.score < 5 && styles.pillarScoreLow,
                  ]}
                >
                  <Text
                    style={[
                      styles.pillarScoreText,
                      p.score < 5 && styles.pillarScoreTextLow,
                    ]}
                  >
                    {p.score}/10
                  </Text>
                </View>
              </View>
              <View style={styles.pillarBar}>
                <View
                  style={[
                    styles.pillarBarFill,
                    { width: `${p.score * 10}%` },
                    p.score < 5 && styles.pillarBarFillLow,
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNav currentScreen="PILLARS_OVERVIEW" onNavigate={onNavigate} />
    </View>
  );
};

const makeStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
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
    color: colors.text,
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
    color: colors.text,
  },
  pageSubtitle: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 4,
    marginBottom: 24,
  },
  balanceCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.divider,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  balanceContent: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  balanceValue: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },
  balanceNumber: {
    fontSize: 40,
    fontWeight: "700",
    color: colors.text,
  },
  balanceMax: {
    fontSize: 18,
    color: colors.gray[500],
    marginLeft: 4,
  },
  balanceHint: {
    fontSize: 10,
    color: colors.gray[500],
    marginTop: 8,
  },
  circleChart: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  circleInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  pillarsList: {
    gap: 20,
  },
  pillarCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  pillarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  pillarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pillarIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.divider,
    alignItems: "center",
    justifyContent: "center",
  },
  pillarName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  pillarStatus: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  pillarScore: {
    backgroundColor: `${colors.primary}15`,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pillarScoreLow: {
    backgroundColor: "rgba(239,68,68,0.15)",
    borderColor: "rgba(239,68,68,0.3)",
  },
  pillarScoreText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  pillarScoreTextLow: {
    color: "#ef4444",
  },
  pillarBar: {
    height: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 4,
    overflow: "hidden",
  },
  pillarBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  pillarBarFillLow: {
    backgroundColor: "#ef4444",
  },
  challengeBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${colors.warning}15`,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: `${colors.warning}30`,
  },
  challengeBannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${colors.warning}25`,
    alignItems: "center",
    justifyContent: "center",
  },
  challengeBannerContent: {
    flex: 1,
    marginLeft: 12,
  },
  challengeBannerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  challengeBannerSubtitle: {
    fontSize: 12,
    color: colors.gray[400],
    marginTop: 2,
  },
});
