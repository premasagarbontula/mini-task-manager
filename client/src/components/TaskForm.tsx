"use client";

import React, { useState } from "react";

const TaskForm = () => {
  const [task, setTask] = useState({ title: "", description: "" });

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTask((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleDescriptionChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    setTask((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="max-w-lg mx-auto flex flex-col gap-4 bg-white shadow-lg rounded-xl p-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          value={task.title}
          id="title"
          placeholder="Enter title"
          className="border rounded-md p-2 w-full"
          onChange={handleTitleChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={task.description}
          placeholder="Enter description"
          className="border rounded-md p-2 w-full"
          onChange={handleDescriptionChange}
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-cyan-600 py-2 rounded-md text-white font-semibold hover:bg-cyan-700 transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
