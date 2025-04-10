import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTeacherStore } from "../../store/useTeacherStore";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const EditVideo = () => {
  const { getSpecificVideo, editVideo, selectedVideo } = useTeacherStore();
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoData = selectedVideo || (await getSpecificVideo(videoId));
        setInitialData(videoData);
        setFormData({
          title: videoData.title,
          description: videoData.description,
          thumbnail: videoData.thumbnail,
        });
        setPreview(videoData.thumbnail);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideoData();
  }, [videoId, getSpecificVideo]);

  const getChangedFields = () => {
    const changes = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== initialData[key]) {
        changes[key] = formData[key];
      }
    });
    return changes;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setFormData((prev) => ({ ...prev, thumbnail: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.thumbnail
    ) {
      toast.error("All fields are required");
      return false;
    }

    const changes = getChangedFields();
    if (Object.keys(changes).length === 0) {
      toast.error("No changes detected");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const changes = getChangedFields();
      await editVideo({ id: videoId, ...changes });
      navigate(-1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = () => {
    if (initialData.thumbnail) {
      setPreview(initialData.thumbnail);
      setFormData((prev) => ({ ...prev, thumbnail: initialData.thumbnail }));
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto my-8 p-6 pt-[69px]">
        <div className="skeleton h-12 w-64 mb-8"></div>
        <div className="space-y-6">
          <div className="skeleton h-10"></div>
          <div className="skeleton h-32"></div>
          <div className="skeleton h-48"></div>
          <div className="flex gap-4 justify-end">
            <div className="skeleton h-10 w-24"></div>
            <div className="skeleton h-10 w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto my-8 p-6">
      <div className="card-body p-0 space-y-6">
        <h2 className="card-title text-3xl font-bold">Edit Video</h2>

        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="input input-bordered input-primary"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="textarea textarea-bordered textarea-primary h-32"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Thumbnail</span>
            </label>
            <div className="relative group">
              <img
                src={preview}
                alt="Thumbnail preview"
                className="rounded-lg border-2 border-base-300 w-full h-48 object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="btn btn-circle btn-error btn-sm absolute top-2 right-2 opacity-90"
                disabled={isSubmitting}
              >
                <X className="size-4" />
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered file-input-primary w-full mt-2"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="card-actions justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn btn-primary gap-2"
          >
            {isSubmitting && <span className="loading loading-spinner"></span>}
            Update Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
