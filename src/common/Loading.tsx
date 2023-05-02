import React from 'react';
import { ActivityIndicator } from 'react-native';

import { PRIMARY } from 'src/theme/theme';

const Loading: React.FC = () => {
  return <ActivityIndicator size={48} color={PRIMARY} />;
};

export default Loading;
