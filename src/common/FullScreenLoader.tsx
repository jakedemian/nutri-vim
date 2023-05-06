import { View } from 'native-base';
import React from 'react';

import Loading from 'src/common/Loading';

const FullScreenLoader: React.FC = () => {
  return (
    <View testID="loader">
      <View>
        <Loading />
      </View>
    </View>
  );
};

export default FullScreenLoader;
