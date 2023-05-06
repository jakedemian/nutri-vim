import React from 'react';
import { View } from 'native-base';

import CalorieDisplay from 'src/screens/Today/CalorieDisplay';

const Today: React.FC = () => {
  return (
    <>
      <View backgroundColor={'primary.900'} height="100%">
        <CalorieDisplay />
      </View>
    </>
  );
};

export default Today;
