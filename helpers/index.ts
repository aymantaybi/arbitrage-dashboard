export function getTokenIconSrc(symbol: string) {
  if (symbol === 'SLP') return './slp.png';
  if (symbol === 'BUSD') return './busd.png';
  if (symbol === 'WETH') return './weth.png';
  return './question-mark.png';
}

export function getChainIconSrc(id: number) {
  if (id === 2020) return './ronin.png';
  return './question-mark.png';
}
