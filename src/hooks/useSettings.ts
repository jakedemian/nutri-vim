import { useQuery, useQueryClient } from 'react-query';

import { settingsRepo } from 'src/common/repositories';
import { SettingsKey, SettingsValue } from 'src/common/types/settings.types';
import { useLogging } from 'src/hooks/useLogging';

export const getSettingsQueryKey = () => ['GET_SETTINGS_QUERY_KEY'];

const useSettings = () => {
  const queryClient = useQueryClient();
  const { appendLog } = useLogging();

  const query = useQuery(
    getSettingsQueryKey(),
    () => {
      return settingsRepo.getAll();
    },
    {
      retry: false,
      refetchOnWindowFocus: true,
    }
  );

  const updateSetting = async (id: SettingsKey, value: SettingsValue) => {
    appendLog('updateSetting -> ', id, value);
    await settingsRepo.update(id, value);
    queryClient.invalidateQueries(getSettingsQueryKey());
  };

  return { settings: query.data, isLoading: query.isLoading, updateSetting };
};

export default useSettings;
