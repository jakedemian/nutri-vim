import React, { useEffect, useReducer, useState } from 'react';
import { SafeAreaView, Platform } from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { Button, HStack, View, Text } from 'native-base';

import NutrivimModal from 'src/common/NutrivimModal';
import { Entry } from 'src/common/types';
import { useFoodEntries } from 'src/hooks/useFoodEntries';
import { formatDisplayTime } from 'src/util/formatDisplayTime';
import {
  getCurrentLocalTimeString,
  getLocalTimeStringFromDate,
} from 'src/util/getCurrentLocalTimeISOString';
import NutrivimInput from 'src/common/NutrivimInput';
import { useInputFocus } from 'src/hooks/useInputFocus';

type EditEntryFormData = {
  name: string;
  calories: string;
  time: string;
};

type EditEntryModalProps = {
  editingEntryId: string | null;
  hide: () => void;
};

export type EditEntryAction =
  | { type: 'EDIT_SET_NAME'; payload: string }
  | { type: 'EDIT_SET_CALORIES'; payload: string }
  | { type: 'EDIT_SET_TIME'; payload: string }
  | { type: 'EDIT_RESET_FORM' }
  | {
      type: 'EDIT_INIT_FORM';
      payload: {
        name: string;
        calories: string;
        time: string;
      };
    };

const actionTypes = {
  EDIT_SET_NAME: 'EDIT_SET_NAME',
  EDIT_SET_CALORIES: 'EDIT_SET_CALORIES',
  EDIT_SET_TIME: 'EDIT_SET_TIME',
  EDIT_RESET_FORM: 'EDIT_RESET_FORM',
  EDIT_INIT_FORM: 'EDIT_INIT_FORM',
} as const;

const formReducer = (
  state: EditEntryFormData,
  action: EditEntryAction
): EditEntryFormData => {
  switch (action.type) {
    case actionTypes.EDIT_SET_NAME:
      return { ...state, name: action.payload };
    case actionTypes.EDIT_SET_CALORIES:
      return { ...state, calories: action.payload };
    case actionTypes.EDIT_SET_TIME:
      return { ...state, time: action.payload };
    case actionTypes.EDIT_RESET_FORM:
      return getDefaultFormState();
    case actionTypes.EDIT_INIT_FORM:
      return {
        ...state,
        name: action.payload.name,
        calories: action.payload.calories,
        time: action.payload.time,
      };
    default:
      return state;
  }
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
  const [formState, dispatch] = useReducer(formReducer, getDefaultFormState());
  const { setInputRef, focusNextInput } = useInputFocus();
  const [editingEntry, setEditingEntry] = useState<Entry | undefined>();
  const { foodEntries, updateFoodEntry } = useFoodEntries();

  const onNameChange = (name: string) => {
    dispatch({ type: actionTypes.EDIT_SET_NAME, payload: name });
  };

  const onCaloriesChange = (calories: string) => {
    dispatch({ type: actionTypes.EDIT_SET_CALORIES, payload: calories });
  };

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

    dispatch({ type: actionTypes.EDIT_RESET_FORM });
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
      dispatch({
        type: actionTypes.EDIT_INIT_FORM,
        payload: {
          name: thisEntry.name,
          calories: thisEntry.calories.toString(),
          time: thisEntry.time,
        },
      });
    }
  }, [foodEntries, editingEntryId]);

  return (
    <NutrivimModal
      visible={!!editingEntryId}
      hide={hide}
      title={'Edit Entry'}
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
              handleEditSubmit();
            }}
          >
            Save
          </Button>
        </Button.Group>
      }
    >
      <SafeAreaView style={{ width: '100%' }}>
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
          onSubmitEditing={() => handleEditSubmit()}
        />
        <View mt={4}>
          {Platform.OS === 'ios' && (
            <DateTimePicker
              value={new Date(formState.time as string)}
              mode={'time'}
              is24Hour={false}
              onChange={(event, value) =>
                dispatch({
                  type: actionTypes.EDIT_SET_TIME,
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
                    value: new Date(formState.time as string),
                    onChange: (e, value) => {
                      if (value) {
                        dispatch({
                          type: actionTypes.EDIT_SET_TIME,
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
                <Text fontSize={24}>
                  {formatDisplayTime(formState.time as string)}
                </Text>
              </Button>
            </HStack>
          )}
        </View>
      </SafeAreaView>
    </NutrivimModal>
  );
};

export default EditEntryModal;
