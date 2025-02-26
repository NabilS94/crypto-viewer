"use client";
import { formatValue } from "@/utils/business";
import { useMemo } from "react";
import Icon, { IconTypes } from "../Icon";
import { StatComponent } from "./AssetStat";

const STATS_TITLES = {
  RANK: "Rank",
  MARKET_CAP: "Market Cap",
  EXCHANGE_VOLUME: "Volume (24h)",
  SUPPLY: "Supply",
};

export const AssetDescription = (props: { data: API.Res.CryptoAsset }) => {
  const statsList = useMemo(
    () => [
      { title: STATS_TITLES.RANK, value: `#${props.data.rank}` },
      {
        title: STATS_TITLES.MARKET_CAP,
        value: formatValue(
          parseFloat(props.data.marketCapUsd),
          "$0.00a"
        ).toUpperCase(),
      },
      {
        title: STATS_TITLES.EXCHANGE_VOLUME,
        value: formatValue(
          parseFloat(props.data.volumeUsd24Hr),
          "$0.00a"
        ).toUpperCase(),
      },
      {
        title: STATS_TITLES.SUPPLY,
        value: formatValue(
          parseFloat(props.data.supply),
          "0.00a"
        ).toUpperCase(),
      },
    ],
    [
      props.data.marketCapUsd,
      props.data.supply,
      props.data.volumeUsd24Hr,
      props.data.rank,
    ]
  );

  const changePercentage =
    Math.floor(parseFloat(props.data.changePercent24Hr ?? "") * 100) / 100;

  return (
    <div className="py-5">
      <div className="flex flex-row flex-wrap justify-around max-sm:flex-col">
        <div className="flex flex-row max-sm:mb-6">
          <Icon
            type={props.data.id as IconTypes}
            className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] mr-2"
          />
          <div className="flex flex-col items-start">
            <p className="text-white font-semibold text-xl md:text-4xl mb-4">{`${props.data.name} (${props.data.symbol})`}</p>
            <p className="text-white text-sm md:text-2xl text-center font-semibold">
              {`${formatValue(parseFloat(props.data.priceUsd), "$0,0.00", 6)}`}
              <span
                className={`ml-3 ${
                  changePercentage > 0
                    ? "text-success after:content-['▲']"
                    : "text-red-500 after:content-['▼']"
                }  after:ml-1 after:text-sm`}
              >
                {`${changePercentage.toFixed(2)}%`}
              </span>
            </p>
          </div>
        </div>
        {statsList.map((el, index) => (
          <StatComponent
            key={`${el.title}${index}`}
            title={el.title}
            statValue={el.value}
            customStyle="max-sm:flex max-sm:flex-row max-sm:justify-between max-sm:py-2 max-sm:mb-2"
          />
        ))}
      </div>
    </div>
  );
};
