export interface Item {
  id: number;
  name: string;
  items: Omit<Item, 'items'>[];
}
