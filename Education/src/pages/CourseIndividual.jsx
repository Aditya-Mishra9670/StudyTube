import React, { useEffect, useState } from "react";
import { Star, StarHalf, AlertTriangle, Users, Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../store/useuserStore";
import { IndividualCourseSkeleton, ReportForm } from "../components";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { useLearnStore } from "../store/useLearnStore";

const CourseIndividual = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const { setSelectedCourse } = useLearnStore();
  const [showReportForm, setShowReportForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuthStore();
  const {
    getCourse,
    courseLoading,
    getReviews,
    abandonCourse,
    addReview,
    submitReport,
    enrollInCourse,
    enrollingInCourse,
    getMyCourses
  } = useUserStore();
  const { courseId } = useParams();
  const [submittingReview, setSubmittingReview] = useState(false);
  const [abandoningCourse, setAbandoningCourse] = useState(false);
  const [isRegistered, setIsregistered] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showAbandonAlert, setShowAbandonAlert] = useState(false);

  const handleEnrollment = async () => {
    await enrollInCourse(course?._id);
    setCourse(prev => ({ ...prev, enrolledStudents: [...prev.enrolledStudents, user._id ]}));
    getMyCourses();
    setIsregistered(true);
  };

  const handleAddReview = async () => {
    if (userRating <= 0 || !reviewText) {
      toast.error("Please provide rating and review");
      return;
    }
    setSubmittingReview(true);
    const added = await addReview({ courseId, rating: userRating, review: reviewText });
    if (added) setReviews(prev => [...prev, {
      rating: userRating,
      review: reviewText,
      studentId: { name: user.name, profilePic: user.profilePic },
      createdAt: new Date().toISOString()
    }]);
    setSubmittingReview(false);
    setReviewText("");
    setUserRating(0);
  };

  const confirmAbandon = async () => {
    await abandonCourse(course?._id);
    setCourse(prev => ({ ...prev, enrolledStudents: prev.enrolledStudents.filter(id => id !== user._id) }));
    setSelectedCourse(null);
    setShowAbandonAlert(false);
    setIsregistered(false);
  };

  useEffect(() => {
    (async () => {
      const res = await getCourse(courseId);
      const reviewData = await getReviews(courseId);
      setReviews(reviewData);
      setCourse(res);
      if (res?.enrolledStudents?.includes(user._id)) setIsregistered(true);
    })();
  }, [courseId, getCourse, getReviews, user._id]);

  const handleReport = (reason) => {
    submitReport({
      entityReported: courseId,
      type: "Course",
      reasonToReport: reason.reason,
      details: reason.details
    });
    setShowReportForm(false);
  };

  if (courseLoading) return <IndividualCourseSkeleton />;
  if (!course) return <h1 className="text-center text-error h-screen text-2xl">Course not found</h1>;

  return (
    <main className="pt-[69px] bg-base-100 min-h-screen flex flex-col items-center">
      {showAbandonAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
          <div className="bg-base-200 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Abandonment</h2>
            <p className="text-sm mb-4">
              This will remove all your progress and any certificate associated with this course.
            </p>
            <div className="flex justify-end gap-4">
              <button className="btn btn-ghost" onClick={() => setShowAbandonAlert(false)}>
                Cancel
              </button>
              <button className="btn btn-error" disabled={abandoningCourse} onClick={confirmAbandon}>
                {abandoningCourse ? <Loader className="size-5 animate-spin" /> : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="w-full h-72 bg-contain bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-100" />
        <img src={course?.thumbnail} alt="Course thumbnail" className="w-full h-full object-cover absolute inset-0" />
      </section>

      <article className="w-full max-w-5xl bg-base-200 shadow-lg rounded-lg p-6 -mt-16 z-10 mx-4">
        <header className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <div className="avatar w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-4 ring-primary overflow-hidden">
            <img src={course?.teacherId.profilePic} alt="Teacher" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">{course?.teacherId.name}</h2>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            ["Category", course?.category],
            ["Language", course?.language],
            ["Lessons", course?.lectures.length],
          ].map(([label, value]) => (
            <div key={label} className="bg-base-100 p-4 rounded-box">
              <h3 className="font-medium text-sm">{label}</h3>
              <p className="text-primary font-semibold">{value}</p>
            </div>
          ))}
          <div className="bg-base-100 p-4 rounded-box">
            <h3 className="font-medium text-sm">Rating</h3>
            <div className="flex items-center gap-1 rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5"
                  fill={i < Math.floor(course.rating) ? "yellow" : "none"}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{course?.title}</h1>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-5 h-5" />
            <span>{course?.enrolledStudents.length} enrolled</span>
          </div>
          <p className="text-base leading-relaxed">{course?.description}</p>
        </section>
      </article>

      <section className="w-full max-w-5xl bg-base-200 shadow-lg rounded-lg p-6 mt-6 mx-4">
        <h2 className="text-xl font-bold mb-4">Student Reviews</h2>
        <div className="space-y-4">
          {reviews.length > 0 ? reviews.map(review => (
            <div key={review._id} className="bg-base-100 p-4 rounded-box">
              <div className="flex items-start gap-4">
                <img
                  src={review.studentId.profilePic}
                  alt="Profile"
                  className="w-12 h-12 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{review.studentId.name}</h3>
                    <span className="text-xs opacity-75">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 rating rating-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        fill={i < Math.floor(review.rating) ? "yellow" : "none"}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm">{review.review}</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-8">
              <p className="opacity-75">No reviews yet</p>
            </div>
          )}
        </div>
      </section>

      {isRegistered && (
        <div className="w-full max-w-5xl p-4 mx-4 mt-6 bg-base-200 rounded-box shadow-lg">
          <div className="space-y-4">
            <div className="rating">
              {[1, 2, 3, 4, 5].map(num => (
                <Star
                  key={num}
                  className="w-8 h-8 cursor-pointer"
                  fill={userRating >= num ? "yellow" : "none"}
                  onClick={() => setUserRating(num)}
                />
              ))}
            </div>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Share your experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="3"
            />
            <button
              className="btn btn-primary w-full sm:w-auto"
              disabled={submittingReview}
              onClick={handleAddReview}
            >
              {submittingReview ? (
                <Loader className="animate-spin" />
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </div>
      )}

      <footer className="w-full max-w-5xl p-4 mt-6 flex flex-wrap gap-4 justify-center">
        {!isRegistered ? (
          <button
            className="btn btn-primary w-full sm:w-auto"
            disabled={enrollingInCourse}
            onClick={handleEnrollment}
          >
            {enrollingInCourse ? (
              <Loader className="animate-spin" />
            ) : (
              "Enroll Now"
            )}
          </button>
        ) : (
          <>
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={() => {
                setSelectedCourse(course);
                navigate(`/course/resume/${courseId}`);
              }}
            >
              Continue Learning
            </button>
            <button
              className="btn btn-outline btn-error w-full sm:w-auto"
              onClick={() => setShowAbandonAlert(true)}
            >
              Abandon Course
            </button>
          </>
        )}
        <button
          className="btn btn-outline w-full sm:w-auto"
          onClick={() => setShowReportForm(true)}
        >
          <AlertTriangle className="w-5 h-5" />
          Report Issue
        </button>
      </footer>

      {showReportForm && (
        <ReportForm
          onSubmit={handleReport}
          onCancel={() => setShowReportForm(false)}
        />
      )}
    </main>
  );
};

export default CourseIndividual;