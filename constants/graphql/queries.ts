import { gql } from '@apollo/client';

export const GET_INSTANCES = gql`
  query GetInstances {
    instances {
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
  mutation StartInstance($id: String) {
    startInstance(id: $id) {
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
  mutation StopInstance($id: String) {
    stopInstance(id: $id) {
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
