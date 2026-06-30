"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "@/services/taskService";
import { getErrorMessage } from "@/utils/getErrorMessage";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await createTask(task);

      setTask({
        title: "",
        description: "",
      });

      router.refresh();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl bg-white p-6 shadow-md"
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Title <span className="text-red-500">*</span>
          </label>

          <input
            id="title"
            type="text"
            value={task.title}
            placeholder="Enter task title"
            onChange={handleTitleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={4}
            value={task.description}
            placeholder="Enter task description (optional)"
            onChange={handleDescriptionChange}
            className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
          />
        </div>

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-cyan-600 py-2.5 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Adding Task..." : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
