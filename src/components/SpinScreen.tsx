import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  TextInput, Animated, LayoutAnimation, Platform, UIManager,
  Dimensions,
} from 'react-native';
import { useOptions } from '../hooks/useOptionsContext';
import { SpinWheel } from './SpinWheel';
import { COLORS, SEGMENT_COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme/colors';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width: SW, height: SH } = Dimensions.get('window');

// ── Option chip ──────────────────────────────────────────────────────────────
const Chip: React.FC<{ text: string; color: string; onRemove: () => void }> = ({
  text, color, onRemove,
}) => (
  <View style={[styles.chip, { borderColor: color + '70', backgroundColor: color + '25' }]}>
    <View style={[styles.chipDot, { backgroundColor: color }]} />
    <Text style={styles.chipText} numberOfLines={1}>{text}</Text>
    <Pressable onPress={onRemove} hitSlop={10} style={({ pressed }) => ({ opacity: pressed ? 0.4 : 1 })}>
      <Text style={[styles.chipX, { color }]}>✕</Text>
    </Pressable>
  </View>
);

// ── SpinScreen ───────────────────────────────────────────────────────────────
export const SpinScreen: React.FC = () => {
  const { options, addOption, removeOption } = useOptions();
  const [expanded, setExpanded] = useState(false);
  const [inputText, setInputText] = useState('');
  const chevAnim = useRef(new Animated.Value(0)).current;

  const togglePanel = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.spring(chevAnim, {
      toValue: expanded ? 0 : 1,
      speed: 18, bounciness: 4, useNativeDriver: true,
    }).start();
    setExpanded(v => !v);
  };

  const handleAdd = () => {
    if (inputText.trim()) { addOption(inputText.trim()); setInputText(''); }
  };

  const chevronRot = chevAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* ──────────────────────────── FULL-SCREEN GRADIENT BG ─────────────── */}
      {/* We simulate purple→dark-blue gradient with layered absolute views + blobs */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* Base layer */}
        <View style={styles.bgBase} />
        {/* Blob 1 – purple top-right */}
        <View style={styles.blob1} />
        {/* Blob 2 – pink bottom-left */}
        <View style={styles.blob2} />
        {/* Blob 3 – blue center-right */}
        <View style={styles.blob3} />
        {/* Blob 4 – indigo top-left */}
        <View style={styles.blob4} />
        {/* Subtle noise overlay */}
        <View style={styles.noiseOverlay} />
      </View>

      {/* ──────────────── HEADER ──────────────── */}
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>DECISION MAKER</Text>
          </View>
        </View>
        <Text style={styles.title}>Decision Spinner</Text>
        <Text style={styles.subtitle}>Let the wheel decide for you ✨</Text>
      </View>

      {/* ──────────────── WHEEL ──────────────── */}
      <View style={styles.wheelWrap}>
        <SpinWheel />
      </View>

      {/* ──────────────── OPTIONS PANEL ──────────────── */}
      <View style={styles.panel}>
        <Pressable onPress={togglePanel} style={styles.panelHeader} android_ripple={{ color: 'rgba(255,255,255,0.05)' }}>
          <View style={styles.panelLeft}>
            <View style={styles.panelIconBox}>
              <Text style={styles.panelIconEmoji}>🎯</Text>
            </View>
            <View>
              <Text style={styles.panelTitle}>Manage Options</Text>
              <Text style={styles.panelSub}>{options.length} item{options.length !== 1 ? 's' : ''} on wheel</Text>
            </View>
          </View>
          <Animated.View style={{ transform: [{ rotate: chevronRot }] }}>
            <Text style={styles.chevron}>⌄</Text>
          </Animated.View>
        </Pressable>

        {expanded && (
          <View style={styles.panelBody}>
            <View style={styles.panelDivider} />
            {/* Input */}
            <View style={styles.addRow}>
              <TextInput
                style={styles.addInput}
                placeholder="New option…"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleAdd}
                returnKeyType="done"
              />
              <Pressable
                onPress={handleAdd}
                disabled={!inputText.trim()}
                style={({ pressed }) => [
                  styles.addBtn,
                  !inputText.trim() && styles.addBtnOff,
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Text style={styles.addBtnText}>+ Add</Text>
              </Pressable>
            </View>
            {/* Chips */}
            {options.length === 0 ? (
              <Text style={styles.emptyMsg}>No options yet — add one above!</Text>
            ) : (
              <View style={styles.chips}>
                {options.map((opt, i) => (
                  <Chip
                    key={opt.id}
                    text={opt.text}
                    color={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                    onRemove={() => removeOption(opt.id)}
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </View>

    </ScrollView>
  );
};

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingBottom: 52, minHeight: SH },

  /* BG layers */
  bgBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0F0C29',
  },
  blob1: {
    position: 'absolute', top: -60, right: -60,
    width: 280, height: 280, borderRadius: 140,
    backgroundColor: '#7C3AED', opacity: 0.35,
  },
  blob2: {
    position: 'absolute', bottom: 140, left: -80,
    width: 250, height: 250, borderRadius: 125,
    backgroundColor: '#EC4899', opacity: 0.22,
  },
  blob3: {
    position: 'absolute', top: SH * 0.35, right: -40,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: '#3B82F6', opacity: 0.2,
  },
  blob4: {
    position: 'absolute', top: 80, left: -50,
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: '#6366F1', opacity: 0.18,
  },
  noiseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },

  /* Header */
  header: {
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  badgeRow: { marginBottom: SPACING.sm },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: BORDER_RADIUS.round,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  badgeDot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: '#4ECDC4',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1, shadowRadius: 4,
  },
  badgeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: '700' as any,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1.5,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 32,
    fontWeight: '900' as any,
    color: '#FFFFFF',
    letterSpacing: -0.8,
    textAlign: 'center',
    textShadowColor: 'rgba(124,58,237,0.6)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.body,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 6,
    textAlign: 'center',
  },

  /* Wheel wrapper */
  wheelWrap: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },

  /* Panel – glassmorphism card */
  panel: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    overflow: 'hidden',
    // backdrop-blur can't be done in pure RN, so we rely on tinted bg
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  panelLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  panelIconBox: {
    width: 42, height: 42,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  panelIconEmoji: { fontSize: 20 },
  panelTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: '600' as any,
    color: '#FFFFFF',
  },
  panelSub: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.caption,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 2,
  },
  chevron: { fontSize: 22, color: 'rgba(255,255,255,0.5)', lineHeight: 26 },
  panelDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: SPACING.md },
  panelBody: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.md },

  /* Add row */
  addRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md, marginBottom: SPACING.md,
  },
  addInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: SPACING.md, paddingVertical: 11,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.body,
    color: '#FFFFFF',
  },
  addBtn: {
    backgroundColor: '#F97316',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md, paddingVertical: 11,
  },
  addBtnOff: { opacity: 0.35 },
  addBtnText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: '600' as any,
    color: '#fff',
  },

  /* Chips */
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  chip: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1.5,
    paddingVertical: 6, paddingHorizontal: 12,
    gap: 6, maxWidth: 160,
  },
  chipDot: { width: 8, height: 8, borderRadius: 4 },
  chipText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: '500' as any,
    color: '#FFFFFF',
    flexShrink: 1,
  },
  chipX: { fontSize: 11, fontWeight: '700' as any },
  emptyMsg: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.caption,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    paddingVertical: SPACING.sm,
  },
});
