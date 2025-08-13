import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IAuthStore {
  token: string | null;
  email: string | null;
  shift: string | null;
  setAuth: (data: { token: string; email: string; shift: string }) => void;
}

// Persistance  : Untuk Menyimpan ke Local Storage / Cookies & Partialize : Untuk Mengambil Sebagian Data di Global State untuk di Simpan ke Local Storage / Cookies

const authStore = create(
  persist(
    (set) => ({
      token: null,
      email: null,
      shift: null,
      setAuth: ({ token, email, shift }) => {
        return set(() => ({ token, email, shift }));
      },
    }),
    {
      name: 'auth-store',
      partialize: (state: IAuthStore) => ({
        token: state.token,
        email: state.email,
        shift: state.shift,
      }),
    }
  )
);

export default authStore;
