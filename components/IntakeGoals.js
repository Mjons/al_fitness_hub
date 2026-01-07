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

export const IntakeGoals = ({ onNext }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [experience, setExperience] = useState(null);

  const toggleGoal = (id) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const goalsList = [
    { id: 'fat', label: 'Lose Body Fat', sub: 'Burn calories', icon: 'local-fire-department' },
    { id: 'muscle', label: 'Build Muscle', sub: 'Gain strength', icon: 'fitness-center' },
    { id: 'energy', label: 'Improve Energy', sub: 'Boost stamina', icon: 'bolt' },
    { id: 'health', label: 'Long-term Health', sub: 'Live longer', icon: 'favorite' },
  ];

  const experienceList = [
    { id: 'beg', label: 'Beginner', sub: 'New to fitness or returning after a break', icon: 'child-care' },
    { id: 'int', label: 'Intermediate', sub: 'Consistent training for 6-12 months', icon: 'directions-run' },
    { id: 'adv', label: 'Advanced', sub: 'Years of structured training experience', icon: 'workspace-premium' },
  ];

  const isFormValid = selectedGoals.length > 0 && experience !== null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 3 of 8</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: '37.5%' }]} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>What are we working towards?</Text>
          <Text style={styles.subtitle}>Select all that apply to your journey.</Text>
        </View>

        <View style={styles.goalsSection}>
          {goalsList.map((goal) => {
            const isActive = selectedGoals.includes(goal.id);
            return (
              <TouchableOpacity
                key={goal.id}
                style={[styles.goalCard, isActive && styles.goalCardActive]}
                onPress={() => toggleGoal(goal.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.goalIcon, isActive && styles.goalIconActive]}>
                  <MaterialIcons
                    name={goal.icon}
                    size={32}
                    color={isActive ? colors.black : colors.gray[500]}
                  />
                </View>
                <View style={styles.goalContent}>
                  <Text style={[styles.goalLabel, isActive && styles.goalLabelActive]}>
                    {goal.label}
                  </Text>
                  <Text style={styles.goalSub}>{goal.sub}</Text>
                </View>
                <View style={[styles.checkbox, isActive && styles.checkboxActive]}>
                  {isActive && (
                    <MaterialIcons name="check" size={16} color={colors.black} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.experienceSection}>
          <Text style={styles.sectionTitle}>Current Experience</Text>
          <Text style={styles.sectionSubtitle}>
            Be honest! Coach Al needs a true baseline.
          </Text>
          <View style={styles.experienceList}>
            {experienceList.map((exp) => {
              const isActive = experience === exp.id;
              return (
                <TouchableOpacity
                  key={exp.id}
                  style={[styles.expCard, isActive && styles.expCardActive]}
                  onPress={() => setExperience(exp.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.expIcon, isActive && styles.expIconActive]}>
                    <MaterialIcons
                      name={exp.icon}
                      size={24}
                      color={isActive ? colors.primary : colors.gray[500]}
                    />
                  </View>
                  <View style={styles.expContent}>
                    <Text style={[styles.expLabel, isActive && styles.expLabelActive]}>
                      {exp.label}
                    </Text>
                    <Text style={styles.expSub}>{exp.sub}</Text>
                  </View>
                  <View style={[styles.radio, isActive && styles.radioActive]}>
                    {isActive && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.injuriesSection}>
          <Text style={styles.sectionTitle}>Limitations / Injuries</Text>
          <TextInput
            style={styles.textarea}
            placeholder="e.g. Past ACL tear, lower back pain when sitting for long periods..."
            placeholderTextColor={colors.gray[600]}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={onNext}
          disabled={!isFormValid}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, !isFormValid && styles.buttonTextDisabled]}>
            Continue
          </Text>
          <MaterialIcons
            name="arrow-forward"
            size={20}
            color={isFormValid ? colors.black : colors.gray[600]}
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
    fontWeight: '900',
    color: colors.white,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 18,
    color: colors.gray[400],
    marginTop: 8,
  },
  goalsSection: {
    gap: 16,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.surfaceDark,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 24,
  },
  goalCardActive: {
    backgroundColor: `${colors.primary}15`,
    borderColor: colors.primary,
  },
  goalIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalIconActive: {
    backgroundColor: colors.primary,
  },
  goalContent: {
    flex: 1,
  },
  goalLabel: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.gray[300],
  },
  goalLabelActive: {
    color: colors.white,
  },
  goalSub: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.gray[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  experienceSection: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[500],
    marginTop: 4,
    marginBottom: 16,
  },
  experienceList: {
    gap: 12,
  },
  expCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 16,
  },
  expCardActive: {
    backgroundColor: `${colors.primary}08`,
    borderColor: colors.primary,
  },
  expIcon: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  expIconActive: {
    backgroundColor: `${colors.primary}20`,
  },
  expContent: {
    flex: 1,
  },
  expLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray[300],
  },
  expLabelActive: {
    color: colors.white,
  },
  expSub: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  radio: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.gray[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}20`,
  },
  radioDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
  },
  injuriesSection: {
    marginTop: 32,
    marginBottom: 40,
  },
  textarea: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    padding: 20,
    fontSize: 18,
    fontWeight: '500',
    color: colors.white,
    minHeight: 140,
    marginTop: 12,
    borderWidth: 2,
    borderColor: 'transparent',
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
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
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
