import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';
import { BottomNav } from './BottomNav';

export const WorkoutDetail = ({ workout, onBack, onNavigate }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  if (!workout) return null;

  const exercises = [
    { n: 'Jumping Jacks', sub: '45 Seconds', img: 'https://picsum.photos/100?1' },
    { n: 'Bodyweight Squats', sub: '15 Reps', img: 'https://picsum.photos/100?2' },
    { n: 'Push-ups', sub: '10 Reps', img: 'https://picsum.photos/100?3' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {workout.title}
        </Text>
        <TouchableOpacity style={styles.bookmarkButton}>
          <MaterialIcons name="bookmark-border" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: workout.image }} style={styles.workoutImage} />
          <View style={styles.imageOverlay} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsRow}>
          <View style={styles.tag}>
            <MaterialIcons name="timer" size={18} color={colors.secondary} />
            <Text style={styles.tagText}>{workout.duration} Min</Text>
          </View>
          <View style={styles.tag}>
            <MaterialIcons name="local-fire-department" size={18} color={colors.secondary} />
            <Text style={styles.tagText}>{workout.level}</Text>
          </View>
          <View style={styles.tag}>
            <MaterialIcons name="fitness-center" size={18} color={colors.secondary} />
            <Text style={styles.tagText}>{workout.type}</Text>
          </View>
        </ScrollView>

        <View style={styles.coachNote}>
          <Image
            source={{ uri: 'https://picsum.photos/100' }}
            style={styles.coachAvatar}
          />
          <View style={styles.coachContent}>
            <Text style={styles.coachTitle}>Coach's Note</Text>
            <Text style={styles.coachMessage}>
              "Focus on form over speed today. This circuit is about waking up your
              muscles, not exhaustion. You've got this!"
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Circuit</Text>
            <Text style={styles.sectionCount}>5 Exercises</Text>
          </View>
          {exercises.map((ex, i) => (
            <View key={i} style={styles.exerciseCard}>
              <Image source={{ uri: ex.img }} style={styles.exerciseImage} />
              <View style={styles.exerciseContent}>
                <Text style={styles.exerciseName}>{ex.n}</Text>
                <View style={styles.exerciseReps}>
                  <Text style={styles.repsText}>{ex.sub}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.infoButton}>
                <MaterialIcons name="info" size={24} color={colors.gray[500]} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
          <MaterialIcons name="play-arrow" size={24} color={colors.white} />
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>

      <BottomNav currentScreen="WORKOUT_LIST" onNavigate={onNavigate} />
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 180,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  workoutImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  tagsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.overlay,
    paddingHorizontal: 12,
    marginRight: 12,
    gap: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  coachNote: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
    gap: 16,
    marginBottom: 24,
  },
  coachAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[600],
  },
  coachContent: {
    flex: 1,
  },
  coachTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  coachMessage: {
    fontSize: 12,
    color: colors.gray[400],
    fontStyle: 'italic',
    lineHeight: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.gray[500],
    textTransform: 'uppercase',
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 16,
  },
  exerciseImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  exerciseReps: {
    backgroundColor: `${colors.secondary}15`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  repsText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
  },
  infoButton: {
    padding: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 88,
    left: 0,
    right: 0,
    padding: 16,
  },
  startButton: {
    height: 56,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});
