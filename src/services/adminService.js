import api from "../api/axios";

export const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await api.get("/admin/users", config);
};

export const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await api.delete(`/admin/users/${id}`, config);
};

export const toggleSuspendUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await api.put(`/admin/users/${id}/suspend`, {}, config);
};

export const updatePostStatus = async (id, status, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await api.put(`/admin/posts/${id}/status`, { status }, config);
};

export const updatePostPriority = async (id, priority, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await api.put(`/admin/posts/${id}/priority`, { priority }, config);
};
