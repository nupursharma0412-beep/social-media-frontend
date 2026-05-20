import { useState } from "react";
import { getComments, addComment } from "../services/comment.api";

export const useComment = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadComments = async (postId) => {
    try {
      setLoading(true);
      const data = await getComments(postId);
      setComments(data.comments);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (postId, text) => {
    try {
      const data = await addComment(postId, text);
      setComments((prev) => [data.comment, ...prev]);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    comments,
    loading,
    loadComments,
    createComment,
  };
};