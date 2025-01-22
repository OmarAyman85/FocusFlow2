import React, { useState } from "react";
import useRegister from "../hooks/useRegister";

const RegisterForm = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleSubmit,
  } = useRegister();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Helper function to handle error display
  const renderError = (fieldName) =>
    errors[fieldName] && <div className="text-danger">{errors[fieldName]}</div>;

  // Handle form submission with client-side validation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      handleSubmit();
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} noValidate>
        <div className="mb-3 mt-5">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameError"
          />
          {renderError("name")}
        </div>

        <div className="mb-3">
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
            aria-describedby="emailError"
          />
          {renderError("email")}
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
            aria-describedby="passwordError"
          />
          {renderError("password")}
        </div>

        <button type="submit" className="btn btn-success">
          Register
        </button>

        {isSubmitted && (
          <div className="mt-3 text-success">
            <strong>Registration successful!</strong>
          </div>
        )}
      </form>
    </>
  );
};

export default RegisterForm;
