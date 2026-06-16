interface TaskStatsProps {
  totalTasks: number
  completedTasks: number
}

export default function TaskStats({
  totalTasks,
  completedTasks
}: TaskStatsProps) {
  const pendingTasks =
    totalTasks - completedTasks

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        )

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="rounded-lg border p-4">
        <h2 className="font-semibold">
          Total Tasks
        </h2>
        <p className="text-2xl">
          {totalTasks}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-semibold">
          Completed
        </h2>
        <p className="text-2xl">
          {completedTasks}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-semibold">
          Pending
        </h2>
        <p className="text-2xl">
          {pendingTasks}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-semibold">
          Completion Rate
        </h2>
        <p className="text-2xl">
          {completionRate}%
        </p>
      </div>
    </div>
  )
}