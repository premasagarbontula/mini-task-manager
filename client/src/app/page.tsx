import axios from "axios";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default async function Home() {
  const response = await axios.get("http://localhost:5000/api/tasks");
  const tasks = response.data.tasks;
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-3">Mini Task Manager</h1>
      <TaskForm />
      <TaskList tasks={tasks} />
    </div>
  );
}
