export interface Shift {
  id: number;
  date: string;
  hours: number;
  miles: number;
  earnings: number;
  gas_cost: number;
}

export interface Settings {
  mpg: number;
  gas_price: number;
}