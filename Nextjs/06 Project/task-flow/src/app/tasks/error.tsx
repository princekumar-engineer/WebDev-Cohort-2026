"use client"

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-red-500">
        Something went wrong.
      </h2>

      <p>{error.message}</p>

      <button
        onClick={reset}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Try Again
      </button>
    </div>
  )
}