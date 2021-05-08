import type { MutationTree } from 'vuex';
import { getTiles, setTile } from './db';
import { tiles as defaultTiles } from './defaults';
import type { State } from './state';
import type { InfoTile } from './types';

type PartialInfoTile = Partial<InfoTile> & {
  id: string;
};

export interface Mutations {
  initState (state: State): void;
  setUpper (state: State, id: string): void;
  setTileValues (state: State, values: PartialInfoTile): void;
}

export default {
  async initState (state: State) {
    const dbTiles = await getTiles();
    const tiles = dbTiles.length
      ? dbTiles
      : defaultTiles;

    state.tiles = tiles;
    tiles.forEach(setTile);
  },

  setUpper (state, id) {
    state.upperTileId = id;
    localStorage.upper = id;
  },

  setTileValues (state, { id, ...values }) {
    for (const tile of state.tiles) {
      if (tile.id === id) {
        Object.assign(tile, values);
        setTile(tile);
        break;
      }
    }
  },
} as Mutations & MutationTree<State>;
