import { MutationTree } from 'vuex';
import type { State } from './state';
import type { HistoryRecord, RecordTypes, Item } from './types';

interface RawHistoryRecord {
  type: RecordTypes;
  item: Item;
}

export interface Mutations {
  addRecord(
    state: State,
    record: RawHistoryRecord,
  ): void;
}

export default {
  addRecord (state, record) {
    Object.assign(record, {
      date: new Date(),
    });
    state.records.push(record as HistoryRecord);
  },
} as MutationTree<State> & Mutations;
