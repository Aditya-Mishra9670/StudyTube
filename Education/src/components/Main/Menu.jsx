import {
  ArrowBigRightDash,
  ChevronRight,
  Clock,
  LogOut,
  Settings,
  Star,
  User,
  Video,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Menu = ({ isOpen, isClose }) => {
  const { logout, isLoggingOut,user } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  return (
    <div
      className={`fixed top-[64px] right-0 ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } h-screen z-30 transition-all duration-300 bg-base-100 shadow-lg w-full sm:w-[350px]`}
    >
      <div className="flex flex-col p-6 gap-3 w-full justify-start h-full">
        <Link
          to="/profile"
          onClick={isClose}
          className="flex items-center justify-between py-3 px-4 bg-base-200 rounded-md hover:bg-primary hover:text-white transition"
        >
          <div className="flex items-center gap-3">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </div>
          <ChevronRight className="h-5 w-5" />
        </Link>
        <Link
          to="/courses"
          onClick={isClose}
          className="flex items-center justify-between py-3 px-4 bg-base-200 rounded-md hover:bg-primary hover:text-white transition"
        >
          <div className="flex items-center gap-3">
            <ArrowBigRightDash className="h-5 w-5" />
            <span>Explore</span>
          </div>
          <ChevronRight className="h-5 w-5" />
        </Link>
        <Link
          to={user?.role === "student" ? "/my-courses":"myCourses"}
          onClick={isClose}
          className="flex items-center justify-between py-3 px-4 bg-base-200 rounded-md hover:bg-primary hover:text-white transition"
        >
          <div className="flex items-center gap-3">
            <Video className="h-5 w-5" />
            <span>My Courses</span>
          </div>
          <ChevronRight className="h-5 w-5" />
        </Link>
        <Link
          to="/settings"
          onClick={isClose}
          className="flex items-center justify-between py-3 px-4 bg-base-200 rounded-md hover:bg-primary hover:text-white transition"
        >
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </div>
          <ChevronRight className="h-5 w-5" />
        </Link>

        <Link
          to="/top-rated-courses"
          onClick={isClose}
          className="flex items-center justify-between py-3 px-4 bg-base-200 rounded-md hover:bg-primary hover:text-white transition"
        >
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5" />
            <span>Top Rated Courses</span>
          </div>
          <ChevronRight className="h-5 w-5" />
        </Link>
        <Link
          to="/latest-courses"
          onClick={isClose}
          className="flex items-center justify-between py-3 px-4 bg-base-200 rounded-md hover:bg-primary hover:text-white transition"
        >
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5" />
            <span>Latest Courses</span>
          </div>
          <ChevronRight className="h-5 w-5" />
        </Link>
        <button
          onClick={() => {
            handleLogout();
            isClose;
          }}
          className="flex items-center justify-between py-3 px-4 bg-base-200 rounded-md hover:bg-primary hover:text-white transition"
        >
          <div className="flex items-center gap-3">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </div>
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="mt-5 text-center text-white text-sm sm:text-lg lg:text-xl">
          <p className="gradient-text whitespace-nowrap text-4xl signature">
            StudyTube
          </p>
        </div>
        <p className="text-center text-sm">&copy; All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Menu;
