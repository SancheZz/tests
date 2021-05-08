import type { GetterTree } from 'vuex';
import { State } from './state';
import type { HistoryRecord } from './types';

interface GettersFunctions {
  added(state: State): HistoryRecord[];
  removed(state: State): HistoryRecord[];
}

export type Getters = {
  [Key in keyof GettersFunctions]: ReturnType<GettersFunctions[Key]>
}

export default {
  added (state) {
    return state.records.filter(record => record.type === 'added');
  },

  removed (state) {
    return state.records.filter(record => record.type === 'removed');
  },
} as GetterTree<State, State>;
