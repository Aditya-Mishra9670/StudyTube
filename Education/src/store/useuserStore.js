import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  userCourses: null,
  myCoursesLoading: false,
  allCourses: [],
  enrollingInCourse: false,
  courseLoading: false,
  allCoursesLoading: false,
  creatingCourse: false,
  addingVideo: false,
  loadingVideo: false,
  myReports: [],
  selectedReport:null,
  myReportsLoading:false,

  updateProfile: async (data) => {
    try {
      await axiosInstance.post("/user/update-profile", data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  updatePass: async (data) => {
    try {
      await axiosInstance.post("/user/update-pass", data);
      toast.success("Password updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  getMyCourses: async () => {
    set({ myCoursesLoading: true });
    try {
      const res = await axiosInstance.get("/user/myCourses");
      set({ userCourses: res.data.data });
    } catch (error) {
      set({ userCourses: [] });
    } finally {
      set({ myCoursesLoading: false });
    }
  },

  setSelectedReport:(report)=>{
    set({selectedReport:report})
  },

  getMyReports: async () => {
    set({ myReportsLoading: true });
    try {
      const res = await axiosInstance.get("/user/myReports");
      set({ myReports: res.data.data });
    } catch (error) {
      set({ myReports: [] });
    } finally {
      set({ myReportsLoading: false });
    }
  },

  getReviews: async (courseId) => {
    try {
      const res = await axiosInstance.get(`/user/getReviews/${courseId}`);
      return res?.data?.data;
    } catch (error) {
      console.log(error);
    }
  },

  getCourse: async (id) => {
    set({ courseLoading: true });
    try {
      const res = await axiosInstance.get(`/user/course/${id}`);
      return res?.data?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ courseLoading: false });
    }
  },

  getAllCourses: async () => {
    set({ allCoursesLoading: true });
    try {
      const res = await axiosInstance.get("/user/allCourses");
      set({ allCourses: res.data.data });
    } catch (error) {
      set({ allCourses: [] });
    } finally {
      set({ allCoursesLoading: false });
    }
  },

  addReview: async (data) => {
    try {
      await axiosInstance.post("/user/add-review", data);
      toast.success("Review added successfully");
      return true;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return false;
    }
  },

  abandonCourse: async (courseId) => {
    try {
      await axiosInstance.post(`/user/abandon/${courseId}`);
      toast.success("Course abandoned successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  createCourse: async (data) => {
    set({ creatingCourse: true });
    try {
      const res = await axiosInstance.post("/teacher/createCourse", data);
      console.log(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      set({ creatingCourse: false });
    }
  },

  addVideo: async (data) => {
    set({ addingVideo: true });

    try {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

      const videoRes = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const videoData = await videoRes.json();
      const fileURL = videoData.secure_url;
      const duration = videoData.duration;

      const newData = { ...data, file: fileURL, duration };

      const res = await axiosInstance.post("/teacher/uploadVideo", newData);

      console.log(res?.data?.data);
      toast.success("Video uploaded successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ addingVideo: false });
    }
  },

  getVideo: async (id) => {
    set({ loadingVideo: true });
    try {
      const res = await axiosInstance.get(`/user/video/${id}`);
      return res?.data?.data;
    } catch (error) {
      console.log(error);
    }
  },

  getSimilarVideos: async (videoId) => {
    try {
      const res = await axiosInstance.get(`/user/similarVideos/${videoId}`);
      return res?.data?.data;
    } catch (error) {
      console.log(error);
    }
  },

  submitReport: async (data) => {
    try {
      await axiosInstance.post("/user/report-content", data);
      toast.success("Report submitted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  enrollInCourse: async (courseId) => {
    set({ enrollingInCourse: true });
    try {
      await axiosInstance.post(`/user/enroll/${courseId}`);
      toast.success("Enrolled in course successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ enrollingInCourse: false });
    }
  },

  getReportById:async(id)=>{
    try {
      const res = await axiosInstance.get(`/user/report/${id}`);
      set({selectedReport:res?.data?.data})
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
}));
