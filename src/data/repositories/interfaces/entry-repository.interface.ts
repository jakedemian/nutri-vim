import { Entry } from 'src/common/types';

export interface EntryRepositoryInterface {
  getAll(): Promise<Entry[]>;
  updateAll(entries: Entry[]): Promise<void>;
  add(entry: Entry): Promise<void>;
  update(entry: Entry): Promise<void>;
  delete(entryId: string): Promise<void>;
}
