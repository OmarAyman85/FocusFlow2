import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await axios.post(
      //   "http://localhost:3001/api/auth/login", // Backend URL
      //   { email, password }, // Request body
      //   {
      //     headers: {
      //       "Content-Type": "application/json", // Ensure the correct headers
      //     },
      //     withCredentials: true, // If cookies or credentials are required
      //   }
      // );

      // console.log("Response from server:", data);
      const { data } = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password }
      );
      console.log("data: ", data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/tasks");
    } catch (error) {
      console.error("Invalid credentials");
    }
  };

  return (
    <div className="login-screen">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginScreen;
