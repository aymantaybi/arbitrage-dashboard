import { Flex, Image, Tabs, Table, Select, ActionIcon } from '@mantine/core';
import {
  IconCircleFilled,
  IconExchange,
  IconFileInvoice,
  IconX,
  IconWallet,
} from '@tabler/icons-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { getChainIconSrc, getTokenIconSrc } from '../../helpers';
import { LightInstance, MarginOpenOrder } from '../../interfaces';
import { InstanceDetail } from '../InstanceCard/InstanceCard';
import PairIcon from '../PairIcon/PairIcon';
import { TokenIconContainer } from '../TokenIconContainer/TokenIconContainer';
import useStyles from './InstanceInformation.styles';

interface InstanceInformationHeaderProps {
  selectedInstance: LightInstance;
  setSelectedInstance: Dispatch<SetStateAction<LightInstance | undefined>>;
}

function InstanceInformationHeader(props: InstanceInformationHeaderProps) {
  const { classes } = useStyles();

  const { selectedInstance, setSelectedInstance } = props;

  return (
    <Flex
      p="md"
      w="100%"
      justify="space-between"
      align="center"
      direction="row"
      wrap="wrap"
      gap="xl"
    >
      <ActionIcon
        size="lg"
        variant="light"
        onClick={() => {
          setSelectedInstance(undefined);
        }}
      >
        <IconX size="1.5rem" />
      </ActionIcon>
      <PairIcon
        base={getTokenIconSrc(selectedInstance.market.baseToken.symbol)}
        quote={getTokenIconSrc(selectedInstance.market.quoteToken.symbol)}
      />
      <InstanceDetail
        label="NETWORK"
        value={<Image width={25} height={25} src={getChainIconSrc(2020)} />}
      />
      <InstanceDetail
        label="ACTIVE"
        value={
          <IconCircleFilled
            size={18}
            opacity={0.75}
            style={{ color: selectedInstance.status.active ? 'green' : 'red' }}
          />
        }
      />
    </Flex>
  );
}

interface InstanceMarginBalancesProps {
  balances: Array<{ asset: string; free: string; locked: string }>;
}

function InstanceMarginBalances(props: InstanceMarginBalancesProps) {
  const { balances } = props;
  const rows = balances.map((balance) => (
    <tr key={balance.asset}>
      <td>
        <TokenIconContainer size={30}>
          <Image width={24} height={24} src={getTokenIconSrc(balance.asset)} />
        </TokenIconContainer>
      </td>
      <td>{balance.asset}</td>
      <td>{Number(balance.free)}</td>
      <td>{Number(balance.locked)}</td>
    </tr>
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th />
          <th>Asset</th>
          <th>Free</th>
          <th>Locked</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

interface InstanceOnChainBalancesProps {
  account: string;
  tokens: Array<{ address: string; symbol: string; balance: string }>;
}

function InstanceOnChainBalances(props: InstanceOnChainBalancesProps) {
  const { tokens } = props;
  const rows = tokens.map((token) => (
    <tr key={token.address}>
      <td>
        <TokenIconContainer size={30}>
          <Image width={24} height={24} src={getTokenIconSrc(token.symbol)} />
        </TokenIconContainer>
      </td>
      <td>{token.symbol}</td>
      <td>{token.address}</td>
      <td>{Number(token.balance)}</td>
    </tr>
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th />
          <th>Symbol</th>
          <th>Address</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

interface InstanceBalancesProps {
  data: LightInstance;
}

function InstanceBalances(props: InstanceBalancesProps) {
  const { data } = props;

  const [balanceType, setBalanceType] = useState<string | null>('Margin');

  return (
    <Flex
      p="md"
      w="100%"
      justify="flex-start"
      align="stretch"
      direction="column"
      wrap="wrap"
      gap="xl"
    >
      <Select
        sx={{ alignSelf: 'flex-end' }}
        value={balanceType}
        onChange={setBalanceType}
        data={['Margin', 'On Chain']}
        size="xs"
      />
      {balanceType === 'Margin' ? (
        <InstanceMarginBalances balances={data.status.marginBalances} />
      ) : (
        <InstanceOnChainBalances
          tokens={data.status.onChainBalances.tokens}
          account={data.status.onChainBalances.account}
        />
      )}
    </Flex>
  );
}

interface InstanceMarginOpenOrdersProps {
  marginOpenOrders: MarginOpenOrder[];
}

function InstanceMarginOpenOrders(props: InstanceMarginOpenOrdersProps) {
  const { marginOpenOrders } = props;

  const rows = marginOpenOrders.map(
    ({ clientOrderId, time, symbol, type, side, price, origQty, executedQty }) => (
      <tr key={clientOrderId}>
        <td>
          {new Date(time).toLocaleDateString('en-us', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </td>
        <td>{symbol}</td>
        <td>{type}</td>
        <td color={side === 'BUY' ? 'green' : 'red'}>{side}</td>
        <td>{price}</td>
        <td>{origQty}</td>
        <td>{executedQty}</td>
      </tr>
    )
  );

  return (
    <Table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Pair</th>
          <th>Type</th>
          <th>Side</th>
          <th>Price</th>
          <th>Original Quantity</th>
          <th>Executed Quantity</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

interface InstanceInformationProps {
  selectedInstance: LightInstance;
  setSelectedInstance: Dispatch<SetStateAction<LightInstance | undefined>>;
}

export function InstanceInformation(props: InstanceInformationProps) {
  const { selectedInstance, setSelectedInstance } = props;

  return (
    <Flex w="100%" justify="flex-start" align="stretch" direction="column" wrap="wrap" gap="xl">
      <InstanceInformationHeader
        selectedInstance={selectedInstance}
        setSelectedInstance={setSelectedInstance}
      />
      <Tabs defaultValue="balances">
        <Tabs.List grow>
          <Tabs.Tab value="balances" icon={<IconWallet size="0.8rem" />}>
            Balances
          </Tabs.Tab>
          <Tabs.Tab value="orders" icon={<IconFileInvoice size="0.8rem" />}>
            Open Orders
          </Tabs.Tab>
          <Tabs.Tab value="trades" icon={<IconExchange size="0.8rem" />}>
            Trades
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="balances" pt="xs">
          <InstanceBalances data={selectedInstance} />
        </Tabs.Panel>
        <Tabs.Panel value="orders" pt="xs">
          <InstanceMarginOpenOrders marginOpenOrders={selectedInstance.status.marginOpenOrders} />
        </Tabs.Panel>
        <Tabs.Panel value="trades" pt="xs">
          Trades Tab
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
}
