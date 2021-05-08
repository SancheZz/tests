import axios from 'axios';
import { State } from './state';

import type { ActionTree } from 'vuex';
import type { Item } from './types';
import type { MainStore } from './index';

const instance = axios.create({
  baseURL: 'https://5fd90fc07e05f000170d3493.mockapi.io/api/v1/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});

export interface Actions {
  loadItems (context: MainStore, payload: void): void;
}

export default {
  async loadItems (context) {
    const response = await instance.get('items');
    const items = response.data as Item[];
    context.commit('saveValues', { items });
  },
} as ActionTree<State, State> & Actions;
