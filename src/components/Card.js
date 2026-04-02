"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const colors_1 = require("../theme/colors");
const Card = ({ children, style, ...rest }) => {
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles.card, style], ...rest, children: children }));
};
exports.Card = Card;
const styles = react_native_1.StyleSheet.create({
    card: {
        backgroundColor: colors_1.COLORS.surface,
        padding: colors_1.SPACING.lg,
        borderRadius: colors_1.BORDER_RADIUS.md,
        ...colors_1.SHADOWS.soft,
    },
});
//# sourceMappingURL=Card.js.map