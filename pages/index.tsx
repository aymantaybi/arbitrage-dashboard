import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { AppShell, Header, Flex, Grid } from '@mantine/core';
import { useState } from 'react';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { InstanceController } from '../components/InstanceController/InstanceController';
import { InstancesContainer } from '../components/InstancesContainer/InstancesContainer';
import { LightInstance } from '../interfaces';
import {
  GET_INSTANCES,
  INSTANCE_UPDATE,
  START_INSTANCE,
  STOP_INSTANCE,
  UPDATE_INSTANCE,
} from '../constants';

const chainId = 2020;

export default function HomePage() {
  const [instances, setInstances] = useState<LightInstance[]>([]);
  const [selectedInstance, setSelectedInstance] = useState<LightInstance | undefined>(undefined);

  useQuery<{ instances: LightInstance[] }>(GET_INSTANCES, {
    variables: { chainId },
    onCompleted(data) {
      setInstances(data.instances);
    },
  });

  const [startInstance] = useMutation<
    { startInstance: LightInstance },
    { chainId: number; id: string }
  >(START_INSTANCE);

  const [stopInstance] = useMutation<
    { stopInstance: LightInstance },
    { chainId: number; id: string }
  >(STOP_INSTANCE);

  const [updateInstance] = useMutation<
    { updateInstance: LightInstance },
    {
      chainId: number;
      id: string;
      configuration: Omit<LightInstance.Configuration, 'distributions'> & {
        distributions: Omit<LightInstance.Configuration.Distribution, 'id'>[];
      };
    }
  >(UPDATE_INSTANCE);

  useSubscription<{ instanceUpdate: LightInstance }>(INSTANCE_UPDATE, {
    variables: { chainId },
    onData({ data }) {
      const instanceUpdate = data.data?.instanceUpdate;
      if (!instanceUpdate) return;
      setInstances((current) =>
        current.map((instance) => (instance.id === instanceUpdate.id ? instanceUpdate : instance))
      );
      setSelectedInstance((current) =>
        current?.id === instanceUpdate.id ? instanceUpdate : current
      );
    },
  });

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
      <Grid h="100%">
        <Grid.Col h="100%" span={5}>
          <InstancesContainer
            instances={instances}
            onSelect={setSelectedInstance}
            selectedInstance={selectedInstance}
            startInstance={startInstance}
            stopInstance={stopInstance}
          />
        </Grid.Col>
        <Grid.Col h="100%" span={7}>
          <InstanceController
            selectedInstance={selectedInstance}
            setSelectedInstance={setSelectedInstance}
            updateInstance={updateInstance}
          />
        </Grid.Col>
      </Grid>
    </AppShell>
  );
}
