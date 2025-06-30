import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { ThreeCircles } from "react-loader-spinner";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login success");
        setEmail("");
        setPassword("");
        localStorage.setItem("loginToken", data.token);
        showWelcomeHandler();
      }
      const vendorId = data.vendorId;
      console.log("checking for VendorId:", vendorId);
      const vendorResponse = await fetch(
        `${API_URL}/vendor/single-vendor/${vendorId}`
      );
      window.location.reload();
      const vendorData = await vendorResponse.json();
      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        localStorage.setItem("firmId", vendorFirmId);
        localStorage.setItem("firmName", vendorFirmName);
      }
    } catch (error) {
      alert("login fail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      <h3>Vendor Login</h3>
      <form className="authForm" onSubmit={loginHandler}>
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
};

export default Login;
