export interface Item {
  key: string,
  name: string,
  price: number,
  url: string
}

export interface Basket {
  basket: Item[],
  count: number,
  selectedItem: Item 
}

export const emptyItem: Item = {
  key: '',
  name: '',
  price: 0,
  url: ''
} 