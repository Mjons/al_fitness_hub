import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export const IntakeRisk = ({ onNext }) => {
  const [selectedRisks, setSelectedRisks] = useState([]);

  const riskQuestions = [
    'Told by a doctor that you have high blood pressure, diabetes, heart disease, or sleep apnea?',
    'Currently under care of a healthcare provider for a medical condition?',
  ];

  const toggleRisk = (index) => {
    setSelectedRisks((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 8 of 8</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Risk & Flag Items</Text>
          <Text style={styles.subtitle}>
            Select any that apply to you. This helps Coach Al keep your plan safe.
          </Text>
        </View>

        <View style={styles.risksSection}>
          {riskQuestions.map((q, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.riskCard,
                selectedRisks.includes(i) && styles.riskCardActive,
              ]}
              onPress={() => toggleRisk(i)}
              activeOpacity={0.8}
            >
              <Text style={styles.riskText}>{q}</Text>
              <View
                style={[
                  styles.checkbox,
                  selectedRisks.includes(i) && styles.checkboxActive,
                ]}
              >
                {selectedRisks.includes(i) && (
                  <MaterialIcons name="check" size={16} color={colors.black} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.notesSection}>
          <Text style={styles.notesLabel}>Anything else we should know?</Text>
          <TextInput
            style={styles.textarea}
            placeholder="e.g., knee surgery last year, asthma..."
            placeholderTextColor={colors.gray[600]}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
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
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[400],
    marginTop: 8,
  },
  risksSection: {
    gap: 16,
  },
  riskCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 16,
  },
  riskCardActive: {
    borderColor: `${colors.primary}50`,
  },
  riskText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
    lineHeight: 22,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: `${colors.primary}50`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  notesSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
    marginBottom: 12,
  },
  textarea: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
    minHeight: 140,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
  },
  button: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
  },
});
