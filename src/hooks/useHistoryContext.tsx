import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const HistoryContext = createContext<HistoryContextProps | undefined>(undefined);

const HISTORY_KEY = '@decision_spinner_history';
const MAX_HISTORY = 50;

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(HISTORY_KEY).then((raw) => {
      if (raw) setHistory(JSON.parse(raw));
    });
  }, []);

  const persist = (entries: HistoryEntry[]) => {
    AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
  };

  const addEntry = (option: Option) => {
    const entry: HistoryEntry = {
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
    AsyncStorage.removeItem(HISTORY_KEY);
  };

  return (
    <HistoryContext.Provider value={{ history, addEntry, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory must be used within HistoryProvider');
  return ctx;
};
