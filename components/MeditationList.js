import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';
import { BottomNav } from './BottomNav';

export const MeditationList = ({ onNavigate, onSelectMeditation }) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [showComingSoon, setShowComingSoon] = useState(false);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onNavigate('DASHBOARD')}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guided Meditations</Text>
        <TouchableOpacity style={styles.backButton} onPress={toggleTheme}>
          <MaterialIcons name={isDark ? 'light-mode' : 'dark-mode'} size={24} color={colors.text} />
        </TouchableOpacity>
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
              onPress={() => setShowComingSoon(true)}
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

      <Modal
        visible={showComingSoon}
        transparent
        animationType="fade"
        onRequestClose={() => setShowComingSoon(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIcon}>
              <MaterialIcons name="self-improvement" size={40} color={colors.primary} />
            </View>
            <Text style={styles.modalTitle}>Coming Soon</Text>
            <Text style={styles.modalText}>
              Guided meditation sessions are being crafted by Coach Al. Stay tuned!
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowComingSoon(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Got It</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNav currentScreen="MEDITATION_LIST" onNavigate={onNavigate} />
    </View>
  );
};

const makeStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
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
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 120,
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
    color: colors.text,
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
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.divider,
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
    color: colors.text,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.scrim,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  modalIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: colors.gray[400],
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 48,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textInverse,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
