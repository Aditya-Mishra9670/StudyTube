import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

const ResetPass = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long and contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character');
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/auth/reset-password/${token}`, { newPassword });
      toast.success(res.data.message || 'Password reset successful');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md flex bg-base-100 rounded-lg shadow-xl p-8">
        <div className="w-full">
          <h2 className="text-3xl font-semibold text-primary text-center">Reset Password</h2>
          <p className="text-sm text-base-content text-center mt-2">Enter your new password.</p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-5 relative">
              <Lock className="absolute left-3 top-3 text-primary" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input input-bordered w-full rounded-lg pl-10 focus:ring-1 focus:ring-primary bg-base-200 text-base-content"
                required
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
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full rounded-lg pl-10 focus:ring-1 focus:ring-primary bg-base-200 text-base-content"
                required
              />
              <div
                className="absolute right-3 top-3 text-base-content cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            <button
              type="submit"
              className="btn bg-primary text-primary-content w-full py-3 rounded-lg hover:bg-primary-focus transition duration-300"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;