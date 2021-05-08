import type { GetterTree } from 'vuex';
import type { State } from './state';

export interface Getters {
  transactions(state: State): {
    from: string;
    to: {
      addr: string;
      sum: number;
    }[];
  }[];
}

export default {
  transactions (state) {
    return Object.entries(state.transactions)
      .map(([from, to]) => {
        const tos = Object.entries(to)
          .map(([addr, sum]) => ({
            addr,
            sum,
          }));

        return {
          from,
          to: tos,
        };
      });
  },
} as Getters & GetterTree<State, unknown>;
