import { calculateTotal } from '@/utils/business';
import { describe, expect, it } from 'vitest';

describe('calculateTotal', () => {
  it('should calculate the total value of a key in assets', () => {
    const assets = [
      {
        id: 'bitcoin',
        rank: '1',
        symbol: 'btc',
        name: 'Bitcoin',
        supply: '21000000',
        marketCapUsd: '1000000000',
        volumeUsd24Hr: '50000000',
        priceUsd: '50000',
        changePercent24Hr: '5.1234',
        vwap24Hr: '49000'
      },
      {
        id: 'ethereum',
        rank: '1',
        symbol: 'eth',
        name: 'Bitcoin',
        supply: '21000000',
        marketCapUsd: '1000000000',
        volumeUsd24Hr: '50000000',
        priceUsd: '3000',
        changePercent24Hr: '5.1234',
        vwap24Hr: '49000'
      }
    ];

    const total = calculateTotal(assets, 'priceUsd');
    expect(total).toBe(53000);
  });

  it('should return 0 for an empty array', () => {
    const total = calculateTotal([], 'priceUsd');
    expect(total).toBe(0);
  });
});
