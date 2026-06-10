import React, { useEffect, useState } from "react";
import { useComment } from "../hooks/useComment";
import "../style/comment.scss";
const CommentBox = ({ postId }) => {
  const { comments, loadComments, createComment } = useComment();
  const [text, setText] = useState("");

  useEffect(() => {
    loadComments(postId);
  }, [postId]);

  const handleSubmit = () => {
    if (!text.trim()) return;
    createComment(postId, text);
    setText("");
  };

  return (
    <div className="comment-box">
      <div className="comment-list">
        {comments.map((c) => (
          <div className="comment-item" key={c._id}>
            <div className="comment-avatar">{c.user.username?.[0]?.toUpperCase()}</div>
            <div className="comment-content">
              <div className="comment-author">{c.user.username}</div>
              <p>{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="comment-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button className="button button-pill" onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
};

export default CommentBox;