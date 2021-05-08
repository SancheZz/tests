import type { InfoTile } from './types';

export interface State {
  [element: string]: unknown;
  tiles: InfoTile[];
  upperTileId: string | undefined;
}

export default {
  tiles: [],
  upperTileId: localStorage.upper,
} as State;
