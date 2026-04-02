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
exports.AddOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const lucide_react_native_1 = require("lucide-react-native");
const useOptionsContext_1 = require("../hooks/useOptionsContext");
const colors_1 = require("../theme/colors");
const AddOption = () => {
    const [text, setText] = (0, react_1.useState)('');
    const [focused, setFocused] = (0, react_1.useState)(false);
    const { addOption } = (0, useOptionsContext_1.useOptions)();
    const scale = (0, react_1.useRef)(new react_native_1.Animated.Value(1)).current;
    const handleAdd = () => {
        if (text.trim().length > 0) {
            addOption(text);
            setText('');
        }
    };
    const animateBtn = (toValue) => {
        react_native_1.Animated.spring(scale, {
            toValue,
            useNativeDriver: true,
            speed: 50,
            bounciness: 10,
        }).start();
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.wrapper, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.sectionLabel, children: "ADD NEW OPTION" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.row, focused && styles.rowFocused], children: [(0, jsx_runtime_1.jsx)(react_native_1.TextInput, { style: styles.input, placeholder: "e.g. Pizza, Movie Night, Park\u2026", placeholderTextColor: colors_1.COLORS.textSecondary, value: text, onChangeText: setText, onFocus: () => setFocused(true), onBlur: () => setFocused(false), onSubmitEditing: handleAdd, returnKeyType: "done" }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: handleAdd, onPressIn: () => animateBtn(0.9), onPressOut: () => animateBtn(1), style: [styles.addBtn, !text.trim() && styles.addBtnDisabled], disabled: !text.trim(), children: (0, jsx_runtime_1.jsx)(lucide_react_native_1.Plus, { color: "#FFFFFF", size: 22, strokeWidth: 2.5 }) }) })] })] }));
};
exports.AddOption = AddOption;
const styles = react_native_1.StyleSheet.create({
    wrapper: {
        marginBottom: colors_1.SPACING.sm,
    },
    sectionLabel: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.caption,
        fontWeight: colors_1.TYPOGRAPHY.weights.bold,
        color: colors_1.COLORS.textSecondary,
        letterSpacing: 1.5,
        marginBottom: colors_1.SPACING.md,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors_1.COLORS.surface,
        borderRadius: colors_1.BORDER_RADIUS.md,
        borderWidth: 1.5,
        borderColor: colors_1.COLORS.border,
        paddingLeft: colors_1.SPACING.md,
        paddingRight: colors_1.SPACING.xs,
        paddingVertical: colors_1.SPACING.xs,
        ...colors_1.SHADOWS.soft,
    },
    rowFocused: {
        borderColor: colors_1.COLORS.coral,
    },
    input: {
        flex: 1,
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.body,
        color: colors_1.COLORS.text,
        paddingVertical: colors_1.SPACING.sm,
        paddingRight: colors_1.SPACING.sm,
    },
    addBtn: {
        backgroundColor: colors_1.COLORS.coral,
        borderRadius: colors_1.BORDER_RADIUS.sm,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        ...colors_1.SHADOWS.soft,
    },
    addBtnDisabled: {
        backgroundColor: colors_1.COLORS.textSecondary,
        opacity: 0.5,
    },
});
//# sourceMappingURL=AddOption.js.map