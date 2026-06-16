import dynamicImport from "next/dynamic";

// Force TaskList to stay 100% on the server bundle
const TaskList = dynamicImport(() => import("@/components/TaskList"), {
  ssr: true, 
});

// Load the Client Component separately
const TaskForm = dynamicImport(() => import("@/components/TaskForm"), {
  ssr: true,
});

export const dynamic = "force-dynamic";

export default function TasksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <p className="text-gray-500">Create and manage your tasks</p>
      </div>

      <TaskForm />
      <TaskList />
    </div>
  );
}