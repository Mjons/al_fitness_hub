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

export const IntakeMovement = ({ onNext, onBack }) => {
  const [steps, setSteps] = useState(6000);
  const [freq, setFreq] = useState(1);
  const [cardioFreq, setCardioFreq] = useState(1);
  const [level, setLevel] = useState('Low');

  const [unsureSteps, setUnsureSteps] = useState(false);
  const [unsureFreq, setUnsureFreq] = useState(false);
  const [unsureCardio, setUnsureCardio] = useState(false);
  const [unsureLevel, setUnsureLevel] = useState(false);

  const calculateScore = () => {
    let score = 0;
    if (!unsureSteps && steps >= 8000) score += 3;
    if (!unsureFreq && freq >= 2) score += 2;
    if (!unsureCardio && cardioFreq >= 2) score += 2;
    if (!unsureLevel && level === 'High') score += 2;
    return Math.max(1, Math.min(10, score + 1));
  };

  const getMovementData = () => ({
    steps: unsureSteps ? null : steps,
    freq: unsureFreq ? null : freq,
    cardioFreq: unsureCardio ? null : cardioFreq,
    level: unsureLevel ? null : level,
    unsure: { steps: unsureSteps, freq: unsureFreq, cardio: unsureCardio, level: unsureLevel },
  });

  const freqOptions = [0, 1, 2, 3, '4+'];
  const levelOptions = ['Low', 'Medium', 'High'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 4 of 7</Text>
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Average Daily Steps</Text>
            <TouchableOpacity
              style={[styles.unsureToggle, unsureSteps && styles.unsureToggleActive]}
              onPress={() => setUnsureSteps(!unsureSteps)}
            >
              <Text style={[styles.unsureText, unsureSteps && styles.unsureTextActive]}>
                I'm not sure
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.sliderCard, unsureSteps && styles.dimmed]}>
            <Text style={styles.stepsValue}>
              {unsureSteps ? '—' : steps.toLocaleString()}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={15000}
              step={500}
              value={steps}
              onValueChange={setSteps}
              minimumTrackTintColor={unsureSteps ? colors.gray[600] : colors.primary}
              maximumTrackTintColor={colors.gray[700]}
              thumbTintColor={unsureSteps ? colors.gray[600] : colors.primary}
              disabled={unsureSteps}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>Sedentary</Text>
              <Text style={styles.sliderLabel}>Active</Text>
              <Text style={styles.sliderLabel}>Elite</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Resistance Training Frequency</Text>
            <TouchableOpacity
              style={[styles.unsureToggle, unsureFreq && styles.unsureToggleActive]}
              onPress={() => setUnsureFreq(!unsureFreq)}
            >
              <Text style={[styles.unsureText, unsureFreq && styles.unsureTextActive]}>
                I'm not sure
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.freqContainer, unsureFreq && styles.dimmed]}>
            {freqOptions.map((n, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.freqButton, !unsureFreq && freq === i && styles.freqButtonActive]}
                onPress={() => !unsureFreq && setFreq(i)}
                activeOpacity={unsureFreq ? 1 : 0.7}
              >
                <Text style={[styles.freqValue, !unsureFreq && freq === i && styles.freqValueActive]}>
                  {n}
                </Text>
                <Text style={[styles.freqLabel, !unsureFreq && freq === i && styles.freqLabelActive]}>
                  Days
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Cardio Training Frequency</Text>
            <TouchableOpacity
              style={[styles.unsureToggle, unsureCardio && styles.unsureToggleActive]}
              onPress={() => setUnsureCardio(!unsureCardio)}
            >
              <Text style={[styles.unsureText, unsureCardio && styles.unsureTextActive]}>
                I'm not sure
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.freqContainer, unsureCardio && styles.dimmed]}>
            {freqOptions.map((n, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.freqButton, !unsureCardio && cardioFreq === i && styles.freqButtonActive]}
                onPress={() => !unsureCardio && setCardioFreq(i)}
                activeOpacity={unsureCardio ? 1 : 0.7}
              >
                <Text style={[styles.freqValue, !unsureCardio && cardioFreq === i && styles.freqValueActive]}>
                  {n}
                </Text>
                <Text style={[styles.freqLabel, !unsureCardio && cardioFreq === i && styles.freqLabelActive]}>
                  Days
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Overall Activity Level</Text>
            <TouchableOpacity
              style={[styles.unsureToggle, unsureLevel && styles.unsureToggleActive]}
              onPress={() => setUnsureLevel(!unsureLevel)}
            >
              <Text style={[styles.unsureText, unsureLevel && styles.unsureTextActive]}>
                I'm not sure
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.levelContainer, unsureLevel && styles.dimmed]}>
            {levelOptions.map((l) => (
              <TouchableOpacity
                key={l}
                style={[styles.levelButton, !unsureLevel && level === l && styles.levelButtonActive]}
                onPress={() => !unsureLevel && setLevel(l)}
                activeOpacity={unsureLevel ? 1 : 0.7}
              >
                <Text style={[styles.levelText, !unsureLevel && level === l && styles.levelTextActive]}>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  unsureToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  unsureToggleActive: {
    backgroundColor: `${colors.primary}20`,
    borderColor: colors.primary,
  },
  unsureText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.gray[500],
  },
  unsureTextActive: {
    color: colors.primary,
  },
  dimmed: {
    opacity: 0.4,
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
