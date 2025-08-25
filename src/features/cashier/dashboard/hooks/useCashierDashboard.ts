import { useEffect, useState, useMemo } from "react";
import authStore from "@/zustand/authStore";
import apiInstance from "@/utils/api/apiInstance";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface ShiftData {
  cashierName: string;
  shift: string;
  startTime: string;
  endTime: string;
}

export default function useCashierDashboard() {
  const [shiftData, setShiftData] = useState<ShiftData | null>(null);
  const [loading, setLoading] = useState(true);
  const token = authStore((state) => state.token);

  const [startingCash, setStartingCash] = useState("");
  const [endingCash, setEndingCash] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingClockOut, setIsSubmittingClockOut] = useState(false);

  const openClockInModal = () => {
    (
      document.getElementById("clock_in_modal") as HTMLDialogElement
    )?.showModal();
  };

  const closeClockInModal = () => {
    (document.getElementById("clock_in_modal") as HTMLDialogElement)?.close();
  };

  const openClockOutModal = () => {
    (
      document.getElementById("clock_out_modal") as HTMLDialogElement
    )?.showModal();
  };

  const closeClockOutModal = () => {
    (document.getElementById("clock_out_modal") as HTMLDialogElement)?.close();
  };

  const handleClockIn = async () => {
    try {
      setIsSubmitting(true);
      await apiInstance.post(
        "/shift/clockIn",
        { startingCash: Number(startingCash) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("You are clocked in!");
      closeClockInModal();
      setStartingCash("");
      fetchShift(); // refresh state
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to clock in");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setIsSubmittingClockOut(true);
      await apiInstance.post(
        "/shift/clockOut",
        { endingCash: Number(endingCash) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("You are clocked out!");
      closeClockOutModal();
      setEndingCash("");
      fetchShift(); // refresh state
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to clock out");
    } finally {
      setIsSubmittingClockOut(false);
    }
  };

  const fetchShift = async () => {
    try {
      const res = await apiInstance.get("/shift/display", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShiftData(res.data.data);
    } catch (error) {
      console.error("Error fetching shift:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchShift();
  }, [token]);

  return {
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
    isSubmittingClockOut,
  };
}
