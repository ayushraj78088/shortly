import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCurrentUser } from "../api/user.api";

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  checkAuth: async () => {
    try {
      const data = await getCurrentUser();

      set({
        user: data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },
}));

export default useUserStore;
