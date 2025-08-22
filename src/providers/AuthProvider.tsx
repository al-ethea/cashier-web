"use client";
import apiInstance from "@/utils/api/apiInstance";
import { useEffect, useState } from "react";
import authStore from "@/zustand/authStore";
import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const token = authStore((state: any) => state.token);
  console.log(token);
  const setAuth = authStore((state: any) => state.setAuth);
  const router = useRouter();
  const pathName = usePathname();
  const [isHandleSessionLoginDone, setIsHandleSessionLoginDone] =
    useState(false);

  // const handleSessionLogin = async () => {
  //   try {
  //     const response = await apiInstance.get("/auth/session-login", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response);

  //     setAuth({
  //       token: response.data.data.token,
  //       id: response.data.data.cashierId || response.data.data.adminId,
  //       email: response.data.data.email,
  //       role: response.data.data.role,
  //       shift: response.data.data.shift,
  //     });
  //     setIsHandleSessionLoginDone(true);
  //     console.log("Session Login Success");
  //   } catch (error) {
  //     console.log("Session Login Failed");
  //     setAuth({
  //       token: null,
  //       id: null,
  //       email: null,
  //       role: null,
  //       shift: null,
  //     });
  //     setIsHandleSessionLoginDone(true);
  //   }
  // };

  const handleSessionLogin = async () => {
    try {
      const response = await apiInstance.get("/auth/session-login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const {
        token: newToken,
        email,
        shift,
        role,
        cashierId,
        adminId,
      } = response.data.data;

      setAuth({
        token: newToken,
        email,
        shift: shift || null,
        role,
        cashierId: cashierId || null,
        adminId: adminId || null,
      });

      setIsHandleSessionLoginDone(true);
      console.log("✅Session Login Success");
    } catch (error) {
      console.log("❌Session Login Failed");
      setAuth({
        token: null,
        email: null,
        shift: null,
        role: null,
        cashierId: null,
        adminId: null,
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
      const { cashierId, adminId, role } = authStore.getState();

      // Not logged in or no valid user
      if (!token || (!cashierId && !adminId)) {
        if (!isPublicPath) {
          router.push("/");
        }
      } else {
        // Logged in users trying to access public pages
        if (isPublicPath) {
          if (cashierId) {
            router.push("/dashboard");
          } else if (adminId) {
            router.push("/admin/dashboard");
          }
        }
      }
    }
  }, [isHandleSessionLoginDone, pathName, token]);

  return <>{children}</>;
}
