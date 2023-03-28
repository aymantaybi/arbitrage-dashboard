import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  instanceCard: {
    borderColor: theme.colors.dark[5],
    '&:hover': {
      scale: '1.01',
      borderColor: theme.colors.blue[5],
    },
  },
  selectedInstanceCard: {
    scale: '1.01',
    borderColor: theme.colors.blue[5],
  },
}));
