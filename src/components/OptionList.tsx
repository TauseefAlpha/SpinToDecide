import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { useOptions, Option } from '../hooks/useOptionsContext';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme/colors';

const OptionItem: React.FC<{ item: Option; onRemove: (id: string) => void }> = ({
  item,
  onRemove,
}) => {
  return (
    <View style={[styles.itemCard, { borderLeftColor: item.color }]}>
      <View style={styles.itemLeft}>
        <View style={[styles.colorBadge, { backgroundColor: item.color + '22' }]}>
          <View style={[styles.colorDot, { backgroundColor: item.color }]} />
        </View>
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
      <Pressable
        onPress={() => onRemove(item.id)}
        hitSlop={12}
        style={({ pressed }) => [styles.deleteBtn, pressed && styles.deleteBtnPressed]}
      >
        <Trash2 color={COLORS.coral} size={18} />
      </Pressable>
    </View>
  );
};

const Separator = () => <View style={styles.separator} />;

export const OptionList: React.FC = () => {
  const { options, removeOption } = useOptions();

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>OPTIONS</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{options.length}</Text>
        </View>
      </View>

      {options.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No options yet. Add one above!</Text>
        </View>
      ) : (
        <FlatList
          data={options}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <OptionItem item={item} onRemove={removeOption} />
          )}
          ItemSeparatorComponent={Separator}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold as any,
    color: COLORS.textSecondary,
    letterSpacing: 1.5,
  },
  badge: {
    marginLeft: SPACING.sm,
    backgroundColor: COLORS.coral,
    borderRadius: BORDER_RADIUS.round,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.tiny,
    fontWeight: TYPOGRAPHY.weights.bold as any,
    color: '#FFFFFF',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderLeftWidth: 4,
    ...SHADOWS.soft,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorBadge: {
    width: 38,
    height: 38,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: BORDER_RADIUS.round,
  },
  itemText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.semibold as any,
    color: COLORS.text,
    flex: 1,
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.coral + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnPressed: {
    backgroundColor: COLORS.coral + '30',
  },
  separator: {
    height: SPACING.sm,
  },
  emptyState: {
    paddingVertical: SPACING.xl,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  emptyText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.textSecondary,
  },
});
