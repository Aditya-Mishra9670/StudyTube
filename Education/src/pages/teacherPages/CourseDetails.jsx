import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTeacherStore } from "../../store/useTeacherStore";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader, Users, BookOpen, Clock, Film, Pencil } from "lucide-react";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const {
    selectedCourse,
    setSelectedCourse,
    getSpecificCourse,
    setSelectedVideo,
  } = useTeacherStore();
  const [loading, setLoading] = useState(false);
  const [dontShow, setDontShow] = useState(false);
  const [showEnrolled, setShowEnrolled] = useState(false);

  useEffect(() => {
    const getCourseData = async () => {
      try {
        setLoading(true);
        const course = await getSpecificCourse(courseId);
        setSelectedCourse(course);
        if (course?.teacherId !== user._id) setDontShow(true);
      } finally {
        setLoading(false);
      }
    };

    if (!selectedCourse || selectedCourse._id !== courseId) getCourseData();
  }, [
    courseId,
    user._id,
    getSpecificCourse,
    selectedCourse,
    setSelectedCourse,
  ]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="size-12 animate-spin text-primary" />
      </div>
    );

  if (dontShow)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-error">
        Access Denied
      </div>
    );

  if (!selectedCourse) return null;

  const {
    title,
    description,
    syllabus,
    thumbnail,
    language,
    category,
    level,
    lectures,
    enrolledStudents,
  } = selectedCourse;

  return (
    <div className="max-w-5xl mx-auto p-6 pt-24 space-y-8">
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-8 pt-8">
          <img
            src={thumbnail}
            alt="Course Thumbnail"
            className="rounded-xl h-96 w-full object-contain shadow-md"
          />
        </figure>

        <div className="card-body">
          <div className="space-y-6">
            <div className="space-y-4 border-b pb-6">
              <h1 className="text-4xl font-bold text-primary">{title}</h1>
              <p className="text-lg text-base-content/90">{description}</p>

              <div className="flex flex-wrap gap-2">
                <div className="badge badge-lg badge-neutral gap-2">
                  <BookOpen className="size-4" /> {language}
                </div>
                <div className="badge badge-lg badge-outline gap-2">
                  {category}
                </div>
                <div className="badge badge-lg badge-primary font-semibold">
                  {level}
                </div>
              </div>
            </div>

            <div className="space-y-4 border-b pb-6">
              <h2 className="text-2xl font-semibold text-primary flex items-center gap-2">
                <BookOpen className="size-6" /> Course Syllabus
              </h2>
              <p className="text-base-content/90 leading-relaxed whitespace-pre-line">
                {syllabus.map((item,idx) => (
                  <span key={idx}> {item},</span>
                ))}
              </p>
            </div>

            <div
              className={`space-y-4 ${
                showEnrolled ? "bg-base-200 rounded-box p-4" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Users className="size-6" />
                  Enrolled Students
                  <span className="text-lg font-normal">
                    ({enrolledStudents?.length || 0})
                  </span>
                </h2>
                <button
                  className={`btn btn-sm ${
                    showEnrolled ? "btn-active" : "btn-outline"
                  }`}
                  onClick={() => setShowEnrolled(!showEnrolled)}
                >
                  {showEnrolled ? "Collapse" : "Expand"}
                </button>
              </div>

              {showEnrolled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {enrolledStudents.map((student, idx) => (
                    <div
                      key={idx}
                      className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-12 rounded-full">
                              <img
                                src={student.profilePic}
                                alt={student.name}
                                onError={(e) => {
                                  e.target.src = "/default-avatar.png";
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-medium">{student.name}</h3>
                            {student.email && (
                              <p className="text-sm text-base-content/70">
                                {student.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary flex items-center gap-2">
                <Film className="size-6" /> Course Lectures
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {lectures?.length > 0 ? (
                  lectures.map((lecture, idx) => (
                    <div
                      key={lecture._id || idx}
                      className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4">
                        <div className="flex flex-col md:flex-row gap-6">
                          <figure className="flex-shrink-0 w-full md:w-48">
                            <img
                              src={lecture.thumbnail}
                              alt={lecture.title}
                              className="rounded-lg h-32 w-full object-cover"
                            />
                          </figure>
                          <div className="flex-1 space-y-3">
                            <h3 className="text-xl font-semibold text-primary">
                              {lecture.title}
                            </h3>
                            <p className="text-base-content/80">
                              {lecture.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-neutral-content">
                              <Clock className="size-4" />
                              {new Date(lecture.duration * 1000)
                                .toISOString()
                                .substr(11, 8)}
                            </div>
                            <a
                              href={lecture.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary btn-sm w-fit"
                            >
                              Watch Lecture
                            </a>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedVideo(lecture);
                              navigate(`/editVideo/${lecture._id}`);
                            }}
                            className="text-neutral-content hover:text-primary transition"
                          >
                            <Pencil className="size-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="alert alert-info">
                    <span>No lectures available yet</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
