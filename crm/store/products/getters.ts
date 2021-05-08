import type { GetterTree } from 'vuex'
import type { Product } from '@/types/products'
import type { State } from './state'

type ProductCurrencies = {
  [element: string]: string;
}

type GettersFuncs = {
  getCurrenciesByProduct(state: State): (product: Product) => ProductCurrencies;
}

export type Getters = {
  [Key in keyof GettersFuncs]: ReturnType<GettersFuncs[Key]>;
};

export default {
  getCurrenciesByProduct (state) {
    return function (product) {
      return {
        rub: (state.exchangeRub * product.price).toFixed(1)
      }
    }
  }
} as GettersFuncs & GetterTree<State, State>
