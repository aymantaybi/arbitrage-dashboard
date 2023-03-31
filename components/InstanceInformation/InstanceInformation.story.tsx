import { useState } from 'react';
import { LightInstance } from '../../interfaces';
import { InstanceInformation } from './InstanceInformation';

export default {
  title: 'InstanceInformation',
};

export function Usage() {
  const [selectedInstance, setSelectedInstance] = useState<LightInstance | undefined>(undefined);

  return selectedInstance ? (
    <InstanceInformation
      selectedInstance={selectedInstance}
      setSelectedInstance={setSelectedInstance}
    />
  ) : (
    <div />
  );
}
