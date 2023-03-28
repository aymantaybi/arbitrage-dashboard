import { Stack, Text, ScrollArea } from '@mantine/core';
import React from 'react';
import { LightInstance } from '../../interfaces';
import { InstanceCard } from '../InstanceCard/InstanceCard';

interface InstancesContainerProps {
  instances: LightInstance[];
  onSelect: (instance: LightInstance) => void;
  selectedInstance: LightInstance | undefined;
}

export function InstancesContainer(props: InstancesContainerProps) {
  const { instances, onSelect, selectedInstance } = props;

  const isInstanceSelected = (instance: LightInstance) =>
    selectedInstance !== undefined && instance.id === selectedInstance.id;

  return (
    <Stack spacing="xs" align="stretch">
      <Text weight={600} opacity={0.5} size={32} p="sm">
        Instances
      </Text>
      <ScrollArea h="80vh">
        {instances.map((instance) => (
          <InstanceCard
            data={instance}
            onClick={() => {
              onSelect(instance);
            }}
            isSelected={isInstanceSelected(instance)}
          />
        ))}
      </ScrollArea>
    </Stack>
  );
}
