import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "../../shared/components/Loading";
import "../style/form.scss";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!username || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    const result = await handleLogin(username, password);

    if (result.success) {
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error(result.message || "Login failed");
      setUsername("");
      setPassword("");
      usernameRef.current.focus();
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        {/* CHANGED: wrapped in fieldset to disable all inputs at once during loading */}
        <form onSubmit={handleSubmit}>
          <fieldset disabled={loading} style={{ border: "none", padding: 0, margin: 0 }}>
            <input
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"               // ADDED: name attribute
              autoComplete="username"       // ADDED: autocomplete
              placeholder="Enter username"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"               // ADDED: name attribute
              autoComplete="current-password" // ADDED: autocomplete
              placeholder="Enter password"
            />

            <button type="submit" className="button">
              {/* ADDED: type="submit" explicitly */}
              {loading ? <Loading /> : "Login"}
            </button>
          </fieldset>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;