import { cashierTransactionColumns } from '@/app/admin/reports/components/cashier-transaction-columns';
import { CashierReportsDataTable } from '@/app/admin/reports/components/cashier-transaction-data-table';
import { dailyItemsTransactionColumns } from '@/app/admin/reports/components/daily-item-transaction-columns';
import { DailyItemsReportsDataTable } from '@/app/admin/reports/components/daily-item-transaction-data-table';
import { dailyTransactionColumns } from '@/app/admin/reports/components/daily-transaction-columns';
import { DailyReportsDataTable } from '@/app/admin/reports/components/daily-transaction-data-table';
import { monthlyTransactionColumns } from '@/app/admin/reports/components/monthly-transaction-columns';
import { MonthlyReportsDataTable } from '@/app/admin/reports/components/monthly-transaction-data-table';
import useTransactionReport from '@/hooks/admin/useTransactionReport';
import useColumnFilters from '@/hooks/filter-tools/useColumnFilter';
import useDateFilter from '@/hooks/filter-tools/useDateFilter';
import usePagination from '@/hooks/filter-tools/usePagination';
import useSearchFilter from '@/hooks/filter-tools/useSearchFilter';
import useUrlParamsSync from '@/hooks/filter-tools/useUrlParamsSync';
import useTabUrlParamsManagement from '@/hooks/useTabUrlManagement';
import { ITransactionReport, ITransactionReportCashier, ITransactionReportItemsDaily, ITransactionReportMonthly } from '@/types/report.type';
import urlParamsSanitization from '@/utils/urlParamsSanitization';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

export default function useAdminReports() {
  const searchRouter = useRouter();
  const searchParams = useSearchParams();

  const { transactionReports, totalItems, isLoading } = useTransactionReport(
    urlParamsSanitization(searchParams, ['tab', 'page', 'limit', 'search_id_cashier_name', 'transaction_date','cashier_shift'])
  );
  // Filtering

  const { columnsSearchKey, columnsToSearch, searchFilterValue, setSearchFilterValue, handleSearchFilterChange } =
    useSearchFilter({
      searchRouter,
      searchParams,
      columnsToSearch: ['id', 'cashier_name'],
    });

  const { dateFilterValue, setDateFilterValue, handleDateFilterChange, initialDateKey } = useDateFilter({
    searchRouter,
    searchParams,
    initialDateKey: 'transaction_date',
  });

  const {
    pageNumberKey,
    pageSizeKey,
    pageSizeVariants,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
    handlePageChange,
    handleNewPageSizeChange,
  } = usePagination({
    searchRouter,
    searchParams,
    defaultPageKey: 'page',
    defaultPageSizeKey: 'limit',
    pageSizeVariants: [10, 20, 30, 40, 50],
  });

  const tabsConfig = [
    { key: 'monthly', label: 'Monthly' },
    { key: 'daily', label: 'Daily' },
    { key: 'daily_item', label: 'Daily Item' },
    {key: 'cashier', label: 'Cashier'}
  ];

  const { tabKey, localStorageTabFilterKey, activeTab, setActiveTab, handleTabChange, debouncedSave } =
    useTabUrlParamsManagement({
      searchRouter,
      searchParams,
      customTabValue: tabsConfig[0].key,
    });

  const { columnFilters, setColumnFilters, handleColumnFilterChange } = useColumnFilters({
    searchRouter,
    searchParams,
    excludedKeys: [tabKey, pageNumberKey, pageSizeKey, columnsSearchKey, initialDateKey],
  });

  // Build full tabs with content after hooks are defined
  const reportTabsHeader = tabsConfig.map((tab) => ({
    ...tab,
    content: isLoading ? (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    ) : tab.key === 'daily' ? (
        <DailyReportsDataTable
          columns={dailyTransactionColumns()}
          data={transactionReports as ITransactionReport[]}
          columnFilters={columnFilters}
          searchValue={searchFilterValue}
          onSearchFilterChange={handleSearchFilterChange}
          onColumnFilterChange={handleColumnFilterChange}
          dateFilterValue={dateFilterValue}
          onDateFilterChange={handleDateFilterChange}
          filteringType='backend'
          searchableColumns={columnsToSearch}
          totalItems={totalItems}
          currentPageNumber={pageNumber}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handleNewPageSizeChange}
        />
      ) : tab.key === 'monthly' ? (
        <MonthlyReportsDataTable
          columns={monthlyTransactionColumns()}
          data={transactionReports as ITransactionReportMonthly[]}
          columnFilters={columnFilters}
          searchValue={searchFilterValue}
          onSearchFilterChange={handleSearchFilterChange}
          onColumnFilterChange={handleColumnFilterChange}
          dateFilterValue={dateFilterValue}
          onDateFilterChange={handleDateFilterChange}
          filteringType='backend'
          searchableColumns={columnsToSearch}
          totalItems={totalItems}
          currentPageNumber={pageNumber}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handleNewPageSizeChange}
        />
      ) : tab.key === 'daily_item' ? (
        <DailyItemsReportsDataTable
          columns={dailyItemsTransactionColumns()}
          data={transactionReports as ITransactionReportItemsDaily[]}
          columnFilters={columnFilters}
          searchValue={searchFilterValue}
          onSearchFilterChange={handleSearchFilterChange}
          onColumnFilterChange={handleColumnFilterChange}
          dateFilterValue={dateFilterValue}
          onDateFilterChange={handleDateFilterChange}
          filteringType='backend'
          searchableColumns={columnsToSearch}
          totalItems={totalItems}
          currentPageNumber={pageNumber}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handleNewPageSizeChange}
        />
      ) : tab.key === 'cashier' ? (
        <CashierReportsDataTable
          columns={cashierTransactionColumns()}
          data={transactionReports as ITransactionReportCashier[]}
          columnFilters={columnFilters}
          searchValue={searchFilterValue}
          onSearchFilterChange={handleSearchFilterChange}
          onColumnFilterChange={handleColumnFilterChange}
          dateFilterValue={dateFilterValue}
          onDateFilterChange={handleDateFilterChange}
          filteringType='backend'
          searchableColumns={columnsToSearch}
          totalItems={totalItems}
          currentPageNumber={pageNumber}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handleNewPageSizeChange}
        />
      ) : null,
  }));

  useUrlParamsSync({
    searchRouter,
    searchParams,
    tabKey,
    defaultTabValue: tabsConfig[0].key,
    activeTab,
    localStorageTabFilterKey,
    pageNumberKey,
    pageSizeKey,
    defaultFirstPageSize: pageSizeVariants[0].toString(),
    columnsSearchKey,
    columnsToSearch,
    initialDateKey,
    setSearchFilterValue,
    setColumnFilters,
    setDateFilterValue,
    setPageNumber,
    setPageSize,
    setActiveTab,
    debouncedSave,
  });

  return {
    reportTabsHeader,
    activeTab,
    handleTabChange,
    columnFilters,
    searchFilterValue,
    dateFilterValue,
    isLoading,
  };
}
