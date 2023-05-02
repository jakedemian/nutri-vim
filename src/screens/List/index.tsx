import React, { useState } from 'react';
import { Button, Text, Pressable, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';

import { useFoodEntries } from 'src/hooks/useFoodEntries';
import { Entry } from 'src/common/types';
import { formatDisplayTime } from 'src/util/formatDisplayTime';
import NutrivimModal from 'src/common/NutrivimModal';
import EditEntryModal from 'src/common/EditEntryModal';
import RotatingIcon from 'src/common/RotatingIcon';
import FullScreenLoader from 'src/common/FullScreenLoader';

const List: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const { foodEntries, deleteFoodEntry, isLoading } = useFoodEntries();

  const hideEditModal = () => {
    setEditingEntryId(null);
  };
  const hideDeletingEntryModal = () => {
    setDeletingEntryId(null);
  };

  if (isLoading) {
    return (
      <FullScreenLoaderContainer>
        <FullScreenLoader />
      </FullScreenLoaderContainer>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: '#111', height: '100%' }}>
      {foodEntries.map((entry: Entry, index: number) => (
        <SelectedItem key={index} isSelected={selectedItem === index}>
          <Card>
            <PressableArea
              onPress={() =>
                selectedItem === index
                  ? setSelectedItem(-1)
                  : setSelectedItem(index)
              }
              activeOpacity={1}
            >
              <FoodName>{entry.name}</FoodName>
              <Calories>{entry.calories} calories</Calories>
            </PressableArea>
            <View>
              {selectedItem === index ? (
                <HorizontalButtonPair>
                  <Pressable
                    onPress={() => setEditingEntryId(entry.id)}
                    style={{ padding: 12, backgroundColor: 'white' }}
                  >
                    <ButtonText>edit</ButtonText>
                  </Pressable>
                  <Pressable
                    onPress={() => setDeletingEntryId(entry.id)}
                    style={{ padding: 12, backgroundColor: 'white' }}
                  >
                    <ButtonText>delete</ButtonText>
                  </Pressable>
                </HorizontalButtonPair>
              ) : (
                <Time>{formatDisplayTime(entry.time)}</Time>
              )}
            </View>
          </Card>
        </SelectedItem>
      ))}
      <Footer>
        <RotatingIcon />
        <Text style={{ color: 'white' }}>That&apos;s all, folks!</Text>
      </Footer>

      {/* MODALS */}
      <EditEntryModal hide={hideEditModal} editingEntryId={editingEntryId} />
      <NutrivimModal
        visible={!!deletingEntryId}
        hide={hideDeletingEntryModal}
        title="Delete entry?"
      >
        <Text>Are you sure you want to delete this entry?</Text>
        <HorizontalButtonPair>
          <Button
            title="Delete"
            onPress={() => {
              deleteFoodEntry(deletingEntryId as string);
              hideDeletingEntryModal();
            }}
          />
          <Button title="Go Back" onPress={() => hideDeletingEntryModal()} />
        </HorizontalButtonPair>
      </NutrivimModal>
    </ScrollView>
  );
};

const FullScreenLoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SelectedItem = styled.View<{ isSelected: boolean }>`
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : 'transparent'};
`;

const Card = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  padding: 16px;
`;

const PressableArea = styled.TouchableOpacity`
  flex-direction: column;
`;

const FoodName = styled.Text`
  color: white;
  font-size: 36px;
`;

const Calories = styled.Text`
  font-size: 24px;
  font-style: italic;
  color: #ddd;
`;

const Time = styled.Text`
  font-size: 36px;
  color: white;
`;

const HorizontalButtonPair = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.colors.primary};
`;

const Footer = styled.View`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 36px;
`;

export default List;
