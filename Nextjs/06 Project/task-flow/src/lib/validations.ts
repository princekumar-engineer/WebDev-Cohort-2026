import { z } from "zod"

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .optional(),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH"
  ]),

  dueDate: z
    .string()
    .optional()
})