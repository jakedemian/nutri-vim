import React, { useState } from 'react';
import {
  View,
  IconButton,
  Icon,
  VStack,
  HStack,
  Text,
  ScrollView,
  Pressable,
  Button,
} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

import { useFoodEntries } from 'src/hooks/useFoodEntries';
import { Entry } from 'src/common/types/types';
import { getFormattedDisplayTime } from 'src/util/getFormattedDisplayTime';
import NutrivimModal from 'src/common/NutrivimModal';
import EditEntryModal from 'src/common/EditEntryModal';
import FullScreenLoader from 'src/common/FullScreenLoader';
import Footer from 'src/screens/List/Footer';
import EmptyList from 'src/screens/List/EmptyList';

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
      <HStack
        h="100%"
        justifyContent="center"
        alignItems="center"
        backgroundColor="primary.900"
      >
        <FullScreenLoader />
      </HStack>
    );
  }

  if (foodEntries.length === 0) {
    return <EmptyList />;
  }

  return (
    <View backgroundColor="primary.900" height="100%">
      <Pressable onPress={() => setSelectedItem(-1)} height="100%">
        <ScrollView pt={2}>
          {foodEntries.map((entry: Entry, index: number) => (
            <View
              key={index}
              backgroundColor={
                selectedItem === index ? 'primary.600' : 'transparent'
              }
              mx={4}
              my={1}
              py={2}
              px={4}
              borderRadius={4}
            >
              <Pressable
                onPress={() =>
                  selectedItem === index
                    ? setSelectedItem(-1)
                    : setSelectedItem(index)
                }
              >
                <HStack>
                  <VStack flex={1}>
                    <Text fontSize={24} fontWeight={700} color="white">
                      {entry.name}
                    </Text>
                    <Text fontSize={18} fontStyle="italic" color="white">
                      {entry.calories} calories
                    </Text>
                  </VStack>
                  <HStack alignItems="center">
                    {selectedItem === index ? (
                      <HStack>
                        <IconButton
                          variant="ghost"
                          icon={
                            <Icon
                              as={FontAwesome5}
                              name="pen"
                              color="#fff"
                              size={6}
                            />
                          }
                          onPress={() => setEditingEntryId(entry.id)}
                          p={4}
                        />
                        <IconButton
                          variant="ghost"
                          icon={
                            <Icon
                              as={FontAwesome5}
                              name="trash"
                              color="#fff"
                              size={6}
                            />
                          }
                          onPress={() => setDeletingEntryId(entry.id)}
                          p={4}
                        />
                      </HStack>
                    ) : (
                      <Text color="white" fontSize={24}>
                        {getFormattedDisplayTime(entry.time)}
                      </Text>
                    )}
                  </HStack>
                </HStack>
              </Pressable>
            </View>
          ))}
          <Footer />

          {/* MODALS */}
          <EditEntryModal
            hide={hideEditModal}
            editingEntryId={editingEntryId}
          />
          <NutrivimModal
            visible={!!deletingEntryId}
            hide={hideDeletingEntryModal}
            title="Delete entry?"
            buttonRow={
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => hideDeletingEntryModal()}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    deleteFoodEntry(deletingEntryId as string);
                    hideDeletingEntryModal();
                  }}
                  backgroundColor="rose.900"
                >
                  Delete
                </Button>
              </Button.Group>
            }
          >
            <Text>Are you sure you want to delete this entry?</Text>
          </NutrivimModal>
        </ScrollView>
      </Pressable>
    </View>
  );
};

export default List;
