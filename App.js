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
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const useOptionsContext_1 = require("./src/hooks/useOptionsContext");
const useHistoryContext_1 = require("./src/hooks/useHistoryContext");
const SpinScreen_1 = require("./src/components/SpinScreen");
const OptionsScreen_1 = require("./src/components/OptionsScreen");
const HistoryScreen_1 = require("./src/components/HistoryScreen");
const TabBar_1 = require("./src/components/TabBar");
const colors_1 = require("./src/theme/colors");
// ---------- App Shell ----------
function AppContent() {
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('spin');
    const renderScreen = () => {
        switch (activeTab) {
            case 'options': return (0, jsx_runtime_1.jsx)(OptionsScreen_1.OptionsScreen, {});
            case 'history': return (0, jsx_runtime_1.jsx)(HistoryScreen_1.HistoryScreen, {});
            default: return (0, jsx_runtime_1.jsx)(SpinScreen_1.SpinScreen, {});
        }
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [styles.root, { paddingTop: insets.top }], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.screenArea, children: renderScreen() }), (0, jsx_runtime_1.jsx)(TabBar_1.TabBar, { activeTab: activeTab, onTabChange: setActiveTab })] }));
}
// ---------- Root ----------
function App() {
    return ((0, jsx_runtime_1.jsxs)(react_native_safe_area_context_1.SafeAreaProvider, { children: [(0, jsx_runtime_1.jsx)(react_native_1.StatusBar, { barStyle: "light-content", backgroundColor: colors_1.COLORS.bgDeep, translucent: false }), (0, jsx_runtime_1.jsx)(useOptionsContext_1.OptionsProvider, { children: (0, jsx_runtime_1.jsx)(useHistoryContext_1.HistoryProvider, { children: (0, jsx_runtime_1.jsx)(AppContent, {}) }) })] }));
}
const styles = react_native_1.StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors_1.COLORS.bgDeep,
    },
    screenArea: {
        flex: 1,
    },
});
//# sourceMappingURL=App.js.map