import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Globe,
  Facebook,
  Loader,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword || !role) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await signUp({ username, email, password, role });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-5 sm:p-20 flex items-center justify-center bg-base-200">
      <div className="w-full max-w-6xl gap-20 flex bg-base-100 rounded-lg shadow-xl overflow-hidden">
        <div className="w-full md:w-2/3 p-8 md:p-12">
          <h2 className="text-3xl font-semibold text-center text-primary">
            Sign Up
          </h2>
          <p className="text-sm text-base-content text-center mt-2">
            Create an account and start learning
          </p>
          <form className="mt-8" onSubmit={handleSignUp}>
            <div className="mb-5 relative">
              <User className="absolute left-3 top-3 text-primary" />
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full rounded-lg pl-10 focus:ring-1 focus:ring-primary bg-base-200 text-base-content"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-5 relative">
              <Mail className="absolute left-3 top-3 text-primary" />
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full rounded-lg pl-10 focus:ring-1 focus:ring-primary bg-base-200 text-base-content"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5 relative">
              <Lock className="absolute left-3 top-3 text-primary" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full rounded-lg pl-10 focus:ring-1 focus:ring-primary bg-base-200 text-base-content"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-3 top-3 text-base-content cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            <div className="mb-5 relative">
              <Lock className="absolute left-3 top-3 text-primary" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="input input-bordered w-full rounded-lg pl-10 focus:ring-1 focus:ring-primary bg-base-200 text-base-content"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="absolute right-3 top-3 text-base-content cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            <div className="mb-5 relative">
              <select
                className="select select-bordered w-full rounded-lg focus:ring-1 focus:ring-primary bg-base-200 text-base-content"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div className="flex justify-between items-center mb-6">
              <Link to="/login" className="text-primary hover:underline">
                Already have an account? Log In
              </Link>
            </div>
            <button
              type="submit"
              className="btn bg-primary w-full py-3 rounded-lg text-primary-content transition duration-300"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : "Sign Up"}
            </button>
          </form>
          <div className="divider text-base-content my-8">OR</div>
          <div className="flex flex-col gap-4">
            <button className="btn bg-red-500 text-white border border-primary w-full py-3 rounded-lg hover:bg-base-300 flex items-center justify-center gap-2">
              <Globe /> Continue with Google
            </button>
            <button className="btn bg-blue-500 text-white border border-primary w-full py-3 rounded-lg hover:bg-base-300 flex items-center justify-center gap-2">
              <Facebook /> Continue with Facebook
            </button>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 bg-primary p-8 rounded-l-3xl items-center justify-center">
          <div className="text-center">
            <img src="./Logo.png" alt="Company Logo" className="mb-6" />
            <h3 className="text-2xl font-semibold text-primary-content">
              Welcome to Study Tube
            </h3>
            <p className="text-primary-content mt-4 text-sm">
              Unlock your potential with our tailored learning solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
