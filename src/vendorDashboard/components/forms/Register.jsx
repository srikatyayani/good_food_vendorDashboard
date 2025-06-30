import React, { useState } from "react";
import { API_URL } from "../../data/apiPath"; //we havent used export default so we need {}

function Register({ showLoginHandler }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully");
        showLoginHandler();
      }
    } catch (error) {
      console.log("vendor not registered", error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="loginSection">
      <h3>Vendor Register</h3>
      <form className="authForm" onSubmit={handleSubmit}>
        <label>User Name:</label>
        <br />
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <div className="btnSubmit1">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
