import { FontAwesome5 } from '@expo/vector-icons';
import { Icon, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

const RotatingIcon = () => {
  const [icon, setIcon] = useState<string>('');
  const spinValue = useRef(new Animated.Value(0)).current;
  const easingCurve = Easing.bezier(0.52, -0.55, 0.29, 1.55);
  const possibleIcons = [
    'hamburger',
    'hotdog',
    'pizza-slice',
    'pepper-hot',
    'apple-alt',
    'ice-cream',
    'drumstick-bite',
  ];

  useEffect(() => {
    const startAnimation = () => {
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        easing: easingCurve,
        useNativeDriver: true,
      }).start(() => {
        spinValue.setValue(0);
        setTimeout(startAnimation, 6500);
      });
    };

    startAnimation();

    setIcon(possibleIcons[Math.floor(Math.random() * possibleIcons.length)]);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <View>
        <Icon as={FontAwesome5} name={icon} color="primary.500" size={6} />
      </View>
    </Animated.View>
  );
};

export default RotatingIcon;
