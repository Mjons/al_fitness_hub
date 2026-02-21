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
import { FAVORITE_MEALS } from '../constants';
import { BottomNav } from './BottomNav';

export const NutritionLog = ({ onNavigate }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const mealTypes = [
    { n: 'Breakfast', i: 'wb-sunny', c: '#f97316' },
    { n: 'Lunch', i: 'restaurant', c: '#3b82f6' },
    { n: 'Dinner', i: 'nightlight', c: '#6366f1' },
    { n: 'Snack', i: 'local-dining', c: '#22c55e' },
  ];

  const todaysMeals = [
    { n: 'Oatmeal & Berries', t: 'Breakfast', kcal: 350, time: '08:30 AM' },
    { n: 'Apple Slices', t: 'Snack', kcal: 95, time: '10:45 AM' },
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
        <Text style={styles.headerTitle}>Quick Meal Log</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Fueling your day, Sarah!</Text>

        <View style={styles.tipCard}>
          <MaterialIcons name="tips-and-updates" size={20} color={colors.secondary} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Coach Al's Tip</Text>
            <Text style={styles.tipText}>
              Hydration is key! Remember to drink a glass of water 20 mins before
              your meal.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What are you logging?</Text>
          <View style={styles.mealTypesGrid}>
            {mealTypes.map((m, i) => (
              <TouchableOpacity key={i} style={styles.mealTypeCard}>
                <View style={[styles.mealTypeIcon, { backgroundColor: `${m.c}20` }]}>
                  <MaterialIcons name={m.i} size={24} color={m.c} />
                </View>
                <Text style={styles.mealTypeName}>{m.n}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Favorites</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {FAVORITE_MEALS.map((meal, i) => (
              <View key={i} style={styles.favoriteMealCard}>
                <Image source={{ uri: meal.image }} style={styles.favoriteMealImage} />
                <TouchableOpacity style={styles.addButton}>
                  <MaterialIcons name="add" size={16} color={colors.primary} />
                </TouchableOpacity>
                <View style={styles.favoriteMealInfo}>
                  <Text style={styles.favoriteMealName} numberOfLines={1}>
                    {meal.name}
                  </Text>
                  <Text style={styles.favoriteMealKcal}>{meal.kcal} kcal</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Fuel</Text>
          <View style={styles.timeline}>
            {todaysMeals.map((item, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <View>
                      <Text style={styles.mealName}>{item.n}</Text>
                      <Text style={styles.mealDetails}>
                        {item.t} • {item.kcal} kcal
                      </Text>
                    </View>
                    <Text style={styles.mealTime}>{item.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNav currentScreen="NUTRITION_SUMMARY" onNavigate={onNavigate} />
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
    padding: 16,
    paddingBottom: 100,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 24,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: `${colors.secondary}15`,
    borderWidth: 1,
    borderColor: `${colors.secondary}30`,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 32,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary,
  },
  tipText: {
    fontSize: 12,
    color: colors.gray[300],
    marginTop: 4,
    lineHeight: 18,
  },
  section: {
    marginBottom: 32,
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
    marginBottom: 16,
  },
  seeAllLink: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  mealTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  mealTypeCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: 16,
    gap: 12,
  },
  mealTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealTypeName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  favoriteMealCard: {
    width: 160,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.divider,
    overflow: 'hidden',
    marginRight: 16,
  },
  favoriteMealImage: {
    width: '100%',
    height: 96,
  },
  addButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteMealInfo: {
    padding: 12,
  },
  favoriteMealName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  favoriteMealKcal: {
    fontSize: 10,
    color: colors.gray[500],
    marginTop: 2,
  },
  timeline: {
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: colors.divider,
    marginLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    paddingLeft: 24,
    marginBottom: 24,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: -9,
    top: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  timelineContent: {
    flex: 1,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  mealName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  mealDetails: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 2,
  },
  mealTime: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.gray[500],
  },
});
