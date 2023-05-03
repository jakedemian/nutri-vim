import React from 'react';
import styled from 'styled-components/native';

import Loading from 'src/common/Loading';

const FullScreenLoader: React.FC = () => {
  return (
    <Container testID="loader">
      <Flex>
        <Loading />
      </Flex>
    </Container>
  );
};

const Container = styled.View`
  background-color: #111;
  height: 100%;
  width: 100%;
`;

const Flex = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default FullScreenLoader;
