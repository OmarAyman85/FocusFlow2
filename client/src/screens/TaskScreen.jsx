import React, { useState, useEffect } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { NavLink } from "react-router-dom";
import TaskForm from "../components/Tasks/TaskForm";
import TaskCard from "../components/Tasks/TaskCard";
import useTasks from "../hooks/useTasks";

const TaskScreen = () => {
  const {
    tasks,
    errors,
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
    statusEnum,
    priorityEnum,
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
        title={title}
        setTitle={setTitle}
        category={category}
        setCategory={setCategory}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
        priorityEnum={priorityEnum}
        statusEnum={statusEnum}
        errors={errors}
        createTask={createTask}
      />

      {/* Task List */}
      {renderTaskList()}
    </div>
  );
};

export default TaskScreen;
