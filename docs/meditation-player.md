# Meditation Audio Player

## Overview

The Meditation List screen connects to a full audio player for Coach Al's three guided meditation recordings. Each meditation maps to a pillar: Breathing, Mindfulness, and Environment.

## Audio Assets

| File | Meditation | Pillar | Size |
|---|---|---|---|
| `assets/meditation-1.mp3` | Breath Awareness | Breathing | ~4.9 MB |
| `assets/meditation-2.mp3` | Present Moment | Mindfulness | ~6.7 MB |
| `assets/meditation-3.mp3` | Grounding & Space | Environment | ~6.0 MB |
| `assets/al-med.png` | Album art (all 3) | — | ~2.7 MB |

All audio files are bundled locally via static `require()` calls (Metro bundler requirement). No streaming or network dependency.

## Dependency

- **`expo-av`** — Expo's official audio/video module. Used for `Audio.Sound` playback.
- **`@react-native-community/slider`** — Already installed (used in intake screens). Used for seek bar.

## Architecture

### Data Flow

```
MeditationList                    MeditationPlayer
┌──────────────┐                  ┌──────────────────┐
│ MEDITATIONS  │  onSelectMed()   │ meditation prop   │
│ array with   │ ───────────────> │ (title, pillar,   │
│ audioFile key│   App.js sets    │  description,     │
│              │   state +        │  audioFile key)   │
│              │   navigates      │                   │
└──────────────┘                  └──────────────────┘
```

### Audio Source Map

```js
const AUDIO_SOURCES = {
  'meditation-1': require('../assets/meditation-1.mp3'),
  'meditation-2': require('../assets/meditation-2.mp3'),
  'meditation-3': require('../assets/meditation-3.mp3'),
};
```

Static `require()` is mandatory — Metro bundler resolves assets at build time. Dynamic paths like `require(\`../assets/${key}.mp3\`)` won't work.

### State in App.js

```js
const [selectedMeditation, setSelectedMeditation] = useState(null);
```

- Set when user taps a meditation card in `MeditationList`
- Cleared in `handleReset()`
- `MEDITATION_PLAYER` case falls back to `MeditationList` if `selectedMeditation` is null (e.g., app reopens on that screen)

## Player Screen (`MeditationPlayer.js`)

### Layout

```
[<- Back]     Breath Awareness     [theme toggle]

         ┌──────────────────┐
         │                  │
         │    al-med.png    │  240x340, rounded corners
         │   (album art)    │
         │                  │
         └──────────────────┘
           Breath Awareness        Title
           Breathing Pillar        Pillar subtitle
        Short description...       Description

   1:23 ━━━━━━━●━━━━━━━━━━ 5:47   Slider + times
        [⏪15]   [▶/⏸]   [15⏩]   Controls
```

### Props

| Prop | Type | Description |
|---|---|---|
| `meditation` | object | `{ title, pillar, description, audioFile, id, icon, color, duration }` |
| `onBack` | function | Navigates back to `MEDITATION_LIST` |
| `onNavigate` | function | General navigation (unused currently, available for future) |

### Audio Lifecycle

1. **Load**: `useEffect` on mount calls `Audio.Sound.createAsync(source, { shouldPlay: false }, statusCallback)`
2. **Status callback**: Updates `isPlaying`, `positionMillis`, `durationMillis`. Detects `didJustFinish` for replay state. Skips position updates while user is dragging slider (`isSeekingRef`).
3. **Cleanup**: `useEffect` return calls `sound.unloadAsync()` — stops audio immediately when navigating away.

### Controls

| Control | Action |
|---|---|
| Play/Pause button | `sound.playAsync()` / `sound.pauseAsync()` |
| Skip back 15s | `sound.setPositionAsync(position - 15000)` (clamped to 0) |
| Skip forward 15s | `sound.setPositionAsync(position + 15000)` (clamped to duration) |
| Slider drag | `onSlidingStart` sets seeking flag, `onSlidingComplete` calls `setPositionAsync` |
| Replay (after finish) | `sound.replayAsync()` resets to start and plays |

### Seeking Flag

The `isSeekingRef` (useRef, not useState) prevents the playback status callback from overwriting the slider position while the user is dragging. Without this, the slider would jump back and forth during a drag.

```
User starts drag → isSeekingRef = true → status callback skips position updates
User releases    → setPositionAsync() → isSeekingRef = false → updates resume
```

### Loading State

While audio loads, an `ActivityIndicator` spinner shows with "Loading audio..." text. All controls are hidden until `isLoaded` is true.

### Audio Mode

```js
Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,    // Play even when iOS silent switch is on
  staysActiveInBackground: false, // Stop when app backgrounds
});
```

## Edge Cases

| Scenario | Behavior |
|---|---|
| Navigate away while playing | `useEffect` cleanup unloads sound — audio stops |
| Audio finishes | Play button icon changes to replay, tap replays from start |
| Skip back after finish | Clears `didFinish` flag, allows normal play/pause |
| App reopens on MEDITATION_PLAYER with no selection | Falls back to MeditationList |
| Audio fails to load | Player shows loading spinner indefinitely (no error state — audio is local/bundled) |

## Files

| File | Role |
|---|---|
| `components/MeditationPlayer.js` | Audio player screen (new) |
| `components/MeditationList.js` | Meditation selection list (modified) |
| `App.js` | Routing + `selectedMeditation` state (modified) |
| `assets/meditation-1.mp3` | Breath Awareness recording |
| `assets/meditation-2.mp3` | Present Moment recording |
| `assets/meditation-3.mp3` | Grounding & Space recording |
| `assets/al-med.png` | Album art image |
