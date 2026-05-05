import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTeacherStore = create((set, get) => ({
  creatingCourse: false,
  addingVideo: false,
  uploadingVideo: false,
  myCourses: null,
  loadingMyCourses: false,
  selectedCourse: null,
  editingCourse: false,
  selectedVideo: null,

  getMyCourses: async () => {
    set({ loadingMyCourses: true });
    try {
      const res = await axiosInstance.get("/teacher/getMyCourses");
      set({ myCourses: res?.data?.data });
    } catch (error) {
      console.log(error);
      set({ myCourses: null });
    } finally {
      set({ loadingMyCourses: false });
    }
  },

  setSelectedVideo: (data) => {
    set({ selectedVideo: data });
  },

  getSpecificVideo: async (id) => {
    try {
      const res = await axiosInstance.get(`/teacher/getVideo/${id}`);
      set({selectedVideo:res?.data?.data})
      return res?.data?.data;
    } catch (error) {
      console.log("Error while getting video", error);
    }
  },
  getSpecificCourse: async (id) => {
    try {
      const res = await axiosInstance.get(`/teacher/course/${id}`);
      return res?.data?.data;
    } catch (error) {
      console.log(error);
    }
  },

  setSelectedCourse: (course) => {
    set({ selectedCourse: course });
  },

  uploadVideo: async (data) => {
    set({ uploadingVideo: true });
    try {
      const formData = new FormData();
      formData.append("file", data.file);

      const res = await axiosInstance.post("/teacher/uploadVideoFile", formData, {
        timeout: 5 * 60 * 1000,
      });
      return res?.data?.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to upload video");
      return null;
    } finally {
      set({ uploadingVideo: false });
    }
  },

  editCourse: async (data) => {
    const { myCourses, selectedCourse } = get();
    set({ editingCourse: true });
    try {
      const res = await axiosInstance.patch(
        `/teacher/updateCourse/${data.id}`,
        data
      );
      const updatedFields = res.data.data;
      if (myCourses) {
        const updatedMyCourses = myCourses.map((course) =>
          course._id === data.id ? { ...course, ...updatedFields } : course
        );
        set({ myCourses: updatedMyCourses });
      }
      const updatedSelectedCourse = { ...selectedCourse, ...updatedFields };
      set({ selectedCourse: updatedSelectedCourse });
      toast.success("Course Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ editingCourse: false });
    }
  },

  createCourse: async (data) => {
    const { myCourses } = get();
    set({ creatingCourse: true });
    try {
      const res = await axiosInstance.post("/teacher/createCourse", data);
      const newCourse = res?.data?.data;
      if (myCourses) {
        set({ myCourses: [newCourse, ...myCourses] });
      }
      set({ selectedCourse: newCourse });
      toast.success("Course created successfully");
      return newCourse;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to create course");
      return null;
    } finally {
      set({ creatingCourse: false });
    }
  },

  editVideo: async (data) => {
    const { selectedCourse, myCourses } = get();
    try {
      const res = await axiosInstance.patch(
        `/teacher/updateVideo/${data.id}`,
        data
      );
      const updatedVideo = res?.data?.data;
      set({ selectedVideo: updatedVideo });

      if (selectedCourse) {
        const updatedLectures = selectedCourse.lectures.map((lecture) =>
          lecture._id === data.id ? updatedVideo : lecture
        );
        set({
          selectedCourse: { ...selectedCourse, lectures: updatedLectures },
        });
      }

      if (myCourses) {
        const updatedCourses = myCourses.map((course) => ({
          ...course,
          lectures: course.lectures.map((lecture) =>
            lecture._id === data.id ? updatedVideo : lecture
          ),
        }));
        set({ myCourses: updatedCourses });
      }
      toast.success("Video Edited Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error updating video:", error);
    }
  },

  addVideo: async (data) => {
    set({ addingVideo: true });

    try {
      const res = await axiosInstance.post("/teacher/uploadVideo", data);

      console.log(res?.data?.data);
      toast.success("Video uploaded successfully");
      return res?.data?.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      return null;
    } finally {
      set({ addingVideo: false });
    }
  },
}));
