export const typeDefs = `
scalar JSON
scalar JSONObject
scalar BigInt

type Token {
  symbol: String
  address: String
}

type Path {
  tokens: [String]
  pairs: [String]
  router: String
}

type Market {
  baseToken: Token
  quoteToken: Token
  symbol: String
  paths: [Path]
}

type TokenBalance {
  address: String
  symbol: String
  balance: String
}

type OnChainBalances {
  account: String
  tokens: [TokenBalance]
}

type MarginBalance {
  asset: String
  free: String
  locked: String
}

type MarginOpenOrder {
  clientOrderId: String
  cummulativeQuoteQty: String
  executedQty: String
  icebergQty: String
  isWorking: Boolean
  orderId: Int
  origQty: String
  price: String
  side: String
  status: String
  stopPrice: String
  symbol: String
  isIsolated: Boolean
  time: BigInt
  timeInForce: String
  type: String
  updateTime: BigInt
}

type Status {
  active: Boolean
  onChainBalances: OnChainBalances
  marginBalances: [MarginBalance]
  marginOpenOrders: [MarginOpenOrder]
}

type Distribution {
  minROI: Float
  maxQuantity: Int
}

type Configuration {
  distributions: [Distribution]
}

type Instance {
  id: String
  chainId: Int
  market: Market
  status: Status
  configuration: Configuration
}

type Query {
  instances(chainId: Int): [Instance]
}

input TokenInput {
  symbol: String
  address: String
}

input PathInput {
  tokens: [String]
  pairs: [String]
  router: String
}

input MarketInput {
  baseToken: TokenInput
  quoteToken: TokenInput
  symbol: String
  paths: [PathInput]
}

input CredentialsInput {
  apiKey: String
  apiSecret: String
  privateKey: String
}

input DistributionInput {
  minROI: Float
  maxQuantity: Int
}

input ConfigurationInput {
  distributions: [DistributionInput]
}

type Mutation {
  createInstance(
    chainId: Int
    credentials: CredentialsInput
    market: MarketInput
    configuration: ConfigurationInput
  ): Instance
  updateInstance(chainId: Int, id: String, configuration: ConfigurationInput): Instance
  startInstance(chainId: Int, id: String): Instance
  stopInstance(chainId: Int, id: String): Instance
}

type Subscription {
  instanceUpdate(chainId: Int): Instance
}`;
