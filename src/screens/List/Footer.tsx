import React from 'react';
import { Flex, HStack, Icon } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

import RotatingIcon from 'src/common/RotatingIcon';

const Footer = () => {
  return (
    <Flex flexDir="row" justifyContent="center" mt={8}>
      <HStack alignItems="center" p={2}>
        <Icon
          as={FontAwesome5}
          name="minus"
          color="primary.800"
          size={6}
          mx={6}
        />
        <RotatingIcon />
        <Icon
          as={FontAwesome5}
          name="minus"
          color="primary.800"
          size={6}
          mx={6}
        />
      </HStack>
    </Flex>
  );
};

export default Footer;
