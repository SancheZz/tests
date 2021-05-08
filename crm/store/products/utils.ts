import type { Group, Product } from '@/types/products'
import type { RawGroup, RawProduct } from '@/types/backendTypes'

function prepareProduct (
  entry: [string, RawProduct]
): Product {
  return {
    id: entry[0],
    name: entry[1].N,
    count: 0,
    price: 0
  }
}

export function prepareGroup (
  entry: [string, RawGroup]
): Group {
  const products = Object.entries(entry[1].B)
    .map(prepareProduct)

  return {
    products,
    id: entry[0],
    name: entry[1].G
  }
}
