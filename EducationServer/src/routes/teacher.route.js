import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  createCourse,
  editCourse,
  editVideo,
  getMyCourses,
  getSpecificCourse,
  getSpecificVideo,
  uploadVideoFile,
  uploadVideo,
} from "../controllers/teacher.controller.js";

const router = express.Router();
const uploadDir = path.join(process.cwd(), "public", "uploads");

const allowedVideoExtensions = new Set([
  ".mp4",
  ".mov",
  ".m4v",
  ".webm",
  ".mkv",
  ".avi",
  ".wmv",
  ".flv",
  ".mpeg",
  ".mpg",
  ".3gp",
  ".ogv",
]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  },
});

const videoUpload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const isVideoMime = file.mimetype.startsWith("video/");

    if (isVideoMime || allowedVideoExtensions.has(extension)) {
      return cb(null, true);
    }

    return cb(new Error("Unsupported video format"));
  },
});

router.post("/createCourse", createCourse);

router.post("/uploadVideoFile", (req, res, next) => {
  videoUpload.single("file")(req, res, (error) => {
    if (error) {
      const message =
        error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE"
          ? "Video file is too large"
          : error.message || "Unsupported video format";

      return res.status(400).json({ message });
    }

    next();
  });
}, uploadVideoFile);

router.post("/uploadVideo", uploadVideo);

router.get("/getMyCourses", getMyCourses);

router.patch("/updateCourse/:courseId", editCourse);

router.patch("/updateVideo/:videoId", editVideo);

router.get("/course/:courseId", getSpecificCourse);

router.get("/getVideo/:videoId", getSpecificVideo);

export default router;
