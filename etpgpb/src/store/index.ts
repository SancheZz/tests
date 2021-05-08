import Vue from 'vue';
import Vuex from 'vuex';
import PostsPage from './PostsPage';

import type { State as PostsPageState } from './PostsPage/state';
import type { Mutations as PostsPageMutations } from './PostsPage/mutations';
import type { Getters as PostPageGetters } from './PostsPage/getters';

Vue.use(Vuex);

interface AppState {
  PostsPage: PostsPageState;
}

type AppMutations = {
  [Key in keyof PostsPageMutations as `PostsPage/${Key}`]: PostsPageMutations[Key];
};

type AppGetters = {
  [Key in keyof PostPageGetters as `PostsPage/${Key}`]: ReturnType<PostPageGetters[Key]>;
};

const store = new Vuex.Store<AppState>({
  modules: {
    PostsPage,
  },
});

export default store;

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

export function useGetter <
  GetterName extends keyof AppGetters
> (name: GetterName): AppGetters[GetterName] {
  return store.getters[name];
}

export function useMutation <
  MutationName extends keyof AppMutations,
> (name: MutationName) {
  return function (
    payload: Parameters<AppMutations[MutationName]>[1],
  ): void {
    store.commit(name, payload);
  };
}
