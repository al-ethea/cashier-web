"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ITransactionReportCashier } from "@/types/report.type";
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
      cell: ({ row }) => {
        return (
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
        );
      },
    },
    {
      accessorKey: "cashier_name",
      header: "Cashier",
      cell: ({ row }) => {
        return (
          <div className="flex gap-3">
            {row.original.cashierNames?.map((name, index) => (
              <div
                key={index}
                className="text-sm px-1.5 py-0.5 rounded-sm bg-gray-200"
              >
                {name || "N/A"}
              </div>
            )) || (
              <div className="text-sm px-1.5 py-0.5 rounded-sm bg-gray-200">
                N/A
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "total_revenue",
      header: "Total Transaction",
      size: 100,
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
      accessorKey: "total_cash",
      header: "Total Cash",
      size: 100,
      cell: ({ row }) => {
        const amount = row.original.totalCash || 0;
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(amount);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "total_debit",
      header: "Total Debit",
      size: 100,
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
      accessorKey: "starting_cash",
      header: "Starting Cash",
      size: 100,
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
      accessorKey: "ending_cash",
      header: "Starting Cash",
      size: 100,
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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        <div className="px-2 py-1 size-fit bg-purple-800 text-white text-sm cursor-pointer">
          Action
        </div>;
      },
    },
  ];
