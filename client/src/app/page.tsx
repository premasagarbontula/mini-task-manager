import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { getTasks } from "@/services/taskService";

export default async function Home() {
  const response = await getTasks();
  const tasks = response.data.tasks;

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Mini Task Manager</h1>
        <p className="mt-2 text-slate-600">
          Organize and manage your daily tasks efficiently.
        </p>
      </header>
      <div className="space-y-6">
        <TaskForm />
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
