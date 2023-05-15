import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { QueryClient, useQueryClient } from 'react-query';

import { entryRepo } from 'src/common/repositories';
import { settingsRepo } from 'src/common/repositories';
import { showSuccessToast } from 'src/common/toast';
import { getFoodEntriesQueryKey } from 'src/hooks/useFoodEntries';
import { useLogging } from 'src/hooks/useLogging';

const LAST_CLEAR_DATETIME_KEY = 'LAST_CLEAR_DATETIME';

const useMidnightClearEntries = () => {
  const { appendLog } = useLogging();
  const queryClient = useQueryClient();

  const appState = useRef(AppState.currentState);

  async function getLastClearDatetime() {
    const lastClearDatetime = await AsyncStorage.getItem(
      LAST_CLEAR_DATETIME_KEY
    );
    appendLog('last clear datetime from AsyncStorage', lastClearDatetime);
    return lastClearDatetime ? new Date(lastClearDatetime) : null;
  }

  const checkAndClearFoodEntries = async (queryClient: QueryClient) => {
    appendLog('checkAndClearFoodEntries START');
    const autoResetDailySetting = await settingsRepo.get('autoResetDaily');
    appendLog('is auto reset enabled? -> ', autoResetDailySetting?.value);

    if (!autoResetDailySetting || !autoResetDailySetting.value) {
      return;
    }

    const lastClearDatetime = await getLastClearDatetime();
    const now = new Date();
    appendLog(
      `lastClearDate: ${lastClearDatetime?.getDate()} -- vs -- current date: ${now.getDate()}`
    );

    if (!lastClearDatetime || lastClearDatetime.getDate() !== now.getDate()) {
      appendLog('CLEARING ALL ENTRIES ', now);
      await entryRepo.updateAll([]);
      await queryClient.invalidateQueries(getFoodEntriesQueryKey());

      appendLog(
        `Updating AsyncStorage last cleared time with ${now.toISOString()}`
      );
      await AsyncStorage.setItem(LAST_CLEAR_DATETIME_KEY, now.toISOString());

      showSuccessToast("Day's entries have reset");
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        appendLog('App foregrounded...');
        checkAndClearFoodEntries(queryClient);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const setNextMinuteTimeout = () => {
      const now = new Date();
      const timeToNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      clearTimeout(timeoutId); // Clear the existing timeout

      timeoutId = setTimeout(() => {
        checkAndClearFoodEntries(queryClient);
        setNextMinuteTimeout();
      }, timeToNextMinute);
    };

    setNextMinuteTimeout();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
};

export default useMidnightClearEntries;
