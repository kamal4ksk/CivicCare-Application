import axios from "axios";

const API_URL = "http://localhost:3000/api/communities";

export const getCommunities = async () => {
  return await axios.get(API_URL);
};

export const createCommunity = async (communityData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(API_URL, communityData, config);
};

export const joinLeaveCommunity = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(`${API_URL}/${id}/join`, {}, config);
};

export const updateCommunity = async (id, communityData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.put(`${API_URL}/${id}`, communityData, config);
};

export const deleteCommunity = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.delete(`${API_URL}/${id}`, config);
};
