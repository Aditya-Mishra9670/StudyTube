/* eslint-disable react/prop-types */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Header, Footer } from "./components";
import {
  Login,
  Signup,
  Home,
  ForgotPass,
  ResetPass,
  Error,
  Courses,
  CourseIndividual,
  Profile,
  Settings,
  AboutUs,
  TermsOfUse,
  Cookies,
  Privacy,
  Contact,
  MyCourses,
  CreateCourse,
  AddVideo,
  Streaming,
  ResumeLearning,
  ReportView,
  TeacherCourses,
  EditCourse,
  CourseDetails,
  EditVideo,
  Notifications,
  AdminDashboard,
  AllUsers,
  Reports,
} from "./pages";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { hasAuthSessionHint } from "./lib/axios";

const protectedPaths = [
  /^\/courses(\/.*)?$/,
  /^\/course\/video\/[^/]+$/,
  /^\/course\/resume\/[^/]+$/,
  /^\/notifications$/,
  /^\/profile$/,
  /^\/my-courses$/,
  /^\/report\/[^/]+$/,
  /^\/create-course$/,
  /^\/[^/]+\/addVideo$/,
  /^\/myCourses$/,
  /^\/teacher\/course(\/.*)?$/,
  /^\/editVideo\/[^/]+$/,
  /^\/admin(\/.*)?$/,
];

const isProtectedPath = (pathname) =>
  protectedPaths.some((pattern) => pattern.test(pathname));

function AuthLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );
}

function RequireAuth({ children, roles }) {
  const { user, checkingAuth, authChecked } = useAuthStore();

  if (checkingAuth || (!authChecked && !user)) return <AuthLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicOnly({ children }) {
  const { user, checkingAuth } = useAuthStore();

  if (checkingAuth) return <AuthLoader />;
  if (user) return <Navigate to="/" replace />;

  return children;
}

function App() {
  const { theme } = useThemeStore();
  const location = useLocation();
  const { user, getUser, checkingAuth, authChecked } = useAuthStore();

  useEffect(()=>{
    const shouldVerifySession =
      isProtectedPath(location.pathname) || hasAuthSessionHint();

    if (shouldVerifySession && !user && !checkingAuth && !authChecked) {
      getUser();
    }
  }, [authChecked, checkingAuth, getUser, location.pathname, user]);

  return (
    <div data-theme={theme} className="nunito-body">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
        <Route path="/signup" element={<PublicOnly><Signup /></PublicOnly>} />
        <Route path="/forgot-password" element={<PublicOnly><ForgotPass /></PublicOnly>} />
        <Route path="/reset-password/:token" element={<PublicOnly><ResetPass /></PublicOnly>} />
        <Route path="/courses" element={<RequireAuth roles={["student"]}><Courses /></RequireAuth>} />
        <Route path="/courses/:courseId" element={<RequireAuth roles={["student"]}><CourseIndividual /></RequireAuth>} />
        <Route path="/course/video/:id" element={<RequireAuth roles={["student"]}><Streaming /></RequireAuth>} />
        <Route path="/notifications" element={<RequireAuth roles={["student"]}><Notifications /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-courses" element={<RequireAuth roles={["student"]}><MyCourses /></RequireAuth>} />
        <Route path="/report/:id" element={<RequireAuth roles={["student"]}><ReportView /></RequireAuth>} />

        <Route path="/course/resume/:courseId" element={<RequireAuth roles={["student"]}><ResumeLearning /></RequireAuth>} />
        <Route path="/create-course" element={<RequireAuth roles={["teacher"]}><CreateCourse /></RequireAuth>} />
        <Route path="/:courseId/addVideo" element={<RequireAuth roles={["teacher"]}><AddVideo /></RequireAuth>} />
        <Route path="/myCourses" element={<RequireAuth roles={["teacher"]}><TeacherCourses /></RequireAuth>} />
        <Route path="/teacher/course/edit/:courseId" element={<RequireAuth roles={["teacher"]}><EditCourse /></RequireAuth>} />
        <Route path="/teacher/course/:courseId" element={<RequireAuth roles={["teacher"]}><CourseDetails /></RequireAuth>} />
        <Route path="/editVideo/:videoId" element={<RequireAuth roles={["teacher"]}><EditVideo /></RequireAuth>} />
        <Route path="/admin" element={<RequireAuth roles={["admin"]}><AdminDashboard /></RequireAuth>} />
        <Route path="/admin/all-users" element={<RequireAuth roles={["admin"]}><AllUsers /></RequireAuth>} />
        <Route path="/admin/reports" element={<RequireAuth roles={["admin"]}><Reports /></RequireAuth>} />



        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}
export default App;
