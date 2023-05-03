import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Button,
} from 'react-native';
import uuid from 'react-native-uuid';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';

import NutrivimModal from 'src/common/NutrivimModal';
import { useFoodEntries } from 'src/hooks/useFoodEntries';
import { formatDisplayTime } from 'src/util/formatDisplayTime';
import {
  getCurrentLocalTimeString,
  getLocalTimeStringFromDate,
} from 'src/util/getCurrentLocalTimeISOString';

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

  const onShow = () => {
    setFormState(getDefaultFormState());
  };

  return (
    <NutrivimModal
      visible={visible}
      hide={hide}
      title={'Add Entry'}
      onShow={onShow}
    >
      <SafeAreaView>
        <ModalInput
          onChangeText={name =>
            setFormState({
              ...formState,
              name,
            })
          }
          value={formState.name}
          placeholder="What did you eat?"
        />
        <ModalInput
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
            <TimePickerAndroid>
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
                <Text style={{ color: '#2196f3' }}>Change</Text>
              </TouchableOpacity>
            </TimePickerAndroid>
          )}
        </View>
      </SafeAreaView>
      <AddButtonContainer>
        <Button
          title="Add"
          onPress={handleSubmit}
          disabled={
            !formState.name ||
            !formState.calories ||
            isNaN(Number(formState.calories))
          }
        />
      </AddButtonContainer>
    </NutrivimModal>
  );
};

const ModalInput = styled.TextInput`
  height: 40px;
  margin: 12px;
  border-width: 1px;
  padding: 10px;
`;

const TimePickerAndroid = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AddButtonContainer = styled.View`
  margin-top: 16px;
  align-self: stretch;
  width: 100%;
`;

export default AddEntryModal;
