import state from './state';
import getters from './getters';
import mutations from './mutations';

import type { State } from './state';
import type { Getters } from './getters';
import type { Mutations } from './mutations';

export default {
  state,
  getters,
  mutations,
  namespaced: true,
};
export interface HistoryStore {
  state: State;
  getters: Getters;

  commit<MutationName extends keyof Mutations>(
    name: MutationName,
    payload: Parameters<Mutations[MutationName]>[1],
  ): void;
}
