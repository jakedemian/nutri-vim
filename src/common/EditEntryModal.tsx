import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { Button, Input, Text } from 'native-base';

import NutrivimModal from 'src/common/NutrivimModal';
import { Entry } from 'src/common/types';
import { useFoodEntries } from 'src/hooks/useFoodEntries';
import { formatDisplayTime } from 'src/util/formatDisplayTime';
import {
  getCurrentLocalTimeString,
  getLocalTimeStringFromDate,
} from 'src/util/getCurrentLocalTimeISOString';
import NutriButton from 'src/common/NutriButton';

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

    setFormState(getDefaultFormState());
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
    <NutrivimModal visible={!!editingEntryId} hide={hide} title={'Edit Entry'}>
      <SafeAreaView style={{ width: '100%' }}>
        <Input
          onChangeText={name =>
            setFormState({
              ...formState,
              name,
            })
          }
          value={formState.name}
          placeholder="What did you eat?"
        />
        <Input
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
        <View>
          {Platform.OS === 'ios' && (
            <DateTimePicker
              value={new Date(formState.time as string)}
              mode={'time'}
              is24Hour={false}
              onChange={(event, value) =>
                setFormState({
                  ...formState,
                  time: getLocalTimeStringFromDate(value as Date),
                })
              }
            />
          )}
          {Platform.OS === 'android' && (
            <View>
              <Text>{formatDisplayTime(formState.time as string)}</Text>
              <TouchableOpacity
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
              >
                <Button>Change</Button>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
      <View>
        <NutriButton
          text="Save"
          onPress={handleEditSubmit}
          fullWidth
          disabled={
            !formState.name ||
            !formState.calories ||
            isNaN(Number(formState.calories))
          }
        />
      </View>
    </NutrivimModal>
  );
};

export default EditEntryModal;
