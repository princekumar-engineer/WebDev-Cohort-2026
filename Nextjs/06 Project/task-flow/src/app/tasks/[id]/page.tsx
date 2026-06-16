import { prisma } from "@/lib/prisma.server"
import { notFound } from "next/navigation"

interface TaskDetailsProps {
  params: Promise<{
    id: string
  }>
}

export const dynamic = "force-dynamic"

export default async function TaskDetailsPage({
  params
}: TaskDetailsProps) {
  const { id } = await params

  const task = await prisma.task.findUnique({
    where: {
      id
    }
  })

  if (!task) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Task Details
      </h1>

      <div className="rounded-lg border p-6 space-y-4">
        <h2 className="text-2xl font-semibold">
          {task.title}
        </h2>

        <p>
          {task.description || "No description"}
        </p>

        <p>
          Status:{" "}
          {task.completed
            ? "Completed"
            : "Pending"}
        </p>

        <p>
          Priority: {task.priority}
        </p>

        <p>
          Due Date:{" "}
          {task.dueDate
            ? new Date(
                task.dueDate
              ).toLocaleDateString()
            : "Not set"}
        </p>

        <p>
          Created At:{" "}
          {new Date(
            task.createdAt
          ).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}