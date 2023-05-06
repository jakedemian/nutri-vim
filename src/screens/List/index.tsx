import React, { useState } from 'react';
import {
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { View } from 'native-base';

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
      <TouchableOpacity activeOpacity={1} onPress={() => setSelectedItem(-1)}>
        <ScrollView>
          {foodEntries.map((entry: Entry, index: number) => (
            <View key={index} /*isSelected={selectedItem === index}*/>
              <TouchableOpacity
                onPress={() =>
                  selectedItem === index
                    ? setSelectedItem(-1)
                    : setSelectedItem(index)
                }
                onPressOut={() => console.log('out')}
                activeOpacity={1}
              >
                <View>
                  <Text>{entry.name}</Text>
                  <Text>{entry.calories} calories</Text>
                </View>
                <View>
                  {selectedItem === index ? (
                    <TouchableWithoutFeedback>
                      <View>
                        <View>
                          <TouchableOpacity
                            onPress={() => setEditingEntryId(entry.id)}
                          >
                            {/* <Ionicons name="pencil" size={30} color="#fff" /> */}
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => setDeletingEntryId(entry.id)}
                          >
                            {/* <Ionicons name="trash" size={30} color="#fff" /> */}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  ) : (
                    <Text>{formatDisplayTime(entry.time)}</Text>
                  )}
                </View>
              </TouchableOpacity>
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
      </TouchableOpacity>
    </View>
  );
};

export default List;
