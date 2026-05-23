import { useEffect, useState } from "react"
import Controls from "./Controls"

function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 10)
      }, 10)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = () => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = Math.floor((time % 1000) / 10)

    return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}:${String(milliseconds).padStart(2,"0")}`
  }

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg w-full md:w-100">
      <h2 className="text-2xl text-white font-bold mb-4 text-center">
        Stopwatch
      </h2>

      <div className="text-4xl text-cyan-400 font-mono text-center">
        {formatTime()}
      </div>

      <Controls
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onReset={() => {
          setIsRunning(false)
          setTime(0)
        }}
      />
    </div>
  )
}

export default Stopwatch