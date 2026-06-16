import Link from "next/link"

export default function NotFound() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-3xl font-bold">
        Task Not Found
      </h1>

      <p className="text-gray-500">
        The task you are looking for does not exist.
      </p>

      <Link
        href="/tasks"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Back to Tasks
      </Link>
    </div>
  )
}