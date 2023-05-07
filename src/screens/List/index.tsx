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
} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

import { useFoodEntries } from 'src/hooks/useFoodEntries';
import { Entry } from 'src/common/types';
import { formatDisplayTime } from 'src/util/formatDisplayTime';
import NutrivimModal from 'src/common/NutrivimModal';
import EditEntryModal from 'src/common/EditEntryModal';
import FullScreenLoader from 'src/common/FullScreenLoader';
import NutriButton from 'src/common/NutriButton';
import Footer from 'src/screens/List/Footer';

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
      <View>
        <FullScreenLoader />
      </View>
    );
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
                onPressOut={() => console.log('out')}
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
                        {formatDisplayTime(entry.time)}
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
          >
            <Text>Are you sure you want to delete this entry?</Text>
            <View>
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
            </View>
          </NutrivimModal>
        </ScrollView>
      </Pressable>
    </View>
  );
};

export default List;
