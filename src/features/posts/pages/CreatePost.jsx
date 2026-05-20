import React, { useRef, useState } from "react";
import "../style/createpost.scss";
import { usePost } from "../hook/userPost";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const { loading, handleCreatePost } = usePost();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const file = postImageInputRef.current.files[0];

    if (!file) {
      toast.error("Please select an image");
      return;
    }

    const result = await handleCreatePost(file, caption);

    if (result.success) {
      toast.success("Post created ");
      navigate("/");
    } else {
      toast.error("Failed to create post");
    }
  };

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="img" className="post-image-label">
            Select Image
          </label>

          <input
            ref={postImageInputRef}
            type="file"
            id="img"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
        {preview && (
  <img src={preview} alt="preview" className="preview-img" />
)}
          <input
            value={caption}
            disabled={loading}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="Enter caption"
          />

          <button disabled={loading} className="button">
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;