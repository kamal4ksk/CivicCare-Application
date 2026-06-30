import React, { useState } from "react";
import UserHeader from "../components/UserHeader";
import EditPostModal from "../components/EditPostModal";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";

const STATUS_TABS = [
  { key: "all", label: "All Posts" },
  { key: "pending", label: "Pending" },
  { key: "ongoing", label: "Ongoing" },
  { key: "resolved", label: "Resolved" },
];

const INITIAL_POSTS = [
  {
    id: 1,
    title: "Pothole near bus stand",
    description: "A deep pothole near the main bus stand is causing vehicle damage and slowing traffic.",
    location: "Ernakulam",
    status: "Resolved",
    category: "Infrastructure",
    priority: "Low",
    date: "10/06/2026",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Garbage pile near school",
    description: "Garbage has accumulated near the local school entrance and needs urgent removal.",
    location: "Malappuram",
    status: "Pending",
    category: "Garbage",
    priority: "High",
    date: "09/06/2026",
    image: "https://images.unsplash.com/photo-1559838212-cedc4d296a87?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Street Lights Not Working",
    description: "The street lights on Market Road have not been functioning for the past two weeks. The area becomes very dark at night, causing safety concerns for pedestrians and residents.",
    location: "Kochi",
    status: "Pending",
    category: "Electricity",
    priority: "Medium",
    date: "11/06/2026",
    image: "https://images.unsplash.com/photo-1581092921550-e323bc2fb472?w=300&h=200&fit=crop",
  },
];

export default function MyPostsPage() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeTab, setActiveTab] = useState("all");
  const [editingPost, setEditingPost] = useState(null);

  const metrics = {
    total: posts.length,
    pending: posts.filter((post) => post.status === "Pending").length,
    ongoing: posts.filter((post) => post.status === "Ongoing").length,
    resolved: posts.filter((post) => post.status === "Resolved").length,
  };

  const filteredPosts =
    activeTab === "all"
      ? posts
      : posts.filter((post) => post.status.toLowerCase() === activeTab);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-orange-100 text-orange-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Ongoing":
        return "bg-blue-100 text-blue-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setEditingPost(null);
  };

  const handleCloseModal = () => {
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f5fb] pb-12 font-sans antialiased">
      <UserHeader />

      <main className="mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full max-w-[1180px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            My Posts
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Manage all your reported concerns and track their progress
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600">Total Posts</h3>
            <p className="text-3xl font-bold text-slate-900 mt-3">{metrics.total}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600">Pending</h3>
            <p className="text-3xl font-bold text-orange-600 mt-3">{metrics.pending}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600">Ongoing</h3>
            <p className="text-3xl font-bold text-blue-600 mt-3">{metrics.ongoing}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600">Resolved</h3>
            <p className="text-3xl font-bold text-green-600 mt-3">{metrics.resolved}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
              {STATUS_TABS.map((tab) => {
            const active = tab.key === activeTab;
            const count = tab.key === "all" ? metrics.total : metrics[tab.key] || 0;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white shadow-lg"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                {tab.label} <span className="ml-1">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Posts Container */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 border border-slate-200 text-center">
              <div className="mb-4 text-4xl">🕒</div>
              <h2 className="text-xl font-semibold text-slate-900">No posts found</h2>
              <p className="mt-2 text-sm text-slate-500">
                You haven't created any reports yet.
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-6">
                  {/* Left Content */}
                  <div className="flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                        {post.category}
                      </span>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(post.priority)}`}>
                        {post.priority} priority
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{post.title}</h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 mb-4">{post.description}</p>

                    {/* Metadata */}
                    <div className="flex items-center gap-6 mb-4 text-sm text-slate-500">
                      <span>📍 {post.location}</span>
                      <span>📅 {post.date}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                        <HiOutlineEye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleEditClick(post)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-300 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                      >
                        <HiOutlinePencil className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-300 text-red-600 font-medium hover:bg-red-50 transition-colors">
                        <HiOutlineTrash className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Edit Post Modal */}
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={handleCloseModal}
          onUpdate={handleUpdatePost}
        />
      )}
    </div>
  );
}
