import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import NutrivimModal from 'src/common/NutrivimModal';
import { Entry } from 'src/common/types';
import { useFoodEntries } from 'src/hooks/useFoodEntries';
import { formatDisplayTime } from 'src/util/formatDisplayTime';
import {
  getCurrentLocalTimeString,
  getLocalTimeStringFromDate,
} from 'src/util/getCurrentLocalTimeISOString';

type EditEntryFormData = {
  name?: string;
  calories?: string;
  time?: string;
};

type EditEntryModalProps = {
  editingEntryId: string | null;
  hide: () => void;
};

const getDefaultFormState = () => {
  return {
    name: '',
    calories: '',
    time: getCurrentLocalTimeString(),
  };
};

const EditEntryModal: React.FC<EditEntryModalProps> = ({
  editingEntryId,
  hide,
}) => {
  const [formState, setFormState] = useState<EditEntryFormData>(
    getDefaultFormState()
  );
  const [editingEntry, setEditingEntry] = useState<Entry | undefined>();
  const { foodEntries, updateFoodEntry } = useFoodEntries();

  const handleEditSubmit = () => {
    if (
      !editingEntry ||
      !formState.name ||
      !formState.calories ||
      !formState.time
    ) {
      return;
    }

    // TODO need better validation around formState.calories being a number
    const updatedEntry: Entry = {
      id: editingEntry.id,
      name: formState.name,
      calories: Number(formState.calories),
      time: formState.time,
      createdAt: editingEntry.createdAt,
    };

    updateFoodEntry(updatedEntry);

    setFormState({});
    hide();
  };

  useEffect(() => {
    if (editingEntryId && foodEntries && foodEntries.length > 0) {
      const thisEntry: Entry | undefined = foodEntries.find(
        (entry: Entry) => entry.id === editingEntryId
      );

      if (!thisEntry) {
        console.error("Entry id didn't match any entries.");
        return;
      }

      setEditingEntry(thisEntry);
      setFormState({
        name: thisEntry.name,
        calories: thisEntry.calories.toString(),
        time: thisEntry.time,
      });
    }
  }, [foodEntries, editingEntryId]);

  return (
    <NutrivimModal
      visible={!!editingEntryId}
      hide={hide}
      title={'Add Entry'}
      // onShow={onShow}
    >
      <SafeAreaView>
        <TextInput
          style={styles.editEntryModalInput}
          onChangeText={name =>
            setFormState({
              ...formState,
              name,
            })
          }
          value={formState.name}
          placeholder="What did you eat?"
        />
        <TextInput
          style={styles.editEntryModalInput}
          onChangeText={calories =>
            setFormState({
              ...formState,
              calories,
            })
          }
          value={formState.calories}
          placeholder="How many calories?"
          keyboardType="numeric"
        />
        <View style={{ display: 'flex' }}>
          <Text>{formatDisplayTime(formState.time as string)}</Text>
          <Button
            title="Change"
            onPress={() =>
              DateTimePickerAndroid.open({
                value: new Date(formState.time as string),
                onChange: (e, value) => {
                  if (value) {
                    setFormState({
                      ...formState,
                      time: getLocalTimeStringFromDate(value),
                    });
                  } else {
                    console.error(
                      'DateTimePickerAndroid onChange value was falsy'
                    );
                  }
                },
                mode: 'time',
                is24Hour: false,
              })
            }
          />
        </View>
      </SafeAreaView>
      <Button
        title="Save"
        onPress={handleEditSubmit}
        disabled={
          !formState.name ||
          !formState.calories ||
          isNaN(Number(formState.calories))
        }
      />
    </NutrivimModal>
  );
};

const styles = StyleSheet.create({
  editEntryModalInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default EditEntryModal;
