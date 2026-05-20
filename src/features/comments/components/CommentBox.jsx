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
          <p key={c._id}>
            <b>{c.user.username}</b> {c.text}
          </p>
        ))}
      </div>

      <div className="comment-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
};

export default CommentBox;