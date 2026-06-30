"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Task } from "@/types/task";
import { deleteTask, updateTask } from "@/services/taskService";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description ?? "",
  });

  const toggleCompleted = async () => {
    try {
      setError("");

      await updateTask(task._id, {
        completed: !task.completed,
      });

      router.refresh();
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const saveHandler = async () => {
    try {
      setError("");

      await updateTask(task._id, editedTask);

      setIsEditing(false);
      router.refresh();
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const deleteHandler = async () => {
    if (!window.confirm("Delete this task?")) return;

    try {
      setError("");

      await deleteTask(task._id);

      router.refresh();
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label
              htmlFor={`title-${task._id}`}
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Title
            </label>

            <input
              id={`title-${task._id}`}
              type="text"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          <div>
            <label
              htmlFor={`description-${task._id}`}
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id={`description-${task._id}`}
              rows={3}
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </div>

          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveHandler}
              className="flex-1 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition hover:bg-cyan-700"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => {
                setEditedTask({
                  title: task.title,
                  description: task.description ?? "",
                });

                setError("");
                setIsEditing(false);
              }}
              className="flex-1 rounded-md bg-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={toggleCompleted}
                className="mt-1 h-5 w-5 cursor-pointer accent-cyan-600"
              />

              <div>
                <h2
                  className={`text-lg font-semibold ${
                    task.completed
                      ? "text-slate-400 line-through"
                      : "text-slate-900"
                  }`}
                >
                  {task.title}
                </h2>

                {task.description && (
                  <p
                    className={`mt-1 text-sm ${
                      task.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-500"
                    }`}
                  >
                    {task.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setError("");
                  setIsEditing(true);
                }}
                className="rounded-md bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-700 transition hover:bg-cyan-200"
              >
                Edit
              </button>

              <button
                onClick={deleteHandler}
                className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 transition hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default TaskCard;
