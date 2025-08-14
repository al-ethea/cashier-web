import { useEffect, useState } from "react";
import { useCashierDashboardNavItems } from "./useCashierDashboardNavItems";
import authStore from "@/zustand/authStore";
import apiInstance from "@/utils/api/apiInstance";
import { toast } from "react-toastify";

interface ShiftData {
  cashierName: string;
  shift: string;
  startTime: string;
  endTime: string;
  clockOutDone: boolean;
}

export default function useCashierDashboard() {
  const navItems = useCashierDashboardNavItems();
  const [shiftData, setShiftData] = useState<ShiftData | null>(null);
  const [loading, setLoading] = useState(true);
  const token = authStore((state) => state.token);

  const [isClockingIn, setIsClockingIn] = useState(false);
  const [startingCash, setStartingCash] = useState("");
  const [endingCash, setEndingCash] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openClockInModal = () => {
    const modal = document.getElementById(
      "clock_in_modal"
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  const closeClockInModal = () => {
    const modal = document.getElementById(
      "clock_in_modal"
    ) as HTMLDialogElement;
    modal?.close();
  };

  const openClockOutModal = () => {
    const modal = document.getElementById(
      "clock_in_modal"
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  const closeClockOutModal = () => {
    const modal = document.getElementById(
      "clock_in_modal"
    ) as HTMLDialogElement;
    modal?.close();
  };

  const handleClockIn = async () => {
    try {
      setIsSubmitting(true);
      await apiInstance.post(
        "/cashier/clockIn",
        { startingCash: Number(startingCash) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("You are clocked in!");
      closeClockInModal();
      setStartingCash("");
    } catch (error) {
      toast.error("Failed to clock in");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setIsSubmitting(true);
      await apiInstance.post(
        "/cashier/clockOut",
        {
          endingCash: Number(endingCash),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("You are clocked out!");
      closeClockOutModal();
      setEndingCash("");
    } catch (error) {
      toast.error("Failed to clock out");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    openClockInModal,
    closeClockInModal,
    startingCash,
    setStartingCash,
    isSubmitting,
    handleClockIn,
    endingCash,
    setEndingCash,
    openClockOutModal,
    closeClockOutModal,
    handleClockOut,
  };
}
