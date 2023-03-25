import React from 'react';
import useStyles from './TokenIconContainer.styles';

interface TokenIconContainerProps {
  children: any;
  size: number;
}

export function TokenIconContainer(props: TokenIconContainerProps) {
  const { classes } = useStyles();
  const { children, size } = props;
  return (
    <div style={{ height: size, width: size }} className={classes.container}>
      {children}
    </div>
  );
}
