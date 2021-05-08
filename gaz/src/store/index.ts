// @ts-nocheck

import { createStore } from 'vuex';
import main from './main';
import history from './history';

import type { State as MainState } from './main/state';
import type { Getters as MainGetters } from './main/getters';
import type { Mutations as MainMutations } from './main/mutations';
import type { Actions as MainActions } from './main/actions';

import type { State as HistoryState } from './history/state';
import type { Getters as HistoryGetters } from './history/getters';
import type { Mutations as HistoryMutations } from './history/mutations';

interface State {
  main: MainState;
  history: HistoryState;
}

type Getters = {
  [Key in keyof MainGetters as `main/${Key}`]: MainGetters[Key];
} & {
  [Key in keyof HistoryGetters as `history/${Key}`]: HistoryGetters[Key];
};

type Mutations = {
  [Key in keyof MainMutations as `main/${Key}`]: MainMutations[Key];
} & {
  [Key in keyof HistoryMutations as `history/${Key}`]: HistoryMutations[Key];
};

type Actions = {
  [Key in keyof MainActions as `main/${Key}`]: MainActions[Key];
};

export interface AppStore {
  state: State;
  getters: Getters;

  commit<MutationName extends keyof Mutations>(
    name: MutationName,
    payload: Parameters<Mutations[MutationName]>[1],
  ): void;

  dispatch<ActionName extends keyof Actions>(
    name: ActionName,
    payload: Parameters<Actions[ActionName]>[1],
  ): ReturnType<Actions[ActionName]>;
}

export default createStore({
  modules: {
    main,
    history,
  },
}) as AppStore;
