import {
  Flex,
  Image,
  Tabs,
  Table,
  Select,
  ActionIcon,
  Stack,
  Text,
  NumberInput,
} from '@mantine/core';
import {
  IconCircleFilled,
  IconExchange,
  IconFileInvoice,
  IconX,
  IconWallet,
  IconSettings,
  IconEdit,
  IconDeviceFloppy,
  IconSquarePlus,
  IconSquareX,
} from '@tabler/icons-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useToggle } from '@mantine/hooks';
import { MutationFunctionOptions, DefaultContext, ApolloCache } from '@apollo/client';
import { getChainIconSrc, getTokenIconSrc } from '../../helpers';
import { LightInstance, MarginOpenOrder } from '../../interfaces';
import { InstanceDetail } from '../InstanceCard/InstanceCard';
import PairIcon from '../PairIcon/PairIcon';
import { TokenIconContainer } from '../TokenIconContainer/TokenIconContainer';

interface InstanceInformationHeaderProps {
  selectedInstance: LightInstance;
  setSelectedInstance: Dispatch<SetStateAction<LightInstance | undefined>>;
}

function InstanceInformationHeader(props: InstanceInformationHeaderProps) {
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
  const { account, tokens } = props;
  console.log(account);
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
        <td>{Number(price)}</td>
        <td>{Number(origQty)}</td>
        <td>{Number(executedQty)}</td>
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

interface InstanceConfigurationProps {
  selectedInstance: LightInstance;
  updateInstance: (
    options?:
      | MutationFunctionOptions<
          {
            updateInstance: LightInstance;
          },
          {
            chainId: number;
            id: string;
            configuration: Omit<LightInstance.Configuration, 'distributions'> & {
              distributions: Omit<LightInstance.Configuration.Distribution, 'id'>[];
            };
          },
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
}

function InstanceConfiguration(props: InstanceConfigurationProps) {
  const { selectedInstance, updateInstance } = props;
  const { configuration } = selectedInstance;
  const { distributions } = configuration;

  const [unsavedDistributions, setUnsavedDistributions] = useState(distributions);
  const [addedDistribution, setAddedDistribution] = useState<{
    minROI: number;
    maxQuantity: number;
  }>({ minROI: 0, maxQuantity: 0 });

  const [isEditing, toggleIsEditing] = useToggle();

  const handleDistributionChange =
    (distribution: { id: number; minROI: number; maxQuantity: number }, key: string) =>
    (value: number | '') => {
      setUnsavedDistributions((current) =>
        current.map((item) =>
          item.id === distribution.id ? { ...item, [key]: Number(value) } : item
        )
      );
    };

  const handleSaveDistributions = () => {
    const { id, chainId } = selectedInstance;
    const newDistributions = unsavedDistributions
      .filter(({ maxQuantity }) => maxQuantity > 0)
      .map(({ maxQuantity, minROI }) => ({ maxQuantity, minROI }));
    updateInstance({
      variables: {
        chainId,
        id,
        configuration: { ...configuration, distributions: newDistributions },
      },
      onCompleted(data) {
        setUnsavedDistributions(data.updateInstance.configuration.distributions);
      },
    });
  };

  return (
    <Stack w="100%" h="100%" spacing="xl" p="xl">
      <Flex justify="flex-start" align="center" direction="row" wrap="wrap">
        <Text size="xl" fw="bold">
          Distributions
        </Text>
        <ActionIcon
          color={isEditing ? 'blue' : 'green'}
          variant="transparent"
          onClick={() => {
            if (isEditing) {
              handleSaveDistributions();
            }
            toggleIsEditing();
          }}
        >
          {isEditing ? <IconDeviceFloppy /> : <IconEdit />}
        </ActionIcon>
        {isEditing && (
          <ActionIcon
            color="red"
            variant="transparent"
            onClick={() => {
              setUnsavedDistributions(distributions);
              toggleIsEditing();
            }}
          >
            <IconSquareX />
          </ActionIcon>
        )}
      </Flex>
      <Table
        horizontalSpacing="xl"
        verticalSpacing="xs"
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Min ROI</th>
            <th>Max Quantity</th>
          </tr>
        </thead>
        <tbody>
          {(isEditing ? unsavedDistributions : distributions).map((element) => (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>
                {isEditing ? (
                  <NumberInput
                    hideControls
                    value={element.minROI}
                    precision={5}
                    onChange={handleDistributionChange(element, 'minROI')}
                  />
                ) : (
                  <Text>{element.minROI}</Text>
                )}
              </td>
              <td>
                {isEditing ? (
                  <NumberInput
                    hideControls
                    value={element.maxQuantity}
                    onChange={handleDistributionChange(element, 'maxQuantity')}
                  />
                ) : (
                  <Text>{element.maxQuantity}</Text>
                )}
              </td>
            </tr>
          ))}
          {isEditing && (
            <tr key="new">
              <td>
                <ActionIcon size="xl">
                  <IconSquarePlus
                    size="2.125rem"
                    onClick={() => {
                      setUnsavedDistributions((current) => [
                        ...current,
                        { ...addedDistribution, id: current.length },
                      ]);
                    }}
                  />
                </ActionIcon>
              </td>
              <td>
                <NumberInput
                  hideControls
                  value={addedDistribution.minROI}
                  precision={5}
                  onChange={(value) => {
                    setAddedDistribution((current) => ({ ...current, minROI: Number(value) }));
                  }}
                />
              </td>
              <td>
                <NumberInput
                  hideControls
                  value={addedDistribution.maxQuantity}
                  onChange={(value) => {
                    setAddedDistribution((current) => ({ ...current, maxQuantity: Number(value) }));
                  }}
                />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Stack>
  );
}

interface InstanceInformationProps {
  selectedInstance: LightInstance;
  setSelectedInstance: Dispatch<SetStateAction<LightInstance | undefined>>;
  updateInstance: (
    options?:
      | MutationFunctionOptions<
          {
            updateInstance: LightInstance;
          },
          {
            chainId: number;
            id: string;
            configuration: Omit<LightInstance.Configuration, 'distributions'> & {
              distributions: Omit<LightInstance.Configuration.Distribution, 'id'>[];
            };
          },
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
}

export function InstanceInformation(props: InstanceInformationProps) {
  const { selectedInstance, setSelectedInstance, updateInstance } = props;

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
            {`Open Orders (${selectedInstance.status.marginOpenOrders.length})`}
          </Tabs.Tab>
          <Tabs.Tab value="trades" icon={<IconExchange size="0.8rem" />}>
            Trades
          </Tabs.Tab>
          <Tabs.Tab value="configuration" icon={<IconSettings size="0.8rem" />}>
            Configuration
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
        <Tabs.Panel value="configuration" pt="xs">
          <InstanceConfiguration
            selectedInstance={selectedInstance}
            updateInstance={updateInstance}
          />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
}
