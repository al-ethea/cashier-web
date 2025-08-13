// pages/index.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCashierDashboardNavItems } from "@/features/cashier/hooks/useCashierDashboardNavItems";
import apiInstance from "@/utils/api/apiInstance";
import authStore from "@/zustand/authStore";

interface ShiftData {
  cashierName: string;
  shift: string;
  startTime: string;
  endTime: string;
}

export default function CashierDashboard() {
  const navItems = useCashierDashboardNavItems();
  const [shiftData, setShiftData] = useState<ShiftData | null>(null);
  const [loading, setLoading] = useState(true);
  const token = authStore((state) => state.token);

  useEffect(() => {
    const fetchShift = async () => {
      try {
        const res = await apiInstance.get("/cashier/display-shift", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShiftData(res.data.data);
      } catch (error) {
        console.error("Error fetching shift:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShift();
  }, []);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#00af81] text-white p-6">
        <div className="text-2xl font-bold mb-8">Kasir Pintar</div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <div className="px-4 py-2 rounded hover:bg-[#66cbb0] hover:bg-opacity-20 cursor-pointer transition">
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-4">Welcome</h2>
        {loading ? (
          <p>Loading shift...</p>
        ) : shiftData ? (
          <div className="p-4 bg-gray-100 rounded shadow-md">
            <p className="text-lg font-medium">
              {shiftData.cashierName} — {shiftData.shift}
            </p>
            <p className="text-gray-700">
              {shiftData.startTime} - {shiftData.endTime}
            </p>
          </div>
        ) : (
          <p>No shift information available.</p>
        )}
      </div>
    </div>
  );
}
