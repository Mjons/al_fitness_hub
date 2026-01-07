import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import { BottomNav } from './BottomNav';

export const NutritionSummary = ({ onNavigate }) => {
  const days = ['21 Mon', '22 Tue', '23 Wed', '24 Thu', '25 Fri'];

  const stats = [
    { label: 'Daily Calories', val: '2,100', unit: 'kcal target', icon: 'local-fire-department', prog: 65 },
    { label: 'Daily Protein', val: '140g', unit: 'protein target', icon: 'fitness-center', prog: 40 },
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
        <Text style={styles.headerTitle}>Nutrition</Text>
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-horiz" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.daysNav}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {days.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.dayTab, i === 2 && styles.dayTabActive]}
            >
              <Text style={[styles.dayText, i === 2 && styles.dayTextActive]}>
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.goalBadge}>
          <MaterialIcons name="verified" size={14} color={colors.primary} />
          <Text style={styles.goalBadgeText}>Goal: Weight Loss</Text>
        </View>
        <Text style={styles.pageTitle}>Your Daily Fuel</Text>
        <Text style={styles.pageSubtitle}>Here is your tailored plan for today.</Text>

        <View style={styles.statsGrid}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={styles.statIconContainer}>
                  <MaterialIcons name={s.icon} size={16} color={colors.primary} />
                </View>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
              <Text style={styles.statValue}>{s.val}</Text>
              <Text style={styles.statUnit}>{s.unit}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${s.prog}%` }]} />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <MaterialIcons name="psychology" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Coach Al's Pillars</Text>
          </View>

          <View style={styles.pillarCard}>
            <View style={styles.pillarIcon}>
              <MaterialIcons name="grass" size={24} color={colors.primary} />
            </View>
            <View style={styles.pillarContent}>
              <Text style={styles.pillarTitle}>Fiber Focus</Text>
              <Text style={styles.pillarDesc}>
                Aim for 15g of fiber per 1,000 calories to keep your gut happy and
                energy steady.
              </Text>
              <Text style={styles.pillarTarget}>Target: 32g Today</Text>
            </View>
          </View>

          <View style={[styles.pillarCard, styles.pillarCardBlue]}>
            <View style={[styles.pillarIcon, styles.pillarIconBlue]}>
              <MaterialIcons name="palette" size={24} color="#3b82f6" />
            </View>
            <View style={styles.pillarContent}>
              <Text style={styles.pillarTitle}>Eat the Rainbow</Text>
              <Text style={styles.pillarDesc}>
                Try adding a red or green vegetable to your next meal for varied
                micronutrients.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => onNavigate('NUTRITION_LOG')}
      >
        <MaterialIcons name="add" size={28} color={colors.black} />
      </TouchableOpacity>

      <BottomNav currentScreen="NUTRITION_SUMMARY" onNavigate={onNavigate} />
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daysNav: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  dayTab: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  dayTabActive: {
    borderBottomColor: colors.primary,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gray[500],
  },
  dayTextActive: {
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 140,
  },
  goalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  goalBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.white,
  },
  pageSubtitle: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 4,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 20,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.white,
  },
  statUnit: {
    fontSize: 10,
    color: colors.gray[500],
    marginTop: 2,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  pillarCard: {
    flexDirection: 'row',
    backgroundColor: `${colors.secondary}08`,
    borderWidth: 1,
    borderColor: `${colors.secondary}15`,
    borderRadius: 12,
    padding: 16,
    gap: 16,
    marginBottom: 12,
  },
  pillarCardBlue: {
    backgroundColor: 'rgba(59,130,246,0.08)',
    borderColor: 'rgba(59,130,246,0.15)',
  },
  pillarIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarIconBlue: {},
  pillarContent: {
    flex: 1,
  },
  pillarTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  pillarDesc: {
    fontSize: 12,
    color: colors.gray[400],
    marginTop: 4,
    lineHeight: 18,
  },
  pillarTarget: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
