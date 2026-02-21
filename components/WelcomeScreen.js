import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { spacing, borderRadius, fontSize } from "../styles/theme";
import { useTheme } from "../styles/ThemeContext";

// DEV_MODE: Set to false to hide the random fill button
const DEV_MODE = true;

export const WelcomeScreen = ({ onNext, onRandomFill }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const features = [
    {
      title: "7 Pillars of Health",
      desc: "Master the foundation.",
      icon: "foundation",
    },
    { title: "High-Impact Habits", desc: "Simple changes.", icon: "update" },
    {
      title: "Long-Term Consistency",
      desc: "Fitness for the long haul.",
      icon: "timeline",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialIcons
            name="fitness-center"
            size={20}
            color={colors.primary}
          />
        </View>
        <Text style={styles.logoText}>GYM Studio</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: "https://picsum.photos/400/360?random=hero" }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroBadge}>
            <MaterialIcons name="bolt" size={16} color={colors.primary} />
            <Text style={styles.heroBadgeText}>High Intensity</Text>
          </View>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>Welcome to the Studio</Text>
          <Text style={styles.subtitle}>
            Master Coach Al's philosophy. Fitness designed for the busy parent
            and professional.
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>The 7 Pillars System</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {features.map((item, i) => (
              <View key={i} style={styles.featureCard}>
                <Image
                  source={{ uri: `https://picsum.photos/200/250?random=${i}` }}
                  style={styles.featureImage}
                />
                <View style={styles.featureImageOverlay} />
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={colors.primary}
                  style={styles.featureIcon}
                />
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDesc}>{item.desc}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.socialProof}>
          <View style={styles.avatars}>
            <View
              style={[styles.avatar, { backgroundColor: colors.gray[600] }]}
            />
            <View
              style={[
                styles.avatar,
                { backgroundColor: colors.gray[500], marginLeft: -8 },
              ]}
            />
            <View
              style={[
                styles.avatar,
                { backgroundColor: colors.gray[400], marginLeft: -8 },
              ]}
            />
          </View>
          <Text style={styles.socialText}>Join 10k+ Busy Professionals</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={onNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        {DEV_MODE && onRandomFill && (
          <TouchableOpacity
            style={styles.devButton}
            onPress={onRandomFill}
            activeOpacity={0.8}
          >
            <MaterialIcons name="shuffle" size={18} color={colors.gray[400]} />
            <Text style={styles.devButtonText}>
              Skip with Random Data (Dev)
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const makeStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 8,
  },
  logoContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: `${colors.primary}20`,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  heroContainer: {
    marginHorizontal: 16,
    height: 360,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    opacity: 0.5,
  },
  heroBadge: {
    position: "absolute",
    bottom: 24,
    left: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  heroBadgeText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  titleSection: {
    paddingHorizontal: 16,
    marginTop: -24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[400],
    fontWeight: "500",
    marginTop: 12,
    lineHeight: 24,
  },
  featuresSection: {
    marginTop: 32,
    paddingLeft: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 16,
  },
  featureCard: {
    width: 200,
    marginRight: 16,
  },
  featureImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  featureImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 12,
    height: 200,
  },
  featureIcon: {
    position: "absolute",
    bottom: 84,
    left: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginTop: 12,
  },
  featureDesc: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 4,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    alignItems: "center",
    gap: 16,
  },
  socialProof: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatars: {
    flexDirection: "row",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.background,
  },
  socialText: {
    fontSize: 14,
    color: colors.gray[400],
    fontWeight: "500",
  },
  button: {
    width: "100%",
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textInverse,
  },
  devButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[700],
    borderStyle: "dashed",
  },
  devButtonText: {
    fontSize: 12,
    color: colors.gray[400],
  },
});
