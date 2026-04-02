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
exports.SpinWheel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_haptic_feedback_1 = __importDefault(require("react-native-haptic-feedback"));
const useOptionsContext_1 = require("../hooks/useOptionsContext");
const useHistoryContext_1 = require("../hooks/useHistoryContext");
const ResultModal_1 = require("./ResultModal");
const colors_1 = require("../theme/colors");
const { width } = react_native_1.Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.82, 320);
const RADIUS = WHEEL_SIZE / 2;
const polarToCartesian = (cx, cy, r, deg) => {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};
const createSlicePath = (r, start, end) => {
    const s = polarToCartesian(0, 0, r, end);
    const e = polarToCartesian(0, 0, r, start);
    const large = end - start <= 180 ? '0' : '1';
    return `M 0 0 L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y} Z`;
};
const SpinWheel = () => {
    const { options } = (0, useOptionsContext_1.useOptions)();
    const { addEntry } = (0, useHistoryContext_1.useHistory)();
    const rotation = (0, react_native_reanimated_1.useSharedValue)(0);
    const btnScale = (0, react_native_reanimated_1.useSharedValue)(1);
    const [isSpinning, setIsSpinning] = (0, react_1.useState)(false);
    const [modalVisible, setModalVisible] = (0, react_1.useState)(false);
    const [winningOption, setWinningOption] = (0, react_1.useState)(null);
    const handleSpinEnd = (finalAngle) => {
        setIsSpinning(false);
        const norm = finalAngle % 360;
        const ptr = (360 - norm) % 360;
        const seg = 360 / Math.max(options.length, 1);
        const idx = Math.floor(ptr / seg);
        const winner = options[idx];
        setWinningOption(winner);
        addEntry(winner);
        react_native_haptic_feedback_1.default.trigger('notificationSuccess', {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
        });
        setModalVisible(true);
    };
    const spin = () => {
        if (isSpinning || options.length === 0)
            return;
        setIsSpinning(true);
        const total = rotation.value + 5 * 360 + Math.floor(Math.random() * 360);
        rotation.value = (0, react_native_reanimated_1.withTiming)(total, {
            duration: 4400,
            easing: react_native_reanimated_1.Easing.bezier(0.17, 0.84, 0.44, 1),
        }, (done) => { if (done)
            (0, react_native_reanimated_1.runOnJS)(handleSpinEnd)(total); });
    };
    const onPressIn = () => { btnScale.value = (0, react_native_reanimated_1.withSpring)(0.93, { damping: 15 }); };
    const onPressOut = () => { btnScale.value = (0, react_native_reanimated_1.withSpring)(1, { damping: 12 }); };
    const wheelStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));
    const btnStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ scale: btnScale.value }],
    }));
    const segAngle = options.length > 0 ? 360 / options.length : 360;
    const canSpin = !isSpinning && options.length > 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.glowRing }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.pointerWrap, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.pointerGlowDot }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.pointerTriangle })] }), (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.wheelAnim, wheelStyle], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.wheelRing, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.default, { width: WHEEL_SIZE, height: WHEEL_SIZE, viewBox: `${-RADIUS} ${-RADIUS} ${WHEEL_SIZE} ${WHEEL_SIZE}`, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Defs, { children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.RadialGradient, { id: "hubGrad", cx: "50%", cy: "50%", r: "50%", children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Stop, { offset: "0%", stopColor: "#FFFFFF", stopOpacity: "1" }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Stop, { offset: "100%", stopColor: "#E8E0FF", stopOpacity: "1" })] }) }), options.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: "0", cy: "0", r: RADIUS, fill: "rgba(255,255,255,0.08)" })) : (options.map((opt, i) => {
                                const color = colors_1.SEGMENT_COLORS[i % colors_1.SEGMENT_COLORS.length];
                                const startAngle = i * segAngle;
                                const endAngle = startAngle + segAngle;
                                const path = createSlicePath(RADIUS, startAngle, endAngle);
                                const midAngle = startAngle + segAngle / 2;
                                const textPos = polarToCartesian(0, 0, RADIUS * 0.62, midAngle);
                                const textRot = midAngle - 90;
                                const label = opt.text.length > 8 ? opt.text.slice(0, 7) + '…' : opt.text;
                                return ((0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: path, fill: color }), (() => {
                                            const p = polarToCartesian(0, 0, RADIUS, startAngle);
                                            return ((0, jsx_runtime_1.jsx)(react_native_svg_1.Line, { x1: "0", y1: "0", x2: p.x, y2: p.y, stroke: "rgba(255,255,255,0.35)", strokeWidth: "2" }));
                                        })(), (0, jsx_runtime_1.jsx)(react_native_svg_1.Text, { x: textPos.x, y: textPos.y, fill: "#FFFFFF", fontSize: options.length > 7 ? '11' : options.length > 4 ? '13' : '15', fontWeight: "800", textAnchor: "middle", alignmentBaseline: "middle", transform: `rotate(${textRot}, ${textPos.x}, ${textPos.y})`, children: label })] }, opt.id));
                            })), (0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: "0", cy: "0", r: WHEEL_SIZE * 0.095, fill: "url(#hubGrad)", stroke: "rgba(255,255,255,0.6)", strokeWidth: "3" })] }) }) }), (0, jsx_runtime_1.jsx)(react_native_reanimated_1.default.View, { style: [styles.btnWrap, btnStyle], children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { style: [styles.spinBtn, !canSpin && styles.spinBtnOff], onPress: spin, onPressIn: onPressIn, onPressOut: onPressOut, disabled: !canSpin, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.spinBtnGradLeft }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.spinBtnGradRight }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.spinBtnText, children: isSpinning ? 'Spinning…' : options.length === 0 ? 'Add Options' : '✦  SPIN  ✦' })] }) }), (0, jsx_runtime_1.jsx)(ResultModal_1.ResultModal, { visible: modalVisible, winningOption: winningOption, onClose: () => setModalVisible(false) })] }));
};
exports.SpinWheel = SpinWheel;
const styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: colors_1.SPACING.sm,
    },
    /* ── Glow ring ── */
    glowRing: {
        position: 'absolute',
        width: WHEEL_SIZE + 60,
        height: WHEEL_SIZE + 60,
        borderRadius: (WHEEL_SIZE + 60) / 2,
        backgroundColor: 'transparent',
        // multiple layered shadows for glow
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 40,
        elevation: 0,
        top: -14,
    },
    /* ── Pointer ── */
    pointerWrap: {
        alignItems: 'center',
        zIndex: 20,
        marginBottom: -14,
    },
    pointerGlowDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: -2,
        zIndex: 21,
    },
    pointerTriangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 13,
        borderRightWidth: 13,
        borderTopWidth: 26,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#FFFFFF',
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        elevation: 3,
    },
    /* ── Wheel ── */
    wheelAnim: {
        zIndex: 10,
    },
    wheelRing: {
        width: WHEEL_SIZE + 16,
        height: WHEEL_SIZE + 16,
        borderRadius: (WHEEL_SIZE + 16) / 2,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        // deep shadow
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.5,
        shadowRadius: 30,
        elevation: 16,
    },
    /* ── SPIN button ── */
    btnWrap: {
        marginTop: colors_1.SPACING.xl,
        width: WHEEL_SIZE * 0.78,
    },
    spinBtn: {
        height: 58,
        borderRadius: colors_1.BORDER_RADIUS.round,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        // glow shadow
        shadowColor: '#F97316',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.55,
        shadowRadius: 20,
        elevation: 12,
        backgroundColor: '#F97316', // fallback
    },
    spinBtnOff: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        shadowOpacity: 0,
        elevation: 0,
    },
    // Two overlapping half-circles to simulate orange→pink gradient
    spinBtnGradLeft: {
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: '55%',
        backgroundColor: '#F97316',
    },
    spinBtnGradRight: {
        position: 'absolute',
        right: 0, top: 0, bottom: 0,
        width: '55%',
        backgroundColor: '#EC4899',
    },
    spinBtnText: {
        zIndex: 2,
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: 18,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 2.5,
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
});
//# sourceMappingURL=SpinWheel.js.map