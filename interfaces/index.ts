import Decimal from 'decimal.js';

export interface Order {
  orderId: string;
  clientOrderId: string;
  originalQuantity: Decimal;
  executedQuantity: Decimal;
  symbol: string;
  price: Decimal;
  side: 'BUY' | 'SELL';
  status: 'NEW' | 'CANCELED' | 'FILLED' | 'PARTIALLY_FILLED';
  updateTime: number;
}

export interface IsolatedPosition {
  symbol: string;
  amount: Decimal;
  updateTime: number;
}

export interface Balance {
  asset: string;
  free: Decimal;
  locked: Decimal;
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
    exchangeBalances: Balance[];
    openOrders: Order[];
    onChainBalances: OnChainBalances;
    exchangePositions: IsolatedPosition[];
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
