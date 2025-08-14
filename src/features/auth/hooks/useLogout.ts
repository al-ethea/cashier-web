import authStore from "@/zustand/authStore";
import { useRouter } from "next/navigation";

export default function useAuthLogin() {
  const setAuth = authStore((state: any) => state.setAuth);
  const router = useRouter();

  const handleLogout = () => {
    setAuth({ _token: null, email: null, role: null });
    router.push("/");
  };

  return {
    handleLogout,
  };
}
