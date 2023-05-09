import { EntryRepository } from 'src/data/repositories/entry-repository';
import { EntryRepositoryInterface } from 'src/data/repositories/interfaces/entry-repository.interface';
import { SettingsRepositoryInterface } from 'src/data/repositories/interfaces/settings-repository.interface';
import { SettingsRepository } from 'src/data/repositories/settings-repository';

export const entryRepo: EntryRepositoryInterface = new EntryRepository();
export const settingsRepo: SettingsRepositoryInterface =
  new SettingsRepository();
