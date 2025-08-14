import { useEffect, useState } from "react";
import { useCashierDashboardNavItems } from "./useCashierDashboardNavItems";
import authStore from "@/zustand/authStore";
import apiInstance from "@/utils/api/apiInstance";

interface ShiftData {
  cashierName: string;
  shift: string;
  startTime: string;
  endTime: string;
}

export default function useCashierDashboard() {
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

  return {
    navItems,
    shiftData,
    loading,
  };
}
