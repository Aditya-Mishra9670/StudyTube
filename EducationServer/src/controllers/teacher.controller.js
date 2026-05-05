import cloudinary from "../lib/cloud.js";
import Course from "../models/course.model.js";
import Notification from "../models/notification.model.js";
import Video from "../models/video.model.js";
import mongoose from "mongoose";
import fs from "fs/promises";

const normalizeSyllabus = (syllabus) => {
  if (Array.isArray(syllabus)) {
    return syllabus.map((item) => item.trim()).filter(Boolean);
  }

  if (typeof syllabus === "string") {
    return syllabus
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const isRemoteUrl = (value) => /^https?:\/\//i.test(value);

const isVideoDataUri = (value) => /^data:video\/[\w.+-]+;base64,/i.test(value);

export const createCourse = async (req, res) => {
  const { title, description, language, syllabus, level, category, thumbnail } =
    req.body;
  const user = req.user;
  const syllabusItems = normalizeSyllabus(syllabus);

  try {
    if (
      !title ||
      !description ||
      !category ||
      !thumbnail ||
      !language ||
      !syllabusItems.length ||
      !level
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const response = await cloudinary.uploader.upload(thumbnail, {
      folder: "StudyTube/course/thumbnail",
    });
    const thumbnailUrl = response.secure_url;

    const course = new Course({
      title,
      description,
      category,
      thumbnail: thumbnailUrl,
      teacherId: user._id,
      language,
      syllabus: syllabusItems,
      level,
    });

    await course.save();

    return res
      .status(201)
      .json({ message: "Course created successfully", data: course });
  } catch (error) {
    console.log("Error in creating course", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editCourse = async (req, res) => {
  const { courseId } = req.params;
  const { description, category, thumbnail, language, syllabus, level } =
    req.body;
  const user = req.user;
  const syllabusItems = normalizeSyllabus(syllabus);

  if (!mongoose.isValidObjectId(courseId)) {
    return res.status(400).json({ message: "Invalid course Id" });
  }

  try {
    if (
      !courseId ||
      (!description &&
        !category &&
        !thumbnail &&
        !language &&
        !syllabusItems.length &&
        !level)
    ) {
      return res
        .status(400)
        .json({ message: "At least one field is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.teacherId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (description) course.description = description;
    if (category) course.category = category;
    if (thumbnail) {
      const response = await cloudinary.uploader.upload(thumbnail, {
        folder: "StudyTube/course/thumbnail",
      });
      course.thumbnail = response.secure_url;
    }
    if (language) course.language = language;
    if (syllabusItems.length) course.syllabus = syllabusItems;
    if (level) course.level = level;

    await course.save();

    return res
      .status(200)
      .json({ message: "Course updated successfully", data: course });
  } catch (error) {
    console.error("Error in updating course", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadVideoFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const response = await cloudinary.uploader.upload(req.file.path, {
      folder: "StudyTube/Lectures/videos",
      resource_type: "video",
    });

    return res.status(200).json({
      message: "Video uploaded successfully",
      data: {
        fileURL: response.secure_url,
        duration: response.duration,
      },
    });
  } catch (error) {
    console.log("Error in uploading video file", error);
    return res.status(500).json({ message: "Failed to upload video" });
  } finally {
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }
  }
};

export const uploadVideo = async (req, res) => {
  const { title, description, duration, thumbnail, file, courseId } = req.body;
  const user = req.user;
  if (!mongoose.isValidObjectId(courseId)) {
    return res.status(400).json({ message: "Invalid course Id" });
  }

  try {
    if (
      !courseId ||
      !title ||
      !description ||
      !thumbnail ||
      !file
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.teacherId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const response = await cloudinary.uploader.upload(thumbnail, {
      folder: "StudyTube/Lectures/thumbnail",
    });
    const thumbnailUrl = response.secure_url;
    let videoUrl = file;
    let videoDuration = duration;

    if (typeof file !== "string") {
      return res.status(400).json({ message: "Invalid video file" });
    }

    if (isVideoDataUri(file)) {
      const videoResponse = await cloudinary.uploader.upload(file, {
        folder: "StudyTube/Lectures/videos",
        resource_type: "video",
      });
      videoUrl = videoResponse.secure_url;
      videoDuration = videoDuration || videoResponse.duration;
    } else if (!isRemoteUrl(file)) {
      return res.status(400).json({ message: "Invalid video file URL" });
    }

    if (!videoDuration) {
      return res.status(400).json({ message: "Video duration is required" });
    }

    const video = new Video({
      title,
      description,
      url: videoUrl,
      courseId,
      thumbnail: thumbnailUrl,
      duration: videoDuration,
    });
    course.lectures.push(video._id);
    await course.save();

    await video.save();

    if (course.enrolledStudents?.length) {
      const notifications = course.enrolledStudents.map((studentId) => ({
        userId: studentId,
        message: `New video "${title}" uploaded in ${course.title}`,
        reference: `/courses/${courseId}`,
      }));

      await Notification.insertMany(notifications);
    }

    return res
      .status(200)
      .json({ message: "Lecture uploaded successfully", data: video });
  } catch (error) {
    console.log("Error in uploading lecture", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editVideo = async (req, res) => {
  //only description,thumbnail are editable
  const { thumbnail, description, title } = req.body;
  const { videoId } = req.params;
  try {
    if (!mongoose.isValidObjectId(videoId)) {
      return res.status(400).json({ message: "Invalid video id" });
    }
    if (!thumbnail && !description && !title) {
      return res.status(400).json({ message: "Atleast one feild is required" });
    }
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video doesn't exist" });
    }
    const courseId = video.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found to publish video" });
    }
    if (course?.teacherId?.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Unauthorised , can't make changes to other's videos",
      });
    }

    if (description) video.description = description;
    if (thumbnail) {
      const response = await cloudinary.uploader.upload(thumbnail, {
        folder: "StudyTube/videos/thumbnail",
      });
      video.thumbnail = response.secure_url;
    }
    if (title) video.title = title;

    await video.save();
    return res
      .status(200)
      .json({ message: "Video upadted successfully", data: video });
  } catch (error) {
    console.log("Error in updating video details,", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyCourses = async (req, res) => {
  const user = req.user;
  try {
    const courses = await Course.find({ teacherId: user._id })
      .populate("enrolledStudents", "profilePic name")
      .populate("lectures");
    if (!courses.length) {
      return res.status(200).json({ message: "No course found" });
    }
    return res.status(200).json({ data: courses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getSpecificCourse = async (req, res) => {
  const { courseId } = req.params;
  if (!mongoose.isValidObjectId(courseId)) {
    return res.status(400).json({ message: "Invalid course Id" });
  }
  try {
    const course = await Course.findById(courseId)
      .populate("enrolledStudents", "profilePic name")
      .populate("lectures");

    if (!course) {
      return res
        .status(404)
        .json({ message: "No course found with specific id" });
    }
    return res.status(200).json({ data: course });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSpecificVideo = async (req, res) => {
  const { videoId } = req.params;
  try {
    if (!mongoose.isValidObjectId(videoId)) {
      return res.status(400).json({
        message: "Invalid Video ID",
      });
    }
    const video = await Video.findById(videoId).populate("courseId");
    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }
    if (video?.courseId?.teacherId.toString() !== req?.user?._id.toString()) {
      return res.status(400).json({
        message: "Not allowed",
      });
    }

    return res.status(200).json({
      message: "Video fetched successfully",
      data: video,
    });
  } catch (error) {
    console.log("Error while getting specific video", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
