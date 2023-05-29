export const typeDefs = `
scalar JSON
scalar JSONObject
scalar BigInt

enum ExchangeAccountType {
  MARGIN
  FUTURES
}

type ExchangeAccount {
  exchange: String
  type: ExchangeAccountType
}

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

type Balance {
  asset: String
  free: String
  locked: String
}

type Position {
  symbol: String
  amount: String
  updateTime: String
}

type OpenOrder {
  orderId: String
  clientOrderId: String
  originalQuantity: String
  executedQuantity: String
  symbol: String
  price: String
  side: String
  status: String
  updateTime: String
}

type Status {
  active: Boolean
  onChainBalances: OnChainBalances
  exchangeBalances: [Balance]
  exchangePositions: [Position]
  openOrders: [OpenOrder]
}

type Distribution {
  id: Int
  minROI: Float
  maxQuantity: Int
}

type Configuration {
  distributions: [Distribution]
  account: ExchangeAccount
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

input ExchangeAccountInput {
  exchange: String
  type: ExchangeAccountType
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
  account: ExchangeAccountInput
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
