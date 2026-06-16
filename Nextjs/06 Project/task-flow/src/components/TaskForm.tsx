"use client"

import { createTask } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export default function TaskForm() {
  const [priority, setPriority] = useState("MEDIUM")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() 

    const formData = new FormData(e.currentTarget)
    
    // 💡 Pack the values explicitly into a plain JavaScript Object
    const taskPayload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      priority: priority, // Use the state variable tracking shadcn select
      dueDate: (formData.get("dueDate") as string) || null, // Convert "" to null
    }

    try {
      // 🚀 Send the plain object to the Server Action safely
      await createTask(taskPayload)
      
      e.currentTarget.reset() 
      setPriority("MEDIUM")    
    } catch (err) {
      console.error("Form submission failed:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="title"
        placeholder="Enter task title"
        required
      />

      <Textarea
        name="description"
        placeholder="Task description"
      />

      <Select
        defaultValue={priority}
        onValueChange={setPriority}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        name="dueDate"
      />

      <Button type="submit">
        Create Task
      </Button>
    </form>
  )
}