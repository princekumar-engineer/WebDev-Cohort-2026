import { useEffect, useState } from "react"
import Controls from "./Controls"

function Timer() {
  const [inputMinutes, setInputMinutes] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    }

    if (timeLeft === 0) {
      setIsRunning(false)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`
  }

  const handleSetTimer = () => {
    const totalSeconds = Number(inputMinutes) * 60
    setTimeLeft(totalSeconds)
  }

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg w-full md:w-100">
      <h2 className="text-2xl text-white font-bold mb-4 text-center">
        Timer
      </h2>

      <div className="flex gap-2 justify-center mb-4">
        <input
          type="number"
          placeholder="Minutes"
          value={inputMinutes}
          onChange={(e) =>
            setInputMinutes(e.target.value)
          }
          className="px-3 py-2 rounded-lg outline-none w-28"
        />

        <button
          onClick={handleSetTimer}
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
        >
          Set
        </button>
      </div>

      <div className="text-4xl text-pink-400 font-mono text-center">
        {formatTime()}
      </div>

      <Controls
        onStart={() => {
          if (timeLeft > 0)
            setIsRunning(true)
        }}
        onPause={() => setIsRunning(false)}
        onReset={() => {
          setIsRunning(false)
          setTimeLeft(0)
          setInputMinutes("")
        }}
      />
    </div>
  )
}

export default Timer