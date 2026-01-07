import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colors } from '../styles/theme';

export const IntakeBreathingSleep = ({ onNext }) => {
  const [noseBreather, setNoseBreather] = useState(null);
  const [sleepHours, setSleepHours] = useState(7);
  const [sleepQuality, setSleepQuality] = useState(5);

  const calculateBreathingScore = () => {
    let score = 0;
    if (noseBreather) score += 5;
    return Math.max(1, Math.min(10, score + 3));
  };

  const calculateSleepScore = () => {
    let score = 0;
    if (sleepHours >= 7) score += 3;
    if (sleepQuality >= 8) score += 3;
    return Math.max(1, Math.min(10, score + 3));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 6 of 8</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Breathing & Sleep.</Text>
          <Text style={styles.subtitle}>
            These pillars form the basis of your biological recovery.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Are you a nose breather during the day?
          </Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                noseBreather === true && styles.optionButtonActive,
              ]}
              onPress={() => setNoseBreather(true)}
            >
              <Text
                style={[
                  styles.optionText,
                  noseBreather === true && styles.optionTextActive,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                noseBreather === false && styles.optionButtonActive,
              ]}
              onPress={() => setNoseBreather(false)}
            >
              <Text
                style={[
                  styles.optionText,
                  noseBreather === false && styles.optionTextActive,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Average Sleep (Hours)</Text>
          <View style={styles.sliderCard}>
            <Text style={styles.sliderValue}>{sleepHours}</Text>
            <Slider
              style={styles.slider}
              minimumValue={4}
              maximumValue={10}
              step={1}
              value={sleepHours}
              onValueChange={setSleepHours}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.gray[700]}
              thumbTintColor={colors.primary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Sleep Quality (1-10)</Text>
          <View style={styles.sliderCard}>
            <Text style={styles.sliderValue}>{sleepQuality}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={sleepQuality}
              onValueChange={setSleepQuality}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.gray[700]}
              thumbTintColor={colors.primary}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, noseBreather === null && styles.buttonDisabled]}
          onPress={() =>
            noseBreather !== null &&
            onNext(calculateBreathingScore(), calculateSleepScore())
          }
          disabled={noseBreather === null}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.buttonText,
              noseBreather === null && styles.buttonTextDisabled,
            ]}
          >
            Continue
          </Text>
          <MaterialIcons
            name="arrow-forward"
            size={20}
            color={noseBreather !== null ? colors.black : colors.gray[600]}
          />
        </TouchableOpacity>
      </View>
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  progressBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleSection: {
    marginBottom: 32,
    marginTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.white,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[400],
    marginTop: 8,
  },
  section: {
    marginBottom: 40,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: colors.surfaceDark,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  optionButtonActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}15`,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gray[500],
  },
  optionTextActive: {
    color: colors.primary,
  },
  sliderCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
  },
  sliderValue: {
    fontSize: 40,
    fontWeight: '900',
    color: colors.primary,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 16,
  },
  footer: {
    padding: 24,
    paddingBottom: 32,
  },
  button: {
    height: 64,
    backgroundColor: colors.primary,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.black,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  buttonTextDisabled: {
    color: colors.gray[600],
  },
});
