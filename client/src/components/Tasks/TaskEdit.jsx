import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import useTasks from "../../hooks/useTasks";

const TaskEdit = () => {
  const { tasks, errors, statusEnum, priorityEnum } = useTasks();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  const navigate = useNavigate();
  //const [errors, setErrors] = useState({});

  useEffect(() => {
    const selectedTask = tasks.find((task) => task._id === taskId);
    if (selectedTask) setTask(selectedTask);
  }, [tasks, taskId]);

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
      .put(`http://localhost:3001/api/tasks/${taskId}`, task, config)
      .then((response) => {
        // After updating the task, redirect to the task list or task details page
        navigate("/tasks");
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        setErrors({ general: "Failed to update task. Please try again." });
      });
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-8">
          <div className="mb-5">
            <form onSubmit={handleSubmit} noValidate>
              {/* Title */}
              <div className="mb-3 mt-5">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="title"
                />
                {errors.title && (
                  <div className="text-danger">{errors.title}</div>
                )}
              </div>

              {/* Category */}
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category:
                </label>
                <input
                  name="category"
                  value={task.category}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="category"
                />
                {errors.category && (
                  <div className="text-danger">{errors.category}</div>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  className="form-control"
                  id="description"
                />
                {errors.description && (
                  <div className="text-danger">{errors.description}</div>
                )}
              </div>

              {/* Priority */}
              <div className="mb-3">
                <div className="mr-3">
                  <label htmlFor="priority" className="form-label mr-3">
                    Priority:
                  </label>
                </div>
                {priorityEnum.map((p) => (
                  <div className="form-check form-check-inline" key={p}>
                    <input
                      type="radio"
                      id={p}
                      name="priority"
                      value={p}
                      checked={task.priority === p}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label htmlFor={p} className="form-check-label">
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </label>
                  </div>
                ))}
                {errors.priority && (
                  <div className="text-danger">{errors.priority[0]}</div>
                )}
              </div>

              {/* Status */}
              <div className="mb-3">
                <div className="mr-3">
                  <label htmlFor="status" className="form-label mr-3">
                    Status:
                  </label>
                </div>
                {statusEnum.map((s) => (
                  <div className="form-check form-check-inline" key={s}>
                    <input
                      type="radio"
                      id={s}
                      name="status"
                      value={s}
                      checked={task.status === s}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label htmlFor={s} className="form-check-label">
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </label>
                  </div>
                ))}
                {errors.status && (
                  <div className="text-danger">{errors.status[0]}</div>
                )}
              </div>

              {/* Due Date */}
              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">
                  Due Date:
                </label>
                <input
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  type="datetime-local"
                  className="form-control"
                  id="dueDate"
                />
                {errors.dueDate && (
                  <div className="text-danger">{errors.dueDate}</div>
                )}
              </div>

              <button type="submit" className="btn btn-success">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEdit;
