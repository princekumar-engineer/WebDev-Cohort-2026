import { prisma } from "@/lib/prisma.server"
import { taskSchema } from "@/lib/validations"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tasks"
      },
      {
        status: 500
      }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const validatedData =
      taskSchema.safeParse(body)

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

    const task = await prisma.task.create({
      data: {
        title: validatedData.data.title,
        description:
          validatedData.data.description,
        priority:
          validatedData.data.priority,
        dueDate:
          validatedData.data.dueDate
            ? new Date(
                validatedData.data.dueDate
              )
            : null
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Task created successfully",
        data: task
      },
      {
        status: 201
      }
    )
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create task"
      },
      {
        status: 500
      }
    )
  }
}