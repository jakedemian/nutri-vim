import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components';

const Loading: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  return <ActivityIndicator size={48} color={themeContext.colors.primary} />;
};

export default Loading;
