import { AppShell, Header, Flex } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { InstanceCard } from '../components/InstanceCard/InstanceCard';
import { LightInstance } from '../interfaces';

export default function HomePage() {
  const instances: LightInstance[] = [
    {
      status: true,
      profit: 0,
      trades: 0,
      market: {
        baseToken: {
          symbol: 'SLP',
          address: '',
        },
        quoteToken: {
          symbol: 'BUSD',
          address: '',
        },
        symbol: 'SLPBUSD',
        paths: [],
      },
    },
    {
      status: false,
      profit: 0,
      trades: 0,
      market: {
        baseToken: {
          symbol: 'SLP',
          address: '',
        },
        quoteToken: {
          symbol: 'WETH',
          address: '',
        },
        symbol: 'SLPETH',
        paths: [],
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
      {instances.map((instance) => (
        <InstanceCard data={instance} />
      ))}
    </AppShell>
  );
}
