import { Item } from '@/store/main/types';

export type RecordTypes = 'added' | 'removed';
export interface HistoryRecord {
  type: RecordTypes;
  date: Date;
  item: Item;
}

export type { Item };
