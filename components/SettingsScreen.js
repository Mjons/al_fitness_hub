import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import { BottomNav } from './BottomNav';

export const SettingsScreen = ({ onNavigate }) => {
  const notifications = [
    { n: 'Morning Motivation', t: '07:00 AM', i: 'wb-sunny', active: true },
    { n: 'Mid-day Check-in', t: '12:30 PM', i: 'restaurant', active: false },
    { n: 'Evening Wind-down', t: '08:30 PM', i: 'bedtime', active: true },
    { n: 'Smart Alerts', t: 'Contextual updates', i: 'notifications-active', active: true },
  ];

  const legalItems = [
    { n: 'Legal Disclaimer', i: 'gavel' },
    { n: 'Privacy Policy', i: 'policy' },
    { n: 'Help & Support', i: 'help' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onNavigate('DASHBOARD')}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings & Reminders</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Daily Nudges</Text>
        <Text style={styles.sectionSubtitle}>
          Choose when you want to receive motivation and accountability checks.
        </Text>

        <View style={styles.notificationsCard}>
          {notifications.map((item, i) => (
            <View key={i} style={styles.notificationRow}>
              <View style={styles.notificationLeft}>
                <View style={styles.notificationIcon}>
                  <MaterialIcons name={item.i} size={20} color={colors.primary} />
                </View>
                <View>
                  <Text style={styles.notificationName}>{item.n}</Text>
                  <Text
                    style={[
                      styles.notificationTime,
                      item.active && styles.notificationTimeActive,
                    ]}
                  >
                    {item.t}
                  </Text>
                </View>
              </View>
              <Switch
                value={item.active}
                trackColor={{ false: colors.gray[700], true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
          ))}
        </View>

        <View style={styles.goalsCard}>
          <View style={styles.goalsHeader}>
            <View>
              <Text style={styles.goalsTitle}>Your Goals</Text>
              <Text style={styles.goalsSubtitle}>
                Life changes. Adjust your plan as needed.
              </Text>
            </View>
            <View style={styles.goalsIcon}>
              <MaterialIcons name="gps-fixed" size={24} color={colors.primary} />
            </View>
          </View>
          <TouchableOpacity style={styles.updateButton}>
            <MaterialIcons name="edit" size={20} color={colors.black} />
            <Text style={styles.updateButtonText}>Update My Goals & Habits</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.legalTitle}>Legal & Support</Text>
          <View style={styles.legalCard}>
            {legalItems.map((item, i) => (
              <TouchableOpacity key={i} style={styles.legalRow}>
                <View style={styles.legalLeft}>
                  <MaterialIcons name={item.i} size={20} color={colors.gray[500]} />
                  <Text style={styles.legalName}>{item.n}</Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color={colors.gray[500]}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.versionText}>Version 2.4.1 (Build 890)</Text>
        </View>
      </ScrollView>

      <BottomNav currentScreen="SETTINGS" onNavigate={onNavigate} />
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
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
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 4,
    marginBottom: 24,
  },
  notificationsCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
    marginBottom: 32,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  notificationTime: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.gray[500],
  },
  notificationTimeActive: {
    color: colors.primary,
  },
  goalsCard: {
    backgroundColor: `${colors.primary}10`,
    borderWidth: 1,
    borderColor: `${colors.primary}15`,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
  },
  goalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  goalsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  goalsSubtitle: {
    fontSize: 12,
    color: colors.gray[400],
    marginTop: 4,
  },
  goalsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButton: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  updateButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
  },
  section: {
    marginBottom: 24,
  },
  legalTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  legalCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  legalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  legalName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  versionText: {
    fontSize: 10,
    color: colors.gray[600],
    textAlign: 'center',
    marginTop: 16,
  },
});
