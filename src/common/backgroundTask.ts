import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from 'expo-background-fetch';

import { entryRepo } from 'src/common/repositories';
import queryClient from 'src/common/queryClient';
import { getFoodEntriesQueryKey } from 'src/hooks/useFoodEntries';

enum BackgroundFetchResult {
  NoData = 1,
  NewData = 2,
  Failed = 3,
}

async function clearFoodEntriesTask() {
  // const now = new Date();
  // if (now.getHours() === 0 && now.getMinutes() === 0) {
  await entryRepo.updateAll([]);
  await queryClient.invalidateQueries(getFoodEntriesQueryKey());
  return BackgroundFetchResult.NewData;
  // }

  return BackgroundFetchResult.NoData;
}

export async function registerClearFoodEntriesTask() {
  await BackgroundFetch.registerTaskAsync('clearFoodEntries', {
    minimumInterval: 60, // Execute the task every 60 seconds
    stopOnTerminate: false,
    startOnBoot: true,
  });
}
