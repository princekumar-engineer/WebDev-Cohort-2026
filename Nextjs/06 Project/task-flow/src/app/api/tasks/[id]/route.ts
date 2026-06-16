import { prisma } from "@/lib/prisma.server"
import { taskSchema } from "@/lib/validations"
import { NextResponse } from "next/server"

interface Params {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params
    const body = await req.json()

    const validatedData =
      taskSchema.partial().safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          errors:
            validatedData.error.flatten()
        },
        {
          status: 400
        }
      )
    }

    const updatedTask =
      await prisma.task.update({
        where: {
          id
        },
        data: {
          ...validatedData.data,
          dueDate:
            validatedData.data.dueDate
              ? new Date(
                  validatedData.data.dueDate
                )
              : undefined
        }
      })

    return NextResponse.json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update task"
      },
      {
        status: 500
      }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params

    await prisma.task.delete({
      where: {
        id
      }
    })

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully"
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete task"
      },
      {
        status: 500
      }
    )
  }
}