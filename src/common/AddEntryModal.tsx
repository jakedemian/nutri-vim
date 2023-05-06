import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View, Platform } from 'react-native';
import uuid from 'react-native-uuid';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { Button, Input, Text } from 'native-base';

import NutrivimModal from 'src/common/NutrivimModal';
import { useFoodEntries } from 'src/hooks/useFoodEntries';
import { formatDisplayTime } from 'src/util/formatDisplayTime';
import {
  getCurrentLocalTimeString,
  getLocalTimeStringFromDate,
} from 'src/util/getCurrentLocalTimeISOString';
import NutriButton from 'src/common/NutriButton';

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
        <Input
          onChangeText={name =>
            setFormState({
              ...formState,
              name,
            })
          }
          // TODO working on styling these inputs.. they should be moved out into a shared component btw
          value={formState.name}
          placeholder="What did you eat?"
          backgroundColor={'primary.300'}
          color="white"
          fontWeight={700}
          placeholderTextColor="primary.400"
          cursorColor={'white'}
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
          backgroundColor={'primary.300'}
          color="white"
          fontWeight={700}
          placeholderTextColor="primary.400"
          cursorColor={'white'}
        />
        <View>
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
            <View>
              <Text>{formatDisplayTime(formState.time)}</Text>
              <TouchableOpacity
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
                <Button>Change</Button>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </NutrivimModal>
  );
};

export default AddEntryModal;
