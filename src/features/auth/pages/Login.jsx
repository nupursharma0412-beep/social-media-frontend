import React, { useState, useRef } from "react";
import "../style/form.scss"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "../../shared/components/Loading";
const Login = () => {
  const { loading, handleLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameRef = useRef();

  const navigate = useNavigate();

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

        <form onSubmit={handleSubmit}>
          <input
            ref={usernameRef}
            value={username}
            disabled={loading}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter username"
          />

          <input
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
          />

          <button disabled={loading} className="button">
            {loading ? <Loading/> : "Login"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;