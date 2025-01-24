import React, { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { NavLink } from "react-router-dom";
import TaskForm from "../components/Tasks/TaskForm";
import TaskCard from "../components/Tasks/TaskCard";
import useTasks from "../hooks/useTasks";
import { statusEnum, priorityEnum } from "../utils/Tasks/taskConstants";

const TaskScreen = () => {
  const {
    tasks,
    errors,
    taskFormData,
    handleInputChange,
    createTask,
    deleteTask,
    loading,
    errorMessage,
  } = useTasks();

  // Handle empty tasks and errors gracefully
  const renderTaskList = () => {
    if (loading) {
      return <h3>Loading tasks...</h3>;
    }

    if (errorMessage) {
      return <h3>{errorMessage}</h3>;
    }

    if (!tasks || tasks.length === 0) {
      return <h3>No tasks available</h3>;
    }

    return (
      <div className="row">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={deleteTask} />
        ))}
      </div>
    );
  };

  return (
    <div className="task-screen">
      <h2>Your Tasks</h2>

      {/* Task Form */}
      <TaskForm
        taskFormData={taskFormData}
        handleInputChange={handleInputChange}
        statusEnum={statusEnum}
        priorityEnum={priorityEnum}
        errors={errors}
        createTask={createTask}
      />

      {/* Task List */}
      {renderTaskList()}
    </div>
  );
};

export default TaskScreen;
