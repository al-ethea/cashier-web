import { stat } from "fs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
  token: string | null;
  role: "cashier" | "admin" | null;
  cashierId?: string | null;
  adminId?: string | null;
  email: string | null;
  shift?: string | null;
  setAuth: (data: {
    token: string | null;
    role: "cashier" | "admin" | null;
    cashierId?: string | null;
    adminId?: string | null;
    email: string | null;
    shift: string | null;
  }) => void;
}

// Persistance  : Untuk Menyimpan ke Local Storage / Cookies & Partialize : Untuk Mengambil Sebagian Data di Global State untuk di Simpan ke Local Storage / Cookies

const authStore = create(
  persist(
    (set) => ({
      token: null,
      role: null,
      cashierId: null,
      adminId: null,
      email: null,
      shift: null,
      setAuth: ({ token, role, cashierId, adminId, email, shift }) => {
        return set(() => ({ token, role, cashierId, adminId, email, shift }));
      },
    }),
    {
      name: "auth-store",
      partialize: (state: IAuthStore) => ({
        token: state.token,
        role: state.role,
        cashierId: state.cashierId,
        adminId: state.adminId,
        email: state.email,
        shift: state.shift,
      }),
    }
  )
);

export default authStore;
