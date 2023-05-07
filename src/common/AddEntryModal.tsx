import React, { useEffect, useState } from 'react';
import { SafeAreaView, Platform } from 'react-native';
import uuid from 'react-native-uuid';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { Button, HStack, Text, View } from 'native-base';

import NutrivimModal from 'src/common/NutrivimModal';
import { useFoodEntries } from 'src/hooks/useFoodEntries';
import { formatDisplayTime } from 'src/util/formatDisplayTime';
import {
  getCurrentLocalTimeString,
  getLocalTimeStringFromDate,
} from 'src/util/getCurrentLocalTimeISOString';
import NutrivimInput from 'src/common/NutrivimInput';

type AddEntryModalProps = {
  visible: boolean;
  hide: () => void;
};

type AddEntryFormData = {
  name?: string;
  calories?: string;
  time: string;
};

const getDefaultFormState = () => {
  return {
    name: '',
    calories: '',
    time: getCurrentLocalTimeString(),
  };
};

const AddEntryModal: React.FC<AddEntryModalProps> = ({ visible, hide }) => {
  const [formState, setFormState] = useState<AddEntryFormData>(
    getDefaultFormState()
  );
  const { addFoodEntry } = useFoodEntries();

  const handleSubmit = () => {
    if (!formState.name || !formState.calories || !formState.time) {
      return;
    }

    addFoodEntry({
      id: uuid.v4() as string, // TODO FIXME move the setting of the uuid into the repository
      name: formState.name,
      calories: Number(formState.calories),
      time: formState.time,
      createdAt: new Date().toString(),
    });
    hide();
  };

  useEffect(() => {
    if (!visible) {
      setFormState(getDefaultFormState());
    }
  }, [visible]);

  return (
    <NutrivimModal
      visible={visible}
      hide={hide}
      title={'Add Entry'}
      buttonRow={
        <Button.Group space={2}>
          <Button
            variant="ghost"
            colorScheme="blueGray"
            onPress={() => {
              hide();
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              handleSubmit();
              hide();
            }}
          >
            Add
          </Button>
        </Button.Group>
      }
    >
      <SafeAreaView>
        <NutrivimInput
          onChangeText={name =>
            setFormState({
              ...formState,
              name,
            })
          }
          value={formState.name}
          placeholder="What did you eat?"
        />
        <NutrivimInput
          onChangeText={calories =>
            setFormState({
              ...formState,
              calories,
            })
          }
          value={formState.calories}
          placeholder="How many calories?"
          keyboardType="numeric"
          mt={2}
        />
        <View mt={4}>
          {Platform.OS === 'ios' && (
            <DateTimePicker
              value={new Date(formState.time)}
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
            <HStack justifyContent="center">
              <Button
                py={1}
                onPress={() =>
                  DateTimePickerAndroid.open({
                    value: new Date(formState.time),
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
                <Text fontSize={24}>{formatDisplayTime(formState.time)}</Text>
              </Button>
            </HStack>
          )}
        </View>
      </SafeAreaView>
    </NutrivimModal>
  );
};

export default AddEntryModal;
