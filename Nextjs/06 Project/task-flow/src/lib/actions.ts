// src/lib/actions.ts
"use server"

import { prisma } from "@/lib/prisma.server"
import { taskSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"

// 💡 Update parameters to accept a flat object structure
export async function createTask(rawData: {
  title: string
  description?: string
  priority: string
  dueDate?: string | null
}) {
  try {
    const validatedData = taskSchema.safeParse(rawData)

    if (!validatedData.success) {
      // 🔴 This will print the exact validation breakdown if Zod rejects it
      console.error("❌ ZOD VALIDATION FAILED:", validatedData.error.flatten().fieldErrors)
      throw new Error("Invalid task data")
    }

    await prisma.task.create({
      data: {
        title: validatedData.data.title,
        description: validatedData.data.description,
        priority: validatedData.data.priority,
        dueDate: validatedData.data.dueDate
          ? new Date(validatedData.data.dueDate)
          : null
      }
    })

    revalidatePath("/tasks")
  } catch (error) {
    console.error(error)
    throw new Error("Failed to create task")
  }
}
export async function toggleTask(
  id: string,
  completed: boolean
) {
  try {
    await prisma.task.update({
      where: {
        id
      },
      data: {
        completed: !completed
      }
    })

    revalidatePath("/tasks")
    revalidatePath("/dashboard")
    revalidatePath("/analytics")
  } catch {
    throw new Error(
      "Failed to toggle task"
    )
  }
}

export async function deleteTask(
  id: string
) {
  try {
    await prisma.task.delete({
      where: { id }
    })

    revalidatePath("/tasks")
  } catch {
    throw new Error(
      "Failed to delete task"
    )
  }
}