import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "../../shared/components/Loading";
import "../style/form.scss";

const Register = () => {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usernameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!username || !email || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    const result = await handleRegister(username, email, password);

    if (result.success) {
      toast.success("Registered successfully");
      navigate("/");
    } else {
      toast.error(result.message || "Registration failed");
      setUsername("");
      setEmail("");
      setPassword("");
      usernameRef.current.focus();
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"                  // ADDED: name attribute
              autoComplete="email"          // ADDED: autocomplete
              placeholder="Enter email"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"               // ADDED: name attribute
              autoComplete="new-password"   // ADDED: autocomplete
              placeholder="Enter password"
            />

            <button type="submit" className="button">
              {/* ADDED: type="submit" explicitly */}
              {loading ? <Loading /> : "Register"}
            </button>
          </fieldset>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;