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

    setTimeout(() => {
      setShowHeart(false);
    }, 600);
  };

  return (
    <div className="post">

      {/* USER */}
      <div className="user">
        <div
          className="img-wrapper"
          onClick={() => navigate(`/profile/${user?._id}`)}
        >
          <img src={user?.profile} alt="" />
        </div>
        <p>{user.username}</p>
      </div>

      {/* IMAGE */}
      <div className="post-image" onDoubleClick={handleDoubleClick}>
        <img src={post.img} alt="" />
        {showHeart && <div className="heart">❤️</div>}
      </div>

      {/* ICONS */}
      <div className="icons">
        <div className="left">

          {/* LIKE */}
          <button onClick={() => toggleLike(post._id)} disabled={loading}>
            <svg
              className={liked ? "like" : ""}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={liked ? "red" : "white"}
            >
              <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
            </svg>
          </button>

          {/* COMMENT */}
          <button onClick={() => setShowComments((prev) => !prev)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
              <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z"></path>
            </svg>
          </button>

          {/* SHARE */}
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M13.1202 17.0228L8.92129 14.7324C8.19135 15.5125 7.15261 16 6 16Z"></path>
            </svg>
          </button>

        </div>

        <div className="right">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5 2H19V22L12 18L5 22V2Z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="bottom">
        <p className="likes">{count} likes</p>
        <p className="caption">{post.caption}</p>
      </div>

      {/* COMMENTS (TOGGLE) */}
      {showComments && <CommentBox postId={post._id} />}

    </div>
  );
};

export default Post;