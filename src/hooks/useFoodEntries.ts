import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Entry } from "../common/types";

export const getFoodEntriesQueryKey = () => ["GET_FOOD_ENTRIES_QUERY_KEY"];
export const getFoodEntriesStorageKey = () => "FOOD_ENTRIES";

export const useFoodEntries = () => {
  const queryClient = useQueryClient();

  const _fetchFoodEntries = async () => {
    try {
      const stringJson = await AsyncStorage.getItem(getFoodEntriesStorageKey());
      return stringJson ? JSON.parse(stringJson) : [];

      // TODO sort the results by createdAt
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
      throw error;
    }
  };

  const _updateFoodEntries = async (entries: Entry[]) => {
    await AsyncStorage.setItem(
      getFoodEntriesStorageKey(),
      JSON.stringify(entries)
    );
    queryClient.setQueryData(getFoodEntriesQueryKey(), entries);
  };

  const query = useQuery(getFoodEntriesQueryKey(), _fetchFoodEntries, {
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

  const updateFoodEntry = async (newEntry: Entry) => {
    const currentEntries = query.data || [];
    const updatedEntries = currentEntries.map((entry: Entry) =>
      entry.id === newEntry.id ? newEntry : entry
    );

    await _updateFoodEntries(updatedEntries);
  };

  const addFoodEntry = async (entry: Entry) => {
    const currentEntries = query.data || [];
    const newEntriesArray = [...currentEntries, entry];

    await _updateFoodEntries(newEntriesArray);
  };

  const deleteFoodEntry = async (entryId: string) => {
    const currentEntries = query.data || [];
    const updatedEntries = currentEntries.filter(
      (entry: Entry) => entry.id !== entryId
    );

    await _updateFoodEntries(updatedEntries);
  };

  const clearFoodEntries = async () => {
    await _updateFoodEntries([]);
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
