import { Eye, EyeOff, Save, Lock, Loader } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "../store/useuserStore";

const ChangePassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const { updatePass } = useUserStore();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPass, setUpdatingPass] = useState(false);

  const handleSubmit = async (e) => {
    setUpdatingPass(true);
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      setUpdatingPass(false);
      return;
    }
    await updatePass({ oldPassword, newPassword });
    setUpdatingPass(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-lg w-full mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Lock className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold text-primary">Change Password</h2>
      </div>
      <p className="text-sm">
        Ensure your account remains secure by updating your password regularly.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="input input-bordered input-primary w-full"
          />
        </div>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input input-bordered input-primary w-full"
          />
          <button
            type="button"
            aria-label={
              showNewPassword ? "Hide new password" : "Show new password"
            }
            className="absolute inset-y-0 right-3 flex items-center hover:text-primary"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered input-primary w-full"
          />
          <button
            type="button"
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
            className="absolute inset-y-0 right-3 flex items-center hover:text-primary"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={
            updatingPass || !oldPassword || !newPassword || !confirmPassword
          }
          className="btn btn-primary"
        >
          {updatingPass ? (
            <>
              <Loader className="size-5 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
