import React, { useRef } from "react";
import api from "../../auth/services/auth.api";

const ProfileImageUpload = ({ profile, setUser }) => {
  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("profile", file);

    try {
      const res = await api.put("/users/profile-image", formData);

      setUser((prev) => ({
        ...prev,
        profile: res.data.profile,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <img
        src={profile}
        alt=""
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />

      <input
        type="file"
        ref={fileRef}
        onChange={handleChange}
        hidden
      />
    </>
  );
};

export default ProfileImageUpload;