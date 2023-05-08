import AsyncStorage from '@react-native-async-storage/async-storage';

import { Entry } from 'src/common/types';
import { EntryRepositoryInterface } from 'src/data/repositories/interfaces/entry-repository.interface';

export const getFoodEntriesStorageKey = () => 'FOOD_ENTRIES';

export class EntryRepository implements EntryRepositoryInterface {
  async getAll() {
    try {
      const stringJson = await AsyncStorage.getItem(getFoodEntriesStorageKey());
      return stringJson
        ? JSON.parse(stringJson).sort(
            (a: Entry, b: Entry) =>
              // ascending order
              new Date(a.time).getTime() - new Date(b.time).getTime()
          )
        : [];
    } catch (error) {
      console.error('Error fetching all entries:', error);
      throw error;
    }
  }

  async updateAll(entries: Entry[]) {
    try {
      await AsyncStorage.setItem(
        getFoodEntriesStorageKey(),
        JSON.stringify(entries)
      );
    } catch (error) {
      console.error('Error updating all entries:', error);
      throw error;
    }
  }

  async add(entry: Entry) {
    try {
      const allEntries: Entry[] = await this.getAll();
      await this.updateAll([...allEntries, entry]);
    } catch (error) {
      console.error('Error adding entry:', error);
      throw error;
    }
  }

  async update(entry: Entry) {
    try {
      const allEntries: Entry[] = await this.getAll();
      await this.updateAll(
        allEntries.map((existingEntry: Entry) =>
          existingEntry.id === entry.id ? entry : existingEntry
        )
      );
    } catch (error) {
      console.error('Error updating entry:', error);
      throw error;
    }
  }

  async delete(entryId: string) {
    try {
      const allEntries: Entry[] = await this.getAll();
      await this.updateAll(
        allEntries.filter((entry: Entry) => entry.id !== entryId)
      );
    } catch (error) {
      console.error('Error deleting entry:', error);
      throw error;
    }
  }
}
