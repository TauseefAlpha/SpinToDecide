"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const AddOption_1 = require("./AddOption");
const OptionList_1 = require("./OptionList");
const useOptionsContext_1 = require("../hooks/useOptionsContext");
const colors_1 = require("../theme/colors");
const OptionsScreen = () => {
    const { options } = (0, useOptionsContext_1.useOptions)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: [], renderItem: null, ListHeaderComponent: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.header, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.headerTitle, children: "My Options" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: styles.headerSub, children: "Manage what the wheel can land on" })] }), (0, jsx_runtime_1.jsx)(AddOption_1.AddOption, {}), (0, jsx_runtime_1.jsx)(OptionList_1.OptionList, {})] }), keyExtractor: () => 'header', contentContainerStyle: { paddingBottom: 80 } }));
};
exports.OptionsScreen = OptionsScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        padding: colors_1.SPACING.lg,
        flex: 1,
    },
    header: {
        marginBottom: colors_1.SPACING.lg,
        paddingTop: colors_1.SPACING.md,
    },
    headerTitle: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.title,
        fontWeight: '700',
        color: colors_1.COLORS.text,
    },
    headerSub: {
        fontFamily: colors_1.TYPOGRAPHY.fontFamily,
        fontSize: colors_1.TYPOGRAPHY.sizes.body,
        color: colors_1.COLORS.textSecondary,
        marginTop: 4,
    },
});
//# sourceMappingURL=OptionsScreen.js.map