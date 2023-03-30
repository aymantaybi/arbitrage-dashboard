import { useMutation, useQuery } from '@apollo/client';
import { AppShell, Header, Flex, Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { InstanceController } from '../components/InstanceController/InstanceController';
import { InstancesContainer } from '../components/InstancesContainer/InstancesContainer';
import { LightInstance } from '../interfaces';
import { GET_INSTANCES, START_INSTANCE, STOP_INSTANCE } from '../constants';

export default function HomePage() {
  const [instances, setInstances] = useState<LightInstance[]>([]);
  const [selectedInstance, setSelectedInstance] = useState<LightInstance | undefined>(undefined);

  useQuery<{ instances: LightInstance[] }>(GET_INSTANCES, {
    onCompleted(data) {
      setInstances(data.instances);
    },
  });

  const [startInstance] = useMutation<
    { startInstance: LightInstance },
    { chainId: number; id: string }
  >(START_INSTANCE, {
    onCompleted(data) {
      setInstances((current) =>
        current.map((instance) =>
          instance.id === data.startInstance.id ? data.startInstance : instance
        )
      );
    },
  });

  const [stopInstance] = useMutation<
    { stopInstance: LightInstance },
    { chainId: number; id: string }
  >(STOP_INSTANCE, {
    onCompleted(data) {
      setInstances((current) =>
        current.map((instance) =>
          instance.id === data.stopInstance.id ? data.stopInstance : instance
        )
      );
    },
  });

  const handleInstanceSelect = (item: LightInstance) => {
    setSelectedInstance(item);
  };

  useEffect(() => {
    const instance = instances.find((item) => item.id === selectedInstance?.id);
    setSelectedInstance(instance);
  }, [instances]);

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
            onSelect={handleInstanceSelect}
            selectedInstance={selectedInstance}
            startInstance={startInstance}
            stopInstance={stopInstance}
          />
        </Grid.Col>
        <Grid.Col h="100%" span={7}>
          <InstanceController
            selectedInstance={selectedInstance}
            setSelectedInstance={setSelectedInstance}
          />
        </Grid.Col>
      </Grid>
    </AppShell>
  );
}
