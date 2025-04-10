import React, { useEffect } from "react";
import { Star } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../store/useuserStore";
import { MyCourseSkeleton } from "../components";
import { useLearnStore } from "../store/useLearnStore";

const CourseList = () => {
  const navigate = useNavigate();
  const { userCourses, getMyCourses, myCoursesLoading } = useUserStore();
  const { setSelectedCourse } = useLearnStore();

  useEffect(() => {
    if (!userCourses) getMyCourses();
  }, [userCourses]);

  if (myCoursesLoading) return <MyCourseSkeleton />;

  return (
    <div className="pt-[69px] p-4 max-w-7xl mx-auto space-y-6">
      {userCourses?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-xl font-semibold mb-4">No enrolled courses</p>
          <Link to="/courses" className="btn btn-primary">
            Explore Courses
          </Link>
        </div>
      ) : (
        userCourses?.map((enrollment) => (
          <article
            key={enrollment.courseId._id}
            className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-box overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              <img
                src={enrollment.courseId.thumbnail}
                alt={enrollment.courseId.title}
                className="rounded-box w-full h-48 object-cover"
              />

              <div className="col-span-2 space-y-3">
                <h2 className="text-2xl font-bold">
                  {enrollment.courseId.title}
                </h2>

                <div className="flex flex-wrap gap-2">
                  {enrollment.courseId.tags?.map((tag) => (
                    <span key={tag} className="badge ">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="badge  badge-outline">
                    {enrollment.courseId.language}
                  </div>
                  <div className="badge  badge-outline">
                    {enrollment.courseId.level}
                  </div>
                  <div className="badge  badge-outline">
                    {enrollment.courseId.category}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="rating rating-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        fill={
                          i < enrollment.courseId.rating ? "yellow" : "none"
                        }
                      />
                    ))}
                  </div>
                  <span>({enrollment.courseId.rating})</span>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{enrollment.progress}%</span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={enrollment.progress}
                    max="100"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    className="btn btn-primary flex-1"
                    onClick={() => {
                      navigate(`/course/resume/${enrollment.courseId._id}`);
                      setSelectedCourse(enrollment);
                    }}
                  >
                    {enrollment.completed ? "Review" : "Continue"}
                  </button>

                  <button
                    className="btn btn-outline flex-1"
                    onClick={() =>
                      navigate(`/courses/${enrollment.courseId._id}`)
                    }
                  >
                    Details
                  </button>

                  {enrollment.certificateUrl && (
                    <a
                      href={enrollment.certificateUrl}
                      className="btn btn-accent flex-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Certificate
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
};

export default CourseList;
