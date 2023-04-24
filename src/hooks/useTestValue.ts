import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

export const getTestValueQueryKey = () => ["TEST_VALUE_QUERY"];
export const getTestValueStorageKey = () => "TEST_VALUE";

export const useTestValue = () => {
  const queryClient = useQueryClient();
  const [testValue, setTestValue] = useState<string | null>();

  const fetchTestValue = async () => {
    try {
      const value = await AsyncStorage.getItem(getTestValueStorageKey());
      setTestValue(value);
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
      throw error;
    }
  };

  const updateTestValue = async (newValue: any) => {
    await AsyncStorage.setItem(
      getTestValueStorageKey(),
      newValue.toString()
    ).then(() => {
      queryClient.invalidateQueries(getTestValueQueryKey());
    });
  };

  const query = useQuery(getTestValueQueryKey(), () => fetchTestValue(), {
    retry: false,
    refetchOnWindowFocus: true,
  });

  return {
    testValue: testValue,
    isLoading: query.isLoading,
    updateTestValue: updateTestValue,
  };
};
