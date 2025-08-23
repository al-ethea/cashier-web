import apiInstance from "@/utils/api/apiInstance";
import authStore from "@/zustand/authStore";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface IHandleAuthRegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPass: string;
}

export default function useAuthRegister() {
  const router = useRouter();
  const token = authStore((state) => state.token);

  const handleAuthRegister = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPass,
  }: IHandleAuthRegisterProps) => {
    try {
      const response: AxiosResponse<any, any> = await apiInstance.post(
        "/auth/register",
        { firstName, lastName, email, password, confirmPass },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(err.response?.data?.message || "Register failed");
    }
  };
  return { handleAuthRegister };
}
