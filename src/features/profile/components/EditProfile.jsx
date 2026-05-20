import React, { useState } from "react";
import api from "../../auth/services/auth.api";

const EditProfile = ({ user, setUser, close }) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await api.put("/users/edit", {
        username,
        bio,
      });

      setUser(res.data.user);
      close();

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal">
      <div className="edit-box">
        <h3>Edit Profile</h3>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />

        <button onClick={handleUpdate} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>

        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProfile;