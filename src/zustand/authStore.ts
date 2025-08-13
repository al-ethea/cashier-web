import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
  _token: string | null;
  _email: string | null;
  _shift: string | null;
}

// Persistance  : Untuk Menyimpan ke Local Storage / Cookies & Partialize : Untuk Mengambil Sebagian Data di Global State untuk di Simpan ke Local Storage / Cookies

const authStore = create(
  persist(
    (set) => ({
      token: null,
      email: null,
      shift: null,

      setAuth: ({ _token, _email, _shift }: IAuthStore) => {
        return set(() => ({ token: _token, email: _email, shift: _shift }));
      },
    }),
    {
      name: "token",
      partialize: (state: any) => ({ token: state.token }),
    }
  )
);

export default authStore;
