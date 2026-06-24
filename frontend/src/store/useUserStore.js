import { create } from "zustand";
import { getCurrentUser } from "../api/user.api";

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: false,

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
    set({ isCheckingAuth: true });

    try {
      const data = await getCurrentUser();

      set({
        user: data.user,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

export default useUserStore;
