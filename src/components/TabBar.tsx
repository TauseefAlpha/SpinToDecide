import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, Pressable,
  Platform, Animated, Dimensions,
} from 'react-native';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme/colors';

const { width: SW } = Dimensions.get('window');

const TABS = [
  { key: 'spin',    label: 'Spin',    icon: '🎡' },
  { key: 'options', label: 'Options', icon: '⚙️' },
  { key: 'history', label: 'History', icon: '📋' },
] as const;

interface TabBarProps {
  activeTab: string;
  onTabChange: (key: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const activeIndex = TABS.findIndex(t => t.key === activeTab);

  // Pill slide
  const pillX = useRef(new Animated.Value(activeIndex)).current;

  // Icon bounce animations for each tab
  const bounces = useRef(TABS.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    Animated.spring(pillX, {
      toValue: activeIndex,
      useNativeDriver: true,
      speed: 18, bounciness: 6,
    }).start();
  }, [activeIndex, pillX]);

  const TAB_W  = (SW - SPACING.lg * 2 - SPACING.sm * 2) / TABS.length;
  const pillTX = pillX.interpolate({
    inputRange: TABS.map((_, i) => i),
    outputRange: TABS.map((_, i) => i * TAB_W),
  });

  const handlePress = (key: string, idx: number) => {
    Animated.sequence([
      Animated.spring(bounces[idx], { toValue: 0.78, useNativeDriver: true, speed: 50 }),
      Animated.spring(bounces[idx], { toValue: 1,    useNativeDriver: true, speed: 18, bounciness: 14 }),
    ]).start();
    onTabChange(key);
  };

  return (
    // Floating outer wrapper
    <View style={styles.floatWrap}>
      <View style={styles.bar}>
        {/* Sliding pill */}
        <Animated.View style={[styles.pill, { width: TAB_W - 4, transform: [{ translateX: pillTX }] }]} />

        {TABS.map((tab, i) => {
          const isActive = activeTab === tab.key;
          return (
            <Pressable
              key={tab.key}
              onPress={() => handlePress(tab.key, i)}
              style={styles.tabTouchable}
            >
              <Animated.View style={[styles.tabInner, { transform: [{ scale: bounces[i] }] }]}>
                <Text style={[styles.icon, isActive && styles.iconActive]}>{tab.icon}</Text>
                <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
                {/* Glow dot under active label */}
                {isActive && <View style={styles.glowDot} />}
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatWrap: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: Platform.OS === 'ios' ? 28 : SPACING.md,
    paddingTop: SPACING.sm,
    backgroundColor: 'transparent',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(24, 20, 50, 0.92)',   // dark translucent
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    // Glow
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 16,
    position: 'relative',
  },
  pill: {
    position: 'absolute',
    top: SPACING.xs,
    bottom: SPACING.xs,
    left: SPACING.xs + 2,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: 'rgba(124, 58, 237, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.5)',
    // Inner glow
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 4,
  },
  tabTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  tabInner: { alignItems: 'center', gap: 3 },
  icon: { fontSize: 20, opacity: 0.45 },
  iconActive: { opacity: 1 },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: '500' as any,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 0.3,
  },
  labelActive: {
    color: '#FFFFFF',
    fontWeight: '700' as any,
  },
  glowDot: {
    width: 4, height: 4,
    borderRadius: 2,
    backgroundColor: '#A78BFA',
    marginTop: 1,
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
});
