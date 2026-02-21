import React, { useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';
import { WORKOUTS } from '../constants';
import { BottomNav } from './BottomNav';

export const WorkoutList = ({ onNavigate, onSelectWorkout }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const categories = ['All', 'Mobility', 'Strength', 'Cardio', 'Postnatal'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workouts</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
          <MaterialIcons name="tune" size={20} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color={colors.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search workouts..."
            placeholderTextColor={colors.gray[500]}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {categories.map((c, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.categoryPill, i === 0 && styles.categoryPillActive]}
            >
              <Text
                style={[
                  styles.categoryText,
                  i === 0 && styles.categoryTextActive,
                ]}
              >
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Coach Al's Picks</Text>

        {WORKOUTS.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={styles.workoutCard}
            onPress={() => onSelectWorkout(workout)}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: workout.image }}
              style={styles.workoutImage}
            />
            <View style={styles.workoutImageOverlay} />
            <View style={styles.workoutDuration}>
              <MaterialIcons name="schedule" size={14} color={colors.secondary} />
              <Text style={styles.durationText}>{workout.duration} min</Text>
            </View>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <View style={styles.workoutMeta}>
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <MaterialIcons
                      name="accessibility-new"
                      size={16}
                      color={colors.gray[500]}
                    />
                    <Text style={styles.metaText}>{workout.type}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialIcons
                      name="signal-cellular-alt"
                      size={16}
                      color={colors.gray[500]}
                    />
                    <Text style={styles.metaText}>{workout.level}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>Start</Text>
                  <MaterialIcons name="play-arrow" size={14} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary,
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  categoriesScroll: {
    marginBottom: 24,
  },
  categoryPill: {
    paddingHorizontal: 20,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: colors.secondary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gray[500],
  },
  categoryTextActive: {
    color: colors.white,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  workoutCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  workoutImage: {
    width: '100%',
    height: 192,
  },
  workoutImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    height: 192,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  workoutDuration: {
    position: 'absolute',
    bottom: 76,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
  workoutInfo: {
    padding: 16,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  workoutMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.gray[500],
    fontWeight: '500',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  startButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});
