import type { GetterTree } from 'vuex';
import type { State } from './state';
import type { PopularItem } from './types';

export interface Getters {
  popularItems (state: State): PopularItem[];
  length(state: State): number;
}

export default {
  popularItems (state) {
    return state.posts
      .map(function (post) {
        return {
          count: post.comments.length,
          message: post.message,
        };
      })
      .sort(function (firstItem, secondItem) {
        return firstItem.count > secondItem.count ? 1 : -1;
      });
  },
} as Getters & GetterTree<State, unknown>;
