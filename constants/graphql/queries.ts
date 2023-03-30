import { gql } from '@apollo/client';

export const GET_INSTANCES = gql`
  query GetInstances($chainId: Int) {
    instances(chainId: $chainId) {
      id
      chainId
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
          isWorking
          orderId
          origQty
          price
          side
          status
          stopPrice
          symbol
          isIsolated
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
    }
  }
`;

export const START_INSTANCE = gql`
  mutation StartInstance($chainId: Int, $id: String) {
    startInstance(chainId: $chainId, id: $id) {
      id
      chainId
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
          isWorking
          orderId
          origQty
          price
          side
          status
          stopPrice
          symbol
          isIsolated
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
    }
  }
`;

export const STOP_INSTANCE = gql`
  mutation StopInstance($chainId: Int, $id: String) {
    stopInstance(chainId: $chainId, id: $id) {
      id
      chainId
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
          isWorking
          orderId
          origQty
          price
          side
          status
          stopPrice
          symbol
          isIsolated
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
    }
  }
`;
