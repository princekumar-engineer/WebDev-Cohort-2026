"use client"

import Link from "next/link"
import { Task } from "@/types/task"
import {
  toggleTask,
  deleteTask,
} from "@/lib/actions"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TaskCardProps {
  task: Task
}

export default function TaskCard({
  task,
}: TaskCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <Link
          href={`/tasks/${task.id}`}
          className="space-y-2 block flex-1"
        >
          <h2
            className={`font-semibold ${
              task.completed
                ? "line-through text-gray-400"
                : ""
            }`}
          >
            {task.title}
          </h2>

          {task.description && (
            <p className="text-sm text-gray-500">
              {task.description}
            </p>
          )}

          <div className="flex gap-2">
            <Badge>
              {task.priority}
            </Badge>

            {task.dueDate && (
              <Badge variant="outline">
                {new Date(
                  task.dueDate
                ).toLocaleDateString()}
              </Badge>
            )}
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Checkbox
            className="cursor-pointer"
            checked={task.completed}
            onCheckedChange={() =>
              toggleTask(
                task.id,
                task.completed
              )
            }
          />

          <form
            action={() =>
              deleteTask(task.id)
            }
          >
            <Button
              variant="destructive"
              type="submit"
            >
              Delete
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}