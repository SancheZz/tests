import type { GetterTree } from 'vuex'
import type { Product } from '@/types/products'
import type { State } from './state'

type BasketProduct = {
  product: Product,
  count: number;
};

type BasketProducts = {
  [element: string]: BasketProduct;
}

type GettersFuncs = {
  products(state: State): BasketProducts;
  count(state: State): (product: Product) => number;
}

export type Getters = {
  [Key in keyof GettersFuncs]: ReturnType<GettersFuncs[Key]>;
};

export default {
  products (state) {
    const products: BasketProducts = {}

    for (const product of state.products) {
      if (!products[product.id]) {
        products[product.id] = {
          product,
          count: 0
        }
      }
      products[product.id]!.count += 1
    }

    return products
  },

  count (state) {
    return function (product) {
      return state.products
        .filter(existingProduct => existingProduct.id === product.id)
        .length
    }
  }
} as GettersFuncs & GetterTree<State, State>
