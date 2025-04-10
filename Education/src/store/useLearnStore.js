import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useLearnStore = create((set) => ({
  selectedCourse: {},
  selectedVideo: {},

  setSelectedCourse: (course) => {
    set({ selectedCourse: course });
  },
  setSelectedVideo: (video) => {
    set({ selectedVideo: video });
  },

  getComments:async(id)=>{
    try {
      const res = await axiosInstance.get(`/user/getComments/${id}`);
      return res?.data?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  addComment:async(data)=>{
    try {
      await axiosInstance.post(`/user/add-comment`,data);
      toast.success("Comment added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  getSelectedCourse: async (courseId) => {
    try {
      const res = await axiosInstance.get(
        `/user/specificEnrollment/${courseId}`
      );
      return res?.data?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
}));
