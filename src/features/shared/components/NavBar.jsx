import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import "../nav.scss";
import { MessageCircle } from "lucide-react";
import { useTheme } from "../theme.context";


const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="nav-bar">
      <div className="nav-content">

        <div className="logo" onClick={() => navigate("/")}>
          JayApp
        </div>

        <div className="nav-actions">

          <button
            onClick={() => navigate("/create-post")}
            className="button primary-button"
          >
            Post
          </button>

      
          <button
            className="icon-button"
            onClick={() => navigate("/messages")}
          >
            
            <MessageCircle size={22} />
            <p>Message</p>
          </button>

          <button onClick={toggleTheme} className="button outline-button">
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          <div
            className="profile"
            onClick={() => navigate(`/profile/${user?._id}`)}
          >
            <img
              src={user?.profile || "https://via.placeholder.com/40"}
              alt="profile"
            />
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;