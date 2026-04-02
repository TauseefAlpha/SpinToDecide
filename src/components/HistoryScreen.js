"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const lucide_react_native_1 = require("lucide-react-native");
const useHistoryContext_1 = require("../hooks/useHistoryContext");
const colors_1 = require("../theme/colors");
const timeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1)
        return 'Just now';
    if (minutes < 60)
        return `${minutes}m ago`;
    if (hours < 24)
        return `${hours}h ago`;
    return `${days}d ago`;
};
const HistoryItem = ({ item, index }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.historyCard, { borderLeftColor: item.color }], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.indexCircle, { backgroundColor: item.color + '22' }], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.indexText, { color: item.color }], children: index + 1 }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.cardBody, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.resultText, children: item.result }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.timeRow, children: [(0, jsx_runtime_1.jsx)(lucide_react_native_1.Clock, { size: 11, color: colors_1.COLORS.textSecondary }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.timeText, children: timeAgo(item.timestamp) })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.dot, { backgroundColor: item.color }] })] }));
const HistoryScreen = () => {
    const { history, clearHistory } = (0, useHistoryContext_1.useHistory)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.header, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.headerTitle, children: "Spin History" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: styles.headerSub, children: [history.length, " result", history.length !== 1 ? 's' : ''] })] }), history.length > 0 && ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { onPress: clearHistory, style: ({ pressed }) => [styles.clearBtn, pressed && { opacity: 0.6 }], children: [(0, jsx_runtime_1.jsx)(lucide_react_native_1.Trash2, { size: 15, color: colors_1.COLORS.coral }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.clearText, children: "Clear All" })] }))] }), history.length === 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.empty, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.emptyIcon, children: "\uD83C\uDFA1" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.emptyTitle, children: "No history yet" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.emptySub, children: "Spin the wheel to see results here" })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: history, keyExtractor: (item) => item.id, renderItem: ({ item, index }) => (0, jsx_runtime_1.jsx)(HistoryItem, { item: item, index: index }), ItemSeparatorComponent: () => (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: colors_1.SPACING.sm } }), contentContainerStyle: styles.list, showsVerticalScrollIndicator: false }))] }));
};
exports.HistoryScreen = HistoryScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors_1.COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: colors_1.SPACING.lg,
        paddingTop: colors_1.SPACING.xl,
        paddingBottom: colors_1.SPACING.md,
    },
    headerTitle: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.title,
        fontWeight: colors_1.TYPOGRAPHY.weights.bold,
        color: colors_1.COLORS.text,
    },
    headerSub: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.caption,
        color: colors_1.COLORS.textSecondary,
        marginTop: 2,
    },
    clearBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: colors_1.COLORS.coral + '15',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: colors_1.BORDER_RADIUS.round,
    },
    clearText: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.caption,
        fontWeight: colors_1.TYPOGRAPHY.weights.semibold,
        color: colors_1.COLORS.coral,
    },
    list: {
        paddingHorizontal: colors_1.SPACING.lg,
        paddingBottom: colors_1.SPACING.xl,
    },
    historyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors_1.COLORS.surface,
        borderRadius: colors_1.BORDER_RADIUS.md,
        paddingVertical: colors_1.SPACING.md,
        paddingHorizontal: colors_1.SPACING.md,
        borderLeftWidth: 4,
        ...colors_1.SHADOWS.soft,
    },
    indexCircle: {
        width: 36,
        height: 36,
        borderRadius: colors_1.BORDER_RADIUS.round,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: colors_1.SPACING.md,
    },
    indexText: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.caption,
        fontWeight: colors_1.TYPOGRAPHY.weights.bold,
    },
    cardBody: {
        flex: 1,
    },
    resultText: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.body,
        fontWeight: colors_1.TYPOGRAPHY.weights.semibold,
        color: colors_1.COLORS.text,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 3,
    },
    timeText: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.tiny,
        color: colors_1.COLORS.textSecondary,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: colors_1.SPACING.sm,
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 80,
    },
    emptyIcon: {
        fontSize: 56,
        marginBottom: colors_1.SPACING.md,
    },
    emptyTitle: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.subtitle,
        fontWeight: colors_1.TYPOGRAPHY.weights.bold,
        color: colors_1.COLORS.text,
        marginBottom: colors_1.SPACING.xs,
    },
    emptySub: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.body,
        color: colors_1.COLORS.textSecondary,
    },
});
//# sourceMappingURL=HistoryScreen.js.map