import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TaskEdit = () => {
  const { taskId } = useParams(); // Assuming you're passing the task ID as a URL parameter

  const [task, setTask] = useState({
    title: "",
    category: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch task data when the component mounts
  useEffect(() => {
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
        setTask(response.data);
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
      });
  }, [taskId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  // Handle form submission to update the task
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/tasks/${taskId}`, task)
      .then((response) => {
        // After updating the task, redirect to the task list or task details page
        history.push(`/tasks/${taskId}`);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        setErrors({ general: "Failed to update task. Please try again." });
      });
  };

  return (
    <div className="task-edit">
      <h2>Edit Task</h2>
      {errors.general && <p className="error">{errors.general}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={task.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <option value="To Do">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default TaskEdit;
