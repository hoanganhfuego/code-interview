export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

export interface TokenBalance {
  symbol: string;
  balance: number;
}

export interface Token extends TokenBalance {
  priceInUSD: number;
}
