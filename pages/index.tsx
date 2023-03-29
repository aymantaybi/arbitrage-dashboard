import { useQuery } from '@apollo/client';
import { AppShell, Header, Flex, Grid } from '@mantine/core';
import { useState } from 'react';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { InstanceController } from '../components/InstanceController/InstanceController';
import { InstancesContainer } from '../components/InstancesContainer/InstancesContainer';
import { LightInstance } from '../interfaces';
import { GET_INSTANCES } from '../constants';

export default function HomePage() {
  const [instances, setInstance] = useState<LightInstance[]>([]);
  const [selectedInstance, setSelectedInstance] = useState<LightInstance | undefined>(undefined);

  useQuery<{ instances: LightInstance[] }>(GET_INSTANCES, {
    onCompleted(data) {
      setInstance(data.instances);
    },
  });

  const handleInstanceSelect = (item: LightInstance) => {
    setSelectedInstance(item);
  };

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
