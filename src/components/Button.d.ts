import React from 'react';
import { PressableProps, ViewStyle, TextStyle } from 'react-native';
interface ButtonProps extends PressableProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'danger';
    style?: ViewStyle;
    textStyle?: TextStyle;
}
export declare const Button: React.FC<ButtonProps>;
export {};
//# sourceMappingURL=Button.d.ts.map