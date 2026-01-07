import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export const BottomNav = ({ currentScreen, onNavigate }) => {
  const tabs = [
    { screen: 'DASHBOARD', icon: 'home', label: 'Home' },
    { screen: 'WORKOUT_LIST', icon: 'fitness-center', label: 'Workouts' },
    { screen: 'PILLARS_OVERVIEW', icon: 'pie-chart', label: 'Pillars' },
    { screen: 'NUTRITION_SUMMARY', icon: 'restaurant', label: 'Nutrition' },
    { screen: 'PROGRESS_SUMMARY', icon: 'bar-chart', label: 'Progress' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.screen;
        return (
          <TouchableOpacity
            key={tab.screen}
            style={styles.tab}
            onPress={() => onNavigate(tab.screen)}
          >
            <MaterialIcons
              name={tab.icon}
              size={24}
              color={isActive ? colors.primary : colors.gray[500]}
            />
            <Text style={[
              styles.label,
              { color: isActive ? colors.primary : colors.gray[500] },
              isActive && styles.labelActive
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  tab: {
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
  },
  labelActive: {
    fontWeight: '700',
  },
});
