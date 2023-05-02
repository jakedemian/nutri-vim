import React from 'react';
import { StyleSheet, View } from 'react-native';

import Loading from 'src/common/Loading';

const FullScreenLoader: React.FC = () => {
  return (
    <View style={styles.container} testID="loader">
      <View style={styles.flex}>
        <Loading />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    height: '100%',
  },
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FullScreenLoader;
