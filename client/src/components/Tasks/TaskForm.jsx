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
                  onChange={(e) => setTitle(e.target.value)}
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
                  onChange={(e) => setCategory(e.target.value)}
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
                  onChange={(e) => setDescription(e.target.value)}
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
                      checked={priority === p}
                      onChange={(e) => setPriority(e.target.value)}
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
                      checked={status === s}
                      onChange={(e) => setStatus(e.target.value)}
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

              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
