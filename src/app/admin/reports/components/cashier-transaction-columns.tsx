"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ITransactionReportCashier } from "@/types/report.type"; // make sure this matches new API type
import { ColumnDef } from "@tanstack/react-table";

export const cashierTransactionColumns =
  (): ColumnDef<ITransactionReportCashier>[] => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      size: 30,
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "shift",
      header: "Cashier Shift",
      size: 80,
      cell: ({ row }) => (
        <div
          className={
            "w-fit px-1.5 py-0.5 rounded-sm text-xs font-semibold text-white " +
            (row.original.shift === "SHIFT1"
              ? "bg-lime-700"
              : row.original.shift === "SHIFT2"
              ? "bg-red-700"
              : "bg-gray-400")
          }
        >
          {row.original.shift || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "cashierName",
      header: "Cashier",
      cell: ({ row }) => (
        <div className="text-sm px-1.5 py-0.5 rounded-sm bg-gray-200">
          {row.original.cashierName || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "totalTransactions",
      header: "Total Transactions",
      size: 100,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.original.totalTransactions || 0}
        </div>
      ),
    },
    {
      accessorKey: "totalRevenue",
      header: "Total Revenue",
      size: 120,
      cell: ({ row }) => {
        const amount = row.original.totalRevenue || 0;
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(amount);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "totalDebit",
      header: "Total Debit",
      size: 120,
      cell: ({ row }) => {
        const amount = row.original.totalDebit || 0;
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(amount);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "startingCash",
      header: "Starting Cash",
      size: 120,
      cell: ({ row }) => {
        const amount = row.original.startingCash || 0;
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(amount);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "endingCash",
      header: "Ending Cash",
      size: 120,
      cell: ({ row }) => {
        const amount = row.original.endingCash || 0;
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(amount);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
      size: 150,
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.startTime
            ? new Date(row.original.startTime).toLocaleString()
            : "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "endTime",
      header: "End Time",
      size: 150,
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.endTime
            ? new Date(row.original.endTime).toLocaleString()
            : "N/A"}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
    },
  ];
