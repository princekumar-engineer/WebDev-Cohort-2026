function Controls({
  onStart,
  onPause,
  onReset
}) {
  return (
    <div className="flex gap-3 justify-center mt-4 flex-wrap">
      <button
        onClick={onStart}
        className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
      >
        Start
      </button>

      <button
        onClick={onPause}
        className="px-4 py-2 bg-yellow-500 rounded-lg text-white hover:bg-yellow-600"
      >
        Pause
      </button>

      <button
        onClick={onReset}
        className="px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600"
      >
        Reset
      </button>
    </div>
  )
}

export default Controls