import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  checkingAuth: true,
  isLoggingIn: false,
  isLoggingOut: false,
  

  getUser: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/verify");
      set({ user: res.data.data });
    } catch (error) {
      console.log(error);
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },


  getAllData:async()=>{
    try {
      const res = await axiosInstance.get("/about");
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ user: res?.data?.data });
    } catch (error) {
      console.log(error);
      set({ user: null });
      toast.error(error.response?.data?.message || "Failed to login");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signUp:async(data)=>{
    try {
      const res = await axiosInstance.post("/auth/signup",data);
      set({user:res?.data?.data});
      toast.success("Signed Up Successfully")
    } catch (error) {
      console.log("Error while signinug up",error)
      toast.error(error?.response?.data?.message)
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("Logged Out!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to logout");
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
