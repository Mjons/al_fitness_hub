import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';

export const BottomNav = ({ currentScreen, onNavigate }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const tabs = [
    { screen: 'DASHBOARD', icon: 'home', label: 'Home' },
    { screen: 'MEDITATION_LIST', icon: 'self-improvement', label: 'Meditate' },
    { screen: 'PILLARS_OVERVIEW', icon: 'pie-chart', label: 'Pillars' },
    { screen: 'NUTRITION_SUMMARY', icon: 'restaurant', label: 'Nutrition' },
    { screen: 'SUPPORT', icon: 'info', label: 'Support' },
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

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.divider,
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
