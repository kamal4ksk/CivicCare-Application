import api from "../api/axios";

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

export const loginUser = (userData) => {
  return api.post("/auth/login", userData);
};

export const getProfile = () => {
  return api.get("/auth/profile");
};

export const updateProfile = (profileData) => {
  return api.put("/auth/profile", profileData);
};