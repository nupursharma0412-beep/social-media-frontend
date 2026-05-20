import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../style/profile.scss";
import api from "../../auth/services/auth.api";
import Loading from "../../shared/components/Loading";
import { useAuth } from "../../auth/hooks/useAuth";
import FollowButton from "../components/FollowButton";
import EditProfile from "../components/EditProfile";


const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const fileRef = useRef();

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);

        const res = await api.get(`/users/${id}`);

        setUser(res.data.user);
        setPosts(res.data.posts || []);
        setFollowers(res.data.followers || 0);
        setFollowing(res.data.following || 0);
        setIsFollowing(res.data.isFollowing || false);
      } catch (err) {
        console.log("Profile Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [id]);

  const handleImageClick = () => {
    if (currentUser?._id === user?._id) {
      fileRef.current.click();
    }
  };

  const handleImageChange = async (e) => {
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
      console.log("Upload Error:", err);
    }
  };

  if (loading) return <Loading />;

  return (
    <main className="profile-page">

      <div className="profile-header">
        <img
          src={user?.profile || "https://via.placeholder.com/100"}
          alt="profile"
          onClick={handleImageClick}
          style={{ cursor: currentUser?._id === user?._id ? "pointer" : "default" }}
        />

        <input
          type="file"
          ref={fileRef}
          onChange={handleImageChange}
          hidden
        />

        <div className="profile-info">
          <h2>{user?.username}</h2>

          <p>
            {posts.length} posts • {followers} followers • {following} following
          </p>

          {currentUser?._id === user?._id ? (
            <button className="button" onClick={() => setShowEdit(true)}>
              Edit Profile
            </button>
          ) : (
            <FollowButton
              userId={user._id}
              initialFollowing={isFollowing}
              initialFollowers={followers}
              setFollowers={setFollowers}
              isOwnProfile={false}
            />
          )}
          {showEdit && (
  <EditProfile
    user={user}
    setUser={setUser}
    close={() => setShowEdit(false)}
  />
)}
        </div>
      </div>

      <div className="profile-posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <img
              key={post._id}
              src={post.img}
              alt="post"
              loading="lazy"
            />
          ))
        ) : (
          <p className="no-posts">No posts yet</p>
        )}
      </div>
   
    </main>
    
  );
};

export default Profile;