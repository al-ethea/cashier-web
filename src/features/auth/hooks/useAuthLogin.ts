import { toast } from "react-toastify";
import apiInstance from "@/utils/api/apiInstance";
import { useRouter } from "next/navigation";
import authStore from "@/zustand/authStore";
import { AxiosError } from "axios";
import { useState } from "react";

interface IHandleAuthLoginProps {
  email: string;
  password: string;
}

export default function useAuthLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const setAuth = authStore((state) => state.setAuth);

  const handleAuthLogin = async ({
    email,
    password,
  }: IHandleAuthLoginProps) => {
    try {
      const response = await apiInstance.post("/auth/login", {
        email,
        password,
      });
      console.log(response.data);

      const {
        token,
        role,
        email: userEmail,
        cashierId,
        adminId,
        shift,
      } = response.data.data;

      toast.success(response.data.message);

      // Save to store depending on role
      if (role === "cashier") {
        setAuth({
          token,
          role,
          cashierId,
          email: userEmail,
          shift: shift || null,
        });
        router.push("/dashboard");
      } else if (role === "admin") {
        setAuth({
          token,
          role,
          adminId,
          email: userEmail,
          shift: null, // not needed for admin
        });
        router.push("/admin/dashboard");
      }
    } catch (error) {
      const errResponse = error as AxiosError<{ message: string }>;
      if (errResponse) {
        const status = errResponse.response?.status;
        const message =
          errResponse.response?.data?.message || "Terjadi kesalahan";

        if (status === 404) {
          toast.error("Email Anda salah atau belum terdaftar");
        } else if (status === 401) {
          toast.error("Password Anda salah");
        } else {
          toast.error(message);
        }
      } else {
        toast.error("Terjadi kesalahan pada jaringan");
        console.error("Error:", error);
      }
    }
  };

  return {
    handleAuthLogin,
    showPassword,
    setShowPassword,
  };
}
