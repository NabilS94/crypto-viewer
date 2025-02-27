import { extractCryptoMarketRow } from '@/utils/business';
import { describe, expect, it } from 'vitest';

describe('extractCryptoMarketRow', () => {
  it('should extract and format market data correctly', () => {
    const markets = [
      {
        exchangeId: 'binance',
        rank: '1',
        name: 'Binance',
        percentTotalVolume: '20.1234',
        tradingPairs: '500',
        volumeUsd: '1000000000',
        exchangeUrl: 'https://binance.com',
        socket: '',
        updated: ''
      }
    ];

    const result = extractCryptoMarketRow(markets);

    expect(result).toEqual([
      {
        key: 'binance',
        rank: '1',
        name: 'Binance',
        percentTotalVolume: '20.12',
        tradingPairs: '500',
        volumeUsd: '$1.00b',
        exchangeUrl: 'https://binance.com'
      }
    ]);
  });
});
