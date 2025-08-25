"use client";

import { IRevenueCardProps } from "@/types/cashier.type";

export default function RevenueCard({ totalRevenue }: IRevenueCardProps) {
  return (
    <div className="mt-6 bg-white shadow-md rounded-xl p-6 border border-gray-100 flex items-center justify-between">
      <p className="text-gray-600 text-lg font-medium">Total Revenue</p>
      <p className="text-xl font-bold text-[#00af81]">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(totalRevenue)}
      </p>
    </div>
  );
}
