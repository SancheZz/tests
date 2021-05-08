import Vue from 'vue';
import Vuex from 'vuex';

import TilesPage from './TilesPage';
import BlockchainPage from './BlockchainPage';
import blockchain from './BlockchainPage/plugins/blockchain';

import type { State as TilesPageState } from './TilesPage/state';
import type { State as BlockchainPageState } from './BlockchainPage/state';

import type { Getters as BlockchainGetters } from './BlockchainPage/getters';

import type { Mutations as TilesPageMutations } from './TilesPage/mutations';
import type { Mutations as BlockchainPageMutations } from './BlockchainPage/mutations';

Vue.use(Vuex);

export interface AppState {
  TilesPage: TilesPageState;
  BlockchainPage: BlockchainPageState;
}

export type AppGetters = {
  [Key in keyof BlockchainGetters as `BlockchainPage/${Key}`]: ReturnType<BlockchainGetters[Key]>;
}

export type AppMutations = {
  [Key in keyof TilesPageMutations as `TilesPage/${Key}`]: TilesPageMutations[Key];
} & {
  [Key in keyof BlockchainPageMutations as `BlockchainPage/${Key}`]: BlockchainPageMutations[Key];
};

const store = new Vuex.Store<AppState>({
  modules: {
    TilesPage,
    BlockchainPage,
  },
  plugins: [
    blockchain,
  ],
});

// default export store
export default store;

// useState
export function useState <
  ModuleName extends keyof AppState,
> (moduleName: ModuleName): AppState[ModuleName];

export function useState <
  ModuleName extends keyof AppState,
  PropertyName extends keyof AppState[ModuleName],
> (
  moduleName: ModuleName,
  propertyName: PropertyName,
): AppState[ModuleName][PropertyName];

export function useState <
  ModuleName extends keyof AppState,
  PropertyName extends keyof AppState[ModuleName],
> (
  moduleName: ModuleName,
  propertyName?: PropertyName,
): AppState[ModuleName] | AppState[ModuleName][PropertyName] {
  const module = store.state[moduleName];
  return propertyName
    ? module[propertyName]
    : module;
}

// useGetter
export function useGetter <
  GetterName extends keyof AppGetters
> (name: GetterName): AppGetters[GetterName] {
  return store.getters[name];
}

// useMutations
export function useMutation <
  MutationName extends keyof AppMutations,
> (name: MutationName) {
  type Params = Parameters<AppMutations[MutationName]>;
  type Payload = Params['length'] extends 2 ? Params[1] : void;

  return function (payload: Payload): void {
    store.commit(name, payload);
  };
}
