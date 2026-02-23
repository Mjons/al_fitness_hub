import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';

const AUDIO_SOURCES = {
  'meditation-1': require('../assets/meditation-1.mp3'),
  'meditation-2': require('../assets/meditation-2.mp3'),
  'meditation-3': require('../assets/meditation-3.mp3'),
};

const formatTime = (millis) => {
  if (!millis || millis < 0) return '0:00';
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const MeditationPlayer = ({ meditation, onBack, onNavigate }) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [didFinish, setDidFinish] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);

  const soundRef = useRef(null);
  const isSeekingRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const loadAudio = async () => {
      const source = AUDIO_SOURCES[meditation.audioFile];
      if (!source) return;

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      const { sound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: false },
        (status) => {
          if (!mounted) return;
          if (status.isLoaded) {
            if (!isSeekingRef.current) {
              setPositionMillis(status.positionMillis);
            }
            setDurationMillis(status.durationMillis || 0);
            setIsPlaying(status.isPlaying);
            if (status.didJustFinish) {
              setDidFinish(true);
              setIsPlaying(false);
            }
          }
        }
      );

      soundRef.current = sound;
      if (mounted) setIsLoaded(true);
    };

    loadAudio();

    return () => {
      mounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [meditation.audioFile]);

  const handlePlayPause = async () => {
    if (!soundRef.current) return;

    if (didFinish) {
      await soundRef.current.replayAsync();
      setDidFinish(false);
      return;
    }

    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  };

  const handleSkip = async (offsetMs) => {
    if (!soundRef.current) return;
    const newPosition = Math.max(0, Math.min(positionMillis + offsetMs, durationMillis));
    await soundRef.current.setPositionAsync(newPosition);
    setPositionMillis(newPosition);
    if (didFinish && offsetMs < 0) {
      setDidFinish(false);
    }
  };

  const handleSlidingStart = () => {
    isSeekingRef.current = true;
  };

  const handleSliderChange = (value) => {
    setPositionMillis(value);
  };

  const handleSlidingComplete = async (value) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value);
      if (didFinish) setDidFinish(false);
    }
    isSeekingRef.current = false;
  };

  const getPlayIcon = () => {
    if (didFinish) return 'replay';
    return isPlaying ? 'pause' : 'play-arrow';
  };

  if (!meditation) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {meditation.title}
        </Text>
        <TouchableOpacity style={styles.headerButton} onPress={toggleTheme}>
          <MaterialIcons name={isDark ? 'light-mode' : 'dark-mode'} size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.artworkContainer}>
          <Image
            source={require('../assets/al-med.png')}
            style={styles.artwork}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.title}>{meditation.title}</Text>
        <Text style={styles.pillarLabel}>{meditation.pillar} Pillar</Text>
        <Text style={styles.description}>{meditation.description}</Text>

        {!isLoaded ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading audio...</Text>
          </View>
        ) : (
          <View style={styles.controls}>
            <View style={styles.sliderRow}>
              <Text style={styles.timeText}>{formatTime(positionMillis)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={durationMillis || 1}
                value={positionMillis}
                onSlidingStart={handleSlidingStart}
                onValueChange={handleSliderChange}
                onSlidingComplete={handleSlidingComplete}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.gray[600]}
                thumbTintColor={colors.primary}
              />
              <Text style={styles.timeText}>{formatTime(durationMillis)}</Text>
            </View>

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => handleSkip(-15000)}
                activeOpacity={0.7}
              >
                <MaterialIcons name="replay" size={28} color={colors.text} style={{ transform: [{ scaleX: -1 }] }} />
                <Text style={styles.skipLabel}>15</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.playButton}
                onPress={handlePlayPause}
                activeOpacity={0.8}
              >
                <MaterialIcons name={getPlayIcon()} size={40} color={colors.textInverse} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => handleSkip(15000)}
                activeOpacity={0.7}
              >
                <MaterialIcons name="replay" size={28} color={colors.text} />
                <Text style={styles.skipLabel}>15</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerButton: {
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 24,
  },
  artworkContainer: {
    width: 240,
    height: 340,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  artwork: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  pillarLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: colors.gray[400],
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
  },
  loadingText: {
    fontSize: 14,
    color: colors.gray[500],
  },
  controls: {
    width: '100%',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray[400],
    width: 42,
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  skipButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
  },
  skipLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.gray[400],
    marginTop: -4,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});
