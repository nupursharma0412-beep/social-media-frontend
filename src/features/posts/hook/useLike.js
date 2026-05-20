import { useState } from "react";
import api from "../../auth/services/auth.api";

export const useLike = (initialLike, initialCount) => {
  const [liked, setLiked] = useState(initialLike);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const toggleLike = async (postId) => {
    try {
      setLoading(true);

      const res = await api.post(`/posts/like/${postId}`);

      const newLiked = res.data.liked;

      setLiked(newLiked);
      setCount((prev) => (newLiked ? prev + 1 : prev - 1));
    } catch (err) {
      console.log("Like Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    liked,
    count,
    loading,
    toggleLike,
  };
};