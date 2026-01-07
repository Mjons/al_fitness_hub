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

export const IntakeMindfulness = ({ onNext }) => {
  const [outdoors, setOutdoors] = useState(1);
  const [stress, setStress] = useState(5);

  const calculateMindfulnessScore = () => {
    let score = 0;
    if (stress <= 3) score += 5;
    else if (stress <= 6) score += 2;
    return Math.max(1, Math.min(10, score + 3));
  };

  const calculateEnvironmentScore = () => {
    let score = 0;
    if (outdoors >= 3) score += 5;
    else if (outdoors >= 1) score += 2;
    return Math.max(1, Math.min(10, score + 2));
  };

  const outdoorOptions = [0, 1, 2, '3+'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 7 of 8</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: '87.5%' }]} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Mindset & Space.</Text>
          <Text style={styles.subtitle}>
            Pillars 6 & 7: Your internal and external environments.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Hours spent outdoors daily?</Text>
          <View style={styles.optionsRow}>
            {outdoorOptions.map((h, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.optionButton,
                  outdoors === i && styles.optionButtonActive,
                ]}
                onPress={() => setOutdoors(i)}
              >
                <Text
                  style={[
                    styles.optionText,
                    outdoors === i && styles.optionTextActive,
                  ]}
                >
                  {h}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Current Stress Level (1-10)</Text>
          <View style={styles.sliderCard}>
            <Text style={styles.sliderValue}>{stress}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={stress}
              onValueChange={setStress}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.gray[700]}
              thumbTintColor={colors.primary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Do you practice daily gratitude?</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionText}>Sometimes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onNext(calculateMindfulnessScore(), calculateEnvironmentScore())
          }
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
    gap: 8,
  },
  optionButton: {
    flex: 1,
    height: 56,
    backgroundColor: colors.surfaceDark,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.black,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
