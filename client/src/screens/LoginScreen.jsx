import React, { useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const errors = {};
    const result = Joi.validate({ email, password }, schema, {
      abortEarly: false,
    });
    if (result.error) {
      result.error.details.forEach((detail) => {
        if (!errors[detail.path[0]]) {
          errors[detail.path[0]] = [];
        }
        errors[detail.path[0]].push(detail.message);
      });
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const errors = validate();
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      const { data } = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password }
      );
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
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/tasks");
    } catch (error) {
      console.error("Invalid credentials");
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.currentTarget;
  //   if (name === "email") {
  //     setEmail(value);
  //   } else if (name === "password") {
  //     setPassword(value);
  //   }
  // };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-8">
          <form onSubmit={handleSubmit} noValidate>
            {/*---------------------------------------------------------------------------------------------*/}
            <div className="mb-3 mt-5">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                name="email"
                value={email}
                // onChange={handleChange}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="email"
              />
              {errors.email && (
                <div className="text-danger">{errors.email[0]}</div>
              )}
            </div>
            {/*---------------------------------------------------------------------------------------------*/}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                name="password"
                value={password}
                // onChange={handleChange}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password"
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            {/*---------------------------------------------------------------------------------------------*/}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Remember me
              </label>
            </div>
            {/*---------------------------------------------------------------------------------------------*/}
            <button type="submit" className="btn btn-success">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
