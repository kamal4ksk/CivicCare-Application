import React, { useState, useRef } from 'react';
import { FiX, FiNavigation } from 'react-icons/fi';
import { HiOutlinePhoto, HiXMark } from 'react-icons/hi2';
import { createPost } from "../services/postService";

export default function ReportConcernModal({
  onClose,
  refreshPosts,
}) {
    const [category, setCategory] = useState('Other');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null); // base64 string or file URL
  const [isLocating, setIsLocating] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    { name: 'Bribery', value: 'Bribery' },
    { name: 'Potholes', value: 'Potholes' },
    { name: 'Water', value: 'Water' },
    { name: 'Electricity', value: 'Electricity' },
    { name: 'Waste', value: 'Waste' },
    { name: 'Other', value: 'Other' },
  ];

  const handleGPSClick = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)} (GPS)`);
          setIsLocating(false);
        },
        (error) => {
          console.warn("Geolocation failed, using mock location", error);
          // Set a pleasant mock location fallback
          setLocation("Vazhuthacaud, Trivandrum");
          setIsLocating(false);
        },
        { timeout: 6000 }
      );
    } else {
      setLocation("Vazhuthacaud, Trivandrum");
      setIsLocating(false);
    }
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setPhoto(file);
  }
};
  const removePhoto = (e) => {
    e.stopPropagation();
    setPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title.trim() || !location.trim() || !description.trim()) {
    alert("Please fill in all the required fields.");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("category", category);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("isAnonymous", isAnonymous);

    // photo should be a File object
    if (photo) {
      formData.append("photo", photo);
    }

    const token = localStorage.getItem("token");
await createPost(formData, token);

alert("Concern submitted successfully!");

// Fetch latest posts
await refreshPosts();

// Close modal
onClose();
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Failed to submit concern");
  }
};

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[560px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col my-4 sm:my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between border-b border-slate-100">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
            Report a Concern
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <FiX className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 text-left">

          {/* Category Dropdown */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="category" className="text-[13px] font-bold text-slate-500">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl outline-none text-slate-700 text-sm font-semibold transition-all focus:border-[#155DFC] focus:ring-2 focus:ring-[#155DFC]/10 appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Title Field */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="title" className="text-[13px] font-bold text-slate-500">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Brief title for your concern"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl outline-none text-slate-700 text-sm font-semibold transition-all focus:border-[#155DFC] focus:ring-2 focus:ring-[#155DFC]/10"
              required
            />
          </div>

          {/* Location Field with GPS Button */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="location" className="text-[13px] font-bold text-slate-500">
              Location
            </label>
                   <div className="flex items-center gap-2">       
               <input
                type="text"
                id="location"
                placeholder="e.g., Main Street, Downtown"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
className="flex-1 min-w-0 h-11 px-3.5 bg-white border border-slate-200 rounded-xl outline-none text-slate-700 text-sm font-semibold transition-all focus:border-[#155DFC] focus:ring-2 focus:ring-[#155DFC]/10"                required
              />
              <button
                type="button"
                onClick={handleGPSClick}
                disabled={isLocating}
className="h-11 w-11 sm:w-auto sm:px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-xs cursor-pointer disabled:opacity-50"              >
                <FiNavigation className={`w-3.5 h-3.5 stroke-[2.5] ${isLocating ? 'animate-spin' : ''}`} />
               <span className="hidden sm:inline">
               {isLocating ? 'Locating...' : 'GPS'}
</span>
              </button>
            </div>
          </div>

          {/* Description Field */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="description" className="text-[13px] font-bold text-slate-500">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Describe the issue in detail..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3.5 bg-white border border-slate-200 rounded-xl outline-none text-slate-700 text-sm font-semibold transition-all focus:border-[#155DFC] focus:ring-2 focus:ring-[#155DFC]/10 resize-none"
              required
            />
          </div>

          {/* Photo Field (Optional) */}
          <div className="flex flex-col space-y-1.5">
            <span className="text-[13px] font-bold text-slate-500">
              Add Photo (Optional)
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div
              onClick={handlePhotoClick}
              className="w-full min-h-[120px] rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#155DFC] bg-slate-50/50 hover:bg-slate-50 flex flex-col items-center justify-center p-4 transition-all cursor-pointer group"
            >
              {photo ? (
                <div className="relative w-full max-h-[160px] flex items-center justify-center">
                 <img
  src={URL.createObjectURL(photo)}
  alt="Preview"
  className="max-h-[140px] rounded-xl object-contain shadow-xs"
/>
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                  >
                    <HiXMark className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#155DFC] shadow-2xs transition-colors">
                    <HiOutlinePhoto className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-bold text-slate-700 block">
                      Click to upload photo
                    </span>
                    <span className="text-xs text-slate-400 font-semibold block mt-0.5">
                      PNG, JPG up to 10MB
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={isAnonymous}
      onChange={(e) => setIsAnonymous(e.target.checked)}
    />

    <span>Post Anonymously</span>
  </label>
</div>

          {/* Submit and Cancel Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 h-[48px] border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:flex-1 h-[48px] bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-md shadow-slate-950/10"
            >
              Submit Report
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
