import React from 'react';
import { StyleSheet, View } from 'react-native';

import CalorieDisplay from 'src/screens/Today/CalorieDisplay';

const Today: React.FC = () => {
  return (
    <>
      <View style={styles.pageContent}>
        <CalorieDisplay />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  pageContent: {
    backgroundColor: '#111',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default Today;
