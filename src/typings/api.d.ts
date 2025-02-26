declare namespace API {
  // REQUEST TYPES
  namespace Req {
    type AssetsParams =
      | { search?: string; ids?: never; limit?: number; offset?: number }
      | { ids?: string; search?: never; limit?: number; offset?: number };

    interface AssetsHistoryParams {
      id: string;
      interval: Models.AssetHistoryIntervals;
      duration?: {
        start: number;
        end: number;
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
      symbol: string;
      name: string;
      supply: string;
      maxSupply?: string;
      marketCapUsd: string;
      volumeUsd24Hr: string;
      priceUsd: string;
      changePercent24Hr?: string;
      vwap24Hr?: string;
    }

    interface CryptoAssetHistory {
      priceUsd: string;
      circulationSupply: string;
      time: number;
      date: string;
    }

    interface CryptoAssetMarket {
      exchangeId: string;
      baseId: string;
      quoteId: string;
      baseSymbol: string;
      quoteSymbol: string;
      volumeUsd24Hr?: string;
      priceUsd: string;
      volumePercent: string;
    }

    interface ExchangeMarket {
      exchangeId: string;
      rank: string;
      name: string;
      percentTotalVolume: string;
      tradingPairs: string;
      socket: string;
      volumeUsd: string;
      exchangeUrl: string;
      updated: string;
    }
  }
}
