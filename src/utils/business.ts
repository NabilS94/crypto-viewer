import numeral from 'numeral';

// Extract and format asset data
export const extractAssetRow = (assets: API.Res.CryptoAsset[]) =>
  assets.map((asset) => ({
    key: asset.id,
    rank: asset.rank,
    symbol: asset.symbol.toUpperCase(),
    name: asset.name,
    supply: formatValue(parseFloat(asset.supply), '0.00a'),
    marketCapUsd: formatValue(parseFloat(asset.marketCapUsd), '$0.00a'),
    volumeUsd24Hr: formatValue(parseFloat(asset.volumeUsd24Hr), '$0.00a'),
    priceUsd: formatValue(parseFloat(asset.priceUsd), '$0,0.00', 6),
    changePercent24Hr: asset.changePercent24Hr
      ? (Math.floor(parseFloat(asset.changePercent24Hr) * 100) / 100).toFixed(2)
      : 'N/A',
    vwap24Hr: formatValue(parseFloat(asset.vwap24Hr ?? ''), '$0,0.00', 6)
  }));

export const formatValue = (value: number | undefined, format: string, decimals = 2) => {
  if (value === undefined) return 'N/A';
  return value < 1 ? Number(value).toFixed(decimals) : numeral(value).format(format);
};

export const calculateTotal = (assets: API.Res.CryptoAsset[], key: keyof API.Res.CryptoAsset) => {
  return assets.reduce((sum, asset) => sum + parseFloat(asset[key] as string), 0);
};

export const extractCryptoMarketRow = (markets: API.Res.ExchangeMarket[]) =>
  markets.map((market) => ({
    key: market.exchangeId,
    rank: market.rank,
    name: market.name,
    percentTotalVolume: (Math.floor(parseFloat(market.percentTotalVolume) * 100) / 100).toFixed(2),
    tradingPairs: market.tradingPairs,
    volumeUsd: formatValue(parseFloat(market.volumeUsd), '$0.00a'),
    exchangeUrl: market.exchangeUrl
  }));

export const getTimestamp = (selector: 'month' | 'year', count: number) => {
  const now = new Date();
  if (selector === 'month') now.setMonth(now.getMonth() - count);
  else now.setFullYear(now.getFullYear() - count);
  return now.getTime();
};
