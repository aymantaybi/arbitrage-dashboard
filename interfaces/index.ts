export interface Market {
  baseToken: Market.Token;
  quoteToken: Market.Token;
  symbol: string;
  paths: Market.Path[];
}

export namespace Market {
  export interface Token {
    symbol: string;
    address: string;
  }
  export interface Path {
    tokens: string[];
    pairs: string[];
    router: string;
  }
}

export interface LightInstance {
  status: boolean;
  profit: number;
  trades: number;
  market: Market;
}
