import { Grid, Flex, Image, Tabs, Table, Stack, Text } from '@mantine/core';
import { IconCircleFilled, IconExchange, IconFileInvoice, IconWallet } from '@tabler/icons-react';
import { getChainIconSrc, getTokenIconSrc } from '../../helpers';
import { LightInstance, MarginOpenOrder } from '../../interfaces';
import { InstanceDetail } from '../InstanceCard/InstanceCard';
import PairIcon from '../PairIcon/PairIcon';
import { TokenIconContainer } from '../TokenIconContainer/TokenIconContainer';
import useStyles from './InstanceInformation.styles';

interface InstanceInformationHeaderProps {
  data: LightInstance;
}

function InstanceInformationHeader(props: InstanceInformationHeaderProps) {
  const { classes } = useStyles();

  const { data } = props;

  return (
    <Grid p="xl" columns={12}>
      <Grid.Col className={classes.headerGridCol} span={6}>
        <PairIcon
          base={getTokenIconSrc(data.market.baseToken.symbol)}
          quote={getTokenIconSrc(data.market.quoteToken.symbol)}
        />
      </Grid.Col>
      <Grid.Col className={classes.headerGridCol} span={3}>
        <InstanceDetail
          label="NETWORK"
          value={<Image width={25} height={25} src={getChainIconSrc(2020)} />}
        />
      </Grid.Col>
      <Grid.Col className={classes.headerGridCol} span={3}>
        <InstanceDetail
          label="ACTIVE"
          value={
            <IconCircleFilled
              size={18}
              opacity={0.75}
              style={{ color: data.status.active ? 'green' : 'red' }}
            />
          }
        />
      </Grid.Col>
    </Grid>
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
        <TokenIconContainer size={43}>
          <Image width={36} height={36} src={getTokenIconSrc(balance.asset)} />
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
        <TokenIconContainer size={43}>
          <Image width={36} height={36} src={getTokenIconSrc(token.symbol)} />
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

  return (
    <Stack spacing="xs">
      <Text size={20} weight={700} bg="grey" align="center">
        Margin
      </Text>
      <InstanceMarginBalances balances={data.status.marginBalances} />
      <Text size={20} weight={700} bg="grey" align="center">
        On Chain
      </Text>
      <InstanceOnChainBalances
        tokens={data.status.onChainBalances.tokens}
        account={data.status.onChainBalances.account}
      />
    </Stack>
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
        <td>{side}</td>
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
  data: LightInstance;
}

export function InstanceInformation(props: InstanceInformationProps) {
  const { classes } = useStyles();

  const { data } = props;

  return (
    <Flex justify="flex-start" align="stretch" direction="column" wrap="wrap" gap="xl">
      <InstanceInformationHeader data={data} />
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
          <InstanceBalances data={data} />
        </Tabs.Panel>
        <Tabs.Panel value="orders" pt="xs">
          <InstanceMarginOpenOrders marginOpenOrders={data.status.marginOpenOrders} />
        </Tabs.Panel>
        <Tabs.Panel value="trades" pt="xs">
          Trades Tab
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
}
