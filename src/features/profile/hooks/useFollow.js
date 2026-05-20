import { useState } from "react";
import api from "../../auth/services/auth.api";

export const useFollow = (initialFollowing) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const toggleFollow = async (userId) => {
    try {
      setLoading(true);

      if (isFollowing) {
        await api.post(`/users/unfollow/${userId}`);
      } else {
        await api.post(`/users/follow/${userId}`);
      }

      setIsFollowing(!isFollowing);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    isFollowing,
    loading,
    toggleFollow,
  };
};