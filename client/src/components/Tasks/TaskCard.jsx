import React from "react";
import { NavLink } from "react-router-dom";

const TaskCard = ({ task }) => {
  return (
    <div className="col-3" key={task.id}>
      <div className="card text-start mb-3">
        <div className="card-body">
          <h3 className="card-title">{task.title}</h3>
          <h5 className="card-title">{task.category}</h5>
          <p className="card-text">{task.description}</p>
          <p className="card-text">Priority: {task.priority}</p>
          <p className="card-text">Status: {task.status}</p>
          <p className="card-text">
            Due Date: {new Date(task.dueDate).toLocaleDateString()}
          </p>
          <NavLink to={`/Task/${task.id}`} className="btn btn-primary">
            View Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
