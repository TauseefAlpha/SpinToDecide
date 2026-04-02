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
exports.useOptions = exports.OptionsProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const colors_1 = require("../theme/colors");
const OptionsContext = (0, react_1.createContext)(undefined);
const STORAGE_KEY = '@decision_spinner_options';
// Generates a random color from our palette for new options
const getRandomColor = () => {
    const palette = [colors_1.COLORS.coral, colors_1.COLORS.teal, colors_1.COLORS.yellow, colors_1.COLORS.purple, colors_1.COLORS.blue, colors_1.COLORS.green, colors_1.COLORS.orange, colors_1.COLORS.pink];
    return palette[Math.floor(Math.random() * palette.length)];
};
const defaultOptions = [
    { id: '1', text: 'Pizza', color: colors_1.COLORS.coral },
    { id: '2', text: 'Burger', color: colors_1.COLORS.teal },
    { id: '3', text: 'Sushi', color: colors_1.COLORS.yellow },
    { id: '4', text: 'Pasta', color: colors_1.COLORS.purple },
];
const OptionsProvider = ({ children }) => {
    const [options, setOptions] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    // Load from AsyncStorage on mount
    (0, react_1.useEffect)(() => {
        const loadOptions = async () => {
            try {
                const stored = await async_storage_1.default.getItem(STORAGE_KEY);
                if (stored) {
                    setOptions(JSON.parse(stored));
                }
                else {
                    setOptions(defaultOptions);
                }
            }
            catch (e) {
                console.error('Failed to load options', e);
                setOptions(defaultOptions);
            }
            finally {
                setIsLoading(false);
            }
        };
        loadOptions();
    }, []);
    // Save to AsyncStorage whenever options change
    (0, react_1.useEffect)(() => {
        if (isLoading)
            return; // Don't save default options automatically until loading finishes
        const saveOptions = async () => {
            try {
                await async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify(options));
            }
            catch (e) {
                console.error('Failed to save options', e);
            }
        };
        saveOptions();
    }, [options, isLoading]);
    const addOption = (text) => {
        if (!text.trim())
            return;
        const newOption = {
            id: Date.now().toString(),
            text: text.trim(),
            color: getRandomColor(),
        };
        setOptions((prev) => [...prev, newOption]);
    };
    const removeOption = (id) => {
        setOptions((prev) => prev.filter((opt) => opt.id !== id));
    };
    return ((0, jsx_runtime_1.jsx)(OptionsContext.Provider, { value: { options, addOption, removeOption, isLoading }, children: children }));
};
exports.OptionsProvider = OptionsProvider;
const useOptions = () => {
    const context = (0, react_1.useContext)(OptionsContext);
    if (context === undefined) {
        throw new Error('useOptions must be used within an OptionsProvider');
    }
    return context;
};
exports.useOptions = useOptions;
//# sourceMappingURL=useOptionsContext.js.map