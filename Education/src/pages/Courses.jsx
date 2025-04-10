import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseSkeleton } from "../components";
import { Star } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useuserStore";

const Courses = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { allCourses, getAllCourses, allCoursesLoading } = useUserStore();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({
    latest: false,
    highlyRated: false,
    myInterests: false,
  });

  useEffect(() => {
    getAllCourses();
  }, []);

  useEffect(() => {
    setFilteredCourses(allCourses);
  }, [allCourses]);

  const applyFilters = (filters) => {
    let filtered = [...allCourses];

    if (filters.myInterests) {
      filtered = filtered.filter((course) =>
        course?.tags?.some((tag) => user?.interests?.includes(tag))
      );
    }

    if (filters.highlyRated || filters.latest) {
      filtered.sort((a, b) => {
        if (filters.highlyRated && filters.latest) {
          return b.rating === a.rating
            ? new Date(b.date) - new Date(a.date)
            : b.rating - a.rating;
        }
        return filters.highlyRated
          ? b.rating - a.rating
          : new Date(b.date) - new Date(a.date);
      });
    }

    setFilteredCourses(filtered);
  };

  const toggleHandler = (filter) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [filter]: !prev[filter] };
      applyFilters(newFilters);
      return newFilters;
    });
  };

  return (
    <main className="pt-20 p-4 bg-base-100 min-h-screen">
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {Object.entries(filters).map(([key, active]) => (
          <button
            key={key}
            className={`btn btn-sm ${active ? "btn-primary" : "btn-ghost"}`}
            onClick={() => toggleHandler(key)}
          >
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (s) => s.toUpperCase())}
          </button>
        ))}
      </div>

      {allCoursesLoading ? (
        <CourseSkeleton />
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredCourses.map((course) => (
            <article
              key={course._id}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <figure className="aspect-video overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="card-body p-4">
                <h2 className="card-title">{course.title}</h2>

                <div className="flex flex-wrap gap-2">
                  {course.tags?.map((tag) => (
                    <span key={tag} className="badge badge-outline">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="badge badge-outline">{course.language}</div>
                  <div className="badge ">{course.level}</div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="rating rating-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        fill={
                          i < course.rating ? "yellow" : "none"
                        }
                      />
                    ))}
                  </div>
                  <span>({course.rating})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img
                          src={course.teacherId.profilePic}
                          alt={course.teacherId.name}
                        />
                      </div>
                    </div>
                    <span className="font-medium">{course.teacherId.name}</span>
                  </div>
                  <span className="badge ">{course.category}</span>
                </div>

                <button
                  className="btn btn-primary mt-4"
                  onClick={() => navigate(course._id)}
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">No Courses Found</h1>
          <p className="opacity-75">Try adjusting your filters</p>
        </div>
      )}
    </main>
  );
};

export default Courses;
