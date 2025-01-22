// components/LoginForm.js
import React from "react";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const { email, setEmail, password, setPassword, errors, handleSubmit } =
    useLogin();

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3 mt-5">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="email"
          />
          {errors.email && <div className="text-danger">{errors.email[0]}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="password"
          />
          {errors.password && (
            <div className="text-danger">{errors.password[0]}</div>
          )}
        </div>

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

        <button type="submit" className="btn btn-success">
          Log in
        </button>
      </form>
    </>
  );
};

export default LoginForm;
