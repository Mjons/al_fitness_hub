import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import { BottomNav } from './BottomNav';

export const ProgressSummary = ({ onNavigate }) => {
  const wins = [
    '3 Personal Bests in Strength Training',
    'Perfect Sleep Streak (7/7 days)',
    'Hit protein goal 5 days in a row',
  ];

  const pillarsBreakdown = [
    { n: 'Movement', s: 100 },
    { n: 'Sleep', s: 90 },
    { n: 'Hydration', s: 85 },
    { n: 'Mindset', s: 75 },
    { n: 'Nutrition', s: 70 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onNavigate('DASHBOARD')}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Week in Review</Text>
          <Text style={styles.headerDate}>Oct 16 - Oct 22</Text>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <MaterialIcons name="share" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Great work this week, Sarah!</Text>
          <Text style={styles.heroSubtitle}>
            You're building momentum. Keep it up!
          </Text>
        </View>

        <View style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreLabel}>Consistency Score</Text>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreBadgeText}>High Score</Text>
            </View>
          </View>
          <View style={styles.scoreValue}>
            <Text style={styles.scoreNumber}>82%</Text>
            <Text style={styles.scoreUnit}>Overall Adherence</Text>
          </View>
          <View style={styles.scoreBar}>
            <View style={[styles.scoreBarFill, { width: '82%' }]} />
          </View>
        </View>

        <View style={styles.winsCard}>
          <View style={styles.winsTitleRow}>
            <MaterialIcons name="emoji-events" size={20} color={colors.secondary} />
            <Text style={styles.winsTitle}>Wins of the Week</Text>
          </View>
          {wins.map((win, i) => (
            <View key={i} style={styles.winRow}>
              <MaterialIcons name="check-circle" size={20} color={colors.secondary} />
              <Text style={styles.winText}>{win}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pillars Breakdown</Text>
          <View style={styles.pillarsCard}>
            {pillarsBreakdown.map((p, i) => (
              <View key={i} style={styles.pillarRow}>
                <Text style={styles.pillarName}>{p.n}</Text>
                <View style={styles.pillarBar}>
                  <View style={[styles.pillarBarFill, { width: `${p.s}%` }]} />
                </View>
                <Text style={styles.pillarPercent}>{p.s}%</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.historyButton}>
              <Text style={styles.historyButtonText}>View Full History</Text>
              <MaterialIcons name="arrow-forward" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.coachCard}>
          <View style={styles.coachRow}>
            <Image
              source={{ uri: 'https://picsum.photos/100' }}
              style={styles.coachAvatar}
            />
            <View style={styles.coachContent}>
              <Text style={styles.coachLabel}>Coach Al's Adjustment</Text>
              <Text style={styles.coachMessage}>
                "Try prepping a high-protein breakfast the night before to avoid
                that mid-morning sugar crash. You've got this!"
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.reminderButton}>
            <Text style={styles.reminderButtonText}>Set Reminder</Text>
            <MaterialIcons name="alarm-add" size={14} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav currentScreen="PROGRESS_SUMMARY" onNavigate={onNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  headerDate: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.secondary,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: colors.gray[500],
    fontWeight: '500',
    marginTop: 8,
  },
  scoreCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 24,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  scoreBadge: {
    backgroundColor: `${colors.secondary}15`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  scoreBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreValue: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 16,
  },
  scoreNumber: {
    fontSize: 56,
    fontWeight: '900',
    color: colors.secondary,
    lineHeight: 60,
  },
  scoreUnit: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.gray[500],
    marginBottom: 8,
  },
  scoreBar: {
    height: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 6,
  },
  winsCard: {
    backgroundColor: `${colors.secondary}10`,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  winsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  winsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  winRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  winText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 16,
  },
  pillarsCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  pillarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  pillarName: {
    width: 80,
    fontSize: 12,
    fontWeight: '700',
    color: colors.gray[500],
  },
  pillarBar: {
    flex: 1,
    height: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  pillarBarFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 6,
  },
  pillarPercent: {
    width: 40,
    fontSize: 12,
    fontWeight: '900',
    color: colors.white,
    textAlign: 'right',
  },
  historyButton: {
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  historyButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  coachCard: {
    backgroundColor: '#3a2e22',
    borderRadius: 24,
    padding: 24,
  },
  coachRow: {
    flexDirection: 'row',
    gap: 16,
  },
  coachAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  coachContent: {
    flex: 1,
  },
  coachLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  coachMessage: {
    fontSize: 14,
    color: colors.white,
    fontStyle: 'italic',
    fontWeight: '300',
    lineHeight: 22,
  },
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 16,
  },
  reminderButtonText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
