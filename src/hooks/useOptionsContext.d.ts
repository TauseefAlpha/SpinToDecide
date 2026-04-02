import React from 'react';
export interface Option {
    id: string;
    text: string;
    color: string;
}
interface OptionsContextProps {
    options: Option[];
    addOption: (text: string) => void;
    removeOption: (id: string) => void;
    isLoading: boolean;
}
export declare const OptionsProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useOptions: () => OptionsContextProps;
export {};
//# sourceMappingURL=useOptionsContext.d.ts.map