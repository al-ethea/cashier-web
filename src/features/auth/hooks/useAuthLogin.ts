import { toast } from "react-toastify";
import apiInstance from "@/utils/api/apiInstance";
import { useRouter } from "next/navigation";
import authStore from "@/zustand/authStore";
import { AxiosError } from "axios";

interface IHandleAuthLoginProps {
  email: string;
  password: string;
}

export default function useAuthLogin() {
  // const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const setAuth = authStore((state) => state.setAuth);

  const handleAuthLogin = async ({
    email,
    password,
  }: IHandleAuthLoginProps) => {
    try {
      const response = await apiInstance.post("/user/login", {
        email,
        password,
      });

      toast.success(response.data.message);
      setAuth({
        token: response.data.data.token,
        email: response.data.data.email,
        id: response.data.data.userId,
        role: null,
      });

      router.push("/");
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
  };
}
