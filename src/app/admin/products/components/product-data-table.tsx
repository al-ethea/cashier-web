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
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { AddProductModal } from "./add-product-modal";
import { DataTablePagination } from "@/components/pagination/data-table-pagination";
import SearchFilter from "@/components/filter-tools/search-filter";

interface IProductDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  filteringType?: "frontend" | "backend";
  data: TData[];
  onRefresh?: () => void;
  onDelete?: (id: string, password?: string) => void;
  searchValue?: string;
  onSearchFilterChange?: (value: string) => void;
  searchableColumns?: string[];
  totalItems: number;
  currentPageNumber: number;
  onPageChange: (page: number) => void;
  pageSizeVariants: number[];
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
}

export function ProductDataTable<TData, TValue>({
  columns,
  data,
  filteringType,
  onRefresh,
  onDelete,
  totalItems,
  searchValue,
  onSearchFilterChange,
  searchableColumns,
  currentPageNumber,
  onPageChange,
  pageSizeVariants,
  pageSize,
  onPageSizeChange,
}: IProductDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const tableConfig: any = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    state: {
      rowSelection,
      columnFilters,
    },
  };

  if (filteringType === "frontend") {
    tableConfig.getFilteredRowModel = getFilteredRowModel();
    tableConfig.getPaginationRowModel = getPaginationRowModel();
  }

  const productTable = useReactTable(tableConfig);

  return (
    <div>
      <div className="md:flex justify-between items-center py-4">
        <div>
          <SearchFilter
            table={productTable}
            filteringType={filteringType}
            searchValue={searchValue}
            onSearchFilterChange={onSearchFilterChange}
            searchableColumns={searchableColumns}
          />
        </div>
        <div className="flex flex-wrap items-center mt-2 gap-2 md:flex-row">
          <AddProductModal onRefresh={onRefresh} />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {productTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="whitespace-nowrap px-4"
                        style={{
                          minWidth: header.column.columnDef.size || 120,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {productTable.getRowModel().rows?.length ? (
                productTable.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="whitespace-nowrap px-4"
                        style={{
                          minWidth: cell.column.columnDef.size || 120,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination
          table={productTable}
          filteringType={filteringType}
          totalItems={totalItems}
          currentPageNumber={currentPageNumber}
          onPageChange={onPageChange}
          pageSizeVariants={pageSizeVariants}
          pageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}
