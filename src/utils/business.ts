import numeral from 'numeral';

/**
 * Extracts and formats cryptocurrency asset data into a table-friendly format
 * @param assets Array of cryptocurrency asset data from API
 * @returns Array of formatted asset objects
 */
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

/**
 * Formats numerical values with specified pattern and decimal places
 * @param value Number to format (or undefined)
 * @param format Numeral.js the format string (describes the expected output format)
 * @param decimals Number of decimal places for small values (default: 2)
 * @returns Formatted string or 'N/A' if value is undefined
 */
export const formatValue = (value: number | undefined, format: string, decimals = 2) => {
  if (value === undefined) return 'N/A';
  return value < 1 ? Number(value).toFixed(decimals) : numeral(value).format(format);
};

/**
 * Calculates the sum of a specific numeric field across all assets
 * @param assets Array of cryptocurrency assets
 * @param key Property name to sum
 * @returns Total sum of the specified field
 */
export const calculateAssetPropTotal = (
  assets: API.Res.CryptoAsset[],
  key: keyof API.Res.CryptoAsset
) => {
  return assets.reduce((sum, asset) => sum + parseFloat(asset[key] as string), 0);
};

/**
 * Extracts and formats cryptocurrency market/exchange data into a table-friendly format
 * @param markets Array of exchange market data from API
 * @returns Array of formatted market objects
 */
export const extractCryptoMarketRow = (markets: API.Res.ExchangeMarket[]) =>
  markets
    .map((market) => ({
      key: market.exchangeId,
      rank: market.rank,
      name: market.name,
      percentTotalVolume: (Math.floor(parseFloat(market.percentTotalVolume) * 100) / 100).toFixed(
        2
      ),
      tradingPairs: market.tradingPairs,
      volumeUsd: formatValue(parseFloat(market.volumeUsd), '$0.00a'),
      exchangeUrl: market.exchangeUrl
    }))
    .sort((a, b) => Number(a.rank) - Number(b.rank));

/**
 * Calculates timestamp for a date in the past based on months or years
 * @param selector Unit of time ('month' or 'year')
 * @param count Number of units to subtract
 * @returns Unix timestamp in milliseconds
 */
export const getTimestamp = (selector: 'month' | 'year', count: number) => {
  const now = new Date();
  if (selector === 'month') now.setMonth(now.getMonth() - count);
  else now.setFullYear(now.getFullYear() - count);
  return now.getTime();
};
