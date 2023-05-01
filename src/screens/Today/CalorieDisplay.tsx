import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useFoodEntries } from 'src/hooks/useFoodEntries';

const CalorieDisplay = () => {
  const { isLoading, calorieCount } = useFoodEntries();

  return (
    <View>
      <Text style={styles.calorieDisplay}>
        {isLoading ? '----' : calorieCount}
      </Text>
      <Text style={styles.caloriesLabel}>calories</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  calorieDisplay: {
    color: 'white',
    fontSize: 128,
    fontWeight: '500',
    marginBottom: 0,
    paddingBottom: 0,
    lineHeight: 128,
    textAlign: 'center',
  },
  caloriesLabel: {
    color: 'white',
    fontSize: 36,
    marginTop: -24,
    textAlign: 'center',
  },
});

export default CalorieDisplay;
