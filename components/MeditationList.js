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

const MEDITATIONS = [
  {
    id: 'breathing',
    title: 'Breath Awareness',
    pillar: 'Breathing',
    duration: '5-7 min',
    description: 'Activate your parasympathetic nervous system through conscious breathing and box breathing technique.',
    icon: 'air',
    color: colors.info,
  },
  {
    id: 'mindfulness',
    title: 'Present Moment',
    pillar: 'Mindfulness',
    duration: '7-10 min',
    description: 'Cultivate non-judgmental awareness through a guided body scan and present moment practice.',
    icon: 'psychology',
    color: colors.primary,
  },
  {
    id: 'grounding',
    title: 'Grounding & Space',
    pillar: 'Environment',
    duration: '5-7 min',
    description: 'Connect with your physical environment and create internal space through visualization.',
    icon: 'park',
    color: colors.success,
  },
];

export const MeditationList = ({ onNavigate, onSelectMeditation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onNavigate('DASHBOARD')}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guided Meditations</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introSection}>
          <View style={styles.introIcon}>
            <MaterialIcons name="self-improvement" size={32} color={colors.primary} />
          </View>
          <Text style={styles.introTitle}>Find Your Calm</Text>
          <Text style={styles.introText}>
            Three guided sessions aligned with Coach Al's core pillars.
            Choose based on what you need right now.
          </Text>
        </View>

        <View style={styles.meditationsList}>
          {MEDITATIONS.map((meditation) => (
            <TouchableOpacity
              key={meditation.id}
              style={styles.meditationCard}
              onPress={() => onSelectMeditation(meditation)}
              activeOpacity={0.8}
            >
              <View style={[styles.meditationIconContainer, { backgroundColor: `${meditation.color}20` }]}>
                <MaterialIcons
                  name={meditation.icon}
                  size={28}
                  color={meditation.color}
                />
              </View>
              <View style={styles.meditationContent}>
                <View style={styles.meditationHeader}>
                  <Text style={styles.meditationTitle}>{meditation.title}</Text>
                  <View style={styles.durationBadge}>
                    <MaterialIcons name="schedule" size={12} color={colors.gray[500]} />
                    <Text style={styles.durationText}>{meditation.duration}</Text>
                  </View>
                </View>
                <Text style={styles.pillarLabel}>{meditation.pillar} Pillar</Text>
                <Text style={styles.meditationDescription}>{meditation.description}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipCard}>
          <MaterialIcons name="lightbulb" size={20} color={colors.warning} />
          <Text style={styles.tipText}>
            Tip: Start with Breath Awareness in the morning, Present Moment when overwhelmed,
            and Grounding & Space in the evening.
          </Text>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  introSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  introIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: colors.gray[400],
    textAlign: 'center',
    lineHeight: 22,
  },
  meditationsList: {
    gap: 16,
  },
  meditationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  meditationIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  meditationContent: {
    flex: 1,
  },
  meditationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  meditationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    color: colors.gray[500],
  },
  pillarLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 6,
  },
  meditationDescription: {
    fontSize: 13,
    color: colors.gray[400],
    lineHeight: 18,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: `${colors.warning}10`,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: `${colors.warning}30`,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: colors.gray[400],
    lineHeight: 20,
  },
});
