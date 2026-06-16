"use client"

export default function Error({
  error
}: {
  error: Error
}) {
  return (
    <div>
      <p className="text-red-500">
        Dashboard Error: {error.message}
      </p>
    </div>
  )
}