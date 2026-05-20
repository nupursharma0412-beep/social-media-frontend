import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "../../shared/components/Loading";
import "../style/form.scss"
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

      // reset fields
      setUsername("");
      setEmail("");
      setPassword("");

      // focus first input
      usernameRef.current.focus();
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

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
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />

          <input
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
          />

          <button disabled={loading} className="button">
            {loading ? <Loading/> : "Register"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;