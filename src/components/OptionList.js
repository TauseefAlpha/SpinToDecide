"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const lucide_react_native_1 = require("lucide-react-native");
const useOptionsContext_1 = require("../hooks/useOptionsContext");
const colors_1 = require("../theme/colors");
const OptionItem = ({ item, onRemove, }) => {
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.itemCard, { borderLeftColor: item.color }], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.itemLeft, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.colorBadge, { backgroundColor: item.color + '22' }], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.colorDot, { backgroundColor: item.color }] }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.itemText, children: item.text })] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: () => onRemove(item.id), hitSlop: 12, style: ({ pressed }) => [styles.deleteBtn, pressed && styles.deleteBtnPressed], children: (0, jsx_runtime_1.jsx)(lucide_react_native_1.Trash2, { color: colors_1.COLORS.coral, size: 18 }) })] }));
};
const OptionList = () => {
    const { options, removeOption } = (0, useOptionsContext_1.useOptions)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.header, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.headerTitle, children: "OPTIONS" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.badge, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.badgeText, children: options.length }) })] }), options.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.emptyState, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.emptyText, children: "No options yet. Add one above!" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: options, keyExtractor: (item) => item.id, scrollEnabled: false, renderItem: ({ item }) => ((0, jsx_runtime_1.jsx)(OptionItem, { item: item, onRemove: removeOption })), ItemSeparatorComponent: () => (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.separator }) }))] }));
};
exports.OptionList = OptionList;
const styles = react_native_1.StyleSheet.create({
    container: {
        marginTop: colors_1.SPACING.lg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: colors_1.SPACING.md,
    },
    headerTitle: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.caption,
        fontWeight: colors_1.TYPOGRAPHY.weights.bold,
        color: colors_1.COLORS.textSecondary,
        letterSpacing: 1.5,
    },
    badge: {
        marginLeft: colors_1.SPACING.sm,
        backgroundColor: colors_1.COLORS.coral,
        borderRadius: colors_1.BORDER_RADIUS.round,
        minWidth: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    badgeText: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.tiny,
        fontWeight: colors_1.TYPOGRAPHY.weights.bold,
        color: '#FFFFFF',
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: colors_1.SPACING.md,
        paddingHorizontal: colors_1.SPACING.md,
        backgroundColor: colors_1.COLORS.surface,
        borderRadius: colors_1.BORDER_RADIUS.md,
        borderLeftWidth: 4,
        ...colors_1.SHADOWS.soft,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    colorBadge: {
        width: 38,
        height: 38,
        borderRadius: colors_1.BORDER_RADIUS.sm,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: colors_1.SPACING.md,
    },
    colorDot: {
        width: 16,
        height: 16,
        borderRadius: colors_1.BORDER_RADIUS.round,
    },
    itemText: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.body,
        fontWeight: colors_1.TYPOGRAPHY.weights.semibold,
        color: colors_1.COLORS.text,
        flex: 1,
    },
    deleteBtn: {
        width: 36,
        height: 36,
        borderRadius: colors_1.BORDER_RADIUS.sm,
        backgroundColor: colors_1.COLORS.coral + '15',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteBtnPressed: {
        backgroundColor: colors_1.COLORS.coral + '30',
    },
    separator: {
        height: colors_1.SPACING.sm,
    },
    emptyState: {
        paddingVertical: colors_1.SPACING.xl,
        alignItems: 'center',
        backgroundColor: colors_1.COLORS.surface,
        borderRadius: colors_1.BORDER_RADIUS.md,
        borderWidth: 2,
        borderColor: colors_1.COLORS.border,
        borderStyle: 'dashed',
    },
    emptyText: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.body,
        color: colors_1.COLORS.textSecondary,
    },
});
//# sourceMappingURL=OptionList.js.map