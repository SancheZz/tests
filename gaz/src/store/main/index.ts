import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

import type { State } from './state';
import type { Getters } from './getters';
import type { Mutations } from './mutations';
import type { Actions } from './actions';
import type { Mutations as HistoryMutations } from '@/store/history/mutations';

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};

export interface MainStore {
  state: State;
  getters: Getters;

  commit<MutationName extends keyof Mutations>(
    name: MutationName,
    payload: Parameters<Mutations[MutationName]>[1],
  ): void;

  commit<MutationName extends keyof HistoryMutations>(
    name: `history/${MutationName}`,
    payload: Parameters<HistoryMutations[MutationName]>[1],
    options: { root: true },
  ): void;

  dispatch<ActionName extends keyof Actions>(
    name: ActionName,
    payload: Parameters<Actions[ActionName]>[1],
  ): ReturnType<Actions[ActionName]>;
}
