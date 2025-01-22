import React from "react";

const TaskForm = ({
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
  priorityEnum,
  statusEnum,
  errors,
  createTask,
}) => {
  // Handle input changes for both text fields and radio buttons
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-8">
          <div className="mb-5">
            <form onSubmit={createTask} noValidate>
              {/* Title */}
              <div className="mb-3 mt-5">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  name="title"
                  value={title}
                  onChange={handleInputChange(setTitle)}
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
                  value={category}
                  onChange={handleInputChange(setCategory)}
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
                  value={description}
                  onChange={handleInputChange(setDescription)}
                  className="form-control"
                  id="description"
                />
                {errors.description && (
                  <div className="text-danger">{errors.description}</div>
                )}
              </div>

              {/* Priority */}
              <div className="mb-3">
                <label htmlFor="priority" className="form-label mr-3">
                  Priority:
                </label>
                <div>
                  {priorityEnum.map((p) => (
                    <div className="form-check form-check-inline" key={p}>
                      <input
                        type="radio"
                        id={p}
                        name="priority"
                        value={p}
                        checked={priority === p}
                        onChange={handleInputChange(setPriority)}
                        className="form-check-input"
                      />
                      <label htmlFor={p} className="form-check-label">
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.priority && (
                  <div className="text-danger">{errors.priority[0]}</div>
                )}
              </div>

              {/* Status */}
              <div className="mb-3">
                <label htmlFor="status" className="form-label mr-3">
                  Status:
                </label>
                <div>
                  {statusEnum.map((s) => (
                    <div className="form-check form-check-inline" key={s}>
                      <input
                        type="radio"
                        id={s}
                        name="status"
                        value={s}
                        checked={status === s}
                        onChange={handleInputChange(setStatus)}
                        className="form-check-input"
                      />
                      <label htmlFor={s} className="form-check-label">
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
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
                  value={dueDate}
                  onChange={handleInputChange(setDueDate)}
                  type="datetime-local"
                  className="form-control"
                  id="dueDate"
                />
                {errors.dueDate && (
                  <div className="text-danger">{errors.dueDate}</div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-success">
                Submit task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
