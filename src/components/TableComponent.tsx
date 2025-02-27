'use client';
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@heroui/table';
import { JSX, Key, useMemo, useState } from 'react';
import CustomTablePagination from './CustomTablePagination';

export interface TColumn {
  key: string;
  label: string;
  customStyle?: string;
}

export interface TRow {
  [key: string]: string | number;
}

interface TableComponentProps {
  columns: TColumn[];
  rows: TRow[];
  /**
   * Custom render function for table cells.
   * @param cell - Object containing the row item and column key.
   * @param baseStyle - Base CSS class for the cell.
   * @returns A React element to render in the cell.
   */
  customRenderCell?: (cell: { item: TRow; key: string }, baseStyle: string) => JSX.Element;
  /**
   * Callback function triggered when a row is clicked.
   * @param key - The key of the clicked row.
   */
  onRowClick?: (key: Key) => void;
}

const TableComponent = ({ rows, columns, customRenderCell, onRowClick }: TableComponentProps) => {
  const [page, setPage] = useState(1);

  const rowsPerPage = 10;

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

  const responsiveCellStyle =
    columns.length > 5 ? 'last:max-sm:hidden nth-last-[2]:max-sm:hidden' : '';
  const baseCellStyle = `
    py-4 text-center text-xs sm:text-sm md:text-base lg:text-base text-navy-500 truncate ${responsiveCellStyle}`;

  return (
    <div className="overflow-x-auto w-full">
      <Table
        aria-label="Crypto info table"
        className="w-full" // Remove min-w-[600px] and let the table grow dynamically
        classNames={{
          wrapper: 'p-0 bg-[#fafafa] border border-navy-900 rounded-2xl shadow-xl overflow-x-auto',
          thead: 'border-b border-[#2224261a]',
          tbody: 'divide-y divide-[#2224261a] bg-white',
          emptyWrapper: 'text-center h-75 text-navy-900'
        }}
        onRowAction={onRowClick}
        bottomContent={
          <div className="flex w-full justify-center">
            <CustomTablePagination
              page={page}
              pages={pages}
              onPageSelect={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              className={`py-3 text-thColor text-center text-[10px] lg:text-xs font-normal tracking-wider ${
                column.customStyle ?? ''
              } ${responsiveCellStyle}`}
              key={column.key}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent={'No data to show.'}>
          {(item) => (
            <TableRow
              className={`focus-visible:outline-white focus-visible:outline-0 hover:cursor-pointer hover:bg-black/7 transition-colors duration-200`}
              key={item.key}
            >
              {(columnKey) =>
                customRenderCell ? (
                  customRenderCell({ item: item, key: columnKey as string }, baseCellStyle)
                ) : (
                  <TableCell className={baseCellStyle}>{getKeyValue(item, columnKey)}</TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
