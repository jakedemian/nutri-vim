import { EntryRepository } from "src/data/entry-repository";
import { EntryRepositoryInterface } from "src/data/interfaces/entry-repository.interface";

export const entryRepo: EntryRepositoryInterface = new EntryRepository();
