import api from "../../auth/services/auth.api";

export const getComments = async (postId) => {
  const res = await api.get(`/comments/${postId}`);
  return res.data;
};

export const addComment = async (postId, text) => {
  const res = await api.post(`/comments/${postId}`, { text });
  return res.data;
};