import { FontAwesome5 } from '@expo/vector-icons';
import { HStack, Icon, Text, VStack } from 'native-base';
import { Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';

const EmptyList: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 750,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 2,
          duration: 750,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 3,
          duration: 150,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 4,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 5,
          duration: 75,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 6,
          duration: 125,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6],
    outputRange: [0, -160, 0, -40, 0, -30, 0],
  });

  const rotate = animatedValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6],
    outputRange: [
      '0deg',
      '360deg',
      '720deg',
      '700deg',
      '720deg',
      '730deg',
      '720deg',
    ],
  });

  const animatedIconStyle = {
    transform: [{ translateY }, { rotate }],
  };

  return (
    <HStack
      h="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor="primary.900"
    >
      <VStack alignItems="center">
        <Animated.View style={animatedIconStyle}>
          <Icon
            as={FontAwesome5}
            name="utensils"
            color="primary.700"
            size={24}
          />
        </Animated.View>
        <Text mt={4} ml={-1} color="primary.700" fontSize={24} fontWeight={900}>
          Grab a bite!
        </Text>
      </VStack>
    </HStack>
  );
};

export default EmptyList;
