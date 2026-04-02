"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @format
 */
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const App_1 = __importDefault(require("../App"));
test('renders correctly', async () => {
    await react_test_renderer_1.default.act(() => {
        react_test_renderer_1.default.create((0, jsx_runtime_1.jsx)(App_1.default, {}));
    });
});
//# sourceMappingURL=App.test.js.map