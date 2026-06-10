import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";
import NavBar from "./features/shared/components/NavBar";

const AppLayout = () => {
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <NavBar />

      <div className="app-body">
        <aside className="sidebar-left">
          <div className="brand-card card">
            <div className="brand-mark">C</div>
            <div>
              <h1>Chirp</h1>
              <p>Modern social feed for creators.</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            <NavLink to="/" end>
              <span className="nav-icon">🏠</span>
              Home
            </NavLink>
            <NavLink to="/create-post">
              <span className="nav-icon">✍️</span>
              New Post
            </NavLink>
            <NavLink to="/messages">
              <span className="nav-icon">💬</span>
              Messages
            </NavLink>
            <NavLink to={`/profile/${user?._id}`}>
              <span className="nav-icon">👤</span>
              Profile
            </NavLink>
          </nav>

          <div className="sidebar-glow card">
            <h3>Get noticed</h3>
            <p>Share your best moments and grow your audience.</p>
          </div>
        </aside>

        <main className="content-column">
          <Outlet />
        </main>

        <aside className="sidebar-right">
          <div className="trend-card card">
            <div className="card-header">
              <span>Trending</span>
              <small>Live</small>
            </div>
            <ul>
              <li>
                <strong>#DesignSystem</strong>
                <span>22.8K posts</span>
              </li>
              <li>
                <strong>#ModernUI</strong>
                <span>18.1K posts</span>
              </li>
              <li>
                <strong>#DevTools</strong>
                <span>14.4K posts</span>
              </li>
            </ul>
          </div>

          <div className="suggestions-card card">
            <div className="card-header">
              <span>Who to follow</span>
              <small>Suggestions</small>
            </div>
            <ul>
              <li>
                <div>
                  <strong>Jane Doe</strong>
                  <span>@jane_dev</span>
                </div>
                <button className="button button-pill">Follow</button>
              </li>
              <li>
                <div>
                  <strong>Pixel Studio</strong>
                  <span>@pixel_studio</span>
                </div>
                <button className="button button-pill">Follow</button>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="mobile-bottom-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/create-post">Post</NavLink>
        <NavLink to="/messages">Chat</NavLink>
        <NavLink to={`/profile/${user?._id}`}>Me</NavLink>
      </div>
    </div>
  );
};

export default AppLayout;
