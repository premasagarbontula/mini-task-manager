import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await res.json();

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
        <TaskList tasks={data.tasks} />
      </div>
    </main>
  );
}
