import { ApolloCache, DefaultContext, MutationFunctionOptions } from '@apollo/client';
import { ActionIcon, Button, Card, Collapse, Flex, Image, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCaretDown, IconCaretUp, IconCircleFilled } from '@tabler/icons-react';
import React from 'react';
import { getChainIconSrc, getTokenIconSrc } from '../../helpers';
import { LightInstance } from '../../interfaces';
import PairIcon from '../PairIcon/PairIcon';
import useStyles from './InstanceCard.styles';

interface InstanceDetailProps {
  label: string;
  value: string | any;
}

export function InstanceDetail(props: InstanceDetailProps) {
  const { label, value } = props;

  return (
    <Stack align="center" spacing="xs">
      <Text opacity={0.75} weight={700}>
        {label}
      </Text>
      <div>{typeof value === 'string' ? <Text>{value}</Text> : value}</div>
    </Stack>
  );
}

interface InstanceCardProps {
  data: LightInstance;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  isSelected: boolean;
  startInstance: (
    options?:
      | MutationFunctionOptions<
          {
            startInstance: LightInstance;
          },
          {
            id: string;
          },
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
  stopInstance: (
    options?:
      | MutationFunctionOptions<
          {
            stopInstance: LightInstance;
          },
          {
            id: string;
          },
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
}

export function InstanceCard(props: InstanceCardProps) {
  const { classes } = useStyles();
  const { data, onClick, isSelected, startInstance, stopInstance } = props;

  const [isCollapseOpened, { toggle: toggleCollapseOpened }] = useDisclosure(false);

  return (
    <Card
      className={isSelected ? classes.selectedInstanceCard : classes.instanceCard}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      m="xs"
      onClick={onClick}
    >
      <Stack spacing="xl">
        <Flex justify="space-between" align="center" direction="row" wrap="wrap">
          <PairIcon
            base={getTokenIconSrc(data.market.baseToken.symbol)}
            quote={getTokenIconSrc(data.market.quoteToken.symbol)}
          />
          <ActionIcon>
            {isCollapseOpened ? (
              <IconCaretUp onClick={toggleCollapseOpened} />
            ) : (
              <IconCaretDown onClick={toggleCollapseOpened} />
            )}
          </ActionIcon>
        </Flex>
        <Flex justify="space-between" align="center" direction="row" wrap="wrap">
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
                style={{ color: data.status.active ? 'green' : 'red' }}
              />
            }
          />
          <InstanceDetail label="PROFIT" value={`${0}$`} />
          <InstanceDetail label="TRADES" value={0} />
        </Flex>
        <Collapse in={isCollapseOpened}>
          {data.status.active ? (
            <Flex gap="sm">
              <Button fullWidth variant="light">
                Restart
              </Button>
              <Button
                fullWidth
                variant="light"
                color="red"
                onClick={() => {
                  stopInstance({ variables: { id: data.id } });
                }}
              >
                Stop
              </Button>
            </Flex>
          ) : (
            <Button
              fullWidth
              variant="light"
              color="green"
              onClick={() => {
                startInstance({ variables: { id: data.id } });
              }}
            >
              Start
            </Button>
          )}
        </Collapse>
      </Stack>
    </Card>
  );
}
