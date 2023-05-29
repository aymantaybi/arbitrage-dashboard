import { gql } from '@apollo/client';

export const GET_INSTANCES = gql`
  query GetInstances($chainId: Int) {
    instances(chainId: $chainId) {
      chainId
      id
      market {
        baseToken {
          address
          symbol
        }
        paths {
          pairs
          router
          tokens
        }
        quoteToken {
          address
          symbol
        }
        symbol
      }
      status {
        active
        onChainBalances {
          account
          tokens {
            address
            balance
            symbol
          }
        }
        openOrders {
          clientOrderId
          executedQuantity
          orderId
          originalQuantity
          price
          side
          status
          symbol
          updateTime
        }
        exchangePositions {
          amount
          symbol
          updateTime
        }
        exchangeBalances {
          asset
          free
          locked
        }
      }
      configuration {
        distributions {
          id
          maxQuantity
          minROI
        }
        account {
          exchange
          type
        }
      }
    }
  }
`;

export const START_INSTANCE = gql`
  mutation StartInstance($id: String, $chainId: Int) {
    startInstance(chainId: $chainId, id: $id) {
      chainId
      id
      status {
        active
        exchangeBalances {
          asset
          free
          locked
        }
        exchangePositions {
          amount
          symbol
          updateTime
        }
        onChainBalances {
          account
          tokens {
            address
            balance
            symbol
          }
        }
        openOrders {
          clientOrderId
          executedQuantity
          orderId
          originalQuantity
          price
          side
          status
          symbol
          updateTime
        }
      }
      configuration {
        account {
          exchange
          type
        }
        distributions {
          id
          maxQuantity
          minROI
        }
      }
      market {
        baseToken {
          address
          symbol
        }
        paths {
          pairs
          router
          tokens
        }
        quoteToken {
          address
          symbol
        }
        symbol
      }
    }
  }
`;

export const STOP_INSTANCE = gql`
  mutation StopInstance($id: String, $chainId: Int) {
    stopInstance(chainId: $chainId, id: $id) {
      chainId
      configuration {
        account {
          exchange
          type
        }
        distributions {
          id
          maxQuantity
          minROI
        }
      }
      id
      market {
        baseToken {
          address
          symbol
        }
        paths {
          pairs
          router
          tokens
        }
        quoteToken {
          address
          symbol
        }
        symbol
      }
      status {
        active
        exchangeBalances {
          asset
          free
          locked
        }
        exchangePositions {
          amount
          symbol
          updateTime
        }
        onChainBalances {
          account
          tokens {
            address
            balance
            symbol
          }
        }
        openOrders {
          clientOrderId
          executedQuantity
          orderId
          originalQuantity
          price
          side
          status
          symbol
          updateTime
        }
      }
    }
  }
`;

export const INSTANCE_UPDATE = gql`
  subscription InstanceUpdate($chainId: Int) {
    instanceUpdate(chainId: $chainId) {
      chainId
      id
      configuration {
        account {
          exchange
          type
        }
        distributions {
          id
          maxQuantity
          minROI
        }
      }
      market {
        baseToken {
          address
          symbol
        }
        paths {
          pairs
          router
          tokens
        }
        quoteToken {
          address
          symbol
        }
        symbol
      }
      status {
        active
        exchangeBalances {
          asset
          free
          locked
        }
        exchangePositions {
          amount
          symbol
          updateTime
        }
        onChainBalances {
          account
          tokens {
            address
            balance
            symbol
          }
        }
        openOrders {
          clientOrderId
          executedQuantity
          orderId
          originalQuantity
          price
          side
          status
          symbol
          updateTime
        }
      }
    }
  }
`;

export const UPDATE_INSTANCE = gql`
  mutation UpdateInstance($chainId: Int, $id: String, $configuration: ConfigurationInput) {
    updateInstance(chainId: $chainId, id: $id, configuration: $configuration) {
      chainId
      id
      market {
        symbol
      }
      status {
        active
      }
      configuration {
        distributions {
          id
          minROI
          maxQuantity
        }
      }
    }
  }
`;
