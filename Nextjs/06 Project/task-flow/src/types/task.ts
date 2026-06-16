export type Priority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"

export interface Task {
  id: string
  title: string
  description: string | null
  completed: boolean
  priority: Priority
  dueDate: Date | null
  createdAt: Date
  updatedAt: Date
}