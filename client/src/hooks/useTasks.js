import { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";

// Validation Schema
const taskValidationSchema = {
  title: Joi.string().required().max(50).label("Title"),
  category: Joi.string().allow("").label("Category"),
  description: Joi.string().allow("").label("Description"),
  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .label("Status"),
  priority: Joi.string().valid("low", "medium", "high").label("Priority"),
  dueDate: Joi.date().optional().label("Due Date"),
};

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added for better error display

  const statusEnum = ["pending", "in-progress", "completed"];
  const priorityEnum = ["low", "medium", "high"];

  const fetchTasks = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/tasks",
        config
      );
      setTasks(data);
    } catch (error) {
      setErrorMessage("Error fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTask = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      throw new Error("User is not authenticated.");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    axios
      .get(`http://localhost:3001/api/tasks/${taskId}`, config)
      .then((response) => {
        console.log("this is the data from the hook: ", response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
      });
  };

  const createTask = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      await axios.post(
        "http://localhost:3001/api/tasks",
        { title, category, description, status, priority, dueDate },
        config
      );
      await fetchTasks();
      setTitle("");
      setCategory("");
      setDescription("");
      setStatus("");
      setPriority("");
      setDueDate("");
      setErrors({});
    } catch (error) {
      setErrorMessage("Error creating task.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) {
        throw new Error("User is not authenticated.");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`http://localhost:3001/api/tasks/${taskId}`, config);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const validate = () => {
    const errors = {};
    const result = Joi.validate(
      { title, category, description, status, priority, dueDate },
      taskValidationSchema,
      { abortEarly: false }
    );

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

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    errors,
    title,
    setTitle,
    category,
    setCategory,
    description,
    setDescription,
    status,
    setStatus,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    statusEnum,
    priorityEnum,
    loading,
    errorMessage, // Expose error messages
    createTask,
    deleteTask,
    fetchTask,
  };
};

export default useTasks;
