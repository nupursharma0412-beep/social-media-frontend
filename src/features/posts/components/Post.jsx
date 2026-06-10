import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLike } from "../hook/useLike";
import CommentBox from "../../comments/components/CommentBox";

const Post = ({ user, post }) => {
  const navigate = useNavigate();

  const [showHeart, setShowHeart] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const { liked, count, loading, toggleLike } = useLike(
    post.isLike,
    post.likeCount
  );

  const handleDoubleClick = () => {
    if (!liked) {
      toggleLike(post._id);
    }

    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 600);
  };

  const timestamp = post.createdAt
    ? new Date(post.createdAt).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Just now";

  return (
    <article className="post-card">
      <div className="post-header">
        <button className="post-user" onClick={() => navigate(`/profile/${user?._id}`)}>
          <img src={user?.profile || "https://via.placeholder.com/48"} alt={user?.username} />
          <div>
            <strong>{user?.username}</strong>
            <span>@{user?.username?.toLowerCase()?.replace(/\s+/g, "_") || "user"}</span>
          </div>
        </button>
        <span className="post-time">{timestamp}</span>
      </div>

      <div className="post-body" onDoubleClick={handleDoubleClick}>
        <p>{post.caption}</p>
        {post.img && (
          <div className="post-media">
            <img src={post.img} alt="Post media" loading="lazy" />
            {showHeart && <div className="heart-burst">❤️</div>}
          </div>
        )}
      </div>

      <div className="post-actions">
        <button type="button" className="action-button" onClick={() => setShowComments((prev) => !prev)}>
          <span>💬</span>
          <small>Comment</small>
        </button>
        <button type="button" className="action-button">
          <span>🔁</span>
          <small>Repost</small>
        </button>
        <button type="button" className="action-button" onClick={() => toggleLike(post._id)} disabled={loading}>
          <span>{liked ? "❤️" : "🤍"}</span>
          <small>{count}</small>
        </button>
        <button type="button" className="action-button">
          <span>📤</span>
          <small>Share</small>
        </button>
      </div>

      {showComments && <CommentBox postId={post._id} />}
    </article>
  );
};

export default Post;