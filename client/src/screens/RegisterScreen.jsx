import React, { useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schema = {
    // firstName: Joi.string().required().label("First Name"),
    // lastName: Joi.string().required().label("Last Name"),
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const errors = {};
    const result = Joi.validate({ name, email, password }, schema, {
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
        "http://localhost:3001/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/tasks");
    } catch (error) {
      console.error("Error registering user");
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.currentTarget;
  //   switch (name) {
  //     case "firstName":
  //       setFirstName(value);
  //       break;
  //     case "lastName":
  //       setLastName(value);
  //       break;
  //     case "email":
  //       setEmail(value);
  //       break;
  //     case "password":
  //       setPassword(value);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-8">
            <form onSubmit={handleSubmit} noValidate>
              {/*---------------------------------------------------------------------------------------------*/}
              {/* <div class="mb-3 mt-5">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="firstName"
                />
                {errors.firstName && (
                  <div className="text-danger">{errors.firstName}</div>
                )}
              </div> */}
              {/*---------------------------------------------------------------------------------------------*/}
              <div className="mb-3 mt-5">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  name="name"
                  value={name}
                  // onChange={handleChange}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="name"
                />
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>
              {/*---------------------------------------------------------------------------------------------*/}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  name="email"
                  value={email}
                  //onChange={handleChange}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="email"
                  //aria-describedby="emailHelp"
                />
                {errors.email && (
                  <div className="text-danger">{errors.email[0]}</div>
                )}
                {/* <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div> */}
              </div>
              {/*---------------------------------------------------------------------------------------------*/}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  value={password}
                  //onChange={handleChange}
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
              <button type="submit" className="btn btn-success">
                Register
              </button>
            </form>
            <div className="mb-5"></div>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <div className="register-screen">
  //     <h2>Register</h2>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         placeholder="Enter name"
  //         value={name}
  //         onChange={(e) => setName(e.target.value)}
  //       />
  //       <input
  //         type="email"
  //         placeholder="Enter email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //       <input
  //         type="password"
  //         placeholder="Enter password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //       <button type="submit">Register</button>
  //     </form>
  //   </div>
  // );
};

export default RegisterScreen;
