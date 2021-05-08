import type { Product } from '@/types/products'

export type State = {
  products: Product[];
};

export default function () {
  return {
    products: []
  } as State
}
