import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail, Heart, X, Loader } from "lucide-react";
import { useUserStore } from "../store/useuserStore";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [showOptions, setShowOptions] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [updateData, setUpdateData] = useState({
    profilePic: updatedUser.profilePic,
    name: updatedUser.name,
    interests: updatedUser.interests || [],
  });

  const { updateProfile } = useUserStore();
  const MAX_INTEREST_LENGTH = 8;
  const MAX_IMAGE_SIZE_MB = 2;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      alert(`Image size must be less than ${MAX_IMAGE_SIZE_MB}MB`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setUpdateData(prev => ({ ...prev, profilePic: base64Image }));
    };
  };

  const addInterest = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const interest = e.target.value.trim();
      if (interest.length <= MAX_INTEREST_LENGTH && 
          !updateData.interests.includes(interest)) {
        setUpdateData(prev => ({
          ...prev,
          interests: [...prev.interests, interest]
        }));
        e.target.value = "";
      }
    }
  };

  const removeInterest = (index) => {
    setUpdateData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const saveData = async () => {
    setIsUpdatingProfile(true);
    try {
      await updateProfile(updateData);
      setUpdatedUser(prev => ({ ...prev, ...updateData }));
      setShowOptions(false);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const resetChanges = () => {
    setUpdateData({
      profilePic: updatedUser.profilePic,
      name: updatedUser.name,
      interests: updatedUser.interests,
    });
    setShowOptions(false);
  };

  const hasChanges =
    updateData.profilePic !== updatedUser.profilePic ||
    updateData.name !== updatedUser.name ||
    JSON.stringify(updateData.interests) !==
      JSON.stringify(updatedUser.interests);

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="bg-base-200 rounded-box shadow-lg p-6 space-y-8">
          <header className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary">
              Profile Settings
            </h1>
            <p className="text-sm opacity-75">
              Manage your personal information and preferences
            </p>
          </header>

          <div className="flex flex-col items-center gap-6">
            <AvatarSection 
              updateData={updateData}
              showOptions={showOptions}
              isUpdatingProfile={isUpdatingProfile}
              handleImageUpload={handleImageUpload}
              userRole={user?.role.toUpperCase()}
            />
            
            <div className="w-full space-y-6">
              <NameInput 
                updateData={updateData}
                showOptions={showOptions}
                setUpdateData={setUpdateData}
              />
              
              <EmailInput email={updatedUser?.email} />
              
             {user?.role ==="student" &&  <InterestsSection
                updateData={updateData}
                showOptions={showOptions}
                addInterest={addInterest}
                removeInterest={removeInterest}
                MAX_INTEREST_LENGTH={MAX_INTEREST_LENGTH}
              />}
            </div>
          </div>

          <ActionButtons
            showOptions={showOptions}
            hasChanges={hasChanges}
            isUpdatingProfile={isUpdatingProfile}
            setShowOptions={setShowOptions}
            saveData={saveData}
            resetChanges={resetChanges}
          />
        </div>
      </div>
    </div>
  );
};

const AvatarSection = ({ updateData, showOptions, isUpdatingProfile, handleImageUpload, userRole }) => (
  <div className="avatar relative group">
    <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
      <img
        src={updateData.profilePic}
        alt="Profile"
        className="object-cover w-full h-full"
        loading="lazy"
      />
    </div>
    <div className="absolute -bottom-14  left-1/2 -translate-x-1/2">
      <div className="badge badge-sm  text-primary-content  font-bold badge-primary">{userRole}</div>
    </div>
    
    {showOptions && (
      <label
        htmlFor="avatar-upload"
        className={`absolute bottom-0 right-0 btn btn-circle btn-sm btn-primary transition-transform ${
          isUpdatingProfile ? "animate-pulse pointer-events-none" : 
          "group-hover:scale-110"
        }`}
      >
        <Camera className="w-4 h-4" />
        <input
          type="file"
          id="avatar-upload"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isUpdatingProfile}
        />
      </label>
    )}
  </div>
);

const NameInput = ({ updateData, showOptions, setUpdateData }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text flex items-center gap-2">
        <User className="w-4 h-4" />
        Full Name
      </span>
    </label>
    <input
      className="input input-bordered"
      readOnly={!showOptions}
      value={updateData.name}
      placeholder="Your name"
      onChange={(e) => setUpdateData(prev => ({ ...prev, name: e.target.value }))}
    />
  </div>
);

const EmailInput = ({ email }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text flex items-center gap-2">
        <Mail className="w-4 h-4" />
        Email Address
      </span>
    </label>
    <input
      type="email"
      className="input input-bordered bg-base-300"
      value={email}
      disabled
    />
  </div>
);

const InterestsSection = ({ updateData, showOptions, addInterest, removeInterest, MAX_INTEREST_LENGTH }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text flex items-center gap-2">
        <Heart className="w-4 h-4" />
        Interests
      </span>
    </label>
    <div className="border border-base-300 bg-base-100 rounded-box p-3">
      <div className="flex flex-wrap gap-2">
        {updateData.interests.map((item, index) => (
          <div key={index} className="badge badge-lg badge-accent gap-1">
            <span>{item}</span>
            {showOptions && (
              <X
                className="w-4 h-4 cursor-pointer hover:scale-125 transition-transform"
                onClick={() => removeInterest(index)}
              />
            )}
          </div>
        ))}
        {showOptions && (
          <input
            className="input input-sm input-ghost w-24 px-2 focus:ring-2 ring-primary transition-all"
            placeholder="Add interest..."
            maxLength={MAX_INTEREST_LENGTH}
            onKeyDown={addInterest}
          />
        )}
      </div>
    </div>
  </div>
);

const ActionButtons = ({ showOptions, hasChanges, isUpdatingProfile, setShowOptions, saveData, resetChanges }) => (
  <div className="flex flex-col sm:flex-row gap-3 justify-end">
    {showOptions ? (
      <>
        <button
          onClick={resetChanges}
          className="btn btn-ghost order-1 sm:order-none"
        >
          Cancel
        </button>
        <button
          onClick={saveData}
          className="btn btn-primary gap-2"
          disabled={!hasChanges || isUpdatingProfile}
        >
          {isUpdatingProfile ? (
            <>
              <Loader className="size-5 animate-spin" />
              Updating...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </>
    ) : (
      <button
        onClick={() => setShowOptions(true)}
        className="btn btn-primary w-full sm:w-auto"
      >
        Edit Profile
      </button>
    )}
  </div>
);

export default Profile;