'use client';
import { extractCryptoMarketRow } from '@/utils/business';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { GetAllExchangesService } from '@/services/exchange';
import { getKeyValue, TableCell } from '@heroui/table';
import { useRouter } from 'next/navigation';
import TableComponent, { TColumn, TRow } from '../TableComponent';

interface MarketsTableProps {
  initialData: { data: API.Res.ExchangeMarket[] };
}

const getAllExchangesInfo = async () => {
  const response = await GetAllExchangesService();
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
  { key: 'tradingPairs', label: 'Trading Pairs' },
  { key: 'volumeUsd', label: 'Volume(24Hr)' },
  { key: 'percentTotalVolume', label: 'Total(%)' }
];

const MarketsTable = ({ initialData }: MarketsTableProps) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['cryptoMarketsData'],
    queryFn: getAllExchangesInfo,
    initialData,
    refetchIntervalInBackground: false
  });

  const rows = useMemo(
    () => extractCryptoMarketRow(data.data ?? initialData.data),
    [initialData, data.data]
  );

  const renderCell = useCallback((cell: { item: TRow; key: string }, baseStyle: string) => {
    const columnKey = cell.key;
    const value = getKeyValue(cell.item, columnKey);

    switch (columnKey) {
      case 'name':
        return (
          <TableCell className={`${baseStyle} text-left whitespace-normal`}>{value}</TableCell>
        );

      default:
        return <TableCell className={baseStyle}>{value}</TableCell>;
    }
  }, []);

  return (
    <TableComponent
      columns={columns}
      rows={rows}
      customRenderCell={renderCell}
      onRowClick={(key) => router.push(rows.find((el) => el.key === key)?.exchangeUrl ?? '/')}
    />
  );
};

export default MarketsTable;
