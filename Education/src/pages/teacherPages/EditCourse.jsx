import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTeacherStore } from "../../store/useTeacherStore";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader } from "lucide-react";

const levels = ["Beginner", "Intermediate", "Advanced"];

const EditCourse = () => {
  const [loading, setLoading] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const { courseId } = useParams();
  const { user } = useAuthStore();
  const { getSpecificCourse, selectedCourse, editCourse,setSelectedCourse, editingCourse } = useTeacherStore();
  const [dontShow, setDontShow] = useState(false);

  const [formData, setFormData] = useState({
    description: selectedCourse?.description || "",
    category:selectedCourse?.category || "",
    thumbnail: selectedCourse?.thumbnail || null,
    syllabus: selectedCourse?.syllabus || "",
    level: selectedCourse?.level ||levels[0],
    thumbnailPreview: selectedCourse?.thumbnail ||"",
  });

  useEffect(() => {
    const getCourseData = async () => {
      setLoading(true);
      try {
        const course = await getSpecificCourse(courseId);
        setSelectedCourse(course);
        
        if (course?.teacherId !== user._id) {
          setDontShow(true);
          return;
        }

        setFormData({
          description: course.description,
          category: course.category,
          thumbnail: course.thumbnail,
          syllabus: course.syllabus,
          level: course.level,
          thumbnailPreview: course.thumbnail,
        });
      } finally {
        setLoading(false);
      }
    };
    if(!selectedCourse || selectedCourse._id !== courseId)  getCourseData();
  }, [courseId, user._id, getSpecificCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      checkFormChanges(newData);
      return newData;
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => {
        const newData = {
          ...prev,
          thumbnail: file,
          thumbnailPreview: reader.result,
        };
        checkFormChanges(newData);
        return newData;
      });
    };
    reader.readAsDataURL(file);
  };

  const checkFormChanges = (currentData) => {
    const initialData = {
      description: selectedCourse?.description,
      category: selectedCourse?.category,
      thumbnail: selectedCourse?.thumbnail,
      syllabus: selectedCourse?.syllabus,
      level: selectedCourse?.level,
    };

    const changed = Object.keys(initialData).some(key => {
      if (key === 'thumbnail') {
        return typeof currentData.thumbnail !== 'string' || 
               currentData.thumbnail !== initialData.thumbnail;
      }
      return currentData[key] !== initialData[key];
    });

    setFormChanged(changed);
  };

  const handleUpdate = async () => {
    const payload = {};
    const initialData = {
      description: selectedCourse.description,
      category: selectedCourse.category,
      thumbnail: selectedCourse.thumbnail,
      syllabus: selectedCourse.syllabus,
      level: selectedCourse.level,
    };

    Object.keys(initialData).forEach(key => {
      if (formData[key] !== initialData[key]) {
        payload[key] = key === 'thumbnail' && typeof formData.thumbnail !== 'string'
          ? formData.thumbnail
          : formData[key];
      }
    });

    if (Object.keys(payload).length > 0) {
      await editCourse({...payload,id:courseId});
      setFormChanged(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="size-12 animate-spin text-primary" />
      </div>
    );

  if (dontShow)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-error">
        Access Denied
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-primary mb-2">
          {selectedCourse?.title}
        </h1>

        <div className="space-y-8">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">Thumbnail</span>
            </label>
            <div className="flex items-center gap-6">
              <img
                src={formData.thumbnailPreview}
                alt="Course thumbnail"
                className="w-32 h-32 object-cover rounded-lg border-2 border-base-300 shadow-md"
              />
              <label className="btn btn-outline cursor-pointer hover:bg-base-200 transition-colors">
                Change Thumbnail
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleThumbnailChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <fieldset className="space-y-4">
            <legend className="text-xl font-semibold mb-4 text-base-content">
              Course Details
            </legend>

            <div className="form-control space-y-2">
              <label className="label-text font-medium">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input input-bordered focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="form-control space-y-2">
              <label className="label-text font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input input-bordered focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="form-control space-y-2">
              <label className="label-text font-medium">Skill Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="select select-bordered w-full focus:ring-2 focus:ring-primary"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <div className="form-control space-y-2">
            <label className="label-text font-medium">Syllabus</label>
            <textarea
              name="syllabus"
              value={formData.syllabus}
              onChange={handleChange}
              className="textarea textarea-bordered h-32 focus:ring-2 focus:ring-primary"
              placeholder="Enter course syllabus..."
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={!formChanged || editingCourse}
            className="btn btn-primary w-full mt-6 hover:bg-primary-focus disabled:opacity-50 transition-all"
          >
            {editingCourse ? (
              <span className="flex items-center gap-2">
                <Loader className="size-5 animate-spin" />
                Updating...
              </span>
            ) : (
              'Update Course'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;