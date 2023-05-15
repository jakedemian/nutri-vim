import { useQuery, useQueryClient } from 'react-query';

import { settingsRepo } from 'src/common/repositories';
import { SettingsKey, SettingsValue } from 'src/common/types/types';

export const getSettingsQueryKey = () => ['GET_SETTINGS_QUERY_KEY'];

const useSettings = () => {
  const queryClient = useQueryClient();

  const query = useQuery(
    getSettingsQueryKey(),
    () => {
      console.log('fetching settings');
      return settingsRepo.getAll();
    },
    {
      retry: false,
      refetchOnWindowFocus: true,
    }
  );

  const updateSetting = async (id: SettingsKey, value: SettingsValue) => {
    console.log('updateSetting -> ', id, value);
    await settingsRepo.update(id, value);
    queryClient.invalidateQueries(getSettingsQueryKey());
  };

  return { settings: query.data, isLoading: query.isLoading, updateSetting };
};

export default useSettings;
