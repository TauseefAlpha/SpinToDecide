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
exports.useHistory = exports.HistoryProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const useOptionsContext_1 = require("./useOptionsContext");
const HistoryContext = (0, react_1.createContext)(undefined);
const HISTORY_KEY = '@decision_spinner_history';
const MAX_HISTORY = 50;
const HistoryProvider = ({ children }) => {
    const [history, setHistory] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        async_storage_1.default.getItem(HISTORY_KEY).then((raw) => {
            if (raw)
                setHistory(JSON.parse(raw));
        });
    }, []);
    const persist = (entries) => {
        async_storage_1.default.setItem(HISTORY_KEY, JSON.stringify(entries));
    };
    const addEntry = (option) => {
        const entry = {
            id: Date.now().toString(),
            result: option.text,
            color: option.color,
            timestamp: Date.now(),
        };
        setHistory((prev) => {
            const updated = [entry, ...prev].slice(0, MAX_HISTORY);
            persist(updated);
            return updated;
        });
    };
    const clearHistory = () => {
        setHistory([]);
        async_storage_1.default.removeItem(HISTORY_KEY);
    };
    return ((0, jsx_runtime_1.jsx)(HistoryContext.Provider, { value: { history, addEntry, clearHistory }, children: children }));
};
exports.HistoryProvider = HistoryProvider;
const useHistory = () => {
    const ctx = (0, react_1.useContext)(HistoryContext);
    if (!ctx)
        throw new Error('useHistory must be used within HistoryProvider');
    return ctx;
};
exports.useHistory = useHistory;
//# sourceMappingURL=useHistoryContext.js.map