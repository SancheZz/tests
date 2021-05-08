// @ts-nocheck

import { Store } from 'vuex'
import products from './products'
import basket from './basket'

import type { GetPayload } from './utils'

import type {
  State as ProductsState,
  Getters as ProductsGetters,
  Mutations as ProductMutations,
  Actions as ProudctActions
} from './products'

import type {
  State as BasketState,
  Getters as BasketGetters,
  Mutations as BasketMutations
} from './basket'

type RootState = {
  products: ProductsState;
  basket: BasketState;
};

type RootGetters = {
  [Key in keyof ProductsGetters as `products/${Key}`]: ProductsGetters[Key];
} & {
  [Key in keyof BasketGetters as `basket/${Key}`]: BasketGetters[Key];
};

type RootMutations = {
  [Key in keyof ProductMutations as `products/${Key}`]: (
    payload: GetPayload<ProductMutations[Key], 1>,
  ) => void;
} & {
  [Key in keyof BasketMutations as `basket/${Key}`]: (
    payload: GetPayload<BasketMutations[Key], 1>,
  ) => void;
};

type RootActions = {
  [Key in keyof ProudctActions as `products/${Key}`]: (
    payload: GetPayload<ProudctActions[Key], 1>,
  ) => ReturnType<ProudctActions[Key]>;
};

export type AppStore = {
  state: RootState;
  getters: RootGetters;

  commit <MutationName extends keyof RootMutations> (
    name: MutationName,
    payload: GetPayload<RootMutations[MutationName]>,
  ): void;

  dispatch <ActionName extends keyof RootActions> (
    name: ActionName,
    payload: GetPayload<RootActions[ActionName]>,
  ): ReturnType<RootActions[ActionName]>;
}

export const store = new Store({
  modules: {
    products,
    basket
  }
}) as unknown as AppStore

export function useState <
  ModuleName extends keyof RootState,
> (moduleName: ModuleName): RootState[ModuleName];

// eslint-disable-next-line no-redeclare
export function useState <
  ModuleName extends keyof RootState,
  PropertyName extends keyof RootState[ModuleName],
> (
  moduleName: ModuleName,
  propertyName: PropertyName,
): RootState[ModuleName][PropertyName];

// eslint-disable-next-line no-redeclare
export function useState <
  ModuleName extends keyof RootState,
  PropertyName extends keyof RootState[ModuleName],
> (
  moduleName: ModuleName,
  propertyName?: PropertyName
): RootState[ModuleName] | RootState[ModuleName][PropertyName] {
  const module = store.state[moduleName]
  return propertyName
    ? module[propertyName]
    : module
}

export function useGetter <
  GetterName extends keyof RootGetters,
> (name: GetterName): RootGetters[GetterName] {
  return store.getters[name]
}

export function useMutation <
  MutationName extends keyof RootMutations,
> (name: MutationName) {
  type Func = RootMutations[MutationName];
  return function (payload: GetPayload<Func>): void {
    store.commit(name, payload)
  }
}

export function useAction <
  ActionName extends keyof RootActions
> (name: ActionName) {
  type Func = RootActions[ActionName];
  return function (payload: GetPayload<Func>): ReturnType<Func> {
    return store.dispatch(name, payload)
  }
}
