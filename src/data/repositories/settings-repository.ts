import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Setting,
  Settings,
  SettingsKey,
  SettingsValue,
} from 'src/common/types/settings.types';
import { SettingsRepositoryInterface } from 'src/data/repositories/interfaces/settings-repository.interface';

export const getSettingsStorageKey = () => 'SETTINGS';

class SettingsNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SettingsNotFoundError';
  }
}

class SettingNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SettingNotFoundError';
  }
}

const DEFAULT_SETTINGS_VALUES: Settings = {
  autoResetDaily: {
    value: false,
  },
};

export class SettingsRepository implements SettingsRepositoryInterface {
  async getAll(): Promise<Settings> {
    try {
      const stringJson = await AsyncStorage.getItem(getSettingsStorageKey());
      if (!stringJson) {
        return await this.init();
      }

      return JSON.parse(stringJson);
    } catch (error) {
      console.error('Error fetching all settings:', error);
      throw error;
    }
  }

  async get(id: SettingsKey): Promise<Setting | null> {
    try {
      const settings: Settings = await this.getAll();
      const setting: Setting = settings[id];
      if (!setting) {
        throw new SettingNotFoundError(`Setting with id ${id} was not found.`);
      }
      return setting;
    } catch (error) {
      console.error('Error fetching setting:', error);
      throw error;
    }
  }

  async update(id: SettingsKey, value: SettingsValue): Promise<void> {
    const setting = await this.get(id);
    if (!setting) {
      throw new SettingNotFoundError(`Setting with id ${id} was not found.`);
    }

    setting.value = value;
    const allSettingsStringJson = await this.getAll();
    if (!allSettingsStringJson) {
      throw new SettingsNotFoundError(`Settings data not found.`);
    }

    const allSettings: Settings = allSettingsStringJson;
    allSettings[id] = setting;
    await AsyncStorage.setItem(
      getSettingsStorageKey(),
      JSON.stringify(allSettings)
    );
  }

  private async init(): Promise<Settings> {
    const allSettings: Settings = DEFAULT_SETTINGS_VALUES;
    await AsyncStorage.setItem(
      getSettingsStorageKey(),
      JSON.stringify(allSettings)
    );
    return allSettings;
  }
}
