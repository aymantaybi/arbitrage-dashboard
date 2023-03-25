import { ActionIcon, Card, Flex, Stack, Text, Button, Collapse } from '@mantine/core';
import React from 'react';
import { IconCaretDown, IconCircleFilled, IconCaretUp } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import PairIcon from '../PairIcon/PairIcon';
import useStyles from './InstanceCard.styles';
import { LightInstance } from '../../interfaces';
import { getTokenIconSrc } from '../../helpers';

interface InstanceDetailProps {
  label: string;
  value: string | any;
}

function InstanceDetail(props: InstanceDetailProps) {
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
}

export function InstanceCard(props: InstanceCardProps) {
  const { classes } = useStyles();
  const { data } = props;

  const [isCollapseOpened, { toggle: toggleCollapseOpened }] = useDisclosure(false);

  return (
    <Card
      className={classes.instanceCard}
      shadow="sm"
      padding="lg"
      radius="md"
      maw={500}
      withBorder
      m="xs"
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
            label="STATUS"
            value={
              <IconCircleFilled
                size={18}
                opacity={0.75}
                style={{ color: data.status ? 'green' : 'red' }}
              />
            }
          />
          <InstanceDetail label="PROFIT" value={`${data.profit}$`} />
          <InstanceDetail label="TRADES" value={data.trades.toString()} />
        </Flex>
        <Collapse in={isCollapseOpened}>
          {data.status ? (
            <Flex gap="sm">
              <Button fullWidth variant="light">
                Restart
              </Button>
              <Button fullWidth variant="light" color="red">
                Stop
              </Button>
            </Flex>
          ) : (
            <Button fullWidth variant="light" color="green">
              Start
            </Button>
          )}
        </Collapse>
      </Stack>
    </Card>
  );
}
