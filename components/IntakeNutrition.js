import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export const IntakeNutrition = ({ onNext, onBack }) => {
  const [processedFreq, setProcessedFreq] = useState('Sometimes');
  const [water, setWater] = useState(4);

  const calculateNutritionScore = () => {
    let score = 0;
    if (processedFreq === 'Rarely') score += 3;
    else if (processedFreq === 'Sometimes') score += 1;
    return Math.max(1, Math.min(10, score + 4));
  };

  const calculateHydrationScore = () => {
    let score = 0;
    if (water >= 8) score += 5;
    else if (water >= 4) score += 2;
    return Math.max(1, Math.min(10, score + 2));
  };

  const processedOptions = [
    { value: 'Rarely', label: 'Rarely', desc: 'Once per week' },
    { value: 'Sometimes', label: 'Sometimes', desc: 'Once or twice a week' },
    { value: 'Often', label: 'Often', desc: 'Every other day' },
    { value: 'Daily', label: 'Daily', desc: 'Every day' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 5 of 7</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: '62.5%' }]} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Nutrition & Hydration.</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Ultra-processed meals/week</Text>
          <View style={styles.optionsGrid}>
            {processedOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.optionButton,
                  processedFreq === opt.value && styles.optionButtonActive,
                ]}
                onPress={() => setProcessedFreq(opt.value)}
              >
                <Text
                  style={[
                    styles.optionLabel,
                    processedFreq === opt.value && styles.optionLabelActive,
                  ]}
                >
                  {opt.label}
                </Text>
                <Text
                  style={[
                    styles.optionDesc,
                    processedFreq === opt.value && styles.optionDescActive,
                  ]}
                >
                  {opt.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Daily Water Intake (Glasses)</Text>
          <View style={styles.waterCard}>
            <View style={styles.waterGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setWater(i)}
                  style={styles.waterDrop}
                >
                  <MaterialIcons
                    name="water-drop"
                    size={28}
                    color={i <= water ? colors.primary : 'rgba(255,255,255,0.1)'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.waterLabel}>{water} glasses per day</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onNext(calculateNutritionScore(), calculateHydrationScore())}
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
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 32,
    marginTop: 16,
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
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    width: '48%',
    paddingVertical: 16,
    paddingHorizontal: 12,
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
  optionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.gray[400],
  },
  optionLabelActive: {
    color: colors.primary,
  },
  optionDesc: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.gray[600],
    marginTop: 4,
  },
  optionDescActive: {
    color: colors.gray[400],
  },
  waterCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  waterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  waterDrop: {
    padding: 4,
  },
  waterLabel: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 12,
    fontWeight: '700',
    color: colors.gray[500],
    textTransform: 'uppercase',
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
