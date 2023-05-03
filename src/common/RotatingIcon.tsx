import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

const RotatingIcon = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  // Create a custom easing curve with overshoot at the start and end of the animation
  const customEasing = Easing.bezier(0.52, -0.55, 0.29, 1.55);

  useEffect(() => {
    const startAnimation = () => {
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        easing: customEasing, // Use the custom easing curve
        useNativeDriver: true,
      }).start(() => {
        spinValue.setValue(0);
        setTimeout(startAnimation, 4500);
      });
    };

    startAnimation();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <IconContainer>
        <Ionicons name="ice-cream" size={30} color="white" />
      </IconContainer>
    </Animated.View>
  );
};

const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export default RotatingIcon;
