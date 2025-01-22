import React, { useState, useEffect, useCallback } from "react";
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
  } = useTasks();
  const [task, setTask] = useState(null);

  // Effect to set the task when taskId or tasks change
  useEffect(() => {
    const selectedTask = tasks.find((task) => task._id === taskId);
    setTask(selectedTask || null);
  }, [taskId, tasks]);

  // Handler for form input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }, []);

  if (!task) return <div>Loading...</div>;

  // Render input fields
  const renderInputField = (
    type,
    label,
    name,
    value,
    error,
    additionalProps = {}
  ) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}:
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-control"
        id={name}
        {...additionalProps}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );

  // Render radio button options
  const renderRadioButtons = (label, name, options, selectedValue, error) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}:
      </label>
      {options.map((option) => (
        <div className="form-check form-check-inline" key={option}>
          <input
            type="radio"
            id={option}
            name={name}
            value={option}
            checked={selectedValue === option}
            onChange={handleChange}
            className="form-check-input"
          />
          <label htmlFor={option} className="form-check-label">
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </label>
        </div>
      ))}
      {error && <div className="text-danger">{error[0]}</div>}
    </div>
  );

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-8">
          <form onSubmit={(e) => updateTask(e, task)} noValidate>
            {/* Title */}
            {renderInputField(
              "text",
              "Title",
              "title",
              task.title,
              errors.title
            )}

            {/* Category */}
            {renderInputField(
              "text",
              "Category",
              "category",
              task.category,
              errors.category
            )}

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
            {renderRadioButtons(
              "Priority",
              "priority",
              priorityEnum,
              task.priority,
              errors.priority
            )}

            {/* Status */}
            {renderRadioButtons(
              "Status",
              "status",
              statusEnum,
              task.status,
              errors.status
            )}

            {/* Due Date */}
            {renderInputField(
              "datetime-local",
              "Due Date",
              "dueDate",
              task.dueDate,
              errors.dueDate
            )}

            <button type="submit" className="btn btn-success">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskEdit;
