import React from "react";
import type { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
}
const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={task.completed} readOnly />

        <div>
          <h2 className="font-semibold text-lg">{task.title}</h2>

          {task.description && (
            <p className="text-gray-600">{task.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
