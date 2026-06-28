import React, { useState, useRef } from "react";
import { HiOutlineXMark, HiOutlineXCircle } from "react-icons/hi2";

export default function EditPostModal({ post, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    category: post?.category || "Infrastructure",
    location: post?.location || "",
    description: post?.description || "",
    image: post?.image || "",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          image: event.target?.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    onUpdate({ ...post, ...formData });
  };

  const categories = [
    "Infrastructure",
    "Garbage",
    "Electricity",
    "Water",
    "Roads",
    "Parks",
    "Public Safety",
  ];

  return (
<div
  className="fixed inset-0 z-50 flex items-center justify-center
             bg-slate-900/35 backdrop-blur-[3px]
             transition-all duration-300"
>      <div className="bg-white rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Edit Post</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <HiOutlineXMark className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
          />
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Location
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
            />
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-300">
              GPS
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="4"
            placeholder="Enter description"
          />
        </div>

        {/* Photo */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Add Photo (Optional)
          </label>
          
          {formData.image ? (
            <div className="relative">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border border-slate-300"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <HiOutlineXMark className="w-5 h-5" />
                </button>
                <button
                  onClick={handleRemoveImage}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                >
                  <HiOutlineXCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-8 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center text-slate-600 hover:text-blue-600"
            >
              + Add Photo
            </button>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Update Post
          </button>
        </div>
      </div>
    </div>
  );
}
