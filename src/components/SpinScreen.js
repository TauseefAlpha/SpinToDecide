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
exports.SpinScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const useOptionsContext_1 = require("../hooks/useOptionsContext");
const SpinWheel_1 = require("./SpinWheel");
const colors_1 = require("../theme/colors");
if (react_native_1.Platform.OS === 'android' && react_native_1.UIManager.setLayoutAnimationEnabledExperimental) {
    react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
}
const { width: SW, height: SH } = react_native_1.Dimensions.get('window');
// ── Option chip ──────────────────────────────────────────────────────────────
const Chip = ({ text, color, onRemove, }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.chip, { borderColor: color + '70', backgroundColor: color + '25' }], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.chipDot, { backgroundColor: color }] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.chipText, numberOfLines: 1, children: text }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: onRemove, hitSlop: 10, style: ({ pressed }) => ({ opacity: pressed ? 0.4 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.chipX, { color }], children: "\u2715" }) })] }));
// ── SpinScreen ───────────────────────────────────────────────────────────────
const SpinScreen = () => {
    const { options, addOption, removeOption } = (0, useOptionsContext_1.useOptions)();
    const [expanded, setExpanded] = (0, react_1.useState)(false);
    const [inputText, setInputText] = (0, react_1.useState)('');
    const chevAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const togglePanel = () => {
        react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
        react_native_1.Animated.spring(chevAnim, {
            toValue: expanded ? 0 : 1,
            speed: 18, bounciness: 4, useNativeDriver: true,
        }).start();
        setExpanded(v => !v);
    };
    const handleAdd = () => {
        if (inputText.trim()) {
            addOption(inputText.trim());
            setInputText('');
        }
    };
    const chevronRot = chevAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { style: styles.screen, contentContainerStyle: styles.content, showsVerticalScrollIndicator: false, keyboardShouldPersistTaps: "handled", children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: react_native_1.StyleSheet.absoluteFill, pointerEvents: "none", children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.bgBase }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.blob1 }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.blob2 }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.blob3 }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.blob4 }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.noiseOverlay })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.header, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.badgeRow, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.badge, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.badgeDot }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.badgeText, children: "DECISION MAKER" })] }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.title, children: "Decision Spinner" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.subtitle, children: "Let the wheel decide for you \u2728" })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.wheelWrap, children: (0, jsx_runtime_1.jsx)(SpinWheel_1.SpinWheel, {}) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.panel, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { onPress: togglePanel, style: styles.panelHeader, android_ripple: { color: 'rgba(255,255,255,0.05)' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.panelLeft, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.panelIconBox, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.panelIconEmoji, children: "\uD83C\uDFAF" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.panelTitle, children: "Manage Options" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: styles.panelSub, children: [options.length, " item", options.length !== 1 ? 's' : '', " on wheel"] })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ rotate: chevronRot }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.chevron, children: "\u2304" }) })] }), expanded && ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.panelBody, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.panelDivider }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.addRow, children: [(0, jsx_runtime_1.jsx)(react_native_1.TextInput, { style: styles.addInput, placeholder: "New option\u2026", placeholderTextColor: "rgba(255,255,255,0.4)", value: inputText, onChangeText: setInputText, onSubmitEditing: handleAdd, returnKeyType: "done" }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: handleAdd, disabled: !inputText.trim(), style: ({ pressed }) => [
                                            styles.addBtn,
                                            !inputText.trim() && styles.addBtnOff,
                                            pressed && { opacity: 0.7 },
                                        ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.addBtnText, children: "+ Add" }) })] }), options.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.emptyMsg, children: "No options yet \u2014 add one above!" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.chips, children: options.map((opt, i) => ((0, jsx_runtime_1.jsx)(Chip, { text: opt.text, color: colors_1.SEGMENT_COLORS[i % colors_1.SEGMENT_COLORS.length], onRemove: () => removeOption(opt.id) }, opt.id))) }))] }))] })] }));
};
exports.SpinScreen = SpinScreen;
// ── Styles ───────────────────────────────────────────────────────────────────
const styles = react_native_1.StyleSheet.create({
    screen: { flex: 1 },
    content: { paddingBottom: 52, minHeight: SH },
    /* BG layers */
    bgBase: {
        ...react_native_1.StyleSheet.absoluteFillObject,
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
        ...react_native_1.StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    /* Header */
    header: {
        paddingTop: colors_1.SPACING.xl,
        paddingHorizontal: colors_1.SPACING.lg,
        alignItems: 'center',
        marginBottom: colors_1.SPACING.md,
    },
    badgeRow: { marginBottom: colors_1.SPACING.sm },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: colors_1.BORDER_RADIUS.round,
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
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: 10,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.8)',
        letterSpacing: 1.5,
    },
    title: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.8,
        textAlign: 'center',
        textShadowColor: 'rgba(124,58,237,0.6)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 12,
    },
    subtitle: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.body,
        color: 'rgba(255,255,255,0.5)',
        marginTop: 6,
        textAlign: 'center',
    },
    /* Wheel wrapper */
    wheelWrap: {
        alignItems: 'center',
        paddingVertical: colors_1.SPACING.md,
    },
    /* Panel – glassmorphism card */
    panel: {
        marginHorizontal: colors_1.SPACING.lg,
        marginTop: colors_1.SPACING.md,
        borderRadius: colors_1.BORDER_RADIUS.lg,
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
        paddingHorizontal: colors_1.SPACING.md,
        paddingVertical: colors_1.SPACING.md,
    },
    panelLeft: { flexDirection: 'row', alignItems: 'center', gap: colors_1.SPACING.md },
    panelIconBox: {
        width: 42, height: 42,
        borderRadius: colors_1.BORDER_RADIUS.md,
        backgroundColor: 'rgba(255,255,255,0.12)',
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.18)',
    },
    panelIconEmoji: { fontSize: 20 },
    panelTitle: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.body,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    panelSub: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.caption,
        color: 'rgba(255,255,255,0.45)',
        marginTop: 2,
    },
    chevron: { fontSize: 22, color: 'rgba(255,255,255,0.5)', lineHeight: 26 },
    panelDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: colors_1.SPACING.md },
    panelBody: { paddingHorizontal: colors_1.SPACING.md, paddingBottom: colors_1.SPACING.md },
    /* Add row */
    addRow: {
        flexDirection: 'row', alignItems: 'center',
        gap: colors_1.SPACING.sm,
        marginTop: colors_1.SPACING.md, marginBottom: colors_1.SPACING.md,
    },
    addInput: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: colors_1.BORDER_RADIUS.md,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: colors_1.SPACING.md, paddingVertical: 11,
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.body,
        color: '#FFFFFF',
    },
    addBtn: {
        backgroundColor: '#F97316',
        borderRadius: colors_1.BORDER_RADIUS.md,
        paddingHorizontal: colors_1.SPACING.md, paddingVertical: 11,
    },
    addBtnOff: { opacity: 0.35 },
    addBtnText: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.body,
        fontWeight: '600',
        color: '#fff',
    },
    /* Chips */
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: colors_1.SPACING.sm },
    chip: {
        flexDirection: 'row', alignItems: 'center',
        borderRadius: colors_1.BORDER_RADIUS.round,
        borderWidth: 1.5,
        paddingVertical: 6, paddingHorizontal: 12,
        gap: 6, maxWidth: 160,
    },
    chipDot: { width: 8, height: 8, borderRadius: 4 },
    chipText: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.caption,
        fontWeight: '500',
        color: '#FFFFFF',
        flexShrink: 1,
    },
    chipX: { fontSize: 11, fontWeight: '700' },
    emptyMsg: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.caption,
        color: 'rgba(255,255,255,0.4)',
        textAlign: 'center',
        paddingVertical: colors_1.SPACING.sm,
    },
});
//# sourceMappingURL=SpinScreen.js.map