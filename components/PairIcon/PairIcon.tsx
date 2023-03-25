import React from 'react';
import { Image } from '@mantine/core';
import { TokenIconContainer } from '../TokenIconContainer/TokenIconContainer';
import useStyles from './PairIcon.styles';

interface PairIconProps {
  base: string;
  quote: string;
}

function PairIcon(props: PairIconProps) {
  const { classes } = useStyles();
  const { base, quote } = props;
  return (
    <div className={classes.container}>
      <TokenIconContainer size={43}>
        <Image width={36} height={36} src={base} />
      </TokenIconContainer>
      <TokenIconContainer size={43}>
        <Image width={36} height={36} src={quote} />
      </TokenIconContainer>
    </div>
  );
}

export default PairIcon;
