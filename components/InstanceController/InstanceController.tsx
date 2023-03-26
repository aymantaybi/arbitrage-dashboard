import React from 'react';
import { Card, Stack, Button, Text } from '@mantine/core';

export function InstanceController() {
  return (
    <Card shadow="sm" radius="md" withBorder sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing="xs" justify="center" align="center">
        <Button size="lg" variant="light" color="purple" sx={{ alignSelf: 'center' }}>
          Create
        </Button>
        <Text opacity={0.5}>Or</Text>
        <Text opacity={0.7} size={22}>
          Select an Instance
        </Text>
      </Stack>
    </Card>
  );
}
