import { gql } from '@apollo/client';

export const GET_INSTANCES = gql`
  query GetInstances($chainId: Int) {
    instances(chainId: $chainId) {
      chainId
      id
      status {
        active
        marginBalances {
          asset
          free
          locked
        }
        marginOpenOrders {
          clientOrderId
          cummulativeQuoteQty
          executedQty
          icebergQty
          isIsolated
          isWorking
          orderId
          origQty
          price
          side
          status
          stopPrice
          symbol
          time
          timeInForce
          type
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
      configuration {
        distributions {
          maxQuantity
          minROI
        }
      }
    }
  }
`;

export const START_INSTANCE = gql`
  mutation StartInstance($chainId: Int, $id: String) {
    startInstance(chainId: $chainId, id: $id) {
      chainId
      id
      status {
        active
        marginBalances {
          asset
          free
          locked
        }
        marginOpenOrders {
          clientOrderId
          cummulativeQuoteQty
          executedQty
          icebergQty
          isIsolated
          isWorking
          orderId
          origQty
          price
          side
          status
          stopPrice
          symbol
          time
          timeInForce
          type
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
      configuration {
        distributions {
          maxQuantity
          minROI
        }
      }
    }
  }
`;

export const STOP_INSTANCE = gql`
  mutation StopInstance($chainId: Int, $id: String) {
    stopInstance(chainId: $chainId, id: $id) {
      chainId
      id
      status {
        active
        marginBalances {
          asset
          free
          locked
        }
        marginOpenOrders {
          clientOrderId
          cummulativeQuoteQty
          executedQty
          icebergQty
          isIsolated
          isWorking
          orderId
          origQty
          price
          side
          status
          stopPrice
          symbol
          time
          timeInForce
          type
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
      configuration {
        distributions {
          maxQuantity
          minROI
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
      status {
        active
        marginBalances {
          asset
          free
          locked
        }
        marginOpenOrders {
          clientOrderId
          cummulativeQuoteQty
          executedQty
          icebergQty
          isIsolated
          isWorking
          orderId
          origQty
          price
          side
          status
          stopPrice
          symbol
          time
          timeInForce
          type
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
      configuration {
        distributions {
          maxQuantity
          minROI
        }
      }
    }
  }
`;
