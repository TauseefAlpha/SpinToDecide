import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../theme/colors';

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

const OptionsContext = createContext<OptionsContextProps | undefined>(undefined);

const STORAGE_KEY = '@decision_spinner_options';

// Generates a random color from our palette for new options
const getRandomColor = () => {
  const palette = [COLORS.coral, COLORS.teal, COLORS.yellow, COLORS.purple, COLORS.blue, COLORS.green, COLORS.orange, COLORS.pink];
  return palette[Math.floor(Math.random() * palette.length)];
};

const defaultOptions: Option[] = [
  { id: '1', text: 'Pizza', color: COLORS.coral },
  { id: '2', text: 'Burger', color: COLORS.teal },
  { id: '3', text: 'Sushi', color: COLORS.yellow },
  { id: '4', text: 'Pasta', color: COLORS.purple },
];

export const OptionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from AsyncStorage on mount
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setOptions(JSON.parse(stored));
        } else {
          setOptions(defaultOptions);
        }
      } catch (e) {
        console.error('Failed to load options', e);
        setOptions(defaultOptions);
      } finally {
        setIsLoading(false);
      }
    };
    loadOptions();
  }, []);

  // Save to AsyncStorage whenever options change
  useEffect(() => {
    if (isLoading) return; // Don't save default options automatically until loading finishes
    const saveOptions = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(options));
      } catch (e) {
        console.error('Failed to save options', e);
      }
    };
    saveOptions();
  }, [options, isLoading]);

  const addOption = (text: string) => {
    if (!text.trim()) return;
    const newOption: Option = {
      id: Date.now().toString(),
      text: text.trim(),
      color: getRandomColor(),
    };
    setOptions((prev) => [...prev, newOption]);
  };

  const removeOption = (id: string) => {
    setOptions((prev) => prev.filter((opt) => opt.id !== id));
  };

  return (
    <OptionsContext.Provider value={{ options, addOption, removeOption, isLoading }}>
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptions = () => {
  const context = useContext(OptionsContext);
  if (context === undefined) {
    throw new Error('useOptions must be used within an OptionsProvider');
  }
  return context;
};
