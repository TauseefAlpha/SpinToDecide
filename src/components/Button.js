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
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const colors_1 = require("../theme/colors");
const AnimatedPressable = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.Pressable);
const Button = ({ title, variant = 'primary', style, textStyle, onPress, ...rest }) => {
    const scale = (0, react_native_reanimated_1.useSharedValue)(1);
    const opacity = (0, react_native_reanimated_1.useSharedValue)(1);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });
    const handlePressIn = () => {
        scale.value = (0, react_native_reanimated_1.withSpring)(0.95, { damping: 15, stiffness: 200 });
        opacity.value = (0, react_native_reanimated_1.withTiming)(0.8, { duration: 100 });
    };
    const handlePressOut = () => {
        scale.value = (0, react_native_reanimated_1.withSpring)(1, { damping: 15, stiffness: 200 });
        opacity.value = (0, react_native_reanimated_1.withTiming)(1, { duration: 150 });
    };
    const getVariantStyles = () => {
        switch (variant) {
            case 'secondary':
                return {
                    button: { backgroundColor: colors_1.COLORS.border, ...colors_1.SHADOWS.soft },
                    text: { color: colors_1.COLORS.text },
                };
            case 'danger':
                return {
                    button: { backgroundColor: colors_1.COLORS.coral, ...colors_1.SHADOWS.soft },
                    text: { color: colors_1.COLORS.surface },
                };
            case 'primary':
            default:
                return {
                    button: { backgroundColor: colors_1.COLORS.coral, ...colors_1.SHADOWS.medium },
                    text: { color: colors_1.COLORS.surface },
                };
        }
    };
    const currentStyles = getVariantStyles();
    return ((0, jsx_runtime_1.jsx)(AnimatedPressable, { onPressIn: handlePressIn, onPressOut: handlePressOut, onPress: onPress, style: [styles.button, currentStyles.button, style, animatedStyle], ...rest, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles.text, currentStyles.text, textStyle], children: title }) }));
};
exports.Button = Button;
const styles = react_native_1.StyleSheet.create({
    button: {
        paddingVertical: colors_1.SPACING.md,
        paddingHorizontal: colors_1.SPACING.xl,
        borderRadius: colors_1.BORDER_RADIUS.round,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.subtitle,
        fontWeight: colors_1.TYPOGRAPHY.weights.bold,
    },
});
//# sourceMappingURL=Button.js.map