import "server-only"; 

import { prisma } from "@/lib/prisma.server";
import TaskCard from "./TaskCard";
import { Task } from "@/types/task";

export default async function TaskList() {
  const tasks: Task[] =
    await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center space-y-4">
        <h2 className="text-2xl font-semibold">
          No Tasks Yet
        </h2>

        <p className="text-gray-500">
          Start by creating your first task.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task: Task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
}