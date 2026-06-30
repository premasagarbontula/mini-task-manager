"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Task } from "@/types/task";
import { updateTask, deleteTask } from "@/services/taskService";
import { getErrorMessage } from "@/utils/getErrorMessage";
interface TaskCardProps {
  task: Task;
}
const TaskCard = ({ task }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
  });

  const router = useRouter();
  const toggleCompleted = async () => {
    try {
      await updateTask(task._id, {
        completed: !task.completed,
      });

      router.refresh();
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  const saveHandler = async () => {
    try {
      await updateTask(task._id, editedTask);

      setIsEditing(false);

      router.refresh();
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      if (!window.confirm("Would you like to delete the task?")) {
        return;
      }
      const res = await deleteTask(id);
      alert(res.data.message);
      router.refresh();
    } catch (error) {
      getErrorMessage(error);
    }
  };
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      {isEditing ? (
        <>
          <div className="flex flex-col">
            <label htmlFor="title">Update Title *</label>
            <input
              type="text"
              value={editedTask.title}
              id="title"
              placeholder="Enter title"
              className="border rounded-md p-2 w-full"
              onChange={(e) =>
                setEditedTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Updated Description</label>
            <textarea
              id="description"
              value={editedTask.description}
              placeholder="Enter description"
              className="border rounded-md p-2 w-full"
              onChange={(e) =>
                setEditedTask((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>

          <button
            type="button"
            onClick={saveHandler}
            className="w-full bg-cyan-600 py-2 rounded-md text-white font-semibold hover:bg-cyan-700 transition"
          >
            Save Task
          </button>
          <button
            type="button"
            onClick={() => {
              setEditedTask({
                title: task.title,
                description: task.description,
              });

              setIsEditing(false);
            }}
            className="w-full bg-cyan-600 py-2 rounded-md text-white font-semibold hover:bg-cyan-700 transition"
          >
            Cancel
          </button>
        </>
      ) : (
        <div className="flex items-center justify-between ">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleCompleted}
          />

          <div>
            <h2 className="font-semibold text-lg">{task.title}</h2>

            {task.description && (
              <p className="text-gray-600">{task.description}</p>
            )}
          </div>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteHandler(task._id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
