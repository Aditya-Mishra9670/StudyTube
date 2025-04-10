import React, { useEffect, useState } from "react";
import { useLearnStore } from "../store/useLearnStore";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ResumeLearning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { selectedCourse, setSelectedCourse, setSelectedVideo, getSelectedCourse } = useLearnStore();
  const [loading, setLoading] = useState(false);

  const handleWatch = (lecture) => {
    setSelectedVideo(lecture);
    navigate(`/course/video/${lecture._id}`);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const course = await getSelectedCourse(courseId);
        setSelectedCourse(course);
      } finally {
        setLoading(false);
      }
    };

    if (!selectedCourse || selectedCourse?.courseId?._id !== courseId) {
      fetchCourse();
    }
  }, [selectedCourse, courseId, getSelectedCourse, setSelectedCourse]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="size-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading course content</p>
        </div>
      </div>
    );
  }

  if (!selectedCourse || selectedCourse?.courseId?._id !== courseId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-2xl font-bold text-error">Course not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-20">
      <header className="max-w-4xl mx-auto mb-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">{selectedCourse.courseId.title}</h1>
          <p className="text-xl text-neutral-content">
            Instructor: {selectedCourse.courseId.teacherId.name}
          </p>
        </div>

        <div className="mt-8 space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Course Progress</span>
            <span>{selectedCourse.progress}% Complete</span>
          </div>
          <progress 
            className="progress progress-primary w-full h-4"
            value={selectedCourse.progress} 
            max="100"
          />
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedCourse.courseId.lectures.map((lecture) => (
          <article key={lecture._id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
            <figure className="relative aspect-video">
              <img
                src={lecture.thumbnail}
                alt={lecture.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-base-100" />
              <div className="absolute top-2 right-2 badge badge-neutral">
                {new Date(lecture.duration * 1000).toISOString().substr(11, 8)}
              </div>
            </figure>
            
            <div className="card-body p-6">
              <h2 className="card-title text-lg">{lecture.title.substr(0,20)}...</h2>
              <button
                onClick={() => handleWatch(lecture)}
                className="btn btn-primary mt-4"
              >
                Continue Watching
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default ResumeLearning;