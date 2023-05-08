import { EntryRepository } from 'src/data/repositories/entry-repository';
import { EntryRepositoryInterface } from 'src/data/repositories/interfaces/entry-repository.interface';

export const entryRepo: EntryRepositoryInterface = new EntryRepository();
