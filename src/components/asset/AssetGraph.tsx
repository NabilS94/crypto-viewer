"use client";
import { GetAssetHistoryService } from "@/services/asset";

import { ASSET_HISTORY_DURATION_CONFIG } from "@/utils/constants";
import { Tab, Tabs } from "@heroui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LineChart from "./LineChart";

const assetDurationItems = [
  ASSET_HISTORY_DURATION_CONFIG.day,
  ASSET_HISTORY_DURATION_CONFIG.week,
  ASSET_HISTORY_DURATION_CONFIG.month,
  ASSET_HISTORY_DURATION_CONFIG.threeMonths,
  ASSET_HISTORY_DURATION_CONFIG.sixMonths,
  ASSET_HISTORY_DURATION_CONFIG.year,
  ASSET_HISTORY_DURATION_CONFIG.all,
];

const getAssetHistory = async (params: API.Req.AssetsHistoryParams) => {
  const response = await GetAssetHistoryService(params);
  return response.data;
};

const AssetGraph = ({
  initialData,
  assetName,
  assetId,
}: {
  initialData: { data: API.Res.CryptoAssetHistory[] };
  assetName: string;
  assetId: string;
}) => {
  const [assetHistoryInterval, setHistoryInterval] = useState(
    assetDurationItems[0]
  );

  const { data } = useQuery({
    queryKey: ["cryptoHistory", assetId, assetHistoryInterval],
    queryFn: () =>
      getAssetHistory({
        id: assetId,
        interval: assetHistoryInterval.interval,
        duration: assetHistoryInterval.duration,
      }),
    initialData,
  });
  return (
    <div className="bg-[#343961] mt-5 p-3 rounded-2xl sm:ml-7 sm:mr-3 lg:ml-16 lg:mr-12">
      <Tabs
        aria-label="Dynamic tabs"
        items={assetDurationItems}
        onSelectionChange={(key) =>
          setHistoryInterval(
            assetDurationItems.find((el) => el.id === key) ??
              assetDurationItems[0]
          )
        }
        classNames={{
          tabList: "gap-1 w-full relative rounded-none p-0",
          tab: "max-w-fit px-4 py-2 text-white text-xs bg-navy-500 rounded-md data-[selected=true]:bg-white focus-visible:outline-0",
          tabContent: "group-data-[selected=true]:text-navy-500",
        }}
      >
        {(item) => <Tab key={item.id} title={item.label} />}
      </Tabs>
      <LineChart
        chartData={data.data.map((el) => ({
          priceUsd: el.priceUsd,
          time: el.time,
        }))}
        duration={assetHistoryInterval.label}
        chartLabel={assetName}
      />
    </div>
  );
};

export default AssetGraph;
