import React from "react";
import { useFollow } from "../hooks/useFollow";

const FollowButton = ({ userId, initialFollowing, isOwnProfile }) => {
  const { isFollowing, loading, toggleFollow } =
    useFollow(initialFollowing);

  if (isOwnProfile) {
    return <button className="button">Edit Profile</button>;
  }

  return (
    <button
      onClick={() => toggleFollow(userId)}
      disabled={loading}
      className="button"
    >
      {loading
        ? "..."
        : isFollowing
        ? "Unfollow"
        : "Follow"}
    </button>
  );
};

export default FollowButton;