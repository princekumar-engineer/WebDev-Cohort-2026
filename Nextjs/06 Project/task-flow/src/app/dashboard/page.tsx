import { prisma } from "@/lib/prisma.server"
import TaskStats from "@/components/TaskStats"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const totalTasks =
    await prisma.task.count()

  const completedTasks =
    await prisma.task.count({
      where: {
        completed: true
      }
    })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <TaskStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />
    </div>
  )
}