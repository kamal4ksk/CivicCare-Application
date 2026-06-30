import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineHome, 
  HiOutlineDocumentText, 
  HiMegaphone, 
  HiOutlineMapPin, 
  HiOutlineUsers,
  HiOutlineEye,
  HiOutlineExclamationCircle,
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
  HiOutlineCalendar,
  HiOutlineHeart,
  HiOutlineChatBubbleLeft,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePhoto
} from 'react-icons/hi2';
import { FiX, FiNavigation } from 'react-icons/fi';
import UserHeader from '../components/UserHeader';
import MobileNavigation from '../components/MobileNavigation';
import MobileDrawer from '../components/MobileDrawer';
import ReportConcernModal from '../components/ReportConcernModal';
import { getMyPosts, deletePost, updatePost } from "../services/postService";

export default function MyPosts() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [userConcerns, setUserConcerns] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  
  // States for viewing and editing
  const [selectedPost, setSelectedPost] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [editPostData, setEditPostData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const editFileInputRef = useRef(null);
  const [isEditLocating, setIsEditLocating] = useState(false);

  const handleEditPhotoClick = () => {
    if (editFileInputRef.current) {
      editFileInputRef.current.click();
    }
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPostData(prev => ({ ...prev, photo: reader.result, photoFile: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeEditPhoto = (e) => {
    e.stopPropagation();
    setEditPostData(prev => ({ ...prev, photo: null, photoFile: null, removePhoto: true }));
    if (editFileInputRef.current) {
      editFileInputRef.current.value = '';
    }
  };

  const handleEditGPSClick = () => {
    setIsEditLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setEditPostData(prev => ({ ...prev, location: `${latitude.toFixed(5)}, ${longitude.toFixed(5)} (GPS)` }));
          setIsEditLocating(false);
        },
        (error) => {
          console.warn("Geolocation failed", error);
          setEditPostData(prev => ({ ...prev, location: "Vazhuthacaud, Trivandrum" }));
          setIsEditLocating(false);
        },
        { timeout: 6000 }
      );
    } else {
      setEditPostData(prev => ({ ...prev, location: "Vazhuthacaud, Trivandrum" }));
      setIsEditLocating(false);
    }
  };

  // Load user concerns from backend
  const loadConcerns = async () => {
    try {
      const response = await getMyPosts();
      const normalized = response.data.map(post => ({
        id: post._id,
        _id: post._id,
        category: post.category,
        title: post.title,
        description: post.description,
        location: post.location,
        photo: post.photo ? `http://localhost:3000${post.photo}` : null,
        date: new Date(post.createdAt).toLocaleDateString('en-GB'),
        status: post.status || 'Pending',
        priority: post.priority || 'Medium priority',
        likesCount: post.likes ? post.likes.length : 0,
      }));
      setUserConcerns(normalized);
    } catch (error) {
      console.error("Failed to load concerns", error);
    }
  };

  useEffect(() => {
    loadConcerns();
  }, []);

  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this concern?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await deletePost(id, token);
        loadConcerns();
        if (selectedPost?.id === id) setIsViewOpen(false);
      } catch (error) {
        console.error("Failed to delete concern", error);
        alert(error.response?.data?.message || "Failed to delete concern");
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editPostData.title.trim() || !editPostData.location.trim() || !editPostData.description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", editPostData.title);
      formData.append("category", editPostData.category);
      formData.append("location", editPostData.location);
      formData.append("description", editPostData.description);
      if (editPostData.photoFile) {
        formData.append("photo", editPostData.photoFile);
      } else if (editPostData.removePhoto) {
        formData.append("removePhoto", "true");
      }

      await updatePost(editPostData.id, formData, token);
      alert("Post updated successfully!");
      setIsEditOpen(false);
      loadConcerns();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update post");
    }
  };

  // Metrics calculations
  const totalCount = userConcerns.length;
  const pendingCount = userConcerns.filter(c => c.status === 'Pending').length;
  const ongoingCount = userConcerns.filter(c => c.status === 'Ongoing').length;
  const resolvedCount = userConcerns.filter(c => c.status === 'Resolved').length;

  // Filtered concerns based on current active tab selection
  const filteredConcerns = userConcerns.filter(post => {
    if (activeTab === 'All') return true;
    return post.status === activeTab;
  });

  return (
    <div className="w-full min-h-screen bg-[linear-gradient(to_right_bottom_in_oklab,rgb(239,246,255)_0%,rgb(250,245,255)_50%,rgb(253,242,248)_100%)] flex flex-col items-center justify-start box-border relative text-[16px] font-sans font-normal leading-normal text-[rgb(0,0,0)] antialiased">
      <UserHeader onMenuClick={() => setIsDrawerOpen(true)} onPostClick={() => setIsReportModalOpen(true)} />

<main className="w-full max-w-[1324px] px-4 sm:px-6 lg:px-8 pt-2 pb-[112px] md:pb-[48px] flex flex-col items-start justify-start text-left">        
        {/* Title Block */}
        <div className="mb-8">
<h1
  className="
    w-full
    lg:h-[36px]
    mb-2
    text-[20px] sm:text-[22px] lg:text-[24px]
    font-medium
    leading-normal
    text-[rgb(10,10,10)]
    font-sans
    flex items-center
  "
>
  My Posts
</h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage all your reported concerns and track their progress
          </p>
        </div>
{/* Custom Tab Filters */}
<div className="w-full overflow-x-auto scrollbar-hide">
  <div className="flex gap-2 min-w-max">

    {/* All Posts */}
    <button
      onClick={() => setActiveTab('All')}
      className={`flex items-center justify-center gap-2
      h-9
      px-4
      rounded-[10px]
      text-xs sm:text-sm
      font-medium
      whitespace-nowrap
      transition-all duration-200
      ${
        activeTab === 'All'
          ? 'bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white shadow-lg shadow-black/10'
          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
      }`}
    >
      <HiOutlineEye className="w-4 h-4 shrink-0" />
      <span>All Posts</span>
      <span
        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
          activeTab === 'All'
            ? 'bg-white/20 text-white'
            : 'bg-slate-100 text-slate-500'
        }`}
      >
        {totalCount}
      </span>
    </button>

    {/* Pending */}
    <button
      onClick={() => setActiveTab('Pending')}
      className={`flex items-center justify-center gap-2
      h-9
      px-4
      rounded-[10px]
      text-xs sm:text-sm
      font-medium
      whitespace-nowrap
      transition-all duration-200
      ${
        activeTab === 'Pending'
          ? 'bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white shadow-lg shadow-black/10'
          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
      }`}
    >
      <HiOutlineExclamationCircle className="w-4 h-4 shrink-0" />
      <span>Pending</span>
      <span
        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
          activeTab === 'Pending'
            ? 'bg-white/20 text-white'
            : 'bg-slate-100 text-slate-500'
        }`}
      >
        {pendingCount}
      </span>
    </button>

    {/* Ongoing */}
    <button
      onClick={() => setActiveTab('Ongoing')}
      className={`flex items-center justify-center gap-2
      h-9
      px-4
      rounded-[10px]
      text-xs sm:text-sm
      font-medium
      whitespace-nowrap
      transition-all duration-200
      ${
        activeTab === 'Ongoing'
          ? 'bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white shadow-lg shadow-black/10'
          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
      }`}
    >
      <HiOutlineArrowPath className="w-4 h-4 shrink-0" />
      <span>Ongoing</span>
      <span
        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
          activeTab === 'Ongoing'
            ? 'bg-white/20 text-white'
            : 'bg-slate-100 text-slate-500'
        }`}
      >
        {ongoingCount}
      </span>
    </button>

    {/* Resolved */}
    <button
      onClick={() => setActiveTab('Resolved')}
      className={`flex items-center justify-center gap-2
      h-9
      px-4
      rounded-[10px]
      text-xs sm:text-sm
      font-medium
      whitespace-nowrap
      transition-all duration-200
      ${
        activeTab === 'Resolved'
          ? 'bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white shadow-lg shadow-black/10'
          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
      }`}
    >
      <HiOutlineCheckCircle className="w-4 h-4 shrink-0" />
      <span>Resolved</span>
      <span
        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
          activeTab === 'Resolved'
            ? 'bg-white/20 text-white'
            : 'bg-slate-100 text-slate-500'
        }`}
      >
        {resolvedCount}
      </span>
    </button>

  </div>
</div>

        {/* Post Items Listing Grid */}
        <div className="w-full space-y-4">
          {filteredConcerns.length === 0 ? (
            <div className="w-full bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-xs">
              <span className="text-slate-400 font-semibold block text-base">No posts found in this section.</span>
            </div>
          ) : (
            filteredConcerns.map((post) => {
              // category pill colors
              let categoryBg = "bg-slate-50 text-slate-600 border border-slate-100";
              const tag = post.category.toLowerCase();
              if (tag === 'bribery') categoryBg = "bg-rose-50 text-rose-600 border border-rose-100";
              else if (tag === 'potholes') categoryBg = "bg-orange-50 text-orange-600 border border-orange-100";
              else if (tag === 'water') categoryBg = "bg-blue-50 text-blue-600 border border-blue-100";
              else if (tag === 'electricity') categoryBg = "bg-yellow-50 text-amber-700 border border-yellow-100";
              else if (tag === 'waste' || tag === 'garbage') categoryBg = "bg-emerald-50 text-emerald-600 border border-emerald-100";

              // status pill colors
              let statusBg = "bg-amber-50 text-amber-600 border border-amber-100";
              if (post.status === 'Ongoing') statusBg = "bg-blue-50 text-blue-600 border border-blue-100";
              else if (post.status === 'Resolved') statusBg = "bg-emerald-50 text-emerald-600 border border-emerald-100";

              return (
                <div key={post.id} className="w-full bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-start">
                  
                  {/* Category Status & Priority Tags Row */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-[11.5px] font-extrabold px-3 py-1 rounded-full ${categoryBg}`}>
                      {post.category.toLowerCase()}
                    </span>
                    <span className={`text-[11.5px] font-extrabold px-3 py-1 rounded-full ${statusBg}`}>
                      {post.status}
                    </span>
                    <span className="text-[11.5px] font-extrabold px-3 py-1 rounded-full bg-orange-50/50 text-orange-600 border border-orange-100/60">
                      {post.priority}
                    </span>
                  </div>

                  {/* Concern title and description */}
                  <h2 className="text-xl font-black text-slate-800 tracking-tight mb-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-5 max-w-4xl">
                    {post.description}
                  </p>
               {post.photo && (
  <div className="mb-5">
    <img
      src={post.photo}
      alt="Concern"
      className="max-w-[320px] max-h-[180px] object-cover rounded-2xl border border-slate-200 shadow-sm"
    />
  </div>
)}

                  {/* Metadata and Actions Section */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-5 border-t border-slate-100">
                    
                    {/* Icons Metadata List */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 select-none">
                      <span className="flex items-center gap-1.5">
                        <HiOutlineMapPin className="w-4 h-4 text-slate-400" />
                        {post.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <HiOutlineCalendar className="w-4 h-4 text-slate-400" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <HiOutlineHeart className="w-4 h-4 text-slate-400" />
                        0
                      </span>
                      <span className="flex items-center gap-1.5">
                        <HiOutlineChatBubbleLeft className="w-4 h-4 text-slate-400" />
                        0
                      </span>
                    </div>

                    {/* Action Triggers Row */}
                    <div className="grid grid-cols-3 gap-2 w-full sm:flex sm:w-auto">
                      <button
                        onClick={() => {
                          setSelectedPost(post);
                          setIsViewOpen(true);
                        }}
                        className="h-[38px] px-2 sm:px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-colors cursor-pointer border border-slate-100"
                      >
                        <HiOutlineEye className="w-3.5 h-3.5 shrink-0" />
                        <span>View</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditPostData(post);
                          setIsEditOpen(true);
                        }}
                        className="h-[38px] px-2 sm:px-4 rounded-xl bg-blue-50/50 hover:bg-blue-50 text-blue-600 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-colors cursor-pointer border border-blue-100/60"
                      >
                        <HiOutlinePencil className="w-3.5 h-3.5 shrink-0" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="h-[38px] px-2 sm:px-4 rounded-xl bg-red-50/50 hover:bg-red-50 text-red-500 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-colors cursor-pointer border border-red-100/60"
                      >
                        <HiOutlineTrash className="w-3.5 h-3.5 shrink-0" />
                        <span>Delete</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })
          )}
        </div>

      </main>

      {/* Navigation and Drawer menus */}
      <MobileNavigation 
        activeTab={1} 
        onPostConcernClick={() => setIsReportModalOpen(true)}
      />

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={1}
      />

      {/* 1. Report Concern Overlay Modal */}
      {isReportModalOpen && (
        <ReportConcernModal
          onClose={() => setIsReportModalOpen(false)}
          refreshPosts={loadConcerns}
        />
      )}

      {/* 2. Detailed View Modal overlay */}
      {isViewOpen && selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
          onClick={() => setIsViewOpen(false)}
        >
          <div 
            className="relative w-full max-w-[560px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col my-4 sm:my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Concern Details</h3>
              <button 
                onClick={() => setIsViewOpen(false)}
                className="p-1 rounded-full hover:bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Details Content */}
            <div className="p-5 sm:p-6 space-y-4 text-left overflow-y-auto max-h-[75vh]">
              {selectedPost.photo && (
                <div className="w-full max-h-[220px] rounded-2xl overflow-hidden flex items-center justify-center bg-slate-50 border border-slate-100">
                  <img src={selectedPost.photo} alt="Attached Evidence" className="max-h-[220px] object-contain" />
                </div>
              )}

              <div className="flex gap-2">
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/40 uppercase">
                  {selectedPost.category}
                </span>
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-orange-100/50 text-amber-700 border border-amber-200/30 uppercase">
                  {selectedPost.status}
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-800 leading-snug">{selectedPost.title}</h4>
                <span className="text-xs text-slate-400 font-semibold block mt-1">Submitted on {selectedPost.date}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Description</span>
                <p className="text-slate-600 font-medium text-sm leading-relaxed whitespace-pre-line">{selectedPost.description}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Location</span>
                <span className="text-slate-700 font-bold text-sm flex items-center gap-1.5">
                  <HiOutlineMapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  {selectedPost.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Edit Post Modal overlay */}
      {isEditOpen && editPostData && (
        <div 
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
          onClick={() => setIsEditOpen(false)}
        >
          <div 
            className="relative w-full max-w-[560px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col my-4 sm:my-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Edit Post</h3>
              <button 
                onClick={() => setIsEditOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <FiX className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>

            {/* Form Edit */}
            <form onSubmit={handleEditSubmit} className="p-5 sm:p-6 space-y-4 text-left overflow-y-auto max-h-[75vh]">
              
              {/* Category Dropdown */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="edit-category" className="text-[13px] font-bold text-slate-500">
                  Category
                </label>
                <div className="relative">
                  <select
                    id="edit-category"
                    value={editPostData.category}
                    onChange={(e) => setEditPostData({ ...editPostData, category: e.target.value })}
                    className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl outline-none text-slate-700 text-sm font-semibold transition-all focus:border-[#155DFC] focus:ring-2 focus:ring-[#155DFC]/10 appearance-none cursor-pointer"
                  >
                    <option value="Bribery">Bribery</option>
                    <option value="Potholes">Potholes</option>
                    <option value="Water">Water</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Waste">Waste</option>
                    <option value="Other">Other</option>
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
                <label htmlFor="edit-title" className="text-[13px] font-bold text-slate-500">
                  Title
                </label>
                <input
                  type="text"
                  id="edit-title"
                  value={editPostData.title}
                  onChange={(e) => setEditPostData({ ...editPostData, title: e.target.value })}
                  className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl outline-none text-slate-700 text-sm font-semibold transition-all focus:border-[#155DFC] focus:ring-2 focus:ring-[#155DFC]/10"
                  required
                />
              </div>

              {/* Location Field with Icon & GPS */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="edit-location" className="text-[13px] font-bold text-slate-500">
                  Location
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <HiOutlineMapPin className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      id="edit-location"
                      value={editPostData.location}
                      onChange={(e) => setEditPostData({ ...editPostData, location: e.target.value })}
                      className="w-full h-11 pl-10 pr-3.5 bg-white border border-slate-200 rounded-xl outline-none text-slate-700 text-sm font-semibold transition-all focus:border-[#155DFC] focus:ring-2 focus:ring-[#155DFC]/10"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleEditGPSClick}
                    disabled={isEditLocating}
                    className="h-11 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <FiNavigation className={`w-3.5 h-3.5 stroke-[2.5] ${isEditLocating ? 'animate-spin' : ''}`} />
                    <span>{isEditLocating ? 'Locating...' : 'GPS'}</span>
                  </button>
                </div>
              </div>

              {/* Description Field */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="edit-description" className="text-[13px] font-bold text-slate-500">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  value={editPostData.description}
                  onChange={(e) => setEditPostData({ ...editPostData, description: e.target.value })}
                  rows={4}
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-xl outline-none text-slate-700 text-sm font-semibold transition-all focus:border-[#155DFC] focus:ring-2 focus:ring-[#155DFC]/10 resize-none"
                  required
                />
              </div>

              {/* Photo Field (Optional) */}
              <div className="flex flex-col space-y-1.5">
                <span className="text-[13px] font-bold text-slate-500">
                  Edit Photo (Optional)
                </span>
                <input 
                  type="file" 
                  ref={editFileInputRef} 
                  onChange={handleEditFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                <div 
                  onClick={handleEditPhotoClick}
                  className="w-full min-h-[120px] rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#155DFC] bg-slate-50/50 hover:bg-slate-50 flex flex-col items-center justify-center p-4 transition-all cursor-pointer group"
                >
                  {editPostData.photo ? (
                    <div className="relative w-full max-h-[160px] flex items-center justify-center">
                      <img 
                        src={editPostData.photo} 
                        alt="Preview" 
                        className="max-h-[140px] rounded-xl object-contain shadow-xs" 
                      />
                      <button
                        type="button"
                        onClick={removeEditPhoto}
                        className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                      >
                        <FiX className="w-4 h-4 text-white" />
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

              {/* Submit and Cancel Buttons */}
              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="flex-1 h-11 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm rounded-xl cursor-pointer shadow-md shadow-slate-950/10"
                >
                  Update Post
                </button>
              </div>

            </form>
          </div>
        </div>
      )}


      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
