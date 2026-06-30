import type { Task } from "@/types/task";
import TaskCard from "@/components/TaskCard";

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <section className="w-full max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Your Tasks</h2>

        <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <p className="text-slate-500">
            No tasks yet. Add your first task above.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskList;
