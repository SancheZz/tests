export interface Product {
  id: string;
  name: string;
  count: number;
  price: number;
}

export interface Group {
  id: string;
  name: string;
  products: Product[];
}
