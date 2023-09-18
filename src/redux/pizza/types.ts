export enum Status {
  LOADING = "loading",
  SUCCESS = "OK",
  ERROR = "error",
}

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export type FetchParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
