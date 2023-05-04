import React from 'react';
import styled from 'styled-components/native';

import { useFoodEntries } from 'src/hooks/useFoodEntries';

const CalorieDisplay = () => {
  const { isLoading, calorieCount } = useFoodEntries();

  return (
    <>
      <Container>
        <CalorieText>{isLoading ? '----' : calorieCount}</CalorieText>
        <CaloriesLabel>calories</CaloriesLabel>
      </Container>
    </>
  );
};

const Container = styled.View`
  display: flex;
  flex-direction: column;
`;

const CalorieText = styled.Text`
  color: white;
  font-size: 128px;
  font-weight: 500;
  margin-bottom: 0;
  padding-bottom: 0;
  line-height: 128px;
  text-align: center;
`;

const CaloriesLabel = styled.Text`
  color: white;
  font-size: 36px;
  margin-top: -24px;
  text-align: center;
`;

export default CalorieDisplay;
