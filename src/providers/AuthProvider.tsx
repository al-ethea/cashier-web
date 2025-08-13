"use client";
import apiInstance from "@/utils/api/apiInstance";
import { useEffect, useState } from "react";
import authStore from "@/zustand/authStore";
import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const token = authStore((state: any) => state.token);
  const setAuth = authStore((state: any) => state.setAuth);
  const router = useRouter();
  const pathName = usePathname();
  const [isHandleSessionLoginDone, setIsHandleSessionLoginDone] =
    useState(false);

  const handleSessionLogin = async () => {
    try {
      const response = await apiInstance.get("/auth/session-login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      setAuth({
        _token: response.data.data.token,
        _email: response.data.data.email,
        _shift: response.data.data.shift,
      });
      setIsHandleSessionLoginDone(true);
    } catch (error) {
      setAuth({
        _token: null,
        _email: null,
        _shift: null,
      });
      setIsHandleSessionLoginDone(true);
    }
  };

  // Dijalankan Pertama Kali
  useEffect(() => {
    if (token) {
      handleSessionLogin();
    } else {
      setIsHandleSessionLoginDone(true);
    }
  }, [token]);

  useEffect(() => {
    if (isHandleSessionLoginDone) {
      const isPublicPath = ["/", "/login", "/register"].includes(pathName);
      if (token && isPublicPath) {
        router.push("/dashboard");
      } else if (!token && !isPublicPath) {
        router.push("/");
      }
    }
  }, [isHandleSessionLoginDone, pathName]);

  return <>{children}</>;
}
