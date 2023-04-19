export interface MarginBalance {
  asset: string;
  free: string;
  locked: string;
}

export interface MarginOpenOrder {
  clientOrderId: string;
  cummulativeQuoteQty: string;
  executedQty: string;
  icebergQty: string;
  isWorking: boolean;
  orderId: number;
  origQty: string;
  price: string;
  side: string;
  status: string;
  stopPrice: string;
  symbol: string;
  isIsolated: boolean;
  time: number;
  timeInForce: string;
  type: string;
  updateTime: number;
}

export interface OnChainBalances {
  account: string;
  tokens: TokenBalance[];
}

export interface TokenBalance {
  address: string;
  balance: string;
  symbol: string;
}

export interface LightInstance {
  id: string;
  chainId: number;
  market: LightInstance.Market;
  status: LightInstance.Status;
  configuration: LightInstance.Configuration;
}

export namespace LightInstance {
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

  export interface Status {
    active: boolean;
    marginBalances: MarginBalance[];
    marginOpenOrders: MarginOpenOrder[];
    onChainBalances: OnChainBalances;
  }

  export namespace Configuration {
    export interface Distribution {
      id: number;
      minROI: number;
      maxQuantity: number;
    }
  }

  export interface Configuration {
    distributions: Configuration.Distribution[];
  }
}
