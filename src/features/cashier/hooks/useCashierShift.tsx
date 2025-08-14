import apiInstance from "@/utils/api/apiInstance";
import authStore from "@/zustand/authStore";
import { toast } from "react-toastify";

//blm selesai
export default function useCashierShift() {
  const token = authStore((state) => state.token);
}
