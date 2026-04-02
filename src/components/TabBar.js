"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const colors_1 = require("../theme/colors");
const { width: SW } = react_native_1.Dimensions.get('window');
const TABS = [
    { key: 'spin', label: 'Spin', icon: '🎡' },
    { key: 'options', label: 'Options', icon: '⚙️' },
    { key: 'history', label: 'History', icon: '📋' },
];
const TabBar = ({ activeTab, onTabChange }) => {
    const activeIndex = TABS.findIndex(t => t.key === activeTab);
    // Pill slide
    const pillX = (0, react_1.useRef)(new react_native_1.Animated.Value(activeIndex)).current;
    // Icon bounce per tab
    const bounces = TABS.map(() => (0, react_1.useRef)(new react_native_1.Animated.Value(1)).current);
    (0, react_1.useEffect)(() => {
        react_native_1.Animated.spring(pillX, {
            toValue: activeIndex,
            useNativeDriver: true,
            speed: 18, bounciness: 6,
        }).start();
    }, [activeIndex]);
    const TAB_W = (SW - colors_1.SPACING.lg * 2 - colors_1.SPACING.sm * 2) / TABS.length;
    const pillTX = pillX.interpolate({
        inputRange: TABS.map((_, i) => i),
        outputRange: TABS.map((_, i) => i * TAB_W),
    });
    const handlePress = (key, idx) => {
        react_native_1.Animated.sequence([
            react_native_1.Animated.spring(bounces[idx], { toValue: 0.78, useNativeDriver: true, speed: 50 }),
            react_native_1.Animated.spring(bounces[idx], { toValue: 1, useNativeDriver: true, speed: 18, bounciness: 14 }),
        ]).start();
        onTabChange(key);
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.floatWrap, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.bar, children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [styles.pill, { width: TAB_W - 4, transform: [{ translateX: pillTX }] }] }), TABS.map((tab, i) => {
                    const isActive = activeTab === tab.key;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: () => handlePress(tab.key, i), style: styles.tabTouchable, children: (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [styles.tabInner, { transform: [{ scale: bounces[i] }] }], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.icon, isActive && styles.iconActive], children: tab.icon }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.label, isActive && styles.labelActive], children: tab.label }), isActive && (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.glowDot })] }) }, tab.key));
                })] }) }));
};
exports.TabBar = TabBar;
const styles = react_native_1.StyleSheet.create({
    floatWrap: {
        paddingHorizontal: colors_1.SPACING.lg,
        paddingBottom: react_native_1.Platform.OS === 'ios' ? 28 : colors_1.SPACING.md,
        paddingTop: colors_1.SPACING.sm,
        backgroundColor: 'transparent',
    },
    bar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(24, 20, 50, 0.92)', // dark translucent
        borderRadius: colors_1.BORDER_RADIUS.xl,
        paddingHorizontal: colors_1.SPACING.xs,
        paddingVertical: colors_1.SPACING.xs,
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
        top: colors_1.SPACING.xs,
        bottom: colors_1.SPACING.xs,
        left: colors_1.SPACING.xs + 2,
        borderRadius: colors_1.BORDER_RADIUS.lg,
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
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: 10,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 0.3,
    },
    labelActive: {
        color: '#FFFFFF',
        fontWeight: '700',
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
//# sourceMappingURL=TabBar.js.map