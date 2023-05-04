import React, { useState } from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useFoodEntries } from 'src/hooks/useFoodEntries';
import { Entry } from 'src/common/types';
import { formatDisplayTime } from 'src/util/formatDisplayTime';
import NutrivimModal from 'src/common/NutrivimModal';
import EditEntryModal from 'src/common/EditEntryModal';
import RotatingIcon from 'src/common/RotatingIcon';
import FullScreenLoader from 'src/common/FullScreenLoader';
import NutriButton from 'src/common/NutriButton';

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
    <TouchableOpacity activeOpacity={1} onPress={() => setSelectedItem(-1)}>
      <ScrollView style={{ backgroundColor: '#111', height: '100%' }}>
        {foodEntries.map((entry: Entry, index: number) => (
          <SelectedItem key={index} isSelected={selectedItem === index}>
            <Card
              onPress={() =>
                selectedItem === index
                  ? setSelectedItem(-1)
                  : setSelectedItem(index)
              }
              onPressOut={() => console.log('out')}
              activeOpacity={1}
            >
              <CardLeftContent>
                <FoodName>{entry.name}</FoodName>
                <Calories>{entry.calories} calories</Calories>
              </CardLeftContent>
              <CardRightContent>
                {selectedItem === index ? (
                  <TouchableWithoutFeedback>
                    <View>
                      <HorizontalButtonPair>
                        <ListIconButton
                          onPress={() => setEditingEntryId(entry.id)}
                        >
                          <Ionicons name="pencil" size={30} color="#fff" />
                        </ListIconButton>
                        <ListIconButton
                          onPress={() => setDeletingEntryId(entry.id)}
                        >
                          <Ionicons name="trash" size={30} color="#fff" />
                        </ListIconButton>
                      </HorizontalButtonPair>
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <Time>{formatDisplayTime(entry.time)}</Time>
                )}
              </CardRightContent>
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
            <NutriButton
              text="Delete"
              onPress={() => {
                deleteFoodEntry(deletingEntryId as string);
                hideDeletingEntryModal();
              }}
            />

            <NutriButton
              text="Go Back"
              onPress={() => hideDeletingEntryModal()}
            />
          </HorizontalButtonPair>
        </NutrivimModal>
      </ScrollView>
    </TouchableOpacity>
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
  margin: 8px;
  border-radius: 4px;
`;

const Card = styled.TouchableOpacity`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  color: white;
`;

const CardLeftContent = styled.View`
  flex: 0.67;
  flex-direction: column;
  padding: 16px;
`;

const FoodName = styled.Text`
  color: white;
  font-size: 24px;
`;

const Calories = styled.Text`
  font-size: 18px;
  font-style: italic;
  color: #ddd;
`;

const Time = styled.Text`
  font-size: 24px;
  color: white;
`;

const CardRightContent = styled.View`
  flex: 0.33;
  justify-content: center;
  align-items: center;
`;

const HorizontalButtonPair = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const ListIconButton = styled.TouchableOpacity`
  padding: 12px;
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
