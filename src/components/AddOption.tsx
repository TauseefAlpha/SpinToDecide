import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Animated } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useOptions } from '../hooks/useOptionsContext';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme/colors';

export const AddOption: React.FC = () => {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const { addOption } = useOptions();
  const scale = useRef(new Animated.Value(1)).current;

  const handleAdd = () => {
    if (text.trim().length > 0) {
      addOption(text);
      setText('');
    }
  };

  const animateBtn = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionLabel}>ADD NEW OPTION</Text>
      <View style={[styles.row, focused && styles.rowFocused]}>
        <TextInput
          style={styles.input}
          placeholder="e.g. Pizza, Movie Night, Park…"
          placeholderTextColor={COLORS.textSecondary}
          value={text}
          onChangeText={setText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable
            onPress={handleAdd}
            onPressIn={() => animateBtn(0.9)}
            onPressOut={() => animateBtn(1)}
            style={[styles.addBtn, !text.trim() && styles.addBtnDisabled]}
            disabled={!text.trim()}
          >
            <Plus color="#FFFFFF" size={22} strokeWidth={2.5} />
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.sm,
  },
  sectionLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold as any,
    color: COLORS.textSecondary,
    letterSpacing: 1.5,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingLeft: SPACING.md,
    paddingRight: SPACING.xs,
    paddingVertical: SPACING.xs,
    ...SHADOWS.soft,
  },
  rowFocused: {
    borderColor: COLORS.coral,
  },
  input: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.text,
    paddingVertical: SPACING.sm,
    paddingRight: SPACING.sm,
  },
  addBtn: {
    backgroundColor: COLORS.coral,
    borderRadius: BORDER_RADIUS.sm,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
  addBtnDisabled: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.5,
  },
});
