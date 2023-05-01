import { useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';

import { Entry } from 'src/common/types';
import { entryRepo } from 'src/common/repositories';

export const getFoodEntriesQueryKey = () => ['GET_FOOD_ENTRIES_QUERY_KEY'];

export const useFoodEntries = () => {
  const queryClient = useQueryClient();

  const query = useQuery(getFoodEntriesQueryKey(), () => entryRepo.getAll(), {
    retry: false,
    refetchOnWindowFocus: true,
  });

  const calorieCount = useMemo(() => {
    if (!query.data) {
      return 0;
    }

    return query.data.reduce(
      (count: number, entry: Entry) => count + entry.calories,
      0
    );
  }, [query.data]);

  const updateFoodEntry = async (entry: Entry) => {
    await entryRepo.update(entry);
    queryClient.invalidateQueries(getFoodEntriesQueryKey());

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Changes saved successfully',
    });
  };

  const addFoodEntry = async (entry: Entry) => {
    await entryRepo.add(entry);
    queryClient.invalidateQueries(getFoodEntriesQueryKey());

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Got it!',
    });
  };

  const deleteFoodEntry = async (entryId: string) => {
    await entryRepo.delete(entryId);
    queryClient.invalidateQueries(getFoodEntriesQueryKey());

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Entry was deleted',
    });
  };

  const clearFoodEntries = async () => {
    console.log('here');
    await entryRepo.updateAll([]);
    queryClient.invalidateQueries(getFoodEntriesQueryKey());

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'All entries deleted',
    });
  };

  return {
    foodEntries: query.data || [],
    isLoading: query.isLoading,
    addFoodEntry: addFoodEntry,
    updateFoodEntry: updateFoodEntry,
    deleteFoodEntry: deleteFoodEntry,
    clearFoodEntries: clearFoodEntries,
    calorieCount: calorieCount,
  };
};
