import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export const SafetyNotice = ({ onNext, onBack }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety Notice</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <View style={styles.iconGlow} />
          <View style={styles.iconCircle}>
            <MaterialIcons name="medical-services" size={40} color={colors.primary} />
          </View>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>Please Read Carefully</Text>
          <Text style={styles.subtitle}>
            We noticed you selected a specific medical condition.
          </Text>
        </View>

        <View style={styles.coachCard}>
          <Image
            source={{ uri: 'https://picsum.photos/100?coach' }}
            style={styles.coachAvatar}
          />
          <View style={styles.coachContent}>
            <Text style={styles.coachName}>Message from Coach Al</Text>
            <Text style={styles.coachMessage}>
              "This program is built on my 7 pillars, but I'm a coach, not a doctor.
              Please check with your specialist first."
            </Text>
          </View>
        </View>

        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimerTitle}>Legal Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            Coach Al's program is designed for educational and lifestyle purposes only.
          </Text>
          <Text style={styles.disclaimerText}>
            We strongly recommend consulting your healthcare provider before starting
            any exercise or nutrition regimen.
          </Text>
          <Text style={styles.disclaimerText}>
            By continuing, you acknowledge that you are exercising at your own risk.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAccepted(!accepted)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, accepted && styles.checkboxActive]}>
            {accepted && (
              <MaterialIcons name="check" size={16} color={colors.black} />
            )}
          </View>
          <Text style={styles.checkboxLabel}>
            I have read and understood the disclaimer.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>I Understand & Continue</Text>
          <MaterialIcons name="arrow-forward" size={20} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.backLink} onPress={onBack}>
          <Text style={styles.backLinkText}>Go Back & Change Selection</Text>
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
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: 16,
    marginBottom: 24,
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: `${colors.primary}20`,
    borderRadius: 50,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.primary}15`,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray[500],
    textAlign: 'center',
  },
  coachCard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.surfaceDark,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: 12,
    marginBottom: 16,
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
  coachName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  coachMessage: {
    fontSize: 12,
    color: colors.gray[400],
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 18,
  },
  disclaimerCard: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 24,
  },
  disclaimerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  disclaimerText: {
    fontSize: 12,
    color: colors.gray[400],
    lineHeight: 18,
    marginBottom: 12,
  },
  checkboxRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.gray[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: colors.gray[400],
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    gap: 12,
  },
  button: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
  },
  backLink: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[500],
  },
});
