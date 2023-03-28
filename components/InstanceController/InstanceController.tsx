import React, { Dispatch, SetStateAction } from 'react';
import { Card, Stack, Button, Text } from '@mantine/core';
import { LightInstance } from '../../interfaces';
import { InstanceInformation } from '../InstanceInformation/InstanceInformation';

interface InstanceControllerProps {
  selectedInstance: LightInstance | undefined;
  setSelectedInstance: Dispatch<SetStateAction<LightInstance | undefined>>;
}

export function InstanceController(props: InstanceControllerProps) {
  const { selectedInstance, setSelectedInstance } = props;

  return (
    <Card h="100%" shadow="sm" radius="md" withBorder sx={{ display: 'flex', justifyContent: 'center' }}>
      {selectedInstance ? (
        <InstanceInformation
          selectedInstance={selectedInstance}
          setSelectedInstance={setSelectedInstance}
        />
      ) : (
        <Stack spacing="xs" justify="center" align="center">
          <Button size="lg" variant="light" color="purple" sx={{ alignSelf: 'center' }}>
            Create
          </Button>
          <Text opacity={0.5}>Or</Text>
          <Text opacity={0.7} size={22}>
            Select an Instance
          </Text>
        </Stack>
      )}
    </Card>
  );
}
