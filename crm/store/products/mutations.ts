
import type { MutationTree } from 'vuex'
import type { RawGroups, RawProductData } from '@/types/backendTypes'

import Vue from 'vue'
import type { State } from './state'
import { prepareGroup } from './utils'

type DataResponse = {
  Success: boolean;
  Value: {
    Goods: RawProductData[];
  };
};

export type Mutations = {
  saveGroups(state: State, payload: RawGroups): void;
  saveData(state: State, payload: DataResponse): void;
  setExchange(state: State, payload: number): void;
}

export default {
  saveGroups (state, payload) {
    Object.entries(payload)
      .map(prepareGroup)
      .forEach(group => Vue.set(state.groups, group.id, group))
  },

  saveData (state, payload) {
    for (const product of payload.Value.Goods) {
      const {
        C: price,
        G: groupId,
        T: productId,
        P: count
      } = product

      const stateProduct = state.groups[groupId]
        ?.products.find(({ id }) => String(productId) === id)

      if (stateProduct) {
        stateProduct.price = price
        stateProduct.count = count
      }
    }
  },

  setExchange (state, value) {
    state.exchangeRub = value
  }
} as Mutations & MutationTree<State>
