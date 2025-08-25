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
import { DataTablePagination } from "../../../../components/pagination/data-table-pagination";
import {
  ITransactionReport,
  ITransactionReportCashier,
} from "@/types/report.type";
import { SelectFilter } from "../../../../components/filter-tools/select-filter";
import { EShiftSession } from "@/types/cashier.type";
import SearchFilter from "../../../../components/filter-tools/search-filter";
import { SingleDatePicker } from "../../../../components/filter-tools/single-date-picker";
interface ITransactionReportTableProps<
  TData extends ITransactionReportCashier,
  TValue
> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filteringType?: "frontend" | "backend";
  searchValue?: string;
  onSearchFilterChange?: (value: string) => void;
  dateFilterValue?: Date | undefined;
  onDateFilterChange?: (value: Date | undefined) => void;
  columnFilters?: Record<string, string>;
  searchableColumns?: string[];
  onColumnFilterChange?: (columnId: string, value: string) => void;
  totalItems?: number;
  currentPageNumber?: number;
  onPageChange: (page: number) => void;
  pageSizeVariants?: number[];
  pageSize?: number;
  onPageSizeChange: (pageSize: number) => void;
}

// Custom global filter function
const globalFilterFn = (
  row: { original: ITransactionReportCashier },
  value: string
) => {
  const searchValue = value.toLowerCase();
  const cashierName = row.original.cashierName?.toLowerCase() || "";

  return cashierName.includes(searchValue);
};

export function CashierReportsDataTable<
  TData extends ITransactionReportCashier,
  TValue
>({
  columns,
  data,
  filteringType = "frontend",
  searchValue,
  onSearchFilterChange,
  dateFilterValue,
  onDateFilterChange,
  columnFilters = {},
  searchableColumns,
  onColumnFilterChange,
  totalItems,
  currentPageNumber,
  onPageChange,
  pageSizeVariants,
  pageSize,
  onPageSizeChange,
}: ITransactionReportTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [tableColumnFilters, setTableColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  React.useEffect(() => {
    const filters = Object.entries(columnFilters)
      .filter(([_, value]) => value !== "")
      .map(([id, value]) => ({ id, value }));
    setTableColumnFilters(filters); // Filter out empty values
  }, [columnFilters]);

  const reportsTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel:
      filteringType === "frontend" ? getFilteredRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    enableGlobalFilter: true,
    globalFilterFn,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange:
      filteringType === "frontend" ? setTableColumnFilters : undefined,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      rowSelection,
      columnFilters: filteringType === "frontend" ? tableColumnFilters : [],
      globalFilter,
    },
  });

  return (
    <div>
      <div className="md:flex items-center gap-2 py-4">
        <SearchFilter
          table={reportsTable}
          filteringType={filteringType}
          searchValue={searchValue}
          onSearchFilterChange={onSearchFilterChange}
          searchableColumns={searchableColumns}
        />
        <SingleDatePicker
          placeholder="Transaction Date"
          date={dateFilterValue}
          disabledFn={(date) =>
            date > new Date() || date < new Date("2025-08-05")
          }
          onSelectDate={onDateFilterChange}
        />
        <SelectFilter
          placeholder="Cashier Shift"
          optionGroupLabel="Shift"
          columnId="cashier_shift"
          options={[
            { value: "all", label: "All Shift" },
            ...Object.values(EShiftSession)
              .filter((value) => typeof value === "string")
              .map((value) => ({
                value: value,
                label: value,
              })),
          ]}
          onFilterChange={onColumnFilterChange}
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {reportsTable.getHeaderGroups().map((headerGroup) => (
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
              {reportsTable.getRowModel().rows?.length ? (
                reportsTable.getRowModel().rows.map((row) => (
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
          table={reportsTable}
          filteringType="backend"
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
