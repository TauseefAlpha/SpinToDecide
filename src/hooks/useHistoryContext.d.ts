import React from 'react';
import { Option } from './useOptionsContext';
export interface HistoryEntry {
    id: string;
    result: string;
    color: string;
    timestamp: number;
}
interface HistoryContextProps {
    history: HistoryEntry[];
    addEntry: (option: Option) => void;
    clearHistory: () => void;
}
export declare const HistoryProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useHistory: () => HistoryContextProps;
export {};
//# sourceMappingURL=useHistoryContext.d.ts.map