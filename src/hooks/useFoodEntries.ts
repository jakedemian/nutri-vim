import { useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";

import { Entry } from "src/common/types";
import { entryRepo } from "src/common/repositories";

export const getFoodEntriesQueryKey = () => ["GET_FOOD_ENTRIES_QUERY_KEY"];

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

    toast.success("Changes saved successfully!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const addFoodEntry = async (entry: Entry) => {
    await entryRepo.add(entry);
    queryClient.invalidateQueries(getFoodEntriesQueryKey());

    toast.success("Food logged successfully!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const deleteFoodEntry = async (entryId: string) => {
    await entryRepo.delete(entryId);
    queryClient.invalidateQueries(getFoodEntriesQueryKey());
  };

  const clearFoodEntries = async () => {
    await entryRepo.updateAll([]);
    queryClient.invalidateQueries(getFoodEntriesQueryKey());
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
