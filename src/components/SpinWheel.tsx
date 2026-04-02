import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import Svg, {
  Path,
  G,
  Text as SvgText,
  Circle,
  Defs,
  RadialGradient,
  Stop,
  Line,
} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useOptions, Option } from '../hooks/useOptionsContext';
import { useHistory } from '../hooks/useHistoryContext';
import { ResultModal } from './ResultModal';
import { SEGMENT_COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../theme/colors';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.82, 320);
const RADIUS = WHEEL_SIZE / 2;

const polarToCartesian = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const createSlicePath = (r: number, start: number, end: number) => {
  const s = polarToCartesian(0, 0, r, end);
  const e = polarToCartesian(0, 0, r, start);
  const large = end - start <= 180 ? '0' : '1';
  return `M 0 0 L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y} Z`;
};

export const SpinWheel: React.FC = () => {
  const { options } = useOptions();
  const { addEntry } = useHistory();
  const rotation = useSharedValue(0);
  const btnScale = useSharedValue(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [winningOption, setWinningOption] = useState<Option | null>(null);

  const handleSpinEnd = (finalAngle: number) => {
    setIsSpinning(false);
    const norm = finalAngle % 360;
    const ptr = (360 - norm) % 360;
    const seg = 360 / Math.max(options.length, 1);
    const idx = Math.floor(ptr / seg);
    const winner = options[idx];
    setWinningOption(winner);
    addEntry(winner);
    RNReactNativeHapticFeedback.trigger('notificationSuccess', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    setModalVisible(true);
  };

  const spin = () => {
    if (isSpinning || options.length === 0) return;
    setIsSpinning(true);
    const total = rotation.value + 5 * 360 + Math.floor(Math.random() * 360);
    rotation.value = withTiming(total, {
      duration: 4400,
      easing: Easing.bezier(0.17, 0.84, 0.44, 1),
    }, (done) => { if (done) runOnJS(handleSpinEnd)(total); });
  };

  const onPressIn = () => { btnScale.value = withSpring(0.93, { damping: 15 }); };
  const onPressOut = () => { btnScale.value = withSpring(1, { damping: 12 }); };

  const wheelStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  const btnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  const segAngle = options.length > 0 ? 360 / options.length : 360;
  const canSpin = !isSpinning && options.length > 0;

  return (
    <View style={styles.container}>

      {/* ── Glowing ring behind wheel ── */}
      <View style={styles.glowRing} />

      {/* ── Pointer ── */}
      <View style={styles.pointerWrap}>
        {/* Glow dot on pointer tip */}
        <View style={styles.pointerGlowDot} />
        <View style={styles.pointerTriangle} />
      </View>

      {/* ── Wheel ── */}
      <Animated.View style={[styles.wheelAnim, wheelStyle]}>
        <View style={styles.wheelRing}>
          <Svg
            width={WHEEL_SIZE}
            height={WHEEL_SIZE}
            viewBox={`${-RADIUS} ${-RADIUS} ${WHEEL_SIZE} ${WHEEL_SIZE}`}
          >
            <Defs>
              <RadialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <Stop offset="100%" stopColor="#E8E0FF" stopOpacity="1" />
              </RadialGradient>
            </Defs>

            {/* Segments */}
            {options.length === 0 ? (
              <Circle cx="0" cy="0" r={RADIUS} fill="rgba(255,255,255,0.08)" />
            ) : (
              options.map((opt, i) => {
                const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
                const startAngle = i * segAngle;
                const endAngle = startAngle + segAngle;
                const path = createSlicePath(RADIUS, startAngle, endAngle);
                const midAngle = startAngle + segAngle / 2;
                const textPos = polarToCartesian(0, 0, RADIUS * 0.62, midAngle);
                const textRot = midAngle - 90;
                const label = opt.text.length > 8 ? opt.text.slice(0, 7) + '…' : opt.text;

                return (
                  <G key={opt.id}>
                    <Path d={path} fill={color} />
                    {/* Separator lines */}
                    {(() => {
                      const p = polarToCartesian(0, 0, RADIUS, startAngle);
                      return (
                        <Line
                          x1="0" y1="0"
                          x2={p.x} y2={p.y}
                          stroke="rgba(255,255,255,0.35)"
                          strokeWidth="2"
                        />
                      );
                    })()}
                    <SvgText
                      x={textPos.x}
                      y={textPos.y}
                      fill="#FFFFFF"
                      fontSize={options.length > 7 ? '11' : options.length > 4 ? '13' : '15'}
                      fontWeight="800"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      transform={`rotate(${textRot}, ${textPos.x}, ${textPos.y})`}
                    >
                      {label}
                    </SvgText>
                  </G>
                );
              })
            )}

            {/* Center hub */}
            <Circle
              cx="0" cy="0"
              r={WHEEL_SIZE * 0.095}
              fill="url(#hubGrad)"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="3"
            />
          </Svg>
        </View>
      </Animated.View>

      {/* ── Gradient SPIN button ── */}
      <Animated.View style={[styles.btnWrap, btnStyle]}>
        <Pressable
          style={[styles.spinBtn, !canSpin && styles.spinBtnOff]}
          onPress={spin}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          disabled={!canSpin}
        >
          {/* Simulated gradient via two overlapping views */}
          <View style={styles.spinBtnGradLeft} />
          <View style={styles.spinBtnGradRight} />
          <Text style={styles.spinBtnText}>
            {isSpinning ? 'Spinning…' : options.length === 0 ? 'Add Options' : '✦  SPIN  ✦'}
          </Text>
        </Pressable>
      </Animated.View>

      <ResultModal
        visible={modalVisible}
        winningOption={winningOption}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: SPACING.sm,
  },

  /* ── Glow ring ── */
  glowRing: {
    position: 'absolute',
    width: WHEEL_SIZE + 60,
    height: WHEEL_SIZE + 60,
    borderRadius: (WHEEL_SIZE + 60) / 2,
    backgroundColor: 'transparent',
    // multiple layered shadows for glow
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 0,
    top: -14,
  },

  /* ── Pointer ── */
  pointerWrap: {
    alignItems: 'center',
    zIndex: 20,
    marginBottom: -14,
  },
  pointerGlowDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: -2,
    zIndex: 21,
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 13,
    borderRightWidth: 13,
    borderTopWidth: 26,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 3,
  },

  /* ── Wheel ── */
  wheelAnim: {
    zIndex: 10,
  },
  wheelRing: {
    width: WHEEL_SIZE + 16,
    height: WHEEL_SIZE + 16,
    borderRadius: (WHEEL_SIZE + 16) / 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    // deep shadow
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 16,
  },

  /* ── SPIN button ── */
  btnWrap: {
    marginTop: SPACING.xl,
    width: WHEEL_SIZE * 0.78,
  },
  spinBtn: {
    height: 58,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    // glow shadow
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 12,
    backgroundColor: '#F97316', // fallback
  },
  spinBtnOff: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    shadowOpacity: 0,
    elevation: 0,
  },
  // Two overlapping half-circles to simulate orange→pink gradient
  spinBtnGradLeft: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    width: '55%',
    backgroundColor: '#F97316',
  },
  spinBtnGradRight: {
    position: 'absolute',
    right: 0, top: 0, bottom: 0,
    width: '55%',
    backgroundColor: '#EC4899',
  },
  spinBtnText: {
    zIndex: 2,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 18,
    fontWeight: '800' as any,
    color: '#FFFFFF',
    letterSpacing: 2.5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
