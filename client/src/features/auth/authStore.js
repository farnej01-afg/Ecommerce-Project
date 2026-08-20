import { create } from "zustand";
import axiosInstance from "../../api/axiosInstance";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  role: null,
  isLoading: false,
  error: null,
  setUser: (userData) => set({ user: userData }),
  setToken: (token) => set({ token }),
  setRole: (role) => set({ role }),
  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      set({
        user: response.data.user,
        token: response.data.token,
        role: response.data.role,
        isLoading: false,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.removeItem("guestFavoriteIds");
      return response.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login Failed",
        isLoading: false,
      });
    }
  },
  register: async (username, email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post("/users/register", {
        username,
        email,
        password,
      });

      set({
        user: response.data.user,
        token: response.data.token,
        isLoading: false,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.removeItem("guestFavoriteIds");
      return response.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Register failed",
        isLoading: false,
      });
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, error: null });
  },
  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;
