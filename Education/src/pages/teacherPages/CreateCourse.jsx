import React, { useState } from "react";
import { Book, TextCursor, Globe, BarChart, Folder, List, Image, Plus, Tag, Loader, X } from "lucide-react";
import toast from "react-hot-toast";
import { useTeacherStore } from "../../store/useTeacherStore";

const CreateCourse = () => {
  const { createCourse, creatingCourse } = useTeacherStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "",
    level: "",
    category: "",
    syllabus: "",
    thumbnail: null,
    tags: [],
  });

  const FormField = ({ label, icon: Icon, children }) => (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-lg font-semibold flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {label}
        </span>
      </label>
      {children}
    </div>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFormData({ ...formData, thumbnail: reader.result });
    reader.readAsDataURL(file);
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const tag = e.target.value.trim();
      if (formData.tags.length >= 8) return toast.error("Maximum 8 tags allowed");
      if (formData.tags.includes(tag)) return toast.error("Tag already exists");
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      e.target.value = "";
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== tagToRemove) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = Object.entries(formData).filter(([key]) => key !== "tags");
    if (requiredFields.some(([, value]) => !value)) {
      return toast.error("Please fill all required fields");
    }
    createCourse(formData);
    setFormData({
      title: "",
      description: "",
      language: "",
      level: "",
      category: "",
      syllabus: "",
      thumbnail: null,
      tags: [],
    });
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
          <Plus className="w-8 h-8" />
          Create New Course
        </h1>

        <div className="card bg-base-100 shadow-xl">
          <form onSubmit={handleSubmit} className="card-body p-6 md:p-8 space-y-4">
            <FormField label="Title" icon={TextCursor}>
              <input
                type="text"
                name="title"
                placeholder="Course Title"
                className="input input-bordered"
                value={formData.title}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Description" icon={Book}>
              <textarea
                name="description"
                placeholder="Course Description"
                className="textarea textarea-bordered h-32"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormField>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="Language" icon={Globe}>
                <select
                  name="language"
                  className="select select-bordered"
                  value={formData.language}
                  onChange={handleInputChange}
                >
                  <option disabled value="">Select Language</option>
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Hinglish</option>
                </select>
              </FormField>

              <FormField label="Level" icon={BarChart}>
                <select
                  name="level"
                  className="select select-bordered"
                  value={formData.level}
                  onChange={handleInputChange}
                >
                  <option disabled value="">Select Level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </FormField>
            </div>

            <FormField label="Category" icon={Folder}>
              <input
                type="text"
                name="category"
                placeholder="Course Category"
                className="input input-bordered"
                value={formData.category}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Syllabus" icon={List}>
              <textarea
                name="syllabus"
                placeholder="Course Syllabus"
                className="textarea textarea-bordered h-48"
                value={formData.syllabus}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Thumbnail" icon={Image}>
              <div className="flex flex-col gap-4">
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleFileChange}
                />
                {formData.thumbnail && (
                  <div className="relative w-48 h-32 rounded-lg overflow-hidden border">
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, thumbnail: null })}
                      className="btn btn-circle btn-xs absolute top-1 right-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </FormField>

            <FormField label="Tags" icon={Tag}>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Add tags (press Enter)"
                  className="input input-bordered"
                  onKeyDown={handleTagInput}
                />
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <div key={tag} className="badge badge-lg badge-primary gap-2">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-error"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-neutral-content">
                  {8 - formData.tags.length} tags remaining
                </span>
              </div>
            </FormField>

            <div className="card-actions justify-center mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full md:w-64"
                disabled={creatingCourse}
              >
                {creatingCourse ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Creating Course...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Create Course
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;