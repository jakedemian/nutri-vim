import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { QueryClient, useQueryClient } from 'react-query';

import { entryRepo } from 'src/common/repositories';
import { getFoodEntriesQueryKey } from 'src/hooks/useFoodEntries';

const LAST_CLEAR_DATETIME_KEY = 'LAST_CLEAR_DATETIME';

async function getLastClearDatetime() {
  const lastClearDatetime = await AsyncStorage.getItem(LAST_CLEAR_DATETIME_KEY);
  return lastClearDatetime ? new Date(lastClearDatetime) : null;
}

async function setLastClearDatetime(datetime: Date) {
  await AsyncStorage.setItem(LAST_CLEAR_DATETIME_KEY, datetime.toISOString());
}

const checkAndClearFoodEntries = async (queryClient: QueryClient) => {
  const lastClearDatetime = await getLastClearDatetime();
  const now = new Date();

  if (!lastClearDatetime || lastClearDatetime.getDate() !== now.getDate()) {
    await entryRepo.updateAll([]);
    await queryClient.invalidateQueries(getFoodEntriesQueryKey());
    await setLastClearDatetime(now);
  }
};

const useMidnightClearEntries = () => {
  const queryClient = useQueryClient();

  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('app foregrounded');
        checkAndClearFoodEntries(queryClient);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const setNextMinuteTimeout = () => {
      const now = new Date();
      const timeToNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
      return setTimeout(() => {
        checkAndClearFoodEntries(queryClient);
        setNextMinuteTimeout();
      }, timeToNextMinute);
    };

    const timeoutId = setNextMinuteTimeout();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
};

export default useMidnightClearEntries;
