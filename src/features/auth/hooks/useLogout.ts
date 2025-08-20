import authStore from "@/zustand/authStore";
import { useRouter } from "next/navigation";

export default function useAuthLogout() {
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
