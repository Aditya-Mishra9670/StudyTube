import { create } from "zustand";
import { axiosInstance, markAuthSession, setAuthToken } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  user: null,
  authChecked: false,
  checkingAuth: false,
  isLoggingIn: false,
  isLoggingOut: false,
  

  getUser: async ({ force = false } = {}) => {
    const { authChecked, checkingAuth, user } = get();
    if (!force && (authChecked || checkingAuth)) return user;

    set({ checkingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/verify");
      if (res.data?.authenticated) {
        set({ user: res.data.data, authChecked: true });
        return res.data.data;
      }

      setAuthToken(null);
      set({ user: null, authChecked: true });
      return null;
    } catch (error) {
      console.log(error);
      setAuthToken(null);
      set({ user: null, authChecked: true });
      return null;
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
      const token = res?.data?.token;
      if (token) {
        setAuthToken(token);
      } else {
        markAuthSession();
      }
      set({ user: res?.data?.data, authChecked: true });
      return res?.data?.data;
    } catch (error) {
      console.log(error);
      set({ user: null, authChecked: true });
      const message = error?.response?.data?.message || error?.message || "Failed to login";
      toast.error(message);
      return null;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signUp:async(data)=>{
    try {
      const res = await axiosInstance.post("/auth/signup",data);
      const token = res?.data?.token;
      if (token) {
        setAuthToken(token);
      } else {
        markAuthSession();
      }
      set({user:res?.data?.data, authChecked: true});
      toast.success("Signed Up Successfully")
      return res?.data?.data;
    } catch (error) {
      console.log("Error while signing up",error)
      set({ user: null, authChecked: true });
      const message = error?.response?.data?.message || error?.message || "Signup failed"
      toast.error(message)
      return null;
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      setAuthToken(null);
      set({ user: null, authChecked: true });
      toast.success("Logged Out!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to logout");
      setAuthToken(null);
      set({ user: null, authChecked: true });
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
