import { Flex, Text, VStack } from 'native-base';
import React from 'react';

import RotatingIcon from 'src/common/RotatingIcon';

const Footer = () => {
  return (
    <Flex flexDir="row" justifyContent="center" mt={8}>
      <VStack alignItems="center">
        <RotatingIcon />
        <Text color="#fff" fontWeight={700} mt={2}>
          That&apos;s all, folks!
        </Text>
      </VStack>
    </Flex>
  );
};

export default Footer;
