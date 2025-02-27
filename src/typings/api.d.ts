// check https://docs.coincap.io/ for more info
declare namespace API {
  // REQUEST TYPES
  namespace Req {
    type AssetsParams =
      | {
          search?: string; // Search query to filter assets by name or symbol.
          ids?: never; //Asset IDs to fetch.
          limit?: number; // Maximum number of assets to return.
          offset?: number; // Offset for pagination
        }
      | { ids?: string; search?: never; limit?: number; offset?: number };

    interface AssetsHistoryParams {
      id: string;
      interval: import('@/typings/models').AssetHistoryIntervals; // Interval for historical data (e.g., "d1" for daily).
      duration?: {
        start: number; // Start timestamp (in milliseconds).
        end: number; // End timestamp (in milliseconds).
      };
    }

    interface AssetsMarketsParams {
      id: string;
      limit?: number;
      offset?: number;
    }
  }
  // RESPONSE TYPES
  namespace Res {
    interface CryptoAsset {
      id: string;
      rank: string;
      symbol: string; // Symbol of the asset (e.g., BTC).
      name: string;
      supply: string; // Current circulating supply of the asset.
      maxSupply?: string;
      marketCapUsd: string; // Market capitalization in USD.
      volumeUsd24Hr: string; // Trading volume in USD over the last 24 hours.
      priceUsd: string;
      changePercent24Hr?: string; // Percentage change in price over the last 24 hours
      vwap24Hr?: string; // Volume-weighted average price over the last 24 hours.
    }
    interface CryptoAssetHistory {
      priceUsd: string; //Price in USD at the given time
      circulationSupply: string; // Circulating supply at the given time
      time: number; // Timestamp of the data point (in milliseconds)
      date: string; // Date of the data point (formatted as a string)
    }

    interface CryptoAssetMarket {
      exchangeId: string;
      baseId: string;
      quoteId: string;
      baseSymbol: string;
      quoteSymbol: string;
      volumeUsd24Hr?: string; // Trading volume in USD over the last 24 hours
      priceUsd: string;
      volumePercent: string; // Percentage of total volume for this market
    }

    interface ExchangeMarket {
      exchangeId: string;
      rank: string;
      name: string; // Percentage of total trading volume.
      percentTotalVolume: string; // Number of trading pairs available on the exchange.
      tradingPairs: string;
      socket: string;
      volumeUsd: string; // Trading volume in USD.
      exchangeUrl: string;
      updated: string; // Timestamp of the last update.
    }
  }
}
