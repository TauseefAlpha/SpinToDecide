import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Option } from '../hooks/useOptionsContext';
import { SEGMENT_COLORS, TYPOGRAPHY, BORDER_RADIUS, SPACING } from '../theme/colors';

const { width: SW } = Dimensions.get('window');

interface ResultModalProps {
  visible: boolean;
  winningOption: Option | null;
  onClose: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ visible, winningOption, onClose }) => {
  const scaleAnim   = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim,   { toValue: 1, useNativeDriver: true, speed: 14, bounciness: 10 }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim,   { toValue: 0.85, duration: 150, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0,    duration: 150, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (!winningOption) return null;

  // Grab the segment colour that matches this option's colour, or fall back
  const accentColor = winningOption.color || SEGMENT_COLORS[0];

  return (
    <Modal visible={visible} transparent animationType="none">
      {/* Dark scrim */}
      <View style={styles.overlay}>
        {/* Confetti */}
        {visible && (
          <ConfettiCannon
            count={140}
            origin={{ x: SW / 2, y: -10 }}
            autoStart
            fadeOut
            explosionSpeed={350}
            fallSpeed={3200}
          />
        )}

        {/* Card */}
        <Animated.View
          style={[
            styles.card,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        >
          {/* Top accent bar */}
          <View style={[styles.topBar, { backgroundColor: accentColor }]} />

          {/* Trophy emoji */}
          <View style={[styles.trophy, { backgroundColor: accentColor + '25', borderColor: accentColor + '50' }]}>
            <Text style={styles.trophyEmoji}>🏆</Text>
          </View>

          {/* Labels */}
          <Text style={styles.label}>The wheel has spoken!</Text>

          {/* Result chip */}
          <View style={[styles.resultChip, { backgroundColor: accentColor + '20', borderColor: accentColor + '60' }]}>
            <Text style={[styles.resultText, { color: accentColor }]}>{winningOption.text}</Text>
          </View>

          <Text style={styles.sub}>Time to commit to this decision 🎯</Text>

          {/* Button */}
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.closeBtn,
              { backgroundColor: accentColor },
              pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
            ]}
          >
            <Text style={styles.closeBtnText}>Awesome! Let's Go</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 8, 30, 0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  card: {
    width: '100%',
    backgroundColor: '#1C1A3A',   // solid deep-purple card — always visible
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    // Glow shadow
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.55,
    shadowRadius: 40,
    elevation: 20,
    paddingBottom: SPACING.xl,
  },
  topBar: {
    width: '100%',
    height: 6,
    borderRadius: 0,
    marginBottom: SPACING.xl,
  },
  trophy: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  trophyEmoji: {
    fontSize: 38,
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: '600' as any,
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: SPACING.md,
  },
  resultChip: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  resultText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 32,
    fontWeight: '900' as any,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  sub: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.caption,
    color: 'rgba(255,255,255,0.35)',
    marginBottom: SPACING.xl,
    textAlign: 'center',
    paddingHorizontal: SPACING.md,
  },
  closeBtn: {
    marginHorizontal: SPACING.xl,
    width: '80%',
    paddingVertical: 15,
    borderRadius: BORDER_RADIUS.round,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  closeBtnText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: '700' as any,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
