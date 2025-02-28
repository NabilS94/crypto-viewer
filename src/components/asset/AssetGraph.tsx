'use client';
import { GetAssetHistoryService } from '@/services/asset';

import { ASSET_HISTORY_DURATION_CONFIG } from '@/utils/constants';
import { Spinner } from '@heroui/spinner';
import { Tab, Tabs } from '@heroui/tabs';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LineChart from './LineChart';

const assetDurationItems = [
  ASSET_HISTORY_DURATION_CONFIG.day,
  ASSET_HISTORY_DURATION_CONFIG.week,
  ASSET_HISTORY_DURATION_CONFIG.month,
  ASSET_HISTORY_DURATION_CONFIG.threeMonths,
  ASSET_HISTORY_DURATION_CONFIG.sixMonths,
  ASSET_HISTORY_DURATION_CONFIG.year,
  ASSET_HISTORY_DURATION_CONFIG.all
];

const topCryptoCurrencies = [
  { key: 'bitcoin', label: 'Bitcoin' },
  { key: 'ethereum', label: 'Ethereum' },
  { key: 'tether', label: 'Tether' },
  { key: 'xrp', label: 'XRP' },
  { key: 'binance-coin', label: 'BNB' },
  { key: 'solana', label: 'Solana' },
  { key: 'usd-coin', label: 'USDC' },
  { key: 'dogecoin', label: 'Dogecoin' },
  { key: 'cardano', label: 'Cardano' },
  { key: 'steth', label: 'Lido Staked ETH' }
];

const getAssetHistory = async (params: API.Req.AssetsHistoryParams) => {
  const response = await GetAssetHistoryService(params);
  return response.data;
};

const AssetGraph = ({
  initialData,
  assetName,
  assetId
}: {
  initialData: { data: API.Res.CryptoAssetHistory[] };
  assetName: string;
  assetId: string;
}) => {
  const router = useRouter();
  const [assetHistoryInterval, setHistoryInterval] = useState(assetDurationItems[0]);

  const { data, isLoading } = useQuery({
    queryKey: ['cryptoHistory', assetId, assetHistoryInterval],
    queryFn: () =>
      getAssetHistory({
        id: assetId,
        interval: assetHistoryInterval.interval,
        duration: assetHistoryInterval.duration
      }),
    initialData
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spinner color="primary" size="lg" />
      </div>
    );

  return (
    <div className="bg-[#343961] mt-5 p-3 rounded-2xl sm:ml-7 sm:mr-3 lg:ml-16 lg:mr-12">
      <div className="flex flex-col">
        <select
          id="top-crypto"
          name="cryptos"
          className="mb-5 bg-white text-navy-900 outline-0 p-1 rounded-xs w-fit"
          value={assetId}
          onChange={(e) => router.replace('/asset/' + e.target.value)}
        >
          {topCryptoCurrencies.map((el) => {
            return (
              <option key={el.key} value={el.key}>
                {el.label}
              </option>
            );
          })}
        </select>
        <Tabs
          aria-label="Dynamic tabs"
          items={assetDurationItems}
          onSelectionChange={(key) =>
            setHistoryInterval(
              assetDurationItems.find((el) => el.id === key) ?? assetDurationItems[0]
            )
          }
          classNames={{
            tabList: 'bg-transparent',
            tab: 'bg-navy-500 rounded-md data-[selected=true]:bg-white focus-visible:outline-0 sm:px-4 sm:py-2 sm:text-xs',
            tabContent: 'group-data-[selected=true]:text-navy-500 text-white'
          }}
        >
          {(item) => <Tab key={item.id} title={item.label} />}
        </Tabs>
      </div>
      <LineChart
        chartData={data.data.map((el) => ({
          priceUsd: el.priceUsd,
          time: el.time
        }))}
        duration={assetHistoryInterval.label}
        chartLabel={assetName}
      />
    </div>
  );
};

export default AssetGraph;
