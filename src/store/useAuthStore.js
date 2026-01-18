import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("Account creation failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Account Logout successfull");
    } catch (error) {
      toast.error("Logout Failed");
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      console.log(data);

      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
    } catch (error) {
      toast.error("Login Failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
