import axios from "axios";

const API_URL = "http://localhost:3000/api/articles";

export const getArticles = async () => {
  return await axios.get(API_URL);
};

export const createArticle = async (articleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(API_URL, articleData, config);
};

export const updateArticle = async (id, articleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.put(`${API_URL}/${id}`, articleData, config);
};

export const deleteArticle = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.delete(`${API_URL}/${id}`, config);
};
