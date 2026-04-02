import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AddOption } from './AddOption';
import { OptionList } from './OptionList';
import { useOptions } from '../hooks/useOptionsContext';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/colors';

export const OptionsScreen: React.FC = () => {

  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Options</Text>
            <Text style={styles.headerSub}>Manage what the wheel can land on</Text>
          </View>
          <AddOption />
          <OptionList />
        </View>
      }
      keyExtractor={() => 'header'}
      contentContainerStyle={{ paddingBottom: 80 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    flex: 1,
  },
  header: {
    marginBottom: SPACING.lg,
    paddingTop: SPACING.md,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.title,
    fontWeight: '700' as any,
    color: COLORS.text,
  },
  headerSub: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
