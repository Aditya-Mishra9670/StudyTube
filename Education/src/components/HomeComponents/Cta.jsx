import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Cta = () => {
  const { user } = useAuthStore();
  return (
    <section className="text-center mt-16  py-12">
      <h2 className="text-4xl font-extrabold  mb-6">
        Ready to Begin Your Learning Journey?
      </h2>
      <p className="text-lg mb-8 max-w-md mx-auto">
        Unlock a world of knowledge with our top-rated courses. Whether you're a
        beginner or looking to deepen your expertise, we have something for
        everyone. Let's get started today!
      </p>
      <Link
        to={
          user
            ? user.role === "student"
              ? "/courses"
              : "/create-course"
            : "/login"
        }
        className="btn btn-primary btn-outline text-xl text-primary-content py-3 px-8 rounded-full"
      >
        {user
          ? user.role === "student"
            ? "Explore Courses"
            : "Create Course"
          : "Join"}
      </Link>
    </section>
  );
};

export default Cta;
