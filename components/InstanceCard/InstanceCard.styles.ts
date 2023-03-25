import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  instanceCard: {
    '&:hover': {
      scale: '1.01',
      borderColor: theme.colors.blue[5],
    },
  },
}));
