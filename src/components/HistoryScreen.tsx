import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { Trash2, Clock } from 'lucide-react-native';
import { useHistory, HistoryEntry } from '../hooks/useHistoryContext';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme/colors';

const timeAgo = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const HistoryItem: React.FC<{ item: HistoryEntry; index: number }> = ({ item, index }) => (
  <View style={[styles.historyCard, { borderLeftColor: item.color }]}>
    <View style={[styles.indexCircle, { backgroundColor: item.color + '22' }]}>
      <Text style={[styles.indexText, { color: item.color }]}>{index + 1}</Text>
    </View>
    <View style={styles.cardBody}>
      <Text style={styles.resultText}>{item.result}</Text>
      <View style={styles.timeRow}>
        <Clock size={11} color={COLORS.textSecondary} />
        <Text style={styles.timeText}>{timeAgo(item.timestamp)}</Text>
      </View>
    </View>
    <View style={[styles.dot, { backgroundColor: item.color }]} />
  </View>
);

const HistorySeparator = () => <View style={{ height: SPACING.sm }} />;

export const HistoryScreen: React.FC = () => {
  const { history, clearHistory } = useHistory();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Spin History</Text>
          <Text style={styles.headerSub}>{history.length} result{history.length !== 1 ? 's' : ''}</Text>
        </View>
        {history.length > 0 && (
          <Pressable
            onPress={clearHistory}
            style={({ pressed }) => [styles.clearBtn, pressed && { opacity: 0.6 }]}
          >
            <Trash2 size={15} color={COLORS.coral} />
            <Text style={styles.clearText}>Clear All</Text>
          </Pressable>
        )}
      </View>

      {history.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🎡</Text>
          <Text style={styles.emptyTitle}>No history yet</Text>
          <Text style={styles.emptySub}>Spin the wheel to see results here</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <HistoryItem item={item} index={index} />}
          ItemSeparatorComponent={HistorySeparator}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.title,
    fontWeight: TYPOGRAPHY.weights.bold as any,
    color: COLORS.text,
  },
  headerSub: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.coral + '15',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: BORDER_RADIUS.round,
  },
  clearText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.semibold as any,
    color: COLORS.coral,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderLeftWidth: 4,
    ...SHADOWS.soft,
  },
  indexCircle: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  indexText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold as any,
  },
  cardBody: {
    flex: 1,
  },
  resultText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.semibold as any,
    color: COLORS.text,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  timeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.tiny,
    color: COLORS.textSecondary,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: SPACING.sm,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.subtitle,
    fontWeight: TYPOGRAPHY.weights.bold as any,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptySub: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.textSecondary,
  },
});
