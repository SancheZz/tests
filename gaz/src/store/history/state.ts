import { HistoryRecord } from './types';

export interface State {
  records: HistoryRecord[];
}

export default {
  records: [],
} as State;
