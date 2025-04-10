import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex items-center justify-center pt-[60px] flex-col gap-7  text-base-content">
      <h1 className="text-6xl font-bold text-error pt-10">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-lg text-center text-content-secondary">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/">
        <button className="btn btn-primary px-6 py-2 mb-32 text-lg rounded-full hover:shadow-lg transition-all duration-300">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default Error;
