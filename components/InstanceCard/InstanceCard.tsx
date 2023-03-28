import { ActionIcon, Card, Flex, Stack, Text, Button, Collapse, Image } from '@mantine/core';
import React from 'react';
import { IconCaretDown, IconCircleFilled, IconCaretUp } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import PairIcon from '../PairIcon/PairIcon';
import useStyles from './InstanceCard.styles';
import { LightInstance } from '../../interfaces';
import { getChainIconSrc, getTokenIconSrc } from '../../helpers';

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
}

export function InstanceCard(props: InstanceCardProps) {
  const { classes } = useStyles();
  const { data, onClick, isSelected } = props;

  const [isCollapseOpened, { toggle: toggleCollapseOpened }] = useDisclosure(false);

  return (
    <Card
      className={classes.instanceCard}
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
