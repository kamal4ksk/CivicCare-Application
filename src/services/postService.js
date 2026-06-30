import api from "../api/axios";

// =========================
// Get All Posts
// =========================
export const getAllPosts = async () => {
  const response = await api.get("/posts");
  return response;
};

// =========================
// Get Single Post
// =========================
export const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response;
};

// =========================
// Create New Post
// =========================
export const createPost = async (formData, token) => {
  const response = await api.post("/posts", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

// =========================
// Update Post
// =========================
export const updatePost = async (id, formData, token) => {
  const response = await api.put(`/posts/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

// =========================
// Delete Post
// =========================
export const deletePost = async (id, token) => {
  const response = await api.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

// =========================
// Toggle Like Post
// =========================
export const toggleLikePost = async (id) => {
  const response = await api.post(`/posts/${id}/like`);
  return response;
};

// =========================
// Add Comment
// =========================
export const addComment = async (postId, text) => {
  const response = await api.post(`/comments/${postId}`, { text });
  return response;
};

// =========================
// Get Comments
// =========================
export const getComments = async (postId) => {
  const response = await api.get(`/comments/${postId}`);
  return response;
};

// =========================
// Delete Comment
// =========================
export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/comment/${commentId}`);
  return response;
};

// =========================
// Get My Posts
// =========================
export const getMyPosts = async () => {
  const response = await api.get("/posts/my-posts");
  return response;
};
