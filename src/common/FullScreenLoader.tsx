import { Spinner, View } from 'native-base';
import React from 'react';

const FullScreenLoader: React.FC = () => {
  return (
    <View testID="loader">
      <View>
        <Spinner size={48} color="primary.400" />
      </View>
    </View>
  );
};

export default FullScreenLoader;
