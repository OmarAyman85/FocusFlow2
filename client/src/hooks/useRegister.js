// hooks/useRegister.js
import { useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schema = {
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
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/auth/register", // Replace with actual URL
        { name, email, password }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/tasks");
    } catch (error) {
      console.error("Error registering user");
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleSubmit,
  };
};

export default useRegister;
