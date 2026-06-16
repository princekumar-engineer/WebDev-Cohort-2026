import Link from "next/link"

export const dynamic = "force-static"

export default function HomePage() {
  return (
    <section className="space-y-6 text-center">
      <h1 className="text-5xl font-bold">
        Welcome to TaskFlow
      </h1>

      <p className="text-lg text-gray-500">
        Manage your tasks, stay productive,
        and track your progress.
      </p>

      <Link
        href="/tasks"
        className="inline-block rounded-md bg-black px-6 py-3 text-white"
      >
        Get Started
      </Link>
    </section>
  )
}