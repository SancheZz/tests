export interface RawProduct {
  N: string;
}
export interface RawGroup {
  G: string;
  B: {
    [element: string]: RawProduct;
  }
}
export interface RawGroups {
  [element: string]: RawGroup;
}

export interface RawProductData {
  C: number; // price usd
  G: number; // group id
  T: number; // product id
  P: number; // count
}
