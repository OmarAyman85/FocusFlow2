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
  } = useTasks();

  return (
    <div className="task-screen">
      <h2>Your Tasks</h2>
      {/* ---------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------- */}
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
      {/* ---------------------------------------------------------------- */}
      {/* ---------------------------------------------------------------- */}
      {!tasks || tasks.length === 0 ? (
        <h2>No tasks</h2>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={deleteTask} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskScreen;
