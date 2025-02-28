import { calculateAssetPropTotal, formatValue } from '@/utils/business';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { useMemo } from 'react';
import { AssetStatComponent } from './AssetStat';

const STATS_TITLES = {
  MARKET_CAP: 'Market Cap',
  EXCHANGE_VOLUME: 'Exchange Volume',
  ASSETS: 'Assets',
  LAST_UPDATED: 'Last updated on'
};

export const AssetsGeneralStats = (props: {
  assetsData: {
    data: API.Res.CryptoAsset[];
    timestamp: number;
  };
}) => {
  const totalVolume = useMemo(() => {
    return calculateAssetPropTotal(props.assetsData.data, 'volumeUsd24Hr');
  }, [props.assetsData.data]);

  const marketCap = useMemo(() => {
    return calculateAssetPropTotal(props.assetsData.data, 'marketCapUsd');
  }, [props.assetsData.data]);

  const statsList = useMemo(
    () => [
      {
        title: STATS_TITLES.MARKET_CAP,
        value: formatValue(marketCap, '$0.00a').toUpperCase()
      },
      {
        title: STATS_TITLES.EXCHANGE_VOLUME,
        value: formatValue(totalVolume, '$0.00a').toUpperCase()
      },
      {
        title: STATS_TITLES.ASSETS,
        value: props.assetsData.data.length.toString()
      },
      {
        title: STATS_TITLES.LAST_UPDATED,
        value: new Date(props.assetsData.timestamp).toLocaleTimeString()
      }
    ],
    [marketCap, totalVolume, props.assetsData.data, props.assetsData.timestamp]
  );

  return (
    <div className="py-5">
      {/**Accordion component is only visible on small screens */}
      <Accordion
        className="sm:hidden"
        itemClasses={{ title: 'sm:hidden text-white text-left text-lg' }}
      >
        <AccordionItem aria-label="Market stats" title="Market Stats" role="region">
          {statsList.map((el, index) => (
            <AssetStatComponent
              key={`${el.title}${index}`}
              title={el.title}
              statValue={el.value}
              customStyle="flex flex-row justify-between py-2 mb-2 border-b border-b-white"
            />
          ))}
        </AccordionItem>
      </Accordion>
      <div className="flex flex-row flex-wrap justify-around max-sm:hidden">
        {statsList.map((el, index) => (
          <AssetStatComponent key={`${el.title}${index}`} title={el.title} statValue={el.value} />
        ))}
      </div>
    </div>
  );
};
