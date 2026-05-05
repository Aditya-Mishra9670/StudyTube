import React, { useState } from 'react';
import { Mail, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email is required');
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/forget-password', { email });
      toast.success(res.data.message || 'Reset link sent to your email');
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md flex bg-base-100 rounded-lg shadow-xl p-8">
        <div className="w-full">
          <h2 className="text-3xl font-semibold text-primary text-center">Forgot Password</h2>
          <p className="text-sm text-base-content text-center mt-2">Enter your email to receive a reset password link.</p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-5 relative">
              <Mail className="absolute left-3 top-3 text-primary" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full rounded-lg pl-10 focus:ring-1 focus:ring-primary bg-base-200 text-base-content"
              />
            </div>
            <button
              type="submit"
              className="btn bg-primary text-primary-content w-full py-3 rounded-lg hover:bg-primary-focus transition duration-300"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : 'Send Reset Link'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
