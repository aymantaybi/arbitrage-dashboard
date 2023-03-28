export function getTokenIconSrc(symbol: string) {
  if (symbol === 'SLP') return 'https://s2.coinmarketcap.com/static/img/coins/64x64/5824.png';
  if (symbol === 'BUSD') return 'https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png';
  if (symbol === 'WETH') return 'https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png';
  return './question-mark.png';
}

export function getChainIconSrc(id: number) {
  if (id === 2020) return 'https://s2.coinmarketcap.com/static/img/coins/64x64/14101.png';
  return './question-mark.png';
}
