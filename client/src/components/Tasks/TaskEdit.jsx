import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import useTasks from "../../hooks/useTasks";

const TaskEdit = () => {
  const {
    tasks = [],
    errors,
    statusEnum,
    priorityEnum,
    taskId,
    updateTask,
    fetchTask,
  } = useTasks();
  const [task, setTask] = useState(null);

  //const [errors, setErrors] = useState({});
  console.log("tasks: ", tasks);

  // useEffect(() => {
  //   if (taskId) {
  //     const selectedTask = tasks.find((task) => task._id === taskId);
  //     if (!selectedTask) {
  //       fetchTask(); // Fetch the task if it's not in the tasks array
  //     } else {
  //       setTask(selectedTask); // Set the task if it's already in the tasks array
  //     }
  //   }
  // }, [tasks, taskId]);

  useEffect(() => {
    const selectedTask = tasks.find((task) => task._id === taskId);
    setTask(selectedTask);
  }, [taskId, tasks]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   console.log("Updated task after change:", task);
  // }, [task]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-8">
          <div className="mb-5">
            <form onSubmit={(e) => updateTask(e, task)} noValidate>
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
