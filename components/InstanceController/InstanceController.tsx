import React, { Dispatch, SetStateAction } from 'react';
import { Card, Stack, Button, Text } from '@mantine/core';
import { MutationFunctionOptions, DefaultContext, ApolloCache } from '@apollo/client';
import { LightInstance } from '../../interfaces';
import { InstanceInformation } from '../InstanceInformation/InstanceInformation';

interface InstanceControllerProps {
  selectedInstance: LightInstance | undefined;
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

export function InstanceController(props: InstanceControllerProps) {
  const { selectedInstance, setSelectedInstance, updateInstance } = props;

  return (
    <Card
      h="100%"
      shadow="sm"
      radius="md"
      withBorder
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      {selectedInstance ? (
        <InstanceInformation
          selectedInstance={selectedInstance}
          setSelectedInstance={setSelectedInstance}
          updateInstance={updateInstance}
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
