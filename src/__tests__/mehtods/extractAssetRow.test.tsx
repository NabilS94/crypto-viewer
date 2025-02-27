import { extractAssetRow } from "@/utils/business";
import numeral from "numeral";
import { describe, expect, it } from "vitest";

describe("extractAssetRow", () => {
  it("should extract and format asset data correctly", () => {
    const assets = [
      {
        id: "bitcoin",
        rank: "1",
        symbol: "btc",
        name: "Bitcoin",
        supply: "21000000",
        marketCapUsd: "1000000000",
        volumeUsd24Hr: "50000000",
        priceUsd: "50000",
        changePercent24Hr: "5.1234",
        vwap24Hr: "49000",
      },
    ];

    const result = extractAssetRow(assets);

    expect(result).toEqual([
      {
        key: "bitcoin",
        rank: "1",
        symbol: "BTC",
        name: "Bitcoin",
        supply: numeral(21000000).format("0.00a"),
        marketCapUsd: numeral(1000000000).format("$0.00a"),
        volumeUsd24Hr: numeral(50000000).format("$0.00a"),
        priceUsd: numeral(50000).format("$0,0.00"),
        changePercent24Hr: "5.12",
        vwap24Hr: numeral(49000).format("$0,0.00"),
      },
    ]);
  });

  it("should handle undefined values gracefully", () => {
    const assets = [
      {
        id: "bitcoin",
        rank: "1",
        symbol: "btc",
        name: "Bitcoin",
        supply: undefined,
        marketCapUsd: undefined,
        volumeUsd24Hr: undefined,
        priceUsd: undefined,
        changePercent24Hr: undefined,
        vwap24Hr: undefined,
      },
    ];

    // @ts-expect-error: the input type is not supported but the test is needed
    const result = extractAssetRow(assets);

    expect(result).toEqual([
      {
        key: "bitcoin",
        rank: "1",
        symbol: "BTC",
        name: "Bitcoin",
        supply: "0.00",
        marketCapUsd: "$0.00",
        volumeUsd24Hr: "$0.00",
        priceUsd: "$0.00",
        changePercent24Hr: "N/A",
        vwap24Hr: "$0.00",
      },
    ]);
  });

  it("should handle very large numbers correctly", () => {
    const assets = [
      {
        id: "bitcoin",
        rank: "1",
        symbol: "btc",
        name: "Bitcoin",
        supply: "1000000000000",
        marketCapUsd: "1000000000000000",
        volumeUsd24Hr: "1000000000000",
        priceUsd: "1000000",
        changePercent24Hr: "1000.1234",
        vwap24Hr: "1000000",
      },
    ];

    const result = extractAssetRow(assets);

    expect(result).toEqual([
      {
        key: "bitcoin",
        rank: "1",
        symbol: "BTC",
        name: "Bitcoin",
        supply: numeral(1000000000000).format("0.00a"),
        marketCapUsd: numeral(1000000000000000).format("$0.00a"),
        volumeUsd24Hr: numeral(1000000000000).format("$0.00a"),
        priceUsd: numeral(1000000).format("$0,0.00"),
        changePercent24Hr: "1000.12",
        vwap24Hr: numeral(1000000).format("$0,0.00"),
      },
    ]);
  });

  it("should handle missing fields gracefully", () => {
    const assets = [
      {
        id: "bitcoin",
        rank: "1",
        symbol: "btc",
        name: "Bitcoin",
        // Missing fields: supply, marketCapUsd, volumeUsd24Hr, priceUsd, changePercent24Hr, vwap24Hr
      },
    ];

    // @ts-expect-error: input is not supported but test is needed
    const result = extractAssetRow(assets);

    expect(result).toEqual([
      {
        key: "bitcoin",
        rank: "1",
        symbol: "BTC",
        name: "Bitcoin",
        supply: "0.00",
        marketCapUsd: "$0.00",
        volumeUsd24Hr: "$0.00",
        priceUsd: "$0.00",
        changePercent24Hr: "N/A",
        vwap24Hr: "$0.00",
      },
    ]);
  });
});
