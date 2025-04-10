import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AboutUs = () => {
  const navigate = useNavigate();
  const { user, getAllData } = useAuthStore();
  const [data, setData] = useState(null);

  useEffect(() => {
    getAllData().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className="w-full">
      <section
        id="hero"
        className="min-h-[70vh] bg-base-200 text-base-content pt-16"
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center py-16">
            <div className="space-y-8 animate__animated animate__fadeInLeft">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Empowering Education Through
                <span className="text-primary"> Digital Learning</span>
              </h1>
              <p className="text-lg md:text-xl text-base-content/70">
                Access quality education, track your progress, and earn
                certifications - all for free. Join StudyTube to begin your
                structured learning journey today.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  className="btn btn-primary px-6 md:px-8 py-3"
                  onClick={() =>
                    user ? navigate("/my-courses") : navigate("/login")
                  }
                >
                  Start Learning
                </button>
                <button
                  className="btn btn-outline btn-primary px-6 md:px-8 py-3"
                  onClick={() => navigate("/courses")}
                >
                  Explore Courses
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-base-content/50">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Free Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Progress Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Certification</span>
                </div>
              </div>
            </div>
            <div className="relative animate__animated animate__fadeInRight">
              <div className="relative card bg-base-100 shadow-lg">
                <div className="space-y-6 p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">
                      Active Learners
                    </span>
                    <span className="text-2xl text-primary">
                      {data?.allUsers}+
                    </span>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value="75"
                    max="100"
                  ></progress>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card bg-base-200 p-4">
                      <div className="text-sm text-base-content/60">
                        Courses
                      </div>
                      <div className="text-xl font-bold">
                        {data?.allCourses}+
                      </div>
                    </div>
                    <div className="card bg-base-200 p-4">
                      <div className="text-sm text-base-content/60">
                        Certifications
                      </div>
                      <div className="text-xl font-bold">
                        {data?.certificates}+
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-base-200 to-transparent" />
      </section>

      <section id="mission" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className=" p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300 animate-fadeInUp">
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm0-4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Quality Education</h3>
              <p className="-content">
                Providing structured, high-quality educational content that's
                accessible to everyone, everywhere.
              </p>
            </div>
            <div
              className=" p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300 animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Progress Tracking</h3>
              <p className="-content">
                Empowering learners with tools to monitor their progress and
                stay motivated throughout their learning journey.
              </p>
            </div>
            <div
              className=" p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300 animate-fadeInUp"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Certification</h3>
              <p className="-content">
                Recognizing achievements through verified certificates that
                validate learners' skills and knowledge.
              </p>
            </div>
          </div>
          <div className="mt-16  -content p-8 rounded-xl animate-fadeIn">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-6">Why StudyTube Exists</h3>
              <p className="leading-relaxed mb-8">
                We believe that quality education should be accessible to
                everyone. Our platform was created to bridge the gap between
                traditional education and modern learning needs, providing a
                structured pathway to knowledge acquisition and skill
                development.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="founders" className="py-20 bg-base-200 text-base-content">
        <div className="container mx-auto px-4">
          <header className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Founders
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="-content max-w-2xl mx-auto">
              The visionaries behind StudyTube who are passionate about
              transforming education
            </p>
          </header>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <article
              className="bg-base-100 rounded-xl p-8 transform hover:-translate-y-2 transition duration-300 animate__animated animate__fadeInLeft"
              aria-labelledby="founder-aditya"
            >
              <div className="flex flex-col items-center mb-6">
                <div className="w-40 h-40 bg-primary rounded-full flex items-center justify-center text-4xl font-bold text-primary-content">
                  AM
                </div>
              </div>
              <header id="founder-aditya" className="text-center">
                <h3 className="text-2xl font-bold mb-2">Aditya Mishra</h3>
                <p className=" font-semibold mb-4">Founder</p>
              </header>
              <p className="-content mb-6 text-center">
                Passionate about making quality education accessible to everyone
                through technology and innovation.
              </p>
              <footer className="flex justify-center space-x-4">
                <a
                  href="https://linkedin.com/in/aditya-mishra-546914288/"
                  target="_blank"
                  className=" hover:text-secondary transition-colors"
                  aria-label="LinkedIn profile of Aditya Mishra"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/Aditya-Mishra9670/"
                  target="_blank"
                  className="hover:text-secondary transition-colors"
                  aria-label="GitHub profile of Dheeraj Verma"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.21.68-.47v-1.66c-2.78.6-3.37-1.34-3.37-1.34a2.64 2.64 0 00-1.1-1.45c-.9-.61.07-.6.07-.6a2.08 2.08 0 011.52 1 2.1 2.1 0 002.88.82 2.08 2.08 0 01.62-1.32c-2.22-.25-4.56-1.11-4.56-4.95a3.87 3.87 0 011-2.67 3.6 3.6 0 01.1-2.64s.84-.27 2.75 1a9.35 9.35 0 015 0c1.91-1.32 2.75-1 2.75-1a3.6 3.6 0 01.1 2.64 3.87 3.87 0 011 2.67c0 3.85-2.35 4.7-4.58 4.95a2.34 2.34 0 01.67 1.81v2.68c0 .26.18.56.68.47A10 10 0 0012 2z" />
                  </svg>
                </a>
              </footer>
            </article>
            <article
              className="bg-base-100 rounded-xl p-8 transform hover:-translate-y-2 transition duration-300 animate__animated animate__fadeInRight"
              aria-labelledby="founder-dheeraj"
            >
              <div className="flex flex-col items-center mb-6">
                <div className="w-40 h-40 bg-primary rounded-full flex items-center justify-center text-4xl font-bold text-primary-content">
                  DV
                </div>
              </div>
              <header id="founder-dheeraj" className="text-center">
                <h3 className="text-2xl font-bold mb-2">Dheeraj Verma</h3>
                <p className="font-semibold mb-4">Founder</p>
              </header>
              <p className="-content mb-6 text-center">
                Dedicated to creating innovative educational solutions that
                empower learners worldwide.
              </p>
              <footer className="flex justify-center space-x-4">
                <a
                  href="https://linkedin.com/in/vermadheeraj945/"
                  target="_blank"
                  className=" hover:text-secondary transition-colors"
                  aria-label="LinkedIn profile of Dheeraj Verma"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/DheerajVerma945"
                  target="_blank"
                  className="hover:text-secondary transition-colors"
                  aria-label="GitHub profile of Dheeraj Verma"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.21.68-.47v-1.66c-2.78.6-3.37-1.34-3.37-1.34a2.64 2.64 0 00-1.1-1.45c-.9-.61.07-.6.07-.6a2.08 2.08 0 011.52 1 2.1 2.1 0 002.88.82 2.08 2.08 0 01.62-1.32c-2.22-.25-4.56-1.11-4.56-4.95a3.87 3.87 0 011-2.67 3.6 3.6 0 01.1-2.64s.84-.27 2.75 1a9.35 9.35 0 015 0c1.91-1.32 2.75-1 2.75-1a3.6 3.6 0 01.1 2.64 3.87 3.87 0 011 2.67c0 3.85-2.35 4.7-4.58 4.95a2.34 2.34 0 01.67 1.81v2.68c0 .26.18.56.68.47A10 10 0 0012 2z" />
                  </svg>
                </a>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Platform Features
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-base-content max-w-2xl mx-auto">
              Discover the tools and features that make StudyTube the perfect
              platform for your learning journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-base-200 rounded-xl p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
              <p className="text-base-content">
                Monitor your learning journey with detailed progress analytics
                and milestone tracking.
              </p>
            </div>
            <div className="bg-base-200 rounded-xl p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Verified Certificates
              </h3>
              <p className="text-base-content">
                Earn recognized certificates upon course completion to showcase
                your achievements.
              </p>
            </div>
            <div className="bg-base-200 rounded-xl p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Interactive Learning
              </h3>
              <p className="text-base-content">
                Engage with interactive content, quizzes, and practical
                exercises for better understanding.
              </p>
            </div>
            <div className="bg-base-200 rounded-xl p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Structured Content</h3>
              <p className="text-base-content">
                Well-organized course materials designed for optimal learning
                progression.
              </p>
            </div>
            <div className="bg-base-200 rounded-xl p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Self-Paced Learning
              </h3>
              <p className="text-base-content">
                Learn at your own pace with flexible schedules and unlimited
                access to content.
              </p>
            </div>
            <div className="bg-base-200 rounded-xl p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Community Support</h3>
              <p className="text-base-content">
                Connect with fellow learners and instructors in our supportive
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-base-200 rounded-lg transform hover:-translate-y-2 transition duration-300">
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="text-4xl font-bold mb-2">{data?.allUsers}+</div>
              <p className="text-sm">Active Students</p>
            </div>
            <div
              className="text-center p-6 bg-base-200 rounded-lg transform hover:-translate-y-2 transition duration-300"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="text-4xl font-bold mb-2">{data?.allCourses}+</div>
              <p className="text-sm">Total Courses</p>
            </div>
            <div
              className="text-center p-6 bg-base-200 rounded-lg transform hover:-translate-y-2 transition duration-300"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-4xl font-bold mb-2">
                {data?.allEnrollments}+
              </div>
              <p className="text-sm">Enrollments</p>
            </div>
            <div
              className="text-center p-6 bg-base-200 rounded-lg transform hover:-translate-y-2 transition duration-300"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-primary mb-4">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="text-4xl font-bold mb-2">
                {data?.certificates}+
              </div>
              <p className="text-sm">Certificates Issued</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
