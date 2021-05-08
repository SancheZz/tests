import type { Item } from './types';

export interface State {
  items: Item[];
  addedIds: number[];
  [Key: string]: unknown;
}

export default {
  items: [],
  addedIds: [],
} as State;
