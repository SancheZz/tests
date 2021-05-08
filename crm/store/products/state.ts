import type { Group } from '@/types/products'

export type State = {
  groups: {
    [element: string]: Group;
  },
  exchangeRub: number;
};

export default function () {
  return {
    groups: {},
    exchangeRub: 20
  } as State
}
