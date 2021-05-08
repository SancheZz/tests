import type { MutationTree } from 'vuex';
import type { State } from './state';
import type { Item } from './types';

export interface Mutations {
  saveValues (state: State, values: Partial<State>): void;
  addItem (state: State, item: Item): void;
  removeItem (state: State, item: Item): void;
}

export default {
  saveValues (state, values) {
    for (const [key, value] of Object.entries(values)) {
      state[key] = value;
    }
  },

  addItem (state, item) {
    if (!state.addedIds.includes(item.id)) {
      state.addedIds.push(item.id);
    }
  },

  removeItem (state, item) {
    const index = state.addedIds.indexOf(item.id);
    if (index !== -1) {
      state.addedIds.splice(index, 1);
    }
  },
} as MutationTree<State> & Mutations;
