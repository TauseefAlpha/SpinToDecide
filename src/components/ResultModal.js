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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_confetti_cannon_1 = __importDefault(require("react-native-confetti-cannon"));
const useOptionsContext_1 = require("../hooks/useOptionsContext");
const colors_1 = require("../theme/colors");
const { width: SW } = react_native_1.Dimensions.get('window');
const ResultModal = ({ visible, winningOption, onClose }) => {
    const scaleAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0.7)).current;
    const opacityAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    (0, react_1.useEffect)(() => {
        if (visible) {
            react_native_1.Animated.parallel([
                react_native_1.Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 14, bounciness: 10 }),
                react_native_1.Animated.timing(opacityAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
            ]).start();
        }
        else {
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(scaleAnim, { toValue: 0.85, duration: 150, useNativeDriver: true }),
                react_native_1.Animated.timing(opacityAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
            ]).start();
        }
    }, [visible]);
    if (!winningOption)
        return null;
    // Grab the segment colour that matches this option's colour, or fall back
    const accentColor = winningOption.color || colors_1.SEGMENT_COLORS[0];
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: visible, transparent: true, animationType: "none", children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.overlay, children: [visible && ((0, jsx_runtime_1.jsx)(react_native_confetti_cannon_1.default, { count: 140, origin: { x: SW / 2, y: -10 }, autoStart: true, fadeOut: true, explosionSpeed: 350, fallSpeed: 3200 })), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
                        styles.card,
                        { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
                    ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.topBar, { backgroundColor: accentColor }] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.trophy, { backgroundColor: accentColor + '25', borderColor: accentColor + '50' }], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.trophyEmoji, children: "\uD83C\uDFC6" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.label, children: "The wheel has spoken!" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.resultChip, { backgroundColor: accentColor + '20', borderColor: accentColor + '60' }], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.resultText, { color: accentColor }], children: winningOption.text }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.sub, children: "Time to commit to this decision \uD83C\uDFAF" }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: onClose, style: ({ pressed }) => [
                                styles.closeBtn,
                                { backgroundColor: accentColor },
                                pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
                            ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.closeBtnText, children: "Awesome! Let's Go" }) })] })] }) }));
};
exports.ResultModal = ResultModal;
const styles = react_native_1.StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(10, 8, 30, 0.88)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: colors_1.SPACING.lg,
    },
    card: {
        width: '100%',
        backgroundColor: '#1C1A3A', // solid deep-purple card — always visible
        borderRadius: colors_1.BORDER_RADIUS.xl,
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        // Glow shadow
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.55,
        shadowRadius: 40,
        elevation: 20,
        paddingBottom: colors_1.SPACING.xl,
    },
    topBar: {
        width: '100%',
        height: 6,
        borderRadius: 0,
        marginBottom: colors_1.SPACING.xl,
    },
    trophy: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: colors_1.SPACING.lg,
    },
    trophyEmoji: {
        fontSize: 38,
    },
    label: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.caption,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.45)',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: colors_1.SPACING.md,
    },
    resultChip: {
        borderRadius: colors_1.BORDER_RADIUS.lg,
        borderWidth: 1.5,
        paddingVertical: colors_1.SPACING.md,
        paddingHorizontal: colors_1.SPACING.xl,
        marginBottom: colors_1.SPACING.md,
        alignItems: 'center',
    },
    resultText: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: 32,
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    sub: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.caption,
        color: 'rgba(255,255,255,0.35)',
        marginBottom: colors_1.SPACING.xl,
        textAlign: 'center',
        paddingHorizontal: colors_1.SPACING.md,
    },
    closeBtn: {
        marginHorizontal: colors_1.SPACING.xl,
        width: '80%',
        paddingVertical: 15,
        borderRadius: colors_1.BORDER_RADIUS.round,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    closeBtnText: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.body,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.3,
    },
});
//# sourceMappingURL=ResultModal.js.map