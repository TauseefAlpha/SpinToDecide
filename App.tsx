import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { OptionsProvider } from './src/hooks/useOptionsContext';
import { HistoryProvider } from './src/hooks/useHistoryContext';
import { SpinScreen } from './src/components/SpinScreen';
import { OptionsScreen } from './src/components/OptionsScreen';
import { HistoryScreen } from './src/components/HistoryScreen';
import { TabBar } from './src/components/TabBar';
import { COLORS } from './src/theme/colors';

// ---------- App Shell ----------
function AppContent() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('spin');

  const renderScreen = () => {
    switch (activeTab) {
      case 'options':  return <OptionsScreen />;
      case 'history':  return <HistoryScreen />;
      default:         return <SpinScreen />;
    }
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.screenArea}>
        {renderScreen()}
      </View>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}

// ---------- Root ----------
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgDeep} translucent={false} />
      <OptionsProvider>
        <HistoryProvider>
          <AppContent />
        </HistoryProvider>
      </OptionsProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgDeep,
  },
  screenArea: {
    flex: 1,
  },
});


