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
