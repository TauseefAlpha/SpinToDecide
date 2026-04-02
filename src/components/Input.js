"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const colors_1 = require("../theme/colors");
const Input = ({ label, error, style, ...rest }) => {
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [label && (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.label, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { style: [styles.input, error && styles.inputError, style], placeholderTextColor: colors_1.COLORS.textSecondary, ...rest }), error && (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.errorText, children: error })] }));
};
exports.Input = Input;
const styles = react_native_1.StyleSheet.create({
    container: {
        marginVertical: colors_1.SPACING.sm,
    },
    label: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.caption,
        color: colors_1.COLORS.text,
        marginBottom: colors_1.SPACING.xs,
        fontWeight: colors_1.TYPOGRAPHY.weights.medium,
    },
    input: {
        backgroundColor: colors_1.COLORS.surface,
        borderWidth: 1,
        borderColor: colors_1.COLORS.border,
        borderRadius: colors_1.BORDER_RADIUS.md,
        paddingHorizontal: colors_1.SPACING.md,
        paddingVertical: colors_1.SPACING.sm,
        fontSize: colors_1.TYPOGRAPHY.sizes.body,
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        color: colors_1.COLORS.text,
        minHeight: 48,
    },
    inputError: {
        borderColor: colors_1.COLORS.coral,
    },
    errorText: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.tiny,
        color: colors_1.COLORS.coral,
        marginTop: colors_1.SPACING.xs,
    },
});
//# sourceMappingURL=Input.js.map