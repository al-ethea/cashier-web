import apiInstance from "@/utils/api/apiInstance";
import authStore from "@/zustand/authStore";
import { toast } from "react-toastify";

//blm selesai
export default function useCashierShift() {
  const token = authStore((state) => state.token);
  const handleClockIn = async () => {
    try {
      const res = await apiInstance.post("/cashier/clockIn", {
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
    } catch (error) {
      toast.error("Failed to clock in");
    }
  };

  const handleClockOut = async () => {
    try {
    } catch (error) {}
  };
}
