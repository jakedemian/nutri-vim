import React from 'react';
import { StyleSheet, View } from 'react-native';

import Loading from 'src/common/Loading';

const FullScreenLoader: React.FC = () => {
  return (
    <View style={styles.container} testID="loader">
      <Loading />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FullScreenLoader;
