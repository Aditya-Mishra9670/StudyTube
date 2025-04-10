import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTeacherStore } from "../../store/useTeacherStore";
import { Loader } from "lucide-react";

const TeacherCourses = () => {
  const navigate = useNavigate();
  const { myCourses, getMyCourses, loadingMyCourses,setSelectedCourse } = useTeacherStore();

  useEffect(() => {
    if (!myCourses) getMyCourses();
  }, [myCourses, getMyCourses]);

  if (loadingMyCourses)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="size-12 animate-spin text-primary" />
      </div>
    );

  if (!myCourses || myCourses.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-medium text-warning">No courses available</p>
      </div>
    );

  return (
    <div className="p-6 pt-24">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myCourses.map((course) => (
          <div
            key={course._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200"
          >
            <figure className="px-4 pt-4">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="rounded-xl h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{course.title}</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="badge font-semibold badge-primary">
                  {course.language }
                </div>
                <div className="badge badge-outline">
                  {course.category}
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <p>Students: {course.enrolledStudents?.length}</p>
                <p>Lectures: {course.lectures?.length}</p>
              </div>
                <button onClick={() => navigate(`/${course._id}/addVideo`)}
                  className="btn btn-info btn-sm flex-1">
                  Add Lecture
                </button>
              <div className="card-actions mt-4" onClick={()=>setSelectedCourse(course)}>
                <button
                  onClick={() => navigate(`/teacher/course/edit/${course._id}`)}
                  className="btn btn-outline btn-sm flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/teacher/course/${course._id}`)}
                  className="btn btn-primary btn-sm flex-1"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherCourses;