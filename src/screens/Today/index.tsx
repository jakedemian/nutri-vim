import React from 'react';
import styled from 'styled-components/native';

import CalorieDisplay from 'src/screens/Today/CalorieDisplay';

const Today: React.FC = () => {
  return (
    <>
      <PageContent>
        <CalorieDisplay />
      </PageContent>
    </>
  );
};

const PageContent = styled.View`
  background-color: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Today;
