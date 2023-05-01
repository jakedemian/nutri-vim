import React from 'react';
import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { View } from 'react-native';

import { useFoodEntries } from 'src/hooks/useFoodEntries';
import { Entry } from 'src/common/types';
import { formatDisplayTime } from 'src/util/formatDisplayTime';
import NutrivimModal from 'src/common/NutrivimModal';
import EditEntryModal from 'src/common/EditEntryModal';
import RotatingIcon from 'src/common/RotatingIcon';
import { PRIMARY } from 'src/theme/theme';

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
    return <View>Loading</View>;
  }

  return (
    <ScrollView style={styles.pageContent}>
      {foodEntries.map((entry: Entry, index: number) => (
        <View
          key={index}
          style={{
            backgroundColor: selectedItem === index ? '#5260ff' : 'transparent',
          }}
        >
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                selectedItem === index
                  ? setSelectedItem(-1)
                  : setSelectedItem(index)
              }
              activeOpacity={1}
            >
              <Text style={styles.foodName}>{entry.name}</Text>
              <Text style={styles.calories}>{entry.calories} calories</Text>
            </TouchableOpacity>
            <View>
              {selectedItem === index ? (
                <View style={styles.horizontalButtonPair}>
                  <Pressable
                    onPress={() => setEditingEntryId(entry.id)}
                    style={styles.listItemButton}
                  >
                    <Text style={styles.listItemButtonText}>edit</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setDeletingEntryId(entry.id)}
                    style={styles.listItemButton}
                  >
                    <Text style={styles.listItemButtonText}>delete</Text>
                  </Pressable>
                </View>
              ) : (
                <Text style={styles.time}>{formatDisplayTime(entry.time)}</Text>
              )}
            </View>
          </View>
        </View>
      ))}
      <View style={styles.footer}>
        <RotatingIcon />
        <Text style={{ color: 'white' }}>That&apos;s all, folks!</Text>
      </View>

      {/* MODALS */}
      <EditEntryModal hide={hideEditModal} editingEntryId={editingEntryId} />
      <NutrivimModal
        visible={!!deletingEntryId}
        hide={hideDeletingEntryModal}
        title="Delete entry?"
      >
        <Text>Are you sure you want to delete this entry?</Text>
        <View style={styles.horizontalButtonPair}>
          <Button
            title="Delete"
            onPress={() => {
              deleteFoodEntry(deletingEntryId as string);
              hideDeletingEntryModal();
            }}
          />
          <Button title="Go Back" onPress={() => hideDeletingEntryModal()} />
        </View>
      </NutrivimModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContent: {
    backgroundColor: '#111',
    height: '100%',
  },
  footer: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 36,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
    padding: 16,
  },
  horizontalButtonPair: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
  },
  foodName: {
    color: 'white',
    fontSize: 36,
  },
  calories: {
    fontSize: 24,
    fontStyle: 'italic',
    color: '#ddd',
  },
  time: {
    fontSize: 36,
    color: 'white',
  },
  listItemButton: {
    padding: 12,
    backgroundColor: 'white',
  },
  listItemButtonText: {
    color: PRIMARY,
  },
});

export default List;
