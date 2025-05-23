'use client';
import { GetAllAssetsService } from '@/services/asset';
import { extractAssetRow } from '@/utils/business';
import { Spinner } from '@heroui/spinner';
import { getKeyValue, TableCell } from '@heroui/table';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/navigation';
import Icon, { IconTypes } from '../Icon';
import TableComponent, { TColumn, TRow } from '../TableComponent';
import { AssetsGeneralStats } from './AssetsGeneralStats';

interface AssetsTableProps {
  initialData: { data: API.Res.CryptoAsset[]; timestamp: number };
}

const getAllAssetsInfo = async () => {
  const response = await GetAllAssetsService();
  return response.data;
};

const columns: TColumn[] = [
  {
    key: 'rank',
    label: 'Rank',
    customStyle: 'px-2'
  },
  {
    key: 'name',
    label: 'Name',
    customStyle: 'text-left pl-1'
  },
  { key: 'priceUsd', label: 'Price' },
  { key: 'marketCapUsd', label: 'Market Cap' },
  { key: 'vwap24Hr', label: 'VWAP(24Hr)' },
  { key: 'supply', label: 'Supply' },
  { key: 'volumeUsd24Hr', label: 'Volume(24Hr)' },
  { key: 'changePercent24Hr', label: 'Change(24Hr)' }
];

const AssetsTable = ({ initialData }: AssetsTableProps) => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ['cryptoData'],
    queryFn: getAllAssetsInfo,
    initialData,
    refetchInterval: 60000,
    refetchIntervalInBackground: false
  });

  const rows = useMemo(
    () => extractAssetRow(data.data ?? initialData.data),
    [initialData, data.data]
  );

  const renderCell = useCallback((cell: { item: TRow; key: string }, baseStyle: string) => {
    const columnKey = cell.key;
    const value = getKeyValue(cell.item, columnKey);

    switch (columnKey) {
      case 'name':
        return (
          <TableCell className={`${baseStyle} text-left whitespace-normal`}>
            <div className="flex flex-col items-baseline flex-wrap md:flex-row md:items-center">
              <Icon
                type={cell.item['key'] as IconTypes}
                className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
              />
              <div className="flex flex-col ml-3">
                <span>{value}</span>
                <span className="text-tiny text-thColor">{cell.item['symbol']}</span>
              </div>
            </div>
          </TableCell>
        );

      case 'changePercent24Hr': {
        return (
          <TableCell
            className={`${baseStyle} ${Number(value) > 0 ? 'text-success' : 'text-red-500'} font-semibold`}
          >
            {value + '%'}
          </TableCell>
        );
      }

      default:
        return <TableCell className={baseStyle}>{value}</TableCell>;
    }
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spinner color="primary" size="lg" />
      </div>
    );

  return (
    <>
      <AssetsGeneralStats assetsData={data} />
      <TableComponent
        columns={columns}
        rows={rows}
        customRenderCell={renderCell}
        onRowClick={(key) => router.push(`/asset/${key}`)}
      />
    </>
  );
};

export default AssetsTable;
