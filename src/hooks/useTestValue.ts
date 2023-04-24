import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

export const getTestValueQueryKey = () => ["TEST_VALUE_QUERY"];
export const getTestValueStorageKey = () => "TEST_VALUE";

export const useTestValue = () => {
  const fetchTestValue = async () => {
    try {
      const value = await AsyncStorage.getItem(getTestValueStorageKey());
      return value;
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
      throw error;
    }
  };

  return useQuery(getTestValueQueryKey(), () => fetchTestValue(), {
    retry: false,
    refetchOnWindowFocus: true,
  });
};
