import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";



const Hero = () => {
    const {user} = useAuthStore()
  return (
    <>
      <div>
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-base-content">
          Empower Your Future with{" "}
          <span className="text-primary">Free Quality Education</span>
        </h1>
        <p className="border border-primary inline-block text-sm p-1 mt-2 rounded-xl font-semibold shadow-md">
          Empowering Minds, One Free Lesson at a Time!
        </p>

        <p className="mt-6 text-lg lg:text-xl text-base-content leading-relaxed">
          Unlock the power of knowledge with StudyTube. Our platform offers
          premium-quality resources, helping you master skills and achieve your
          dreams—all without financial barriers. Join a thriving community of
          learners shaping a better tomorrow.
        </p>

        <div className="mt-8 flex gap-6">
          <Link
            to={
              user
                ? user.role === "student"
                  ? "/courses"
                  : "/create-course"
                : "/login"
            }
            className="btn btn-primary hover:btn-outline"
          >
            Get Started
          </Link>
          <Link to="/about" className="btn btn-info btn-outline">
            Learn More
          </Link>
        </div>
      </div>
      <div className="relative">
        <img
          src="/Hero1.png"
          alt="Empowered Learning"
          className="w-[90%] mx-auto object-contain"
        />
      </div>
    </>
  );
};

export default Hero;
