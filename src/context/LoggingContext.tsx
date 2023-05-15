/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFormattedDisplayTime } from 'src/util/getFormattedDisplayTime';

interface LoggingContextProps {
  logs: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appendLog: (...args: any[]) => Promise<void>;
}

export const LoggingContext = createContext<LoggingContextProps | undefined>(
  undefined
);

const LOG_HISTORY_MAX = 100;
const LOG_HISTORY_KEY = 'LOG_HISTORY';

export const LoggingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const loadLogs = async () => {
      const storedLogs = await AsyncStorage.getItem(LOG_HISTORY_KEY);
      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
      }
    };

    loadLogs();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appendLog = async (...args: any[]) => {
    console.log(...args);
    const log =
      `[${getFormattedDisplayTime()}] ` +
      args
        .map(arg => {
          if (typeof arg === 'object') {
            return JSON.stringify(arg);
          } else {
            return arg;
          }
        })
        .join(' ');

    setLogs(currentLogs => {
      const newLogs = [...currentLogs, log];
      if (newLogs.length > LOG_HISTORY_MAX) {
        newLogs.shift(); // remove the oldest log if we've exceeded the max length
      }
      AsyncStorage.setItem(LOG_HISTORY_KEY, JSON.stringify(newLogs)); // store the logs in AsyncStorage
      return newLogs;
    });
  };

  return (
    <LoggingContext.Provider value={{ logs, appendLog }}>
      {children}
    </LoggingContext.Provider>
  );
};
