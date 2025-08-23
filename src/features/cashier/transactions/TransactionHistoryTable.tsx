"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { DataTablePagination } from "@/app/admin/cashiers/components/cashier-data-table-pagination";

export interface ITransactionHistory {
  transactionId: string;
  paymentDate: string;
  paymentType: "CASH" | "DEBIT";
  totalAmount: number;
  cartId: string;
}

interface TransactionHistoryTableProps {
  data: ITransactionHistory[];
  onDetails?: (transactionId: string) => void;
}

export function TransactionHistoryTable({
  data,
  onDetails,
}: TransactionHistoryTableProps) {
  const columns: ColumnDef<ITransactionHistory>[] = [
    {
      accessorKey: "paymentDate",
      header: "Date",
      size: 150,
      cell: ({ row }) => new Date(row.original.paymentDate).toLocaleString(),
    },
    {
      accessorKey: "paymentType",
      header: "Payment Type",
      size: 100,
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      size: 120,
      cell: ({ row }) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(row.original.totalAmount),
    },
    {
      id: "details",
      header: "Action",
      size: 100,
      cell: ({ row }) => (
        <button
          className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md"
          onClick={() => onDetails?.(row.original.transactionId)}
        >
          Details
        </button>
      ),
    },
  ];

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { columnFilters, rowSelection },
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex justify-between items-center py-4">
        <input
          placeholder="Filter by transaction date..."
          value={
            (table.getColumn("paymentDate")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn("paymentDate")?.setFilterValue(e.target.value)
          }
          className="max-w-sm border p-1 rounded-md"
        />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{
                    minWidth: header.column.columnDef.size,
                    maxWidth: header.column.columnDef.size,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      minWidth: cell.column.columnDef.size,
                      maxWidth: cell.column.columnDef.size,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </div>
  );
}
