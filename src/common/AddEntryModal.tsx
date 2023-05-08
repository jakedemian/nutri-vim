import React, { useEffect, useReducer } from 'react';
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
import { useInputFocus } from 'src/hooks/useInputFocus';
import { showSuccessToast } from 'src/common/toast';

type AddEntryModalProps = {
  visible: boolean;
  hide: () => void;
};

export type AddEntryFormData = {
  name: string;
  calories: string;
  time: string;
};

export type AddEntryAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_CALORIES'; payload: string }
  | { type: 'SET_TIME'; payload: string }
  | { type: 'RESET_FORM' };

const actionTypes = {
  SET_NAME: 'SET_NAME',
  SET_CALORIES: 'SET_CALORIES',
  SET_TIME: 'SET_TIME',
  RESET_FORM: 'RESET_FORM',
} as const;

const formReducer = (
  state: AddEntryFormData,
  action: AddEntryAction
): AddEntryFormData => {
  switch (action.type) {
    case actionTypes.SET_NAME:
      return { ...state, name: action.payload };
    case actionTypes.SET_CALORIES:
      return { ...state, calories: action.payload };
    case actionTypes.SET_TIME:
      return { ...state, time: action.payload };
    case actionTypes.RESET_FORM:
      return getDefaultFormState();
    default:
      return state;
  }
};

const getDefaultFormState = (): AddEntryFormData => {
  return {
    name: '',
    calories: '',
    time: getCurrentLocalTimeString(),
  };
};

const AddEntryModal: React.FC<AddEntryModalProps> = ({ visible, hide }) => {
  const [formState, dispatch] = useReducer(formReducer, getDefaultFormState());
  const { addFoodEntry } = useFoodEntries();
  const { setInputRef, focusNextInput } = useInputFocus();

  const onNameChange = (name: string) => {
    dispatch({ type: actionTypes.SET_NAME, payload: name });
  };

  const onCaloriesChange = (calories: string) => {
    dispatch({ type: actionTypes.SET_CALORIES, payload: calories });
  };

  useEffect(() => {
    if (visible) {
      dispatch({ type: actionTypes.RESET_FORM });
    }
  }, [visible]);

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
    dispatch({ type: actionTypes.RESET_FORM });
    hide();
  };

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
            }}
          >
            Add
          </Button>
        </Button.Group>
      }
    >
      <SafeAreaView>
        <NutrivimInput
          refCallback={ref => setInputRef('name', ref)}
          onChangeText={onNameChange}
          value={formState.name}
          placeholder="What did you eat?"
          onSubmitEditing={() => focusNextInput('calories')}
          returnKeyType="next"
        />
        <NutrivimInput
          refCallback={ref => setInputRef('calories', ref)}
          onChangeText={onCaloriesChange}
          value={formState.calories}
          placeholder="How many calories?"
          returnKeyType="done"
          keyboardType="numeric"
          mt={2}
          onSubmitEditing={() => handleSubmit()}
        />
        <View mt={4}>
          {Platform.OS === 'ios' && (
            <DateTimePicker
              value={new Date(formState.time)}
              mode={'time'}
              is24Hour={false}
              onChange={(event, value) =>
                dispatch({
                  type: actionTypes.SET_TIME,
                  payload: getLocalTimeStringFromDate(value as Date),
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
                        dispatch({
                          type: actionTypes.SET_TIME,
                          payload: getLocalTimeStringFromDate(value as Date),
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
