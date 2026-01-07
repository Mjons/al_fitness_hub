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

export const IntakeMovement = ({ onNext }) => {
  const [steps, setSteps] = useState(6000);
  const [freq, setFreq] = useState(1);
  const [level, setLevel] = useState('Low');

  const calculateScore = () => {
    let score = 0;
    if (steps >= 8000) score += 3;
    if (freq >= 2) score += 3;
    if (level === 'High') score += 2;
    return Math.max(1, Math.min(10, score + 2));
  };

  const freqOptions = [0, 1, 2, 3, '4+'];
  const levelOptions = ['Low', 'Medium', 'High'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 4 of 8</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: '50%' }]} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Pillar 5: Movement.</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Average Daily Steps</Text>
          <View style={styles.sliderCard}>
            <Text style={styles.stepsValue}>{steps.toLocaleString()}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={15000}
              step={500}
              value={steps}
              onValueChange={setSteps}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.gray[700]}
              thumbTintColor={colors.primary}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>Sedentary</Text>
              <Text style={styles.sliderLabel}>Active</Text>
              <Text style={styles.sliderLabel}>Elite</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Resistance Training Frequency</Text>
          <View style={styles.freqContainer}>
            {freqOptions.map((n, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.freqButton, freq === i && styles.freqButtonActive]}
                onPress={() => setFreq(i)}
              >
                <Text style={[styles.freqValue, freq === i && styles.freqValueActive]}>
                  {n}
                </Text>
                <Text style={[styles.freqLabel, freq === i && styles.freqLabelActive]}>
                  Days
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Overall Activity Level</Text>
          <View style={styles.levelContainer}>
            {levelOptions.map((l) => (
              <TouchableOpacity
                key={l}
                style={[styles.levelButton, level === l && styles.levelButtonActive]}
                onPress={() => setLevel(l)}
              >
                <Text style={[styles.levelText, level === l && styles.levelTextActive]}>
                  {l}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onNext(calculateScore())}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
          <MaterialIcons name="arrow-forward" size={20} color={colors.black} />
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
    paddingBottom: 16,
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
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 32,
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
  sliderCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
  },
  stepsValue: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.primary,
    fontVariant: ['tabular-nums'],
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 16,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.gray[500],
    textTransform: 'uppercase',
  },
  freqContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  freqButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freqButtonActive: {
    backgroundColor: colors.primary,
  },
  freqValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray[500],
  },
  freqValueActive: {
    color: colors.black,
  },
  freqLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.gray[500],
    textTransform: 'uppercase',
  },
  freqLabelActive: {
    color: colors.black,
  },
  levelContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  levelButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: colors.surfaceDark,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  levelButtonActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}15`,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gray[500],
  },
  levelTextActive: {
    color: colors.primary,
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
  buttonText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.black,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
