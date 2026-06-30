import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { getTasks } from "@/services/taskService";

export default async function Home() {
  const response = await getTasks();
  const tasks = response.data.tasks;
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-3">Mini Task Manager</h1>
      <TaskForm />
      <TaskList tasks={tasks} />
    </div>
  );
}
