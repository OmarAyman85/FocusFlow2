import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { useNavigate, useParams } from "react-router-dom";

// Validation Schema
const taskValidationSchema = Joi.object({
  title: Joi.string().required().max(50).label("Title"),
  category: Joi.string().allow("").label("Category"),
  description: Joi.string().allow("").label("Description"),
  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .label("Status"),
  priority: Joi.string().valid("low", "medium", "high").label("Priority"),
  dueDate: Joi.date().optional().label("Due Date"),
});

// Constants for Task Status & Priority
const statusEnum = ["pending", "in-progress", "completed"];
const priorityEnum = ["low", "medium", "high"];

// Base API URL (Make it environment configurable for different stages)
const API_BASE_URL = "http://localhost:3001/api/tasks";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    category: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { taskId } = useParams();
  const navigate = useNavigate();

  // Helper function to get user info from localStorage
  const getUserInfo = () => JSON.parse(localStorage.getItem("userInfo")) || {};

  // Set Axios config with Authorization header
  const getConfig = () => {
    const { token } = getUserInfo();
    return token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : { headers: { "Content-Type": "application/json" } };
  };

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_BASE_URL, getConfig());
      setTasks(data);
    } catch (error) {
      setErrorMessage("Error fetching tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single task by taskId
  const fetchTask = useCallback(async () => {
    if (!taskId) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/${taskId}`,
        getConfig()
      );
      setTaskFormData({
        title: data.title,
        category: data.category,
        description: data.description,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate,
      });
    } catch (error) {
      setErrorMessage("Error fetching task.");
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  // Update task
  const updateTask = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/${taskId}`, taskFormData, getConfig());
      navigate("/tasks");
    } catch (error) {
      setErrors({ general: "Failed to update task. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const createTask = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.post(API_BASE_URL, taskFormData, getConfig());
      fetchTasks();
      setTaskFormData({
        title: "",
        category: "",
        description: "",
        status: "",
        priority: "",
        dueDate: "",
      });
      setErrors({});
    } catch (error) {
      setErrorMessage("Error creating task.");
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/${taskId}`, getConfig());
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setErrorMessage("Error deleting task.");
    } finally {
      setLoading(false);
    }
  };

  // Validate task data
  const validate = () => {
    const result = taskValidationSchema.validate(taskFormData, {
      abortEarly: false,
    });
    const validationErrors = {};
    if (result.error) {
      result.error.details.forEach((detail) => {
        const field = detail.path[0];
        if (!validationErrors[field]) {
          validationErrors[field] = [];
        }
        validationErrors[field].push(detail.message);
      });
    }
    return validationErrors;
  };

  // Track form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (taskId) fetchTask();
    else fetchTasks();
  }, [taskId, fetchTask, fetchTasks]);

  return {
    tasks,
    errors,
    taskFormData,
    handleInputChange,
    statusEnum,
    priorityEnum,
    loading,
    errorMessage,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
