import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Globe, Facebook, Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggingIn } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen p-5 sm:p-20 flex items-center justify-center bg-base-200">
      <div className="w-full max-w-6xl flex bg-base-100 rounded-lg gap-20 shadow-xl overflow-hidden">
        <div className="hidden md:flex w-1/3 bg-primary p-8 rounded-r-3xl items-center justify-center">
          <div className="text-center">
            <img
              src="./Logo.png"
              alt="Company Logo"
              className="mb-6"
            />
            <h3 className="text-2xl font-semibold text-primary-content">
              Welcome to Study Tube
            </h3>
            <p className="text-primary-content mt-4 text-sm">
              Unlock your potential with our tailored learning solutions.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-semibold text-center text-primary">
            Log In
          </h2>
          <p className="text-sm text-base-content text-center mt-2">
            Access your account and continue learning
          </p>
          <form className="mt-8" onSubmit={handleLogin}>
            <div className="mb-5 relative">
              <Mail className="absolute left-3 top-3 text-primary" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="input input-bordered w-full rounded-lg pl-10 focus:ring-1 focus:ring-primary bg-base-200 text-base-content"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-5 relative">
              <Lock className="absolute left-3 top-3 text-primary" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                className="input input-bordered w-full rounded-lg pl-10 focus:ring-1 focus:ring-primary bg-base-200 text-base-content"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-3 text-base-content top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <Link
                to="/forgot-password"
                className="text-primary hover:underline"
              >
                Forgot Password?
              </Link>
              <Link to="/signup" className="text-primary hover:underline">
                Sign Up
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader className="size-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="divider text-base-content my-8">OR</div>
          <div className="flex flex-col gap-4">
            <button className="btn bg-red-500 text-white border border-primary  w-full py-3 rounded-lg hover:bg-base-300 flex items-center justify-center gap-2">
              <Globe /> Continue with Google
            </button>
            <button className="btn bg-blue-500 text-white border border-primary  w-full py-3 rounded-lg hover:bg-base-300 flex items-center justify-center gap-2">
              <Facebook /> Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
