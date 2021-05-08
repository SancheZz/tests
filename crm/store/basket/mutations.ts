import type { MutationTree } from 'vuex'
import type { Product } from '@/types/products'
import type { State } from './state'

export type Mutations = {
  add(state: State, product: Product): void;
  delete(state: State, product: Product): void;
};

export default {
  add (state, product) {
    state.products.push(product)
  },

  delete (state, product) {
    state.products = state.products
      .filter(existingProduct => existingProduct.id !== product.id)
  }
} as Mutations & MutationTree<State>
