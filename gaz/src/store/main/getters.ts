import type { Item } from './types';
import type { State } from './state';

interface GettersFunctions {
  availableItems (state: State): Item[];
  filterAvailableItems (state: State, getters: Getters): (search: string) => Item[];
  addedItems (state: State, getters: Getters): Item[];
}

export type Getters = {
  [Key in keyof GettersFunctions]: ReturnType<GettersFunctions[Key]>
}

export default {
  availableItems (state) {
    const { items, addedIds } = state;
    return items.filter(item => !addedIds.includes(item.id));
  },

  filterAvailableItems (state, getters) {
    return function (search: string) {
      function getNames (item: Item): string[] {
        const deepNames = item.items.map(deepItem => deepItem.name);
        return [item.name, ...deepNames];
      }

      function checkItemByName (item: Item): boolean {
        const names = getNames(item);
        return names.some(name => name.includes(search));
      }

      function countOccurrencesOfString (item: Item): number {
        return getNames(item)
          .filter(name => name.includes(search))
          .length;
      }

      function sortItems (first: Item, second: Item): number {
        const firstCount = countOccurrencesOfString(first);
        const secondCount = countOccurrencesOfString(second);
        return firstCount > secondCount ? 1 : -1;
      }

      return getters.availableItems
        .filter(checkItemByName)
        .sort(sortItems);
    };
  },

  addedItems (state) {
    return state.items
      .filter(item => state.addedIds.includes(item.id));
  },
} as GettersFunctions;
