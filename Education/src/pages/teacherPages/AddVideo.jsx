import React, { useState } from "react";
import { TextCursor, Image, Book, Plus, Video, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useTeacherStore } from "../../store/useTeacherStore";

const AddVideo = () => {
  const { courseId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    file: null,
    duration: null,
    courseId,
  });

  const { addVideo, uploadVideo, addingVideo, uploadingVideo } = useTeacherStore();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, thumbnail: reader.result }));
    };
  };

  const handleFileChange = async (e) => {
    if (!courseId) {
      toast.error("No course selected");
      return;
    }

    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      try {
        const { fileURL, duration } = await uploadVideo({ file });
        setFormData((prev) => ({ ...prev, file:fileURL, duration }));
      } catch (error) {
        toast.error("Failed to upload video");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((val) => !val)) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      await addVideo(formData);
      setFormData({
        title: "",
        description: "",
        thumbnail: null,
        file: null,
        fileURL: null,
        duration: null,
        courseId,
      });
      setCurrentStep(1);
    } catch (error) {
      toast.error("Failed to upload video");
    }
  };

  return (
    <div className="container mx-auto pt-16 px-4 py-12">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-primary text-center flex items-center justify-center gap-3">
        Upload Video
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-base-200 p-8 rounded-lg shadow-lg space-y-6">
        {currentStep === 1 ? (
          <div className="space-y-6">
            <label className="block space-y-4">
              <span className="text-lg font-semibold text-secondary flex items-center gap-2">
                <Video className="w-5 h-5" /> Video File
              </span>
              <input
                type="file"
                name="file"
                accept="video/*"
                className="file-input file-input-bordered w-full focus:ring-2 focus:ring-primary"
                onChange={handleFileChange}
              />
              {formData.file && (
                <p className="text-sm mt-2">
                  Selected file: {formData.file.name}
                </p>
              )}
              {uploadingVideo && (
                <p className="text-sm text-primary mt-2 flex items-center gap-2">
                  <Loader className="animate-spin w-5 h-5" /> Uploading...
                </p>
              )}
            </label>

            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              disabled={!formData.file}
              className="btn btn-primary w-full gap-2"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <label className="block space-y-4">
              <span className="text-lg font-semibold text-secondary flex items-center gap-2">
                <TextCursor className="w-5 h-5" /> Title
              </span>
              <input
                type="text"
                name="title"
                placeholder="Enter video title"
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                value={formData.title}
                onChange={handleInputChange}
              />
            </label>

            <label className="block space-y-4">
              <span className="text-lg font-semibold text-secondary flex items-center gap-2">
                <Book className="w-5 h-5" /> Description
              </span>
              <textarea
                name="description"
                placeholder="Enter video description"
                className="textarea textarea-bordered w-full focus:ring-2 focus:ring-primary"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>

            <label className="block space-y-4">
              <span className="text-lg font-semibold text-secondary flex items-center gap-2">
                <Image className="w-5 h-5" /> Thumbnail
              </span>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                className="file-input file-input-bordered w-full focus:ring-2 focus:ring-primary"
                onChange={handleThumbnailChange}
              />
              {formData.thumbnail && (
                <div className="mt-4">
                  <img 
                    src={formData.thumbnail} 
                    alt="Thumbnail preview" 
                    className="w-32 h-32 object-contain rounded-lg border"
                  />
                </div>
              )}
            </label>

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="btn btn-ghost"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={addingVideo || !formData.title || !formData.description || !formData.thumbnail || !formData.file}
                className="btn btn-primary gap-2"
              >
                {addingVideo ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
                {addingVideo ? "Uploading..." : "Upload Video"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddVideo;
