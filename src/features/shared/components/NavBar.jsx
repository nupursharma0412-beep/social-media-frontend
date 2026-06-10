import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import "../nav.scss";
import { Search, Bell, Sparkles, MessageCircle } from "lucide-react";


const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="nav-bar">
      <div className="nav-inner">
        <div className="nav-brand" onClick={() => navigate("/")}>
          <span className="brand-mark">C</span>
          <div>
            <strong>Social Life</strong>
            <span>Social feed</span>
          </div>
        </div>


        <div className="nav-actions">
          <button className="icon-button" onClick={() => navigate("/messages")} aria-label="Messages">
            <MessageCircle size={20} />
          </button>
        
     
          <button className="button button-pill" onClick={() => navigate("/create-post")}>Tweet</button>
          <button className="profile-button" onClick={() => navigate(`/profile/${user?._id}`)}>
            <img src={user?.profile || "https://via.placeholder.com/40"} alt="Profile" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;