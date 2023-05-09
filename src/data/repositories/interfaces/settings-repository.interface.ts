import { Setting, Settings, SettingsValue } from 'src/common/types';

export interface SettingsRepositoryInterface {
  getAll(): Promise<Settings>;
  get(id: string): Promise<Setting | null>;
  update(id: string, value: SettingsValue): Promise<void>;
}
