import React, { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";

const TaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  const statusEnum = ["pending", "in-progress", "completed"];
  const priorityEnum = ["low", "medium", "high"];

  const schema = {
    title: Joi.string().required().max(50).label("Title"),
    category: Joi.string().allow("").label("Category"),
    description: Joi.string().allow("").label("Description"),
    status: Joi.string()
      .valid(...statusEnum)
      .label("Status"),
    priority: Joi.string()
      .valid(...priorityEnum)
      .label("Priority"),
    dueDate: Joi.date().optional().label("Due Date"),
  };

  const validate = () => {
    const errors = {};
    const result = Joi.validate(
      { title, category, description, status, priority, dueDate },
      schema,
      {
        abortEarly: false,
      }
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

  const createTask = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      "http://localhost:3001/api/tasks",
      { title, category, description, status, priority, dueDate },
      config
    );
    fetchTasks();
  };

  const fetchTasks = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("http://localhost:3001/api/tasks", config);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-screen">
      <h2>Your Tasks</h2>
      {/* ---------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------- */}
      <>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-8">
              <form onSubmit={createTask} noValidate>
                {/*---------------------------------------------------------------------------------------------*/}
                <div className="mb-3 mt-5">
                  <label htmlFor="title" className="form-label">
                    Title:
                  </label>
                  <input
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                    id="title"
                  />
                  {errors.title && (
                    <div className="text-danger">{errors.title}</div>
                  )}
                </div>
                {/*---------------------------------------------------------------------------------------------*/}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category:
                  </label>
                  <input
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    type="text"
                    className="form-control"
                    id="category"
                  />
                  {errors.category && (
                    <div className="text-danger">{errors.category}</div>
                  )}
                </div>
                {/*---------------------------------------------------------------------------------------------*/}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="form-control"
                    id="description"
                  />
                  {errors.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                </div>
                {/*---------------------------------------------------------------------------------------------*/}
                <div className="mb-3">
                  <div className="mr-3">
                    <label htmlFor="status" className="form-label mr-3">
                      Priority:
                    </label>
                  </div>
                  {priorityEnum.map((p) => (
                    <div className="form-check form-check-inline ml-3" key={p}>
                      <input
                        type="radio"
                        id={p}
                        name="priority"
                        value={p}
                        checked={priority === p}
                        onChange={(e) => setPriority(e.target.value)}
                        className="form-check-input"
                      />
                      <label htmlFor={p}>
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </label>
                    </div>
                  ))}
                  {errors.priority && (
                    <div className="text-danger">{errors.priority[0]}</div>
                  )}
                </div>
                {/*---------------------------------------------------------------------------------------------*/}
                <div className="mb-3">
                  <div className="mr-3">
                    <label htmlFor="status" className="form-label mr-3">
                      Status:
                    </label>
                  </div>
                  {statusEnum.map((s) => (
                    <div className="form-check form-check-inline ml-3" key={s}>
                      <input
                        type="radio"
                        id={s}
                        name="status"
                        value={s}
                        checked={status === s}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-check-input"
                      />
                      <label htmlFor={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </label>
                    </div>
                  ))}
                  {errors.status && (
                    <div className="text-danger">{errors.status[0]}</div>
                  )}
                </div>
                {/*---------------------------------------------------------------------------------------------*/}
                <div className="mb-3">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date:
                  </label>
                  <input
                    name="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    type="datetime-local"
                    className="form-control"
                    id="dueDate"
                  />
                  {errors.dueDate && (
                    <div className="text-danger">{errors.dueDate}</div>
                  )}
                </div>
                {/*---------------------------------------------------------------------------------------------*/}
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                {/*---------------------------------------------------------------------------------------------*/}
              </form>
              <div className="mb-5"></div>
            </div>
          </div>
        </div>
      </>
      {/* ---------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------- */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskScreen;
