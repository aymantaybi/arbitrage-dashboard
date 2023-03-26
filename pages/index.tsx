import { AppShell, Header, Flex, SimpleGrid } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { InstanceController } from '../components/InstanceController/InstanceController';
import { InstancesContainer } from '../components/InstancesContainer/InstancesContainer';
import { LightInstance } from '../interfaces';

export default function HomePage() {
  const instances: LightInstance[] = [
    {
      id: '73752229-467d-45cc-9ae5-969a4f4a9d5e',
      market: {
        baseToken: {
          address: '0xa8754b9Fa15fc18BB59458815510E40a12cD2014',
          symbol: 'SLP',
        },
        paths: [
          {
            pairs: [
              '0x8F1c5eDA143fA3D1bEa8B4E92f33562014D30E0D',
              '0x4f7687aFFc10857fccD0938ECda0947DE7aD3812',
            ],
            router: '0x7D0556D55ca1a92708681e2e231733EBd922597D',
            tokens: [
              '0xa8754b9Fa15fc18BB59458815510E40a12cD2014',
              '0xe514d9DEB7966c8BE0ca922de8a064264eA6bcd4',
              '0x0B7007c13325C48911F73A2daD5FA5dCBf808aDc',
            ],
          },
          {
            pairs: [
              '0x306A28279d04a47468ed83d55088d0DCd1369294',
              '0xA7964991f339668107E2b6A6f6b8e8B74Aa9D017',
            ],
            router: '0x7D0556D55ca1a92708681e2e231733EBd922597D',
            tokens: [
              '0xa8754b9Fa15fc18BB59458815510E40a12cD2014',
              '0xc99a6A985eD2Cac1ef41640596C5A5f9F4E19Ef5',
              '0x0B7007c13325C48911F73A2daD5FA5dCBf808aDc',
            ],
          },
        ],
        quoteToken: {
          address: '0x0B7007c13325C48911F73A2daD5FA5dCBf808aDc',
          symbol: 'BUSD',
        },
        symbol: 'SLPBUSD',
      },
      status: {
        active: false,
        marginBalances: [
          {
            asset: 'BNB',
            free: '0.04191903',
            locked: '0.00000000',
          },
          {
            asset: 'ETH',
            free: '0.00000194',
            locked: '0',
          },
          {
            asset: 'BUSD',
            free: '2880.77724403',
            locked: '258.09741900',
          },
        ],
        marginOpenOrders: [
          {
            clientOrderId: 'vDstzGzUm571uUK9in7rbh',
            cummulativeQuoteQty: '0.00000000',
            executedQty: '0.00000000',
            icebergQty: '0.00000000',
            isWorking: true,
            orderId: 153731556,
            origQty: '99999.00000000',
            price: '0.00258100',
            side: 'BUY',
            status: 'NEW',
            stopPrice: '0.00000000',
            symbol: 'SLPBUSD',
            isIsolated: false,
            time: 1679776379710,
            timeInForce: 'GTC',
            type: 'LIMIT',
            updateTime: 1679776379710,
          },
        ],
        onChainBalances: {
          account: '22.404682639485248987',
          tokens: [
            {
              address: '0xa8754b9Fa15fc18BB59458815510E40a12cD2014',
              balance: '99999',
              symbol: 'SLP',
            },
            {
              address: '0xe514d9DEB7966c8BE0ca922de8a064264eA6bcd4',
              balance: '0',
              symbol: 'WRON',
            },
            {
              address: '0x0B7007c13325C48911F73A2daD5FA5dCBf808aDc',
              balance: '0.01417',
              symbol: 'USDC',
            },
            {
              address: '0xc99a6A985eD2Cac1ef41640596C5A5f9F4E19Ef5',
              balance: '0',
              symbol: 'WETH',
            },
          ],
        },
      },
    },
  ];

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Flex justify="flex-end">
            <ColorSchemeToggle />
          </Flex>
        </Header>
      }
    >
      <SimpleGrid
        cols={2}
        h="100%"
        breakpoints={[
          { maxWidth: '48rem', cols: 2, spacing: 'sm' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}
      >
        <InstancesContainer instances={instances} />
        <InstanceController />
      </SimpleGrid>
    </AppShell>
  );
}
